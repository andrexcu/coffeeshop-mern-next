"use client";

import { useShoppingCart } from "@/context/ShoppingCartContext";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../../order/components/Loader";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface CartItemProps {
  product: ProductType;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    getItemQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    userProductQuantity,
    fetchCurrentItemQuantity,
    currentUser,
    cartState,
    isLoading,
  } = useShoppingCart();

  const quantity = getItemQuantity(product._id);

  const [addPressed, setAddPressed] = useState(false);
  const [removePressed, setRemovePressed] = useState(false);

  const handleAddPress = () => {
    setAddPressed(true);
  };

  const handleAddRelease = () => {
    setAddPressed(false);
  };

  const handleRemovePress = () => {
    setRemovePressed(true);
  };

  const handleRemoveRelease = () => {
    setRemovePressed(false);
  };

  useEffect(() => {
    fetchCurrentItemQuantity(product._id);
  }, [cartState, fetchCurrentItemQuantity, product._id]);

  const addCartItem = (e: React.MouseEvent) => {
    e.preventDefault();
    increaseCartQuantity(product._id);
  };
  const { cartItems } = useShoppingCart();
  const currentQuantity = cartItems.find(
    (item) => item.id === product._id
  )?.quantity;

  return (
    <TableRow key={product._id} className="bg-[#1a1814] ">
      <TableCell className="">
        <div className="flex items-center gap-4 p-2 ">
          <div className="">
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
          <div className="text-xl">
            <div>{product.name}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <div className="text-slate-300">
          {!currentUser
            ? currentQuantity && `${currentQuantity}x`
            : userProductQuantity[product._id] && `${userProductQuantity[product._id]}x`}
        </div>
      </TableCell>
      {/* `$${product.quantity * product.price}` */}
      <TableCell className="">
        {!currentUser
          ? currentQuantity
            ? `P${currentQuantity * product.price}`
            : ""
          : userProductQuantity[product._id]
          ? `P${userProductQuantity[product._id] * product.price}`
          : ""}
      </TableCell>
      <TableCell className="">
        <div className="flex gap-x-4 justify-end">
          {!currentUser ? (
            quantity < 1 ? (
              <Button variant="orange" className="" onClick={addCartItem}>
                Add To Cart
              </Button>
            ) : (
              <div className="h-10 w-3/5 flex justify-between items-center">
                <Plus
                  className={`h-full w-full ${
                    addPressed ? "bg-[#3D2B1F]" : "bg-[#cda45e]"
                  } transition-colors duration-300 ease-in`}
                  onClick={addCartItem}
                  onMouseDown={handleAddPress}
                  onMouseUp={handleAddRelease}
                  onMouseLeave={handleAddRelease}
                />
                <div className="h-full w-full bg-black text-slate-300 flex justify-center items-center text-2xl ">
                  <span>{quantity}</span>
                </div>
                <Minus
                  className={`h-full w-full ${
                    removePressed ? "bg-[#3D2B1F]" : "bg-[#cda45e]"
                  } transition-colors duration-300 ease-in`}
                  onClick={() => decreaseCartQuantity(product._id)}
                  onMouseDown={handleRemovePress}
                  onMouseUp={handleRemoveRelease}
                  onMouseLeave={handleRemoveRelease}
                />
              </div>
            )
          ) : (
            ""
          )}

          {currentUser ? (
            userProductQuantity[product._id] < 1 ? (
              isLoading[product._id] ? (
                <Loader />
              ) : (
                <Button variant="orange" className="" onClick={addCartItem}>
                  Add To Cart
                </Button>
              )
            ) : isLoading[product._id] ? (
              <Loader />
            ) : (
              <div className="gap-x-4 h-10  flex justify-between items-center  ">
                <Plus
                  className="rounded-lg h-full w-full bg-[#cda45e] transition-colors duration-300 ease-in hover:bg-[#3D2B1F]"
                  onClick={addCartItem}
                />
                <Minus
                  className="rounded-lg h-full w-full bg-[#cda45e] transition-colors duration-300 ease-in hover:bg-[#3D2B1F]"
                  onClick={() => decreaseCartQuantity(product._id)}
                />
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
