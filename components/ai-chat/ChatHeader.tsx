"use client";

import { Sparkles } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="bg-white rounded-[5px] px-10 py-5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white mb-6">
      <div className="flex items-center gap-4">
        <h1 className="text-[24px] font-semibold text-[#2E004B] tracking-tight">
          AI Chat
        </h1>
        <div className="flex items-center gap-1.5 bg-[#00FF88] px-3 py-1 rounded-full">
          <span className="text-[10px] font-semibold text-[#2E004B] uppercase tracking-wider leading-none">
            Online
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 text-gray-400">
        <Sparkles className="w-4 h-4 text-[#00FF88]" />
        <span className="text-[12px] font-bold tracking-tight text-gray-500">
          Powered by FPL-GPT-4
        </span>
      </div>
    </div>
  );
};
