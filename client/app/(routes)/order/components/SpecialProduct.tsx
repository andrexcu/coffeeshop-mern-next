import { ProductType } from "@/lib/types";
import React, { useEffect } from "react";
import "./SpecialProduct.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { Minus, Plus } from "lucide-react";
import Loader from "./Loader";

interface SpecialProductType {
  product: ProductType;
  isActive: boolean;
}

const SpecialProduct = ({ product, isActive }: SpecialProductType) => {
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

  useEffect(() => {
    fetchCurrentItemQuantity(product._id);
  }, [cartState]);

  const addCartItem = (e: React.MouseEvent) => {
    e.preventDefault();
    increaseCartQuantity(product._id);
  };

  if (!isActive) return null;
  return (
    <div
      className={`overflow-hiddden flex flex-col-reverse items-center lg:items-start lg:flex-row w-full gap-y-8`}
    >
      <div className="w-full lg:w-8/12 object-contain flex flex-col gap-y-4">
        <h3 className="text-2xl text-[#aaaaaa]">{product.name}</h3>
        <p className="italic text-[#aaaaaa]">{product.description}</p>
        <p className="text-[#aaaaaa] mb-0">{product.details}</p>
        {!currentUser ? (
          quantity < 1 ? (
            <Button
              variant="orange"
              className="w-full lg:w-1/5"
              onClick={addCartItem}
            >
              Add To Cart
            </Button>
          ) : (
            <div className="w-full lg:w-1/5 gap-x-8 h-10  flex justify-between items-center ">
              <Plus
                className="rounded-lg h-full w-full bg-[#cda45e] transition-colors duration-300 ease-in hover:bg-[#3D2B1F]"
                onClick={addCartItem}
              />
              {/* <div className="w-full"></div> */}
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
              <div className="w-1/5">
                <Loader />
              </div>
            ) : (
              <Button
                variant="orange"
                className="w-full lg:w-1/5"
                onClick={addCartItem}
              >
                Add To Cart
              </Button>
            )
          ) : isLoading[product._id] ? (
            <div className="w-1/5">
              <Loader />
            </div>
          ) : (
            <div className="w-full lg:w-1/5 gap-x-8 h-10  flex justify-between items-center ">
              <Plus
                className="rounded-lg h-full w-full bg-[#cda45e] transition-colors duration-300 ease-in hover:bg-[#3D2B1F]"
                onClick={addCartItem}
              />
              {/* <div className="w-full"></div> */}
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
      <div className="p-2 overflow-hidden flex w-full lg:w-4/12 justify-center">
        <Image
          src={product.image}
          width={282}
          height={282}
          alt="product image"
          placeholder="blur"
          blurDataURL={product.image}
          className="rounded-full object-contain w-auto h-auto select-none "
        />
      </div>
    </div>
  );
};

export default SpecialProduct;
