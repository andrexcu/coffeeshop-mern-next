"use client";
import React, { useState } from "react";
import { whyUs } from "../data/data";
import SectionTitle from "../Common/SectionTitle";
import { poppins } from "@/app/fonts";

const WhyUs = () => {
  const [selected, setSelected] = useState(whyUs[0].id);

  return (
    <div className="flex justify-center items-center relative w-full my-12">
      <div className="max-w-7xl mx-auto h-full">
        <SectionTitle title="why us" subtitle="Why Choose Our Shop" />
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-h-[300px] ${poppins.className}`}
        >
          {whyUs.map((item) => (
            <div
              key={item.id}
              className={`bg-neutral-900 flex-col gap-y-8 justify-center p-6 ${
                selected === item.id ? "flex" : "hidden lg:flex"
              }`}
            >
              <h1 className="text-5xl text-orange-300">{`0${item.id}`}</h1>
              <p className="text-slate-200">{item.title}</p>
              <p className="text-slate-200">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="absolute mt-8 lg:hidden flex justify-center items-center gap-x-2 w-full">
          {whyUs.map((item) => (
            <div
              key={item.id}
              className={`transition duration-300 ease-in rounded-full   ${
                selected === item.id
                  ? "bg-orange-300 h-4 w-4"
                  : "bg-slate-200 h-3 w-3"
              }`}
              onClick={() => setSelected(item.id)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
