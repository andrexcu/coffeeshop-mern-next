"use client";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-dvh relative flex ">
      <div className="flex items-center justify-center absolute w-full h-full bg-[#805231]">
        <div
          className="relative w-[500px] h-[620px] bg-white z-10 cover-image-framed"
          style={{
            backgroundImage: 'url("/images/cover-middle3.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      <div className="w-1/2 h-full"></div>

      <div
        className="w-1/2 min-h-[935px] bg-white z-0 opacity-95"
        style={{
          backgroundImage: 'url("/images/cover-right3.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute left-2.5 w-full bg-transparent min-h-[935px] page-framed z-1"></div>
    </div>
  );
};

export default Hero;
