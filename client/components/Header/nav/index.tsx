// import React, { useState } from "react";
// import styles from "./style.module.scss";
// import { motion } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { menuSlide } from "../animation";
// import Link from "./Link";
// import Curve from "./Curve";
// import Footer from "./Footer";

// const navItems = [
//   {
//     title: "Home",
//     href: "/",
//   },
//   {
//     title: "Work",
//     href: "/work",
//   },
//   {
//     title: "About",
//     href: "/about",
//   },
//   {
//     title: "Contact",
//     href: "/contact",
//   },
// ];

// export default function index() {
//   const pathname = usePathname();
//   const [selectedIndicator, setSelectedIndicator] = useState(pathname);

//   return (
//     <motion.div
//       variants={menuSlide}
//       initial="initial"
//       animate="enter"
//       exit="exit"
//       className={`${styles.menu} w-[100%] sm:max-w-[600px]`}
//     >
//       <div
//         className={`${styles.body} py-[100px] transition duration-300 ease-in px-[20px] sm:px-[100px]`}
//       >
//         <div
//           onMouseLeave={() => {
//             setSelectedIndicator(pathname);
//           }}
//           className={styles.nav}
//         >
//           <div className={styles.header}>
//             <p>Navigation</p>
//           </div>
//           <div>
//             {navItems.map((data, index) => {
//               return (
//                 <Link
//                   key={index}
//                   data={{ ...data, index }}
//                   isActive={selectedIndicator == data.href}
//                   setSelectedIndicator={setSelectedIndicator}
//                 ></Link>
//               );
//             })}
//           </div>
//         </div>
//         <Footer />
//       </div>
//       <Curve />
//     </motion.div>
//   );
// }
