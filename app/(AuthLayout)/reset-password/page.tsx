"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type ResetPasswordFormData = {
  email: string;
};

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();
  const router = useRouter();

  const onSubmit = (data: ResetPasswordFormData) => {
    if(data){
      router.push("/verify-code");
    }
    console.log("Sending verification code to:", data.email);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <h1 className="text-[32px] md:text-[40px] font-bold text-[#37003C] leading-tight mb-4 tracking-tight">
        Reset your password
      </h1>
      <p className="text-[#37003C] mb-10 text-sm md:text-base opacity-80 leading-relaxed max-w-[380px]">
        Enter your email address and we&apos;ll send you a verification code to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
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
              className={`w-full px-4 py-3 mt-2 rounded-[8px] border-2 ${errors.email ? 'border-red-500' : 'border-[#37003C]'} text-[#37003C] placeholder:text-[#37003C]/50 focus:outline-none focus:ring-2 focus:ring-[#37003C]/10 focus:border-[#37003C] transition-all`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          type="submit"
          className="w-full py-7 bg-[#37003C] hover:bg-[#2d0031] text-white rounded-[8px] cursor-pointer font-semibold text-base transition-all transform hover:scale-[1.01] active:scale-[0.99] border-none shadow-xl shadow-purple-900/10"
        >
          Send verification code
        </Button>

        {/* Back Link */}
        <div className="flex justify-center mt-4">
          <Link 
            href="/login" 
            className="flex items-center gap-2 text-[#37003C] text-sm font-bold hover:underline decoration-2 underline-offset-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Sign in
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default ResetPasswordPage;
