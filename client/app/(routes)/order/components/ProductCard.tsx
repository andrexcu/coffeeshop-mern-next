import { ProductType } from "@/lib/types";
import Image from "next/image";
import React from "react";
interface ProductCardProps {
  product: ProductType;
}
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="text-white h-[350px] w-full border-4 border-orange-300 relative overflow-hidden">
      <Image
        fill
        src={product.image}
        alt=""
        sizes="100vw, 100vh"
        className="object-cover transition duration-1000 ease-in hover:scale-110 rounded-md w-full h-full"
        placeholder="blur"
        blurDataURL={product.image}
      />
    </div>
  );
};

export default ProductCard;
