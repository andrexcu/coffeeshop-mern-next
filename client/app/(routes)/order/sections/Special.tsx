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
    <div className="w-full py-20 overflow-hidden">
      <div className="container">
        <SectionTitle title="Specials" subtitle="Check Our Specials" />
        <div className="flex">
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <ul className="flex flex-col">
                {products?.map((product) => (
                  <li
                    className="px-[12px] py-[15px] transition duration-300 text-[#fff] border-r-2 
                    border-[#cda45e] font-semibold text-base cursor-pointer group "
                    key={product._id}
                    onClick={() => setActiveFilter(product._id)}
                  >
                    <a className={``}></a>
                    <p className="group-hover:text-[#cda45e]">{product.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-9 mt-4 lg:mt-0 ">
              {products?.map((product) => (
                <div
                  key={product._id}
                  className={`h-full px-4 ${
                    activeFilter === product._id ? "flex" : "hidden"
                  }`}
                >
                  <SpecialProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Special;
