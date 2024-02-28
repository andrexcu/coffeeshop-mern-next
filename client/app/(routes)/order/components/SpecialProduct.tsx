import { ProductType } from "@/lib/types";
import React from "react";
import "./SpecialProduct.css";
import Image from "next/image";

interface SpecialProductType {
  product: ProductType;
}

const SpecialProduct = ({ product }: SpecialProductType) => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="lg:col-span-8 details order-2 lg:order-1">
        <h3 className="text-2xl text-[#aaaaaa]">{product.name}</h3>
        <p className="italic text-[#aaaaaa]">{product.description}</p>
        <p className="text-[#aaaaaa] mb-0">{product.details}</p>
      </div>
      <div className="relative lg:col-span-4 text-center order-1 lg:order-2 overflow-hidden rounded-full">
        <Image
          src={product.image}
          sizes="100vw, 100vh"
          fill
          alt="product image"
          placeholder="blur"
          blurDataURL={product.image}
        />
      </div>
    </div>
  );
};

export default SpecialProduct;
