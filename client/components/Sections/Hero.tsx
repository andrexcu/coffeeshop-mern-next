"use client";
import React, { useEffect } from "react";
import { lobsterTwo } from "@/app/fonts";
import { urbanist } from "@/app/fonts";
import GLightbox from "glightbox";
import Link from "next/link";

interface HeroProps {
  scrollToContact: () => void;
}

const Hero = ({ scrollToContact }: HeroProps) => {
  // useEffect(() => {
  //   new GLightbox({
  //     selector: ".glightbox",
  //   });
  // }, []);

  return (
    <div className="min-h-dvh bg-black">
      <div
        className="flex flex-col-reverse lg:flex-row items-center lg:items-end justify-center w-full min-h-screen z-0 bg-cover bg-fixed "
        style={{
          backgroundImage: 'url("/images/cover-right3.jpg")',
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="w-full flex items-center justify-center mb-[60px] lg:mb-[200px]">
          <Link href="https://www.youtube.com/watch?v=nyDnQQSUfL0" className="">
            <div className="play-btn outline-none"></div>
          </Link>
        </div>
        <div className="mt-32 gap-12 xl:min-w-[720px] z-20 p-4 flex flex-col lg:flex-row items-center justify-end hero-framed lg:mr-[60px] mb-[100px] pt-8">
          {/* <div className="border mt-14 w-[400px] h-[200px]">asdas</div> */}
          <div className="space-y-4  flex-col justify-center items-center ">
            <div
              className={`flex flex-col justify-center py-6 px-6 bg-zinc-950/90 text-center ${urbanist.className}`}
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* bg-[#3D2B1F]/90 */}
              <div className="border-2 border-orange-300 bg-zinc-950/50 text-slate-200 p-4 cursor-pointer  text-center transition duration-300 ease-in hover:bg-[#3D2B1F]">
                ORDER NOW
              </div>
              <div
                onClick={scrollToContact}
                className="border-2 border-orange-300 bg-zinc-950/50 text-slate-200 p-4 cursor-pointer text-center transition duration-300 ease-in hover:bg-[#3D2B1F]"
              >
                CONTACT US
              </div>
            </div>
          </div>
          <div className="right-4 ">
            <div
              className={`flex flex-col items-center sm:items-start sm:border-l-4 border-[#1B1B1B] text-slate-200 ${lobsterTwo.className} p-4 `}
            >
              <p className="text-5xl sm:text-7xl">Premium.</p>
              <p className="flex gap-x-4 text-5xl sm:text-7xl">
                <span className="text-orange-300">Coffee</span>
                <span className="">Shop</span>
              </p>
            </div>
            <div className="pl-8 text-slate-100 text-2xl sm:text-3xl flex flex-col gap-y-2 justify-center items-center sm:items-start gap-x-1 my-0 text-wrap">
              <p>
                Premium <span className="bg-[#1B1B1B]">Coffee,</span>
              </p>
              <p className="border-b-4 lg:border-b-0 border-orange-300">
                <span className="bg-[#1B1B1B]">Exceptional</span> Moments
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="absolute sm:left-2.5 w-full bg-transparent min-h-[935px] page-framed z-1"></div> */}
    </div>
  );
};

export default Hero;
