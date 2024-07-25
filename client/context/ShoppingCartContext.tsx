"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserType } from "@/lib/types";
// import getCurrentUser from "@/actions/get-current-user";
import increaseQuantity from "@/actions/increase-quantity";
import { revalidatePath } from "next/cache";
import decreaseQuantity from "@/actions/decrease-quantity";
import getCartQuantity from "@/actions/get-cart-quantity";
import { userIdType } from "@/types/userType";
import getCartItemQuantity from "@/actions/get-item-quantity";
import { error } from "console";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  id: string;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: string) => number;
  userProductQuantity: { [itemId: string]: number };
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  fetchItemQuantity: () => Promise<void>;
  cartQuantity: number | undefined;
  itemQuantity: number | undefined;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  fetchCurrentItemQuantity: (productId: string) => void;
  currentUser: UserType | null;
  setCurrentUser: Dispatch<SetStateAction<UserType | null>>
  cartState: { [itemId: string]: boolean };
  isLoading: { [itemId: string]: boolean };
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [userProductQuantity, setUserProductQuantity] = useState({});
  const [isLoading, setIsLoading] = useState<{ [productId: string]: boolean }>(
    {}
  );

  const [cartState, setCartState] = useState<{ [productId: string]: boolean }>(
    {}
  );

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );


  const fetchItemQuantity = async () => {
    const currentCartQuantity = await getCartQuantity(currentUser?._id as string);
    setItemQuantity(currentCartQuantity);
  };

  useEffect(() => {
    fetchItemQuantity();
  }, [currentUser, cartState]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );


  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  const fetchCurrentItemQuantity = useCallback(async (productId: string) => {

    if(!currentUser || !currentUser._id) {
      return
    }

    const currentItemQuantity = await getCartItemQuantity({productId, userId: currentUser?._id});
   
    setUserProductQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: currentItemQuantity,
    }));
  }, [currentUser]);
  
  async function increaseCartQuantity(id: string) {
    if (!currentUser || !currentUser._id) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id) == null) {
          return [...currItems, { id, quantity: 1 }];
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
        }
      });
    } else {
      try {
        setIsLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
        await increaseQuantity({ productId: id, userId: currentUser._id });
        setCartState((prevState) => ({ ...prevState, [id]: !prevState[id] }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
      }
    }
  }

  async function decreaseCartQuantity(id: string) {
    if (!currentUser || !currentUser._id) {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.id === id)?.quantity === 1) {
          return currItems.filter((item) => item.id !== id);
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
        }
      });
    } else {
      try {
        setIsLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
        await decreaseQuantity({ productId: id, userId: currentUser._id });
        setCartState((prevState) => ({ ...prevState, [id]: !prevState[id] }));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
      }
    }
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        userProductQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        isLoading,
        removeFromCart,
        openCart,
        closeCart,
        fetchItemQuantity,
        setCurrentUser,
        cartItems,
        setCartItems,
        cartQuantity,
        itemQuantity,
        fetchCurrentItemQuantity,
        currentUser,
        cartState,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
