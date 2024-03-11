"use client";
import React, { useEffect, useState } from "react";
import CartItem from "./components/CartItem";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import getAllProducts from "@/actions/get-all-products";
import { ProductType } from "@/lib/types";

const page = () => {
  const { cartItems } = useShoppingCart();
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    };
    fetchAllProducts();
  }, []);

  //   const items = products?.find((product) => product._id === cartItems.map(cart => cart.id));

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

  return (
    <div className="min-h-dvh flex max-w-7xl mx-auto">
      <div className="flex flex-col mt-32 w-full max-w-7xl mx-auto px-4 py-4 border">
        <div className="flex flex-col gap-2 w-full  text-white">
          {/* <CartItem product={prod}  /> */}
          {productsInCart.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
