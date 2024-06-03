// app/signup/page.tsx
"use client";
import Link from "next/link"
import React from "react";
import { signup } from "../loginaction";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;


  const onSubmit = (data: any) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    signup(formData).then(() => {
        console.log("Signup successful");
        router.push("/dashboard");
      }).catch((error) => {
        console.error("Signup failed", error);
      });
  };

  return (
    <div className="w-full lg:w-auto mx-4 lg:mx-16 2xl:mx-12 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid w-full max-w-[540px] gap-14 border-gray-300 shadow-2xl rounded-lg p-20 sm:p-16 items-center">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold">Create your Analytics-Center account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create to your account
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              {errors.email && <span>This field is required.</span>}
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                {...register("password", { required: true })}
                id="password"
                type="password" 
              />
              {errors.email && <span>This field is required.</span>}
            </div>
            <Button
              type="submit"
              name="signup"
              className="w-full"
            >
              Create account
            </Button>
          </div>
          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className="hidden bg-white lg:block">
        <div className="flex h-full items-center justify-center">
          <div className="w-[600px] rounded-lg bg-white p-8 shadow-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Call Center Analytics</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-black">
                    - 
                  </div>
                  <div>
                    <h3 className="font-medium">Get started quickly</h3>
                    <p className="text-muted-foreground">
                      Post your first job and it is immediately ready for applicants.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-black">
                    - 
                  </div>
                  <div>
                    <h3 className="font-medium">Simple integrations</h3>
                    <p className="text-muted-foreground">
                      Manage and track applicants in your Hrai dashboard, or integrate our AI 
                      screening service while continueing with your ATS of choice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 text-black">
                    -
                  </div>
                  <div>
                    <h3 className="font-medium">Direct support</h3>
                    <p className="text-muted-foreground">
                      Our team is open to assisting with helping tailor our platform 
                      if you require custom solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  