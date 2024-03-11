import React from "react";
import CartItem from "./components/CartItem";

const page = () => {
  return (
    <div className="min-h-dvh flex max-w-7xl mx-auto">
      <div className="flex flex-col mt-32 w-full max-w-7xl mx-auto px-4 py-4 border border-red-500">
        <div className="flex flex-col w-full p-4 border border-red-500 text-white">
          <CartItem />
        </div>
      </div>
    </div>
  );
};

export default page;
