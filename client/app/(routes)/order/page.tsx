"use client";

import Hydration from "@/components/ui/Hydration";
import Menu from "./sections/Menu";
import MostOrdered from "./sections/MostOrdered";
import Special from "./sections/Special";

const OrderPage = () => {
  return (
    <div className="min-h-dvh flex justify-center items-center max-w-7xl mx-auto ">
      <Hydration>
        <div className="relative flex flex-col mt-32 w-full h-full justify-center items-start pt-12 max-w-7xl mx-auto px-4 ">
          <Menu />
          <MostOrdered />
          <Special />
        </div>
      </Hydration>
    </div>
  );
};

export default OrderPage;
