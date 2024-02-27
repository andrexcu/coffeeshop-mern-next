"use client";
import React, { useEffect, useState } from "react";
import { ProductType } from "@/lib/types";
import getPopularProducts from "@/actions/get-popular-products";
import ProductCard from "../components/ProductCard";
import SectionTitle from "@/components/Common/SectionTitle";

const MostOrdered = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getPopularProducts();
      setProducts(allProducts);
    };

    fetchAllProducts();
  }, []);
  return (
    <div className="w-full">
      <SectionTitle title="Popular" subtitle="Most ordered coffee" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-8">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {/* MENU SECTION */}
        {/* SPECIAL SECTION */}
      </div>
    </div>
  );
};

export default MostOrdered;
