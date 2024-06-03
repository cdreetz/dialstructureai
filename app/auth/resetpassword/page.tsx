"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createClient } from "@/utils/supabase/client"; // Assuming the path to your Supabase client utility
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ResetPasswordPage() {
  const router = useRouter();
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;
  const supabase = createClient();
  const [resetStatus, setResetStatus] = React.useState('');

  const onSubmit = async (data: any) => {
    const email = data.email;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://annotate.vercel.app/updatepassword',
    });
    if (error) {
      console.error('Password reset failed', error.message);
      setResetStatus('failed');
    } else {
      setResetStatus('success');
      console.log('Password reset successful');
    }
  };

  return (
    <div className="w-full lg:w-auto mx-4 lg:mx-16 2xl:mx-12 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid w-full max-w-[540px] gap-14 border border-gray-500 shadow-2xl rounded-lg p-20 sm:p-16 items-center bg-black text-white">
          <div className="grid gap-4 text-center">
            <h1 className="text-3xl font-bold">Reset Your Password</h1>
            <p className="text-balance">
              Enter your email to reset your password
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                {...register("email", { required: true })}
                type="email"
                placeholder="m@example.com"
                className="bg-gray-700 text-white"
              />
              {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white">
              Send reset link
            </Button>
            {resetStatus === 'success' && (
              <p className="text-green-500 mt-4">Check your email for the reset link.</p>
            )}
            {resetStatus === 'failed' && (
              <p className="text-red-500 mt-4">Failed to send reset link. Please try again.</p>
            )}
          </div>
          <div className="mt-6 text-center text-sm">
            Remembered your password?{" "}
            <Link href="/auth/login" className="underline text-blue-500">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}