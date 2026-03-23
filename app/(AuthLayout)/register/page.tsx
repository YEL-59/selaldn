"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type RegisterFormData = {
  email: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registering:", data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <h1 className="text-[32px] md:text-[40px] font-bold text-[#37003C] leading-tight mb-8 tracking-tight">
        Join in to my <br /> Premier League
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#37003C] ml-1">
            Email address
          </label>
          <div className="relative">
            <input
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              id="email"
              type="text"
              placeholder="Email address"
              className={`w-full px-4 py-3 mt-2 rounded-[8px] border-2 ${errors.email ? 'border-red-500' : 'border-[#37003C]'} text-[#37003C] placeholder:text-[#37003C] focus:outline-none focus:ring-2 focus:ring-[#37003C]/10 focus:border-[#37003C] transition-all`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Join button */}
        <Button 
          type="submit"
          className="w-full mt-4 py-7 bg-[#37003C] hover:bg-[#37003C] text-white rounded-[8px] cursor-pointer font-semibold text-base transition-all transform hover:scale-[1.01] active:scale-[0.99] border-none shadow-[0_20px_40px_-12px_rgba(55,0,60,0.4)]"
        >
          Join with email
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#37003C]"></span>
        </div>
        <div className="relative flex justify-center text-sm font-medium">
          <span className="bg-[#ededff] px-4 text-[#37003C]">Or</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Google Sign In Button */}
        <button className="w-full py-4 border-2 border-[#37003C] hover:bg-[#37003C]/10 cursor-pointer text-[#37003C] rounded-[8px] font-medium text-base transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Sign In Link */}
        <div className="text-center mt-12 flex flex-col gap-3">
          <p className="text-[#37003C] text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#37003C] font-bold hover:underline decoration-2 underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
