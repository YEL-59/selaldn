"use client";

import { motion } from "framer-motion";
import { ChatHeader } from "@/components/ai-chat/ChatHeader";
import { ChatMessage } from "@/components/ai-chat/ChatMessage";
import { ChatInput } from "@/components/ai-chat/ChatInput";
import { ChatSuggestions } from "@/components/ai-chat/ChatSuggestions";
import { PlayerOfferCard } from "@/components/ai-chat/PlayerOfferCard";

export default function AiChatPage() {
  return (
    <div className="max-w-[1240px] mx-auto h-[calc(100vh-140px)] flex flex-col pt-0 px-4 mb-20">
      {/* Standalone Chat Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ChatHeader />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex-1 flex flex-col rounded-[5px] bg-white relative shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100/40"
      >
        {/* Messages Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-10 py-10 space-y-10 no-scrollbar">
          {/* AI Message 1 */}
          <ChatMessage 
            content={
              <p>
                Hello Alex! I&apos;ve analyzed your squad <span className="font-black border-b-[3px] border-[#37003C]">&quot;Saka Potatoes&quot;</span> for Gameweek 12. 
                Your team rating is currently <span className="font-black border-b-[3px] border-[#37003C]">84/100</span>. 
                How can I help you optimize for this weekend?
              </p>
            }
            isBot={true}
          />
          
          {/* User Message 1 */}
          <div className="flex justify-end pr-0">
             <ChatMessage 
                content="Who should I bench this week?"
                isBot={false}
                avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
             />
          </div>
          
          {/* AI Message 2 */}
          <ChatMessage 
            content={
              <div className="space-y-6">
                <p>
                  Based on my analysis, you should bench <span className="text-[#00FF88] font-black">Saliba</span> and <span className="text-[#00FF88] font-black">Trippier</span>. 
                  Both have tough fixtures and their expected defensive returns are down by 12%.
                </p>
                <p>
                  I strongly recommend starting <span className="text-[#00FF88] font-black">Palmer</span> instead. 
                  Chelsea has a highly favorable run of fixtures starting this week.
                </p>
                
                <PlayerOfferCard 
                  name="C. Palmer"
                  price="£10.5m"
                  fixture="EVE (H)"
                  xPts={8.4}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_p_X_e7U_L_Y_p-f_E_Y_p-f_E_Y_p-f_E_Y_p-f_E_Y_p-f_E_V" // placeholder
                />
              </div>
            }
            isBot={true}
          />
        </div>
        
        {/* Footer Area with Suggestions and Input */}
        <div className="bg-white px-10 border-t border-gray-50/50 pb-8 pt-4">
            <ChatSuggestions />
            <ChatInput />
        </div>
      </motion.div>
    </div>
  );
}