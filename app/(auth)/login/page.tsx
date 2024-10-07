"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import Cookies from 'js-cookie';
import { setAuthToken } from "@/utils/auth";

// Define the type for form inputs
interface IFormInput {
  User_Email: string;
  User_Password: string;
}

interface DecodedToken {
    First_Name: string;
    Last_Name: string;
    Email: string;
    iat: number;
    exp: number;
  }
const Page = () => {
  const router = useRouter();
  const { toast } = useToast();

  // Initialize react-hook-form with type safety for inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  // Handle form submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/check-user-credentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          User_Email: data.User_Email.trim(),
          User_Password: data.User_Password,
        }),
      });
      const resData = await response.json();
      
      if (response.ok && resData.Status === "T") {
        setAuthToken(resData.Token);
        router.push("/");
        toast({
          title: "Logged in ✅",
          description: resData.Message || "Logged in successfully",
        });
        reset();
      } else {
        toast({
          variant: "destructive",
          title: "Error ❌",
          description: resData.Message || "Login failed",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error ❌",
        description: "An unexpected error occurred.",
      });
    }
}

  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-green-500 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt=""
            src="/images/loginLogo.png"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            fill
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-xl font-bold text-black sm:text-2xl md:text-3xl">
              Share video for solutions
            </h2>
            <p className="mt-4 leading-relaxed text-black">Login page</p>
          </div>
        </section>

        <main className="flex items-center justify-center flex-col px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl w-full">
            <div className="relative -mt-16 block lg:hidden text-center">
              <UserCircle className="mx-auto h-12 w-12 text-blue-400" />
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Warehouse Management System (WMS)
              </h1>
            </div>

            <Card className="w-full max-w-md mx-auto mt-5">
              <CardHeader className="text-center">
                <UserCircle className="mx-auto h-12 w-12 text-blue-400 hidden sm:block" />
                <CardTitle className="mt-4 text-2xl font-bold">Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label
                      htmlFor="userEmail"
                      className="block text-sm font-medium text-muted-foreground"
                    >
                      User Email
                    </label>
                    <Input
                      type="email"
                      id="userEmail"
                      placeholder="Enter your email"
                      className="mt-1 w-full"
                      {...register("User_Email", { required: "Email is required" })}
                    />
                    {errors.User_Email && (
                      <p className="text-sm text-red-500">{errors.User_Email.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-muted-foreground"
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="mt-1 w-full"
                      {...register("User_Password", { required: "Password is required" })}
                    />
                    {errors.User_Password && (
                      <p className="text-sm text-red-500">{errors.User_Password.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Log in
                  </Button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary underline">
                    Register
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>

          <Link target="blank" href={"https://bartechdata.net/"}>
            <div className="mt-4 flex flex-col space-y-3">
              <p className="text-gray-500">Built and maintained by</p>
              <Image
                src="/images/bartech.png"
                alt="bartech-logo"
                width={100}
                height={25}
                className="mx-auto inline-block"
              />
            </div>
          </Link>
        </main>
      </div>
    </section>
  );
};

export default Page;
