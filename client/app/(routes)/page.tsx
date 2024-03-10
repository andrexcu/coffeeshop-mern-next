"use client";

import Preloader from "@/components/Preloader";
import About from "@/components/Sections/About";
import Contact from "@/components/Sections/Contact";
import Footer from "@/components/Sections/Footer";
import Hero from "@/components/Sections/Hero";
import Info from "@/components/Sections/Info";
import WhyUs from "@/components/Sections/WhyUs";
import Hydration from "@/components/ui/Hydration";
import { ShoppingCartProvider } from "@/context/ShoppingCartContext";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contactSection");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // useEffect(() => {
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     const locomotiveScroll = new LocomotiveScroll();

  //     setTimeout(() => {
  //       setIsLoading(false);
  //       document.body.style.cursor = "default";
  //       window.scrollTo(0, 0);
  //     }, 2000);
  //   })();
  // }, []);

  return (
    // <ShoppingCartProvider>
    <Hydration>
      <div className="main">
        {/* <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence> */}
        <Hero scrollToContact={scrollToContact} />
        <section
          className="relative sm:px-16 px-8 sm:py-16 py-12 bg-cover"
          style={{
            backgroundImage: 'url("/images/about-us-bg.jpg")',
            backgroundPosition: "center",
          }}
        >
          <About />
        </section>

        <section className=" bg-stone-950 sm:px-16 px-8 sm:py-16 py-12 bg-cover">
          <WhyUs />
        </section>

        <section
          className="relative sm:px-16 px-8 sm:py-24 py-12 bg-cover"
          style={{
            backgroundImage: 'url("/images/info-bg.jpg")',
            backgroundPosition: "center",
          }}
        >
          <Info />
        </section>
        <section
          id="contactSection"
          className="bg-stone-950 relative sm:px-16 px-8 pt-12 pb-8 flex justify-center items-center"
        >
          <Contact />
        </section>
      </div>
    </Hydration>
    // </ShoppingCartProvider>
  );
}
