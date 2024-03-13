"use client";

import { useShoppingCart } from "@/context/ShoppingCartContext";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import React, { useEffect } from "react";
import Loader from "../../order/components/Loader";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

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
  const { cartItems } = useShoppingCart();
  const currentQuantity = cartItems.find(
    (item) => item.id === product._id
  )?.quantity;
  return (
    <tr key={product._id} className="bg-[#1a1814]">
      <td className="">
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
      </td>
      <td className="">
        <div className="text-slate-300">
          {!currentUser ? currentQuantity : quantity}x
        </div>
      </td>
      <td>${product.price}</td>
      <td className="">
        <div className="flex gap-x-4">
          {!currentUser ? (
            quantity < 1 ? (
              <Button variant="orange" className="" onClick={addCartItem}>
                Add To Cart
              </Button>
            ) : (
              <div className="h-10 gap-x-4 flex justify-between items-center ">
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
              <div className="gap-x-4 h-10  flex justify-between items-center ">
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
      </td>
    </tr>
  );
};

export default CartItem;
