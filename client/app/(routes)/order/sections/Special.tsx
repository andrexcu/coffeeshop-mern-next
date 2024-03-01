"use client";
import React, { useEffect, useState } from "react";
import "./Special.css";
import getSpecialProducts from "@/actions/get-special-products";
import { ProductType } from "@/lib/types";
import SectionTitle from "@/components/Common/SectionTitle";
import SpecialProduct from "../components/SpecialProduct";

const Special = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<String | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getSpecialProducts();
      setProducts(allProducts);
      setActiveFilter(allProducts[0]._id);
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="w-full py-20 overflow-hidden ">
      <div className="container px-0">
        <SectionTitle title="Specials" subtitle="Check Our Specials" />
        <div className="flex">
          <div className="mt-16 flex flex-col space-y-12 lg:space-y-0 lg:flex-row sm:gap-4 gap-14">
            <div className="w-full lg:w-3/12">
              <ul className="h-full w-full flex flex-col ">
                {products?.map((product) => (
                  <li
                    className={`px-[12px] py-[15px] transition duration-300 text-[#fff] lg:border-r-2 
                    border-[#cda45e] font-semibold text-base cursor-pointer group hover:bg-[#cda45e]
                    ${
                      activeFilter === product._id
                        ? "bg-[#cda45e] border-l-0 lg:border-l-8 lg:border-r-0 border-r-8 border-[#3D2B1F]"
                        : ""
                    }`}
                    key={product._id}
                    onClick={() => setActiveFilter(product._id)}
                  >
                    <a className={``}></a>
                    <p className="group-hover:text-black">{product.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full lg:w-9/12">
              {products?.map((product) => (
                <SpecialProduct
                  key={product._id}
                  isActive={activeFilter === product._id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Special;
