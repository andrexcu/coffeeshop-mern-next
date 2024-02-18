import React from "react";
import { whyUs } from "../data/data";
import SectionTitle from "../Common/SectionTitle";
import { poppins } from "@/app/fonts";

const WhyUs = () => {
  return (
    <div className="relative w-full h-[600px] p-20">
      <div className="max-w-7xl mx-auto h-full">
        <SectionTitle title="why us" subtitle="Why Choose Our Shop" />
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-[300px] ${poppins.className}`}
        >
          {whyUs.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900 flex flex-col gap-y-8 justify-center p-6"
            >
              <h1 className="text-5xl text-orange-300">{`0${item.id}`}</h1>
              <p className="text-slate-200">{item.title}</p>
              <p className="text-slate-200">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
