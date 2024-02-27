import { ProductType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./menuItem.css";

interface MenuItemProps {
  product: ProductType;
}

const MenuItem = ({ product }: MenuItemProps) => {
  return (
    <div className="grid-cols-12 menu ">
      <div className="col-span-6 menu-item">
        <img src={product.image} className="menu-img" alt="" />
        <div className="menu-content">
          <a>{product.name}</a>
          <span>${product.price}</span>
        </div>
        <div className="menu-description">{product.description}</div>
      </div>
    </div>
  );
};

export default MenuItem;
