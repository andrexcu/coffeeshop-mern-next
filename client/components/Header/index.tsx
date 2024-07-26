"use client";
import { lobsterTwo } from "@/app/fonts";
import Magnetic from "@/components/Common/Magnetic";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { ChevronUp, Menu, ShoppingCart } from "lucide-react";
import Rounded from "@/components/Common/RoundedButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { UserType } from "@/lib/types";
// import getCurrentUser from "@/actions/get-current-user";
import axios from "axios";
import Hydration from "../ui/Hydration";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import getCartQuantity from "@/actions/get-cart-quantity";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import getCurrentUser from "@/actions/get-current-user";
import { toast } from "sonner";

const components: { title: string; href: string }[] = [
  {
    title: "Login",
    href: "/login",
  },
  {
    title: "Order",
    href: "/order",
  },
  {
    title: "Cart",
    href: "/cart",
  },
];

export default function Index() {
  const { cartQuantity, currentUser, setCurrentUser, itemQuantity } = useShoppingCart();
  const [showBackground, setShowBackground] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const pathname = usePathname();
  // const [authStatus, setAuthStatus] = useState(null);
  // const button = useRef({});
  const button = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // const { currentUser } = useShoppingCart();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await getCurrentUser();
        setCurrentUser(data);

      } catch (error) {}
    };

    checkAuthStatus();
  }, [setCurrentUser]);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
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
          });
        },
      },
    });
  }, [button]);

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
  }, [showBackground]);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const userData = await getCurrentUser();
  //     setCurrentUser(userData);
  //   };

  //   getUserData();
  // }, []);

  const logoutUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.removeItem('accessToken');
      location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Hydration>
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
              <div className={`${styles.logo} flex select-none outline-none`}>
                <div
                  className={`${styles.name} text-3xl ${lobsterTwo.className}`}
                >
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
                  {currentUser ? (
                    <div onClick={logoutUser}>logout</div>
                  ) : (
                    <Link href={`/login`}>Login</Link>
                  )}

                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
              <Magnetic>
                <div className={`${styles.el} hover:text-orange-300`}>
                  <Link href={`/order`}>Order</Link>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/cart"
                  className={`${styles.el} p-4 flex rounded-full bg-zinc-950 hover:bg-stone-900`}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>{currentUser ? itemQuantity : cartQuantity}</span>
                </Link>
              </Magnetic>
            </div>

            <div className="flex sm:hidden">
              <div className={`${styles.nav}`}>
                <div className={`${styles.el}`}>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent">
                          Menu
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="flex flex-col w-[85px]">
                            {components.map((component) => (
                              <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                              ></ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={button}
          className={`${styles.headerButtonContainer} scale-0 z-[90]`}
        >
          <Rounded onClick={scrollToTop} className={`${styles.button}`}>
            <ChevronUp className="h-10 w-10 text-orange-300 z-10" />
          </Rounded>
        </div>
      </div>
    </Hydration>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
