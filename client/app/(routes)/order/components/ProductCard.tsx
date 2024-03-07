import { Button } from "@/components/ui/button";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { ProductType } from "@/lib/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
interface ProductCardProps {
  product: ProductType;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity } =
    useShoppingCart();

  const quantity = getItemQuantity(product._id);

  // console.log();

  const addCartItem = (e: React.MouseEvent) => {
    e.preventDefault();
    increaseCartQuantity(product._id);
  };

  return (
    <div className="text-white w-full border-4 border-[#1a1814] overflow-hidden relative h-[282px] flex items-center justify-center group">
      <Image
        src={product.image}
        alt="product image"
        fill
        sizes="100vh, 100vw"
        className="absolute top-0 object-cover transition duration-1000 ease-in hover:scale-110 w-full h-full"
        placeholder="blur"
        blurDataURL={product.image}
      />
      <div className="absolute top-0 h-1/5 w-full  bg-[#3D2B1F]/90  font-bold text-xl p-2">
        <h1>{product.name}</h1>
      </div>

      <div className="flex justify-center items-center z-20 opacity-0 transition-opacity duration-300 ease-in group-hover:opacity-100">
        {quantity < 1 ? (
          <Button variant="orange" className="" onClick={addCartItem}>
            Add To Cart
          </Button>
        ) : (
          <div className="w-full h-10  flex justify-between items-center gap-x-8">
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;
