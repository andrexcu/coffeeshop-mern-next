import { Button } from "@/components/ui/button";
import { ProductType } from "@/lib/types";
import Image from "next/image";
import React from "react";
interface ProductCardProps {
  product: ProductType;
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="text-white w-full border-4 border-[#1a1814] overflow-hidden relative h-[282px] flex items-center justify-center group">
      <Image
        src={product.image}
        alt="product image"
        // width={282}
        // height={282}
        fill
        sizes="100vh, 100vw"
        className="absolute top-0 object-cover transition duration-1000 ease-in hover:scale-110 w-full h-full"
        placeholder="blur"
        blurDataURL={product.image}
      />
      <div className="absolute top-0 h-1/5 w-full  bg-[#3D2B1F]/90  font-bold text-xl p-2">
        <h1>{product.name}</h1>
      </div>

      <Button
        variant="orange"
        className="opacity-0 group-hover:opacity-100 transition duration-300 ease-in z-20"
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductCard;
