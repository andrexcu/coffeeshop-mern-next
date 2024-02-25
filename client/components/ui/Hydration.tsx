"use client";

import getCurrentUser from "@/actions/get-current-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Hydration = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  // const [user, setUser] = useState();

  useEffect(() => {
    // const checkUser = async () => {
    //   try {
    //     setIsLoading(true);
    //     const currentUser = await getCurrentUser();
    //     setUser(currentUser);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // checkUser();
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  // <div className="h-dvh w-full bg-zinc-950"></div>
  // return <div className="h-dvh text-white">PAGE IS LOADING</div>;
  // if (isMounted) {

  return <>{children}</>;

  // }
};

export default Hydration;
