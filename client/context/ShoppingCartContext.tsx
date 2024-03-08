"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
// import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { UserType } from "@/lib/types";
import getCurrentUser from "@/actions/get-current-user";
import increaseQuantity from "@/actions/increase-quantity";
import { revalidatePath } from "next/cache";
import decreaseQuantity from "@/actions/decrease-quantity";
import getCartItemQuantity from "@/actions/get-item-quantity";
import getCartQuantity from "@/actions/get-cart-quantity";

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
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  fetchItemQuantity: () => Promise<void>;
  cartQuantity: number | undefined;
  itemQuantity: number | undefined;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [itemQuantity, setItemQuantity] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getCurrentUser();
      setCurrentUser(userData);
    };

    getUserData();
  }, []);

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  let cartQuantity;
  if (!currentUser) {
    cartQuantity = cartItems.reduce(
      (quantity, item) => item.quantity + quantity,
      0
    );
  }

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  async function increaseCartQuantity(id: string) {
    if (!currentUser) {
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
      await increaseQuantity(id);
    }
  }

  async function decreaseCartQuantity(id: string) {
    if (!currentUser) {
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
      await decreaseQuantity(id);
    }
  }

  const fetchItemQuantity = async () => {
    const currentCartQuantity = await getCartQuantity();
    setItemQuantity(currentCartQuantity);
    console.log("total cart quantity fetched");
    console.log(itemQuantity);
  };

  useEffect(() => {
    if (!currentUser) {
      fetchItemQuantity();
    } else {
      const currentCartItems = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      );
      setItemQuantity(currentCartItems);
    }
  }, []);

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        fetchItemQuantity,
        cartItems,
        cartQuantity,
        itemQuantity,
      }}
    >
      {children}
      {/* <ShoppingCart isOpen={isOpen} /> */}
    </ShoppingCartContext.Provider>
  );
}
