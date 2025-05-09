"use client";

import getCurrentUser from "@/actions/get-current-user";
// import getCurrentUser from "@/actions/get-current-user";
import mergeLocalCartToUser from "@/actions/merge-local-cart-to-user";
import LoginHydration from "@/components/ui/LoginHydration";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const { cartItems, setCartItems, currentUser, setCurrentUser } =
    useShoppingCart();
    
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "accessToken",
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = async ({
    username,
    password,
  }: TAuthCredentialsValidator) => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );



      
      const { accessToken, _id } = response.data;
      
      await mergeLocalCartToUser({userId: _id, cartItems})
      console.log(_id)
      console.log(cartItems)
      setAccessToken(accessToken);
      setCartItems([]);
      location.reload();
    } catch (error) {
      toast.error("Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const mergeCart = async () => {
  //     await mergeLocalCartToUser({cartItem: cartItems, userId: currentUser?._id as string})
  //     console.log(cartItems);
  //   };

  //   if (currentUser) mergeCart();
  // }, [currentUser]);

  //   getUserData();
  // }, []);

  //  useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       setIsLoading(true);
  //       const loggedInUser = await getCurrentUser();
  //       setUser(loggedInUser);
  //     } catch (error) {
  //       console.log("Error fetching current user:", error);
  //       // Optionally handle error state or redirect to login page
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUser();
  // }, [currentUser]);
  // useEffect(() => {
  //   if (user) {
  //     mergeCart();
  //   }
  // }, [user]);

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      setIsLoading(false);
    }
  }, [currentUser, router]);

  return (
    <div className="h-dvh container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      {!currentUser && (
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            {/* <Icons.logo className="h-20 w-20" /> */}
            <h1 className="text-2xl font-bold text-slate-300">
              Sign in to your account
            </h1>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "link",
              })}
            >
              {/* <span className="text-slate-300"> */}
              Don&apos;t have an account?
              {/* </span> */}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": errors.username,
                    })}
                    placeholder="Username"
                    {...register("username")}
                  />
                  {errors?.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>Sign in</Button>
              </div>
            </form>
            {/* {isAdmin ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                // disabled={isLoading}
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                // disabled={isLoading}
              >
                Continue as admin
              </Button>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
