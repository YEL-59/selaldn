import Image from "next/image";
import React from "react";
import authImage from "@/assets/images/auth-page-image.png";
import LogoImg from "@/assets/images/logo.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#ededff] min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden font-sans container mx-auto p-4 lg:p-8">
        {/* Left Side: Auth Form Container */}
        <div className="flex flex-col h-full overflow-y-auto w-full max-w-[640px] mx-auto lg:mx-0 lg:max-w-none p-8 lg:p-14">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-16">
            <Image
              className="object-contain"
              src={LogoImg}
              alt="Logo"
              width={130}
              height={40}
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="w-full max-w-[500px] mx-auto lg:mx-0">
              {children}
            </div>
          </div>
        </div>

        {/* Right Side: Marketing Panel */}
        <div className="hidden lg:flex rounded-[12px] bg-[linear-gradient(135deg,#5A0066_0%,#550060_7.14%,#50005A_14.29%,#4B0054_21.43%,#46004E_28.57%,#410048_35.71%,#3C0042_42.86%,#37003C_50%,#34003A_62.5%,#300037_75%,#2D0035_87.5%,#2A0033_100%)] relative flex-col items-center justify-center px-12 py-16 text-center overflow-hidden h-fit my-auto">
        

          <div className="relative z-10 w-full flex flex-col items-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-20 leading-[1.2] max-w-md tracking-tight text-center">
              Shape the Premier League around you
            </h2>

            <div className="">
              <Image
                src={authImage}
                alt="Dashbord Mockup"
                className="object-cover"
                quality={100}
                priority
              />
            </div>

            <p className="mt-16 text-white/90 text-sm lg:text-[18px] font-light tracking-wide max-w-[460px] leading-relaxed">
              Choose your Clubs, Players and Matches with myPremierLeague
            </p>

            {/* Pagination Dots */}
            <div className="flex gap-3 mt-12">
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm cursor-pointer hover:scale-110 transition-all"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer hover:scale-110 transition-all"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer hover:scale-110 transition-all"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer hover:scale-110 transition-all"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
