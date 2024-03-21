import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { ProductType } from "@/lib/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
interface ProductCardProps {
  product: ProductType;
}
const ProductCard = ({ product }: ProductCardProps) => {
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
  // console.log();

  const addCartItem = (e: React.MouseEvent) => {
    e.preventDefault();
    increaseCartQuantity(product._id);
  };
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

  return (
    <div className="text-white w-full border-4 border-[#1a1814] overflow-hidden relative h-[282px] flex items-center justify-center group">
      <Image
        src={product.image}
        alt="product image"
        fill
        sizes="100vh, 100vw"
        className="absolute top-0 object-cover transition duration-1000 ease-in group-hover:scale-110 w-full h-full select-none"
        placeholder="blur"
        blurDataURL={product.image}
      />
      <div className="absolute top-0 h-1/5 w-full  bg-[#3D2B1F]/90  font-bold text-xl p-2">
        <h1>{product.name}</h1>
      </div>

      <div className="px-4 py-2 flex justify-center items-center z-20 opacity-0 transition-opacity duration-300 ease-in group-hover:opacity-100">
        {!currentUser ? (
          quantity < 1 ? (
            <Button variant="orange" className="" onClick={addCartItem}>
              Add To Cart
            </Button>
          ) : (
            <div className="w-[120px] h-10 flex justify-between items-center">
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
            <div className="w-[120px] h-10 flex justify-between items-center">
              <Plus
                className={`h-full w-full ${
                  addPressed ? "bg-[#3D2B1F]" : "bg-[#cda45e]"
                } transition-colors duration-300 ease-in`}
                onClick={() => increaseCartQuantity(product._id)}
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
  );
};

export default ProductCard;
