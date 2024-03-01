import { ProductType } from "@/lib/types";
import React from "react";
import "./SpecialProduct.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SpecialProductType {
  product: ProductType;
  isActive: boolean;
}

const SpecialProduct = ({ product, isActive }: SpecialProductType) => {
  if (!isActive) return null;
  return (
    <div className="overflow-hiddden flex flex-col-reverse items-center lg:items-start lg:flex-row w-full gap-y-8">
      <div className="w-full lg:w-8/12 object-contain flex flex-col gap-y-4">
        <h3 className="text-2xl text-[#aaaaaa]">{product.name}</h3>
        <p className="italic text-[#aaaaaa]">{product.description}</p>
        <p className="text-[#aaaaaa] mb-0">{product.details}</p>
        <Button variant="orange" className="w-full lg:w-1/5">
          Add To Cart
        </Button>
      </div>
      <div className="overflow-hidden flex w-full lg:w-4/12 justify-center">
        <Image
          src={product.image}
          width={282}
          height={282}
          alt="product image"
          placeholder="blur"
          blurDataURL={product.image}
          className="rounded-full object-contain w-auto h-auto "
        />
      </div>
    </div>
  );
};

export default SpecialProduct;
