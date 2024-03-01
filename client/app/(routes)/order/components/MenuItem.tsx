import { ProductType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./menuItem.css";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  product: ProductType;
}

const MenuItem = ({ product }: MenuItemProps) => {
  return (
    <div className="grid-cols-12 menu ">
      <div className="relative col-span-6 menu-item group">
        {/* <img src={product.image} className="menu-img" alt="" /> */}
        <Image
          src={product.image}
          width={60}
          height={50}
          style={{ width: "68px", height: "65px" }}
          alt="product image"
          className="rounded-full float-left border-5 border-solid border-white border-opacity-20"
        />
        <div className="menu-content">
          <a className="z-0">{product.name}</a>
          <span>${product.price}</span>
        </div>
        <div className="menu-description">{product.description}</div>

        <div className="z-20 absolute w-full h-full top-0 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300 ease-in">
          <Button variant="orange" className="">
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
