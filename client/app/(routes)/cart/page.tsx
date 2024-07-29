"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./components/CartItem";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import getAllProducts from "@/actions/get-all-products";
import { ProductType } from "@/lib/types";
import getCartItems from "@/actions/get-cart-items";
import OrderTable from "./components/OrderTable";
import { Button } from "@/components/ui/button";

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
  }, [currentUser, increaseCartQuantity, decreaseCartQuantity]);
  // currentUser, userCartItems, increaseCartQuantity, decreaseCartQuantity

  useEffect(() => {
    // Filter products based on userCartItems
    setIsLoading(true);
    if (userCartItems && userCartItems.length > 0) {
      const fetchedUserProducts = products?.filter((product) =>
        userCartItems?.some((cartItem) => cartItem.productId === product._id)
      );
      setUserProducts(fetchedUserProducts);
    } else {
      setUserProducts(undefined);
    }
    setIsLoading(false);
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
    setIsLoading(true);
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
    setIsLoading(false);
  }, [userCartItems]);
  // user cart price
  useEffect(() => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }, [userProducts]);

  // local cart
  useEffect(() => {
    setIsLoading(true);
    const calculateTotalItems = () => {
      const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setTotalItems(total);
    };

    calculateTotalItems();
    setIsLoading(false);
  }, [cartItems]);

  // local cart price
  const totalPrice = productsInCart.reduce((total, product) => {
    const cartItem = cartItems.find((item) => item.id === product._id);
    if (cartItem) {
      return total + cartItem.quantity * product.price;
    }
    return total;
  }, 0);

  return (
    <div className="min-h-dvh flex max-w-7xl mx-auto">
      {!isLoading ? (
        <div className="flex flex-col mt-32 w-full max-w-7xl mx-auto px-4 py-4 ">
          <div className="flex flex-col gap-2 w-full  text-white">
            {!currentUser ? (
              productsInCart.length !== 0 ? (
                <OrderTable
                  productsInCart={productsInCart}
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                />
              ) : (
                <div className="text-xl text-center">
                  You have no coffee ordered yet.
                </div>
              )
            ) : userProducts !== undefined ? (
              <OrderTable
                productsInCart={userProducts}
                totalItems={userTotalItems}
                totalPrice={userTotalPrice}
              />
            ) : (
              <div className="text-xl text-center">
                You have no coffee ordered yet.
              </div>
            )}
            {productsInCart.length !== 0 || userProducts !== undefined ? <div className="w-full flex justify-center items-center">
              <Button variant="default" className="w-1/3">
                Check Out
              </Button>
            </div> : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Page;
