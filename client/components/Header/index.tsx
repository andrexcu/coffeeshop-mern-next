"use client";
import { lobsterTwo } from "@/app/fonts";
import Magnetic from "@/components/Common/Magnetic";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { ChevronUp, Menu, ShoppingCart } from "lucide-react";
import Rounded from "@/components/Common/RoundedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function index() {
  const [showBackground, setShowBackground] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(button.current, {
      scale: isActive ? 1 : 0, // Initial scale based on isActive
      duration: 0.25,
      ease: "power1.out",
    });

    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onEnter: () => {
          // Check if isActive is true before applying the scale animation
          if (isActive) {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          }
        },
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
            onComplete: () => setIsActive(false),
          });
        },
      },
    });
  }, [isActive]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 10) {
        return setShowBackground(true);
      } else {
        return setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`relative flex justify-center`}>
      <div
        className={`p-8 flex items-center justify-center w-full top-0 bg-zinc-950/80 backdrop-blur-md fixed z-[300]
        ${
          !showBackground
            ? "h-32 transition-all ease-in duration-300 "
            : "transition-all duration-300 ease-in h-[80px] "
        }`}
      >
        <div
          className={`${styles.header} w-full max-w-7xl flex items-center justify-between p-4 text-slate-300`}
        >
          {/* <div className="flex gap-x-2 text-2xl">COFFEE SHOP</div> */}
          <Link
            href={`/`}
            scroll={false}
            className={`border-2 border-slate-200 py-6 w-[156px] px-2 bg-zinc-950 flex justify-center items-center
          ${
            !showBackground
              ? "h-24 transition-all ease-in duration-300 "
              : "transition-all duration-300 ease-in h-10 w-[50px] "
          }`}
            onClick={scrollToTop}
          >
            <div className={`${styles.logo} flex  `}>
              {/* <p className={styles.copyright}>©</p> */}
              <div
                className={`${styles.name} text-3xl ${lobsterTwo.className}`}
              >
                {/* <p className={`${styles.premium} text-3xl pr-2 pl-2`}>
                  Premium.
                </p> */}
                <p className={` text-orange-300 text-3xl`}>Coffee</p>
                <p className={` text-3xl`}>Shop</p>
              </div>
            </div>
          </Link>
          <div
            className={`bg-black px-4 rounded-full opacity-100 hidden sm:flex items-center justify-center gap-x-6 text-lg cursor-pointer uppercase`}
          >
            <Magnetic>
              <div className={`${styles.el} hover:text-orange-300`}>
                <Link href={`/login`}>Login</Link>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={`${styles.el} hover:text-orange-300`}>
                <a>Order</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div
                className={`${styles.el} p-4 flex rounded-full bg-zinc-950 hover:bg-stone-900`}
              >
                <ShoppingCart className="h-6 w-6" />
              </div>
            </Magnetic>
          </div>

          <div className="flex sm:hidden">
            <div className={`${styles.nav}`}>
              <Magnetic>
                <div
                  className={`${styles.el}`}
                  // onClick={() => {
                  //   setIsActive(!isActive);
                  // }}
                >
                  <Menu className="h-8 w-8" />
                  <div></div>
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={button}
        className={`${styles.headerButtonContainer} scale-0 z-[90]`}
      >
        <Rounded
          // onClick={() => {
          //   setIsActive(!isActive);
          // }}
          onClick={scrollToTop}
          className={`${styles.button}`}
        >
          {/* <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div> */}
          <ChevronUp className="h-10 w-10 text-orange-300 z-10" />
        </Rounded>
      </div>
      {/* <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence> */}
    </div>
  );
}
