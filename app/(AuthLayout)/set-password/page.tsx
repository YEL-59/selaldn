"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type SetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const SetPasswordPage = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SetPasswordFormData>();

  const onSubmit = (data: SetPasswordFormData) => {
    if(data.newPassword === data.confirmPassword){
      router.push("/login");
      console.log("Setting new password:", data.newPassword);
    }
  };

  const newPasswordValue = watch("newPassword");

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <h1 className="text-[32px] md:text-[40px] font-bold text-[#37003C] leading-tight mb-8 tracking-tight">
        Set new password
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
        {/* New Password Input */}
        <div className="space-y-2 group">
          <label htmlFor="newPassword" className="text-sm font-medium text-[#37003C] ml-1">
            Set new password
          </label>
          <div className="relative group">
            <input
              {...register("newPassword", { 
                required: "New password is required",
                minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                }
              })}
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Set new password"
              className={`w-full pr-14 pl-5 py-4 rounded-[8px] border-2 ${errors.newPassword ? 'border-red-500' : 'border-[#37003C]'} text-[#37003C] placeholder:text-[#37003C]/50 focus:outline-none focus:ring-4 focus:ring-[#37003C]/10 focus:border-[#37003C] transition-all`}
            />
            <button
               type="button"
               onClick={() => setShowNewPassword(!showNewPassword)}
               className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#A0AEC0] hover:text-[#3D195B] transition-colors"
            >
               {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-2 group">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-[#37003C] ml-1">
            Confirm Password
          </label>
          <div className="relative group">
            <input
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: (value) => value === newPasswordValue || "Passwords do not match"
              })}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={`w-full pr-14 pl-5 py-4 rounded-[8px] border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-[#37003C]'} text-[#37003C] placeholder:text-[#37003C]/50 focus:outline-none focus:ring-4 focus:ring-[#37003C]/10 focus:border-[#37003C] transition-all`}
            />
            <button
               type="button"
               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
               className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#A0AEC0] hover:text-[#3D195B] transition-colors"
            >
               {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 font-medium ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button 
          type="submit"
          className="w-full mt-4 py-7 bg-[#37003C] hover:bg-[#2d0031] text-white rounded-[8px] cursor-pointer font-semibold text-base transition-all transform hover:scale-[1.01] active:scale-[0.99] border-none shadow-xl shadow-purple-900/10"
        >
          Confirm
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

export default SetPasswordPage;
