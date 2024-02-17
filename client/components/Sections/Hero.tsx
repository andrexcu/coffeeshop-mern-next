"use client";
import React, { useEffect } from "react";
import { lobsterTwo } from "@/app/fonts";
import { urbanist } from "@/app/fonts";
import GLightbox from "glightbox";
import Link from "next/link";

const Hero = () => {
  // useEffect(() => {
  //   new GLightbox({
  //     selector: ".glightbox",
  //   });
  // }, []);

  return (
    <div className="min-h-dvh relative flex bg-black">
      <div
        className="flex flex-col items-center justify-center w-full min-h-screen z-0 bg-cover bg-fixed"
        style={{
          backgroundImage: 'url("/images/cover-right3.jpg")',
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        <div className="z-20 lg:absolute right-12 ml-0 lg:ml-52 pr-4 flex flex-col lg:flex-row items-center justify-start my-10 mt-40 min-h-[500px] hero-framed lg:p-72 w-[60%] pt-8">
          {/* <div className="border mt-14 w-[400px] h-[200px]">asdas</div> */}
          <div className="lg:absolute lg:right-[400px] lg:mt-36 ml-0 lg:ml-16 flex gap-8 flex-col justify-center items-center w-[500px] h-[300px] p-4 ">
            <div
              className={`flex flex-col justify-center h-[175px] w-[325px] bg-zinc-950/90 text-center p-2 ${urbanist.className}`}
            >
              <p className="text-slate-200 text-2xl">Open Every Day</p>
              <p className="text-orange-300 text-2xl font-thin">
                Monday - Saturday
              </p>
              <p className="text-orange-300 text-2xl font-thin">
                06:00 - 24:00
              </p>
              <p className="text-orange-300 text-2xl font-thin">
                Sunday: 07:00 - 24:00
              </p>
            </div>
            <div className="flex gap-x-8">
              {/* bg-[#3D2B1F]/90 */}
              <div className="border-2 border-orange-300 bg-zinc-950/50 text-slate-200 p-4 cursor-pointer min-w-[150px] text-center transition duration-300 ease-in hover:bg-[#3D2B1F]">
                BOOK A TABLE
              </div>
              <div className="border-2 border-orange-300 bg-zinc-950/50 text-slate-200 p-4 cursor-pointer min-w-[150px] text-center transition duration-300 ease-in hover:bg-[#3D2B1F]">
                CONTACT US
              </div>
            </div>
          </div>
          <div className="lg:absolute right-4">
            <div
              className={`lg:mt-40 flex flex-col items-start max-w-[400px] h-[175px] border-l-4 border-[#1B1B1B] text-slate-200 ${lobsterTwo.className} p-4 `}
            >
              <p className="text-7xl">Premium.</p>
              <p className="flex gap-x-4 text-7xl">
                <span className="text-orange-300">Coffee</span>
                <span className="">Shop</span>
              </p>
              {/* <p className="text-7xl flex sm:hidden">Shop</p> */}
            </div>
            <div className="pl-8 text-slate-100 text-3xl flex flex-col gap-y-2 justify-center items-start gap-x-1 w-[375px] h-[100px] my-0 text-wrap">
              <p>
                Premium <span className="bg-[#1B1B1B]">Coffee,</span>
              </p>
              <p className="border-b-4 lg:border-b-0 border-orange-300">
                <span className="bg-[#1B1B1B]">Exceptional</span> Moments
              </p>
            </div>
          </div>
        </div>
        <Link
          href="https://www.youtube.com/watch?v=nyDnQQSUfL0"
          className="pr-8 pb-8 lg:pr-0 pl-4 flex sticky lg:justify-end items-start lg:items-end lg:right-[1000px] 2xl:right-[1325px] lg:mt-48 2xl:mt-96"
        >
          <div className="play-btn outline-none"></div>
        </Link>
      </div>
      {/* <div className="absolute sm:left-2.5 w-full bg-transparent min-h-[935px] page-framed z-1"></div> */}
    </div>
  );
};

export default Hero;
