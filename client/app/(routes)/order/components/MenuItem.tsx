"use client";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./menuItem.css";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Minus, Plus } from "lucide-react";
import getCartItemQuantity from "@/actions/get-item-quantity";
import Loader from "./Loader";

interface MenuItemProps {
  product: ProductType;
}

const MenuItem = ({ product }: MenuItemProps) => {
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

  // const fetchCurrentItemQuantity = async (id: string) => {
  //   const currentItemQuantity = await getCartItemQuantity(id);
  //   console.log(currentItemQuantity);
  // };

  useEffect(() => {
    fetchCurrentItemQuantity(product._id);
  }, [cartState]);

  // const userProductQuantity = getItemQuantityFromServer(product._id);

  // console.log(userProductQuantity);
  const addCartItem = (e: React.MouseEvent) => {
    e.preventDefault();
    increaseCartQuantity(product._id);
  };

  return (
    <div className="grid-cols-12 menu">
      <div className="relative col-span-6 menu-item group">
        {/* <img src={product.image} className="menu-img" alt="" /> */}
        <Image
          src={product.image}
          width={60}
          height={50}
          style={{ width: "68px", height: "65px" }}
          alt="product image"
          className="select-none rounded-full float-left border-5 border-solid border-white border-opacity-20"
        />
        <div className="menu-content">
          <a className="z-0">{product.name}</a>
          <span>${product.price}</span>
        </div>
        <div className="menu-description">{product.description}</div>

        <div className="z-20 absolute w-full h-full top-0 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300 ease-in">
          {!currentUser ? (
            quantity < 1 ? (
              <Button variant="orange" className="" onClick={addCartItem}>
                Add To Cart
              </Button>
            ) : (
              <div className="w-1/3 h-10  flex justify-between items-center ">
                <Plus
                  className="rounded-lg h-full w-full bg-[#cda45e] transition-colors duration-300 ease-in hover:bg-[#3D2B1F]"
                  onClick={addCartItem}
                />
                <div className="w-full"></div>
                <Minus
                  className="rounded-lg h-full w-full bg-[#cda45e] transition-colors duration-300 ease-in hover:bg-[#3D2B1F]"
                  onClick={() => decreaseCartQuantity(product._id)}
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
              <div className="w-1/3 h-10  flex justify-between items-center ">
                <Plus
                  className="rounded-lg h-full w-full bg-[#cda45e] transition-colors duration-300 ease-in hover:bg-[#3D2B1F]"
                  onClick={addCartItem}
                />
                <div className="w-full"></div>
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
      </div>
    </div>
  );
};

export default MenuItem;
