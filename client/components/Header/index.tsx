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

export default function index() {
  const header = useRef(null);
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
        end: () => "+=" + window.innerHeight * 0.3,
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

    // gsap.to(navOptions.current, {
    //   scrollTrigger: {
    //     trigger: document.documentElement,
    //     start: 0,
    //     end: () => "+=" + window.innerHeight * 0.3,
    //     onEnter: () => {
    //       // Check if isActive is true before applying the scale animation

    //       gsap.to(navOptions.current, {
    //         opacity: 0,
    //         duration: 0.25,
    //         ease: "power1.out",
    //       });
    //     },
    //     onLeave: () => {
    //       gsap.to(navOptions.current, {
    //         opacity: 0,
    //         duration: 0.25,
    //         ease: "power1.out",
    //       });
    //     },
    //     onEnterBack: () => {
    //       gsap.to(navOptions.current, {
    //         opacity: 1,
    //         duration: 0.25,
    //         ease: "power1.out",
    //       });
    //     },
    //   },
    // });
  }, [isActive]);

  return (
    <>
      <div ref={header} className={`${styles.header}`}>
        <div className="flex gap-x-2"></div>
        <div className={`opacity-100 hidden sm:flex `}>
          <div className={`${styles.nav}`}>
            <Magnetic>
              <div className={`${styles.el}`}>
                <a className="">Work</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <a>About</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <a>Contact</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          </div>
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
      <div
        ref={button}
        className={`${styles.headerButtonContainer} ${
          isActive ? "scale-1" : "scale-0"
        }`}
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
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
