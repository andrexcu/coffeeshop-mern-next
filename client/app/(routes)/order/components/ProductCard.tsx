import { ProductType } from "@/lib/types";
import Image from "next/image";
import React from "react";
interface ProductCardProps {
  product: ProductType;
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="text-white w-full border-4 border-[#1a1814] overflow-hidden">
      <Image
        src={product.image}
        alt="product image"
        width={282}
        height={282}
        className="object-contain transition duration-1000 ease-in hover:scale-110 w-full h-full"
        placeholder="blur"
        blurDataURL={product.image}
      />
    </div>
  );
};

export default ProductCard;
