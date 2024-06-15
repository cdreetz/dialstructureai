// app/signup/page.tsx
"use client";
import Image from "next/image"
import Link from "next/link"
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../loginaction";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    login(formData).then(() => {
      router.push('/dashboard');
      console.log('Login successful');
    }).catch((error) => {
      console.error('Login failed', error);
    });
  };

  return (
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-full max-w-[540px] gap-14 border-gray-300 shadow-2xl rounded-lg p-20 sm:p-16 items-center">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold" suppressHydrationWarning={true}>
              Login to your Analytics-Center account
            </h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password to login 
            </p>
          </div>
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", { required: true })}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                  />
                  {errors.email && <span>This field is required</span>}
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/resetpassword"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    {...register("password", { required: true })}
                    id="password"
                    type="password"
                  />
                  {errors.password && <span>This field is required</span>}
                </div>
                <Button type="submit" name="login" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            No account?{" "}
            <Link href="/auth/signup" className="underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
  )
}
  