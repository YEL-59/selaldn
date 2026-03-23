"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const VerifyCodePage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const router = useRouter();

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("")) {
      router.push("/set-password");
    }
    console.log("Verifying code:", otp.join(""));
  };

  const handleResend = () => {
    setTimeLeft(60);
    setOtp(["", "", "", "", "", ""]);
    console.log("Resending code...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full flex flex-col"
    >
      <h1 className="text-[32px] md:text-[40px] font-bold text-[#37003C] leading-tight mb-4 tracking-tight">
        Enter verification code
      </h1>
      <p className="text-[#37003C] mb-10 text-sm md:text-base opacity-80 leading-relaxed max-w-[420px]">
        We&apos;ve sent a 6-digit code to your email. Please enter it below to
        verify your identity.
      </p>

      <div className="space-y-8">
        {/* OTP Input Container */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[#37003C] ml-1">
            Verification code
          </label>
          <div className="grid grid-cols-6 gap-2 lg:gap-4 md:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full h-14 md:h-16 text-center text-xl md:text-2xl font-bold mt-2 border-2 border-[#37003C] rounded-[12px] text-[#37003C] focus:outline-none focus:ring-4 focus:ring-[#37003C]/10 focus:border-[#37003C] transition-all"
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleVerify}
          className="w-full py-7 bg-[#37003C] hover:bg-[#2d0031] text-white rounded-[8px] cursor-pointer font-semibold text-base transition-all transform hover:scale-[1.01] active:scale-[0.99] border-none shadow-xl shadow-purple-900/10"
        >
          Verify code
        </Button>

        {/* Resend and Link Section */}
        <div className="text-center space-y-4">
          <p className="text-[#37003C]/70 text-sm">
            Didn&apos;t receive the code?{" "}
            <button className="font-bold text-[#37003C] hover:underline decoration-2 underline-offset-4 cursor-pointer">
              Resend
            </button>
          </p>
          <p className="text-[#37003C]/50 text-xs font-medium min-h-[1rem]">
            {timeLeft > 0 ? (
              <>Code expires in {formatTime(timeLeft)}</>
            ) : (
              <span className="text-red-500 font-bold">Code expired</span>
            )}
          </p>

          <div className="flex justify-center pt-2">
            <Link
              href="/login"
              className="flex items-center gap-2 text-[#37003C] text-sm font-bold hover:underline decoration-2 underline-offset-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyCodePage;
