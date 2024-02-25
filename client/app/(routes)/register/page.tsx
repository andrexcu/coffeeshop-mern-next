"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
  TcreateUserSchema,
  createUserSchema,
} from "@/lib/validators/account-credentials-validator";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import getCurrentUser from "@/actions/get-current-user";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TcreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const router = useRouter();

  const onSubmit = async ({ username, email, password }: TcreateUserSchema) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      location.reload();
      router.push("/login");
      toast.success("account successfully created");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (user) router.push("/");
    if (user) setIsLoading(false);
  }, [user]);

  return (
    <>
      <div className="h-dvh container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        {!isLoading && !user && (
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
              <h1 className="text-2xl font-bold text-slate-300">
                Create an account
              </h1>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "link",
                })}
              >
                Already have an account? Sign in
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className={cn({
                        "focus-visible:ring-red-500": errors.email,
                      })}
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                    {errors?.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
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
                  <Button>Sign up</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
