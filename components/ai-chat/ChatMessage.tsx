"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string | React.ReactNode;
  isBot?: boolean;
  avatar?: string;
}

export const ChatMessage = ({ content, isBot = true, avatar }: ChatMessageProps) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
            "flex gap-4 w-full",
            isBot ? "justify-start" : "justify-end"
        )}
    >
        {isBot && (
            <div className="w-8 h-8 rounded-full bg-[#2E004A] flex items-center justify-center shrink-0 mt-0">
                <Bot className="w-4.5 h-4.5 text-white" />
            </div>
        )}

        <div className={cn(
            "max-w-[85%] md:max-w-[70%] text-[14px] font-medium leading-[1.6] px-6 py-4 rounded-[5px] relative shadow-[0_2px_15px_rgba(0,0,0,0.02)]",
            isBot 
                ? "bg-white border border-gray-100 text-[#1e1b4b]"
                : "bg-[#2E004B] text-white"
        )}>
            {content}
        </div>

        {!isBot && (
            <div className="w-8 h-8 rounded-full border border-gray-100 bg-white overflow-hidden shrink-0 ml-3">
                <img 
                    src={avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                    alt="User" 
                    className="w-full h-full object-cover" 
                />
            </div>
        )}
    </motion.div>
  );
};
