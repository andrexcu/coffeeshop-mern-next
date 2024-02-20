"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "@/components/Common/RoundedButton";
import Magnetic from "@/components/Common/Magnetic";
import Container from "../ui/Container";
import { lobsterTwo } from "@/app/fonts";

export default function index() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);
  const navOptions = useRef(null);
  // const [isMobile, setIsMobile] = useState<number | null>(null);
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
        // () => "+=" + window.innerHeight
        // onEnter: () => {
        //   // Check if isActive is true before applying the scale animation
        //   if (isActive) {
        //     gsap.to(button.current, {
        //       scale: 1,
        //       duration: 0.25,
        //       ease: "power1.out",
        //     });
        //   }
        // },
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

  return (
    <div className={`relative flex justify-center `}>
      <div
        className={`flex items-center justify-center w-full absolute top-0 h-32 z-10 bg-zinc-950/80 backdrop-blur-md`}
      >
        <div
          className={`${styles.header} w-full max-w-7xl flex items-center justify-between p-4 text-slate-300 cursor-pointer`}
        >
          {/* <div className="flex gap-x-2 text-2xl">COFFEE SHOP</div> */}
          <div className="border-2 border-slate-200 py-8 max-w-[152px] px-2 bg-zinc-950">
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
          </div>
          <div
            className={`opacity-100 hidden sm:flex gap-x-6 text-lg cursor-pointer uppercase`}
          >
            <Magnetic>
              <div className={styles.el}>
                <a>Login</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <a>Order</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <a className="">Cart</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          </div>

          <div className="flex sm:hidden">
            <div className={`${styles.nav}`}>
              <Magnetic>
                <div
                  className={`${styles.el}`}
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                >
                  <a>Menu</a>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        ref={button}
        className={`${styles.headerButtonContainer} scale-0 z-[90]`}
      >
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence> */}
    </div>
  );
}
