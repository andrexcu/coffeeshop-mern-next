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
  const { cartItems, currentUser } = useShoppingCart();
  const [isFetching, setIsFetching] = useState(false);
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [userCartItems, setUserCartItems] = useState<CartItemType[] | null>(
    null
  );

  const [userProducts, setUserProducts] = useState<ProductType[] | undefined>(
    undefined
  );
  const [userTotalItems, setUserTotalItems] = useState<number>(0);
  const [userTotalPrice, setUserTotalPrice] = useState<number>(0);

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
      setIsFetching(true);
      const userCartItems = await getCartItems({
        userId: currentUser?._id,
      });
      setUserCartItems(userCartItems);
      setIsFetching(false);
    };

    fetchUserCartItems();
  }, [currentUser]);

  useEffect(() => {
    if(!isFetching)
    console.log(userCartItems);
  }, [userCartItems]);

  useEffect(() => {
    // Filter products based on userCartItems
    if (userCartItems && userCartItems.length > 0) {
      const fetchedUserProducts = products?.filter((product) =>
        userCartItems?.some((cartItem) => cartItem.productId === product._id)
      );
      setUserProducts(fetchedUserProducts);
    }
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
  }, [userCartItems]);
  // user cart price
  useEffect(() => {
    if (userProducts) {
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
    }
  }, [userProducts]);

  // local cart
  useEffect(() => {
    const calculateTotalItems = () => {
      const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setTotalItems(total);
    };

    calculateTotalItems();
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
  return (
    <div className="min-h-dvh flex max-w-7xl mx-auto">
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
              totalPrice={userTotalPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
