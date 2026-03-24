"use client";

import { Link as LinkIcon, Calendar, Activity, ChevronRight } from "lucide-react";

export const PlayerOfferCard = ({ name, price, fixture, xPts, image }: { 
    name: string; 
    price: string; 
    fixture: string; 
    xPts: number;
    image: string;
}) => {
  return (
    <div className="bg-[#f2f4f7]/40 border border-[#e2e8f0] rounded-[6px] p-4 mt-4 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-lg transition-all">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden shrink-0">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col gap-0.5">
                <h4 className="font-extrabold text-[#111827] text-sm">{name}</h4>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 opacity-60">
                        <LinkIcon className="w-3 h-3" />
                        <span className="text-[11px] font-bold text-gray-900">{price}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-60">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[11px] font-bold text-gray-900">{fixture}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-[#00FF88]" />
                        <span className="text-[11px] font-black text-[#00FF88] tracking-tight">{xPts} xPts</span>
                    </div>
                </div>
            </div>
        </div>
        
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#2E004B] group-hover:translate-x-0.5 transition-all" />
    </div>
  );
};
