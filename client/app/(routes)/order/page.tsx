"use client";
import getProducts from "@/actions/get-products";
import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { ProductType } from "@/lib/types";

const OrderPage = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="min-h-dvh flex justify-center items-center max-w-7xl mx-auto ">
      <div className="absolute top-32 w-full h-full flex justify-center items-start pt-12 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-8">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
