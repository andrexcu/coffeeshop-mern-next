"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./components/CartItem";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import getAllProducts from "@/actions/get-all-products";
import { ProductType } from "@/lib/types";
import getCartItems from "@/actions/get-cart-items";
import OrderTable from "./components/OrderTable";

type CartItemType = {
  productId: string;
  quantity: number;
};

const Page = () => {
  const { cartItems, currentUser, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [userCartItems, setUserCartItems] = useState<CartItemType[] | null>(
    null
  );

  const [userProducts, setUserProducts] = useState<ProductType[] | undefined>(
    undefined
  );
  const [userTotalItems, setUserTotalItems] = useState(0);
  const [userTotalPrice, setUserTotalPrice] = useState(0);

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchUserCartItems = async () => {
      if (!currentUser?._id) return;
      const userCartItems = await getCartItems({
        userId: currentUser?._id,
      });
      setUserCartItems(userCartItems);
    };

    fetchUserCartItems();
  }, [currentUser, userCartItems, increaseCartQuantity, decreaseCartQuantity]);

  // useEffect(() => {
  //   if(!isFetching)
  //   console.log(userCartItems);
  // }, [userCartItems]);

  useEffect(() => {
    // Filter products based on userCartItems
    setIsLoading(true)
    if (userCartItems && userCartItems.length > 0) {
      const fetchedUserProducts = products?.filter((product) =>
        userCartItems?.some((cartItem) => cartItem.productId === product._id)
      );
      setUserProducts(fetchedUserProducts);
    }
    setIsLoading(false)
  }, [userCartItems, products]);

  const getProductsInCart = () => {
    if (!products || !cartItems) {
      return [];
    }

    const productIdsInCart = cartItems.map((cartItem) => cartItem.id);
    const productsInCart = products.filter((product) =>
      productIdsInCart.includes(product._id)
    );
    return productsInCart;
  };

  const productsInCart = getProductsInCart();

  // user Cart
  useEffect(() => {
    setIsLoading(true)
    const calculateTotalItems = () => {
      if (!userCartItems) return;
      const userTotal = userCartItems?.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      if (!userTotal) return;
      setUserTotalItems(userTotal);
    };

    calculateTotalItems();
    setIsLoading(false)
  }, [userCartItems]);
  // user cart price
  useEffect(() => {
    setIsLoading(true)
    if (userProducts && userCartItems) {
      const totalPrice = userProducts.reduce((total, product) => {
        const cartItem = userCartItems?.find(
          (item) => item.productId === product._id
        );
        if (cartItem) {
          return total + cartItem.quantity * product.price;
        }
        return total;
      }, 0);
      setUserTotalPrice(totalPrice);
      setIsLoading(false);
    } else {
      setUserTotalPrice(0);
      setIsLoading(false);
    }
  }, [userCartItems, userProducts]);

  // local cart
  useEffect(() => {
    setIsLoading(true)
    const calculateTotalItems = () => {
      const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setTotalItems(total);
    };

    calculateTotalItems();
    setIsLoading(false)
  }, [cartItems]);

  // local cart price
  const totalPrice = productsInCart.reduce((total, product) => {
    const cartItem = cartItems.find((item) => item.id === product._id);
    if (cartItem) {
      return total + cartItem.quantity * product.price;
    }
    return total;
  }, 0);

  // console.log(userProducts, userTotalItems, userTotalPrice)
  // useEffect(() => {

  //     console.log(userProducts);

  // }, [userProducts]);

  // console.log(userTotalPrice)
  return (
    <div className="min-h-dvh flex max-w-7xl mx-auto">
      {!isLoading ? (
        <div className="flex flex-col mt-32 w-full max-w-7xl mx-auto px-4 py-4 ">
          <div className="flex flex-col gap-2 w-full  text-white">
            {!currentUser ? (
              <OrderTable
                productsInCart={productsInCart}
                totalItems={totalItems}
                totalPrice={totalPrice}
              />
            ) : (
              <OrderTable
                productsInCart={userProducts}
                totalItems={userTotalItems}
                totalPrice={!isLoading ? userTotalPrice : 0}
              />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
