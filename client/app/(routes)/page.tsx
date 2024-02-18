"use client";

import Preloader from "@/components/Preloader";
import About from "@/components/Sections/About";
import Booking from "@/components/Sections/Booking";
import Hero from "@/components/Sections/Hero";
import WhyUs from "@/components/Sections/WhyUs";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);
  return (
    <>
      <div className="main">
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Hero />
        <About />
        <WhyUs />
        <Booking />
      </div>
    </>
  );
}
