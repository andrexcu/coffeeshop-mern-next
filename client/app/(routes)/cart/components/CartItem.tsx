"use client";

import { useShoppingCart } from "@/context/ShoppingCartContext";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  product: ProductType;
}

const CartItem = ({ product }: CartItemProps) => {
  const { cartItems } = useShoppingCart();
  const quantity = cartItems.find((item) => item.id === product._id)?.quantity;
  return (
    <div className="flex items-center gap-4 p-2 w-full border border-orange-300">
      <div className="w-1/4">
        <Image
          src={product.image}
          width={75}
          height={75}
          alt="product image"
          placeholder="blur"
          blurDataURL={product.image}
          className="rounded-full object-contain w-auto h-auto select-none "
        />
      </div>
      <div className="text-xl flex gap-4 justify-between w-full ">
        <div>{product.name}</div>
        <div className="text-slate-300">Qty: {quantity}</div>
        <div>${product.price}</div>
      </div>
    </div>
  );
};

export default CartItem;
