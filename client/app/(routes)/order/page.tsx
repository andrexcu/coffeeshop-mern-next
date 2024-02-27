"use client";

import MostOrdered from "./sections/MostOrdered";

const OrderPage = () => {
  return (
    <div className="min-h-dvh flex justify-center items-center max-w-7xl mx-auto ">
      <div className="absolute top-32 w-full h-full flex justify-center items-start pt-12 max-w-7xl mx-auto px-4">
        <MostOrdered />
      </div>
    </div>
  );
};

export default OrderPage;
