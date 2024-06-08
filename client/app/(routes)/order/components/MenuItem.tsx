"use client";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./MenuItem.css";
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
              <div className="w-1/3 h-10  flex justify-between items-center ">
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
                  <span>{userProductQuantity[product._id]}</span>
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
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
