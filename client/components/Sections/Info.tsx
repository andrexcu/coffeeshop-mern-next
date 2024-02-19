import { urbanist } from "@/app/fonts";
import { Check, Facebook, Instagram } from "lucide-react";

import React from "react";

const Info = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
      <div className="max-w-7xl mx-auto relative flex justify-center items-center my-12 ">
        <div
          className={`grid grid-cols-1 lg:grid-cols-4 w-full min-h-[300px] ${urbanist.className} font-thin bg-zinc-950/60`}
        >
          <div className="flex flex-col gap-y-2 justify-center items-center p-6">
            <h1 className="text-white text-3xl">Delivery</h1>
            <p className="text-2xl text-orange-300">09773443205</p>
            <p className="text-white text-2xl">Minimum Order ₱250</p>
          </div>
          <div className="flex flex-col gap-y-2 justify-center items-center p-6">
            <p className="text-slate-200 text-2xl">Open Every Day</p>
            <p className="text-orange-300 text-2xl">Monday - Saturday</p>
            <p className="text-orange-300 text-2xl">06:00 - 24:00</p>
            <p className="text-orange-300 text-2xl">Sunday: 07:00 - 24:00</p>
          </div>
          <div className="flex flex-col gap-y-2 justify-center items-center p-6 text-center">
            <p className="text-2xl text-white">Address</p>
            <p className="text-2xl text-orange-300">
              Tigatto, Buhangin, Davao City, Davao del sur
            </p>
            <p className="text-2xl text-white">info@prcoffee.com</p>
          </div>
          <div className="flex flex-col gap-y-2 justify-center items-center p-6 text-center">
            <p className="text-2xl text-white">Stay Connected</p>
            <div className="flex justify-center items-center gap-x-2">
              <div className="flex justify-center items-center gap-x-4 w-16 h-16 bg-orange-300">
                <Facebook className="text-white h-12 w-12 " />
              </div>
              <div className="flex justify-center items-center gap-x-4 w-16 h-16 bg-orange-300">
                <Instagram className="text-white h-12 w-12 " />
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default Info;
