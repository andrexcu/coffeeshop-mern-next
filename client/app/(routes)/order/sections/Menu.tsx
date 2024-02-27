"use client";
import React, { useEffect, useState } from "react";
import { ProductType, ProductTypeEnum } from "@/lib/types";
import ProductCard from "../components/ProductCard";
import SectionTitle from "@/components/Common/SectionTitle";
import getProductsMenu from "@/actions/get-products-menu";
import MenuItem from "../components/MenuItem";
import Magnetic from "@/components/Common/Magnetic";
import "./Menu.css";

const Menu = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [filter, setFilter] = useState<String>("all");

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getProductsMenu();
      setProducts(allProducts);
    };

    fetchAllProducts();
  }, []);

  const MenuCategories = [
    { title: "All", type: "all" },
    { title: "Classic Brews", type: "classic" },
    { title: "Choco Delights", type: "choco" },
    { title: "Mocha Indulgence", type: "mocha" },
  ];

  const active = products?.filter((product) => product.type === filter);

  return (
    <div className="w-full py-8">
      <SectionTitle title="Our Menu" subtitle="Check Our Tasty Menu" />
      <div className="flex justify-center items-center gap-8 text-white w-full py-4 ">
        {MenuCategories.map((menu) => (
          <Magnetic key={menu.title}>
            <div className="el" onClick={() => setFilter(menu.type)}>
              <div
                className={`transition duration-300 ease-in hover:text-orange-300 ${
                  filter === menu.type ? "text-orange-300" : ""
                }`}
              >
                {menu.title}
              </div>
              <div className="indicator"></div>
            </div>
          </Magnetic>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-8">
        {products?.map((product) => (
          <div
            key={product._id}
            className={`${
              filter === "all" || filter === product.type ? "" : "hidden"
            }`}
          >
            <MenuItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
