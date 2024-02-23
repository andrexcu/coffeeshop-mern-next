"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";
import Image from "next/image";

// const words = [
//   { Brewing: "淹れています" },
//   { "the perfect": "最適な" },
//   { Experience: "体験を" },
//   { "With Our": "私たちの" },
//   { Coffee: "コーヒーで" },
// ];

const words = ["Brewing", "The Perfect", "Experience", "With Our", "Coffee"];
export default function Index() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 150
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          <motion.div
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex flex-col sm:flex-row"
          >
            <span className="flex items-center flex-col border border-slate-200 p-4 min-w-72">
              <span className="flex items-center justify-center">
                <p></p>
                {words[index]}

                {/* {Object.keys(words[index])[0]} */}
              </span>
              {/* {Object.values(words[index])[0]} */}
            </span>
            <span className="relative w-48 h-48">
              <Image
                src={"/images/hot-coffee.gif"}
                alt="hot-coffee-gif"
                fill
                sizes="100vh"
                className="grayscale"
                placeholder="blur"
                blurDataURL={"/images/hot-coffee.gif"}
              />
            </span>
          </motion.div>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}
