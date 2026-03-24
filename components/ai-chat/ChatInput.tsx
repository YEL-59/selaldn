"use client";

import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

export const ChatInput = () => {
  const [value, setValue] = useState("");

  return (
    <div className="relative group bg-white p-8 pt-0 rounded-b-[20px] flex flex-col gap-4">
      <div className="relative flex items-center bg-[#f3f4f6] rounded-[14px] px-6 py-4 transition-all focus-within:ring-2 focus-within:ring-[#2E004B]/5 focus-within:bg-white box-border border border-transparent focus-within:border-gray-100">
        <button className="p-2.5 hover:bg-gray-200 rounded-full transition-colors mr-3 opacity-60">
            <Paperclip className="w-5 h-5 text-[#2E004B] rotate-45" strokeWidth={2.5} />
        </button>
        
        <input 
            type="text" 
            placeholder="Ask your AI Scout anything..." 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-gray-700 placeholder:text-gray-400 pr-16"
        />
        
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#2D0035] hover:bg-[#3d0066] text-white p-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md">
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
