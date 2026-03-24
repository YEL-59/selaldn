"use client";

import { motion } from "framer-motion";
import { Search, ChevronDown, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PLAYERS = [
  { id: 1, name: "E. Haaland", team: "MCI", pos: "FWD", price: "£14.3m", totalPts: 142, form: 8.5, xPtsNext: 7.2, xPts3GW: 21.5, xMins: "90%", fixtures: [
    { team: "EVE", venue: "H", difficulty: 2 },
    { team: "CHE", venue: "A", difficulty: 4 },
    { team: "BRE", venue: "H", difficulty: 2 },
  ]},
  { id: 2, name: "C. Palmer", team: "CHE", pos: "MID", price: "£10.2m", totalPts: 138, form: 8.3, xPtsNext: 6.8, xPts3GW: 19.2, xMins: "90%", fixtures: [
    { team: "BOU", venue: "H", difficulty: 2 },
    { team: "MCI", venue: "H", difficulty: 3.5 },
    { team: "NFO", venue: "A", difficulty: 4 },
  ]},
  { id: 3, name: "M. Salah", team: "LIV", pos: "MID", price: "£13.1m", totalPts: 150, form: 7.8, xPtsNext: 6.5, xPts3GW: 18.5, xMins: "90%", fixtures: [
    { team: "BUR", venue: "H", difficulty: 2 },
    { team: "BRC", venue: "A", difficulty: 4 },
    { team: "LUT", venue: "H", difficulty: 2 },
  ]},
  { id: 4, name: "E. Fernández", team: "ARS", pos: "MID", price: "£9.0m", totalPts: 132, form: 5.8, xPtsNext: 5.1, xPts3GW: 14.8, xMins: "85%", fixtures: [
    { team: "WHU", venue: "A", difficulty: 4 },
    { team: "BUR", venue: "A", difficulty: 2 },
    { team: "NEW", venue: "H", difficulty: 4 },
  ]},
  { id: 5, name: "P. Foden", team: "MCI", pos: "MID", price: "£8.1m", totalPts: 121, form: 7.4, xPtsNext: 6.0, xPts3GW: 17.5, xMins: "82%", fixtures: [
    { team: "EVE", venue: "H", difficulty: 2 },
    { team: "CHE", venue: "A", difficulty: 4 },
    { team: "BRE", venue: "H", difficulty: 2 },
  ]},
  { id: 6, name: "Rodri", team: "MCI", pos: "MID", price: "£6.0m", totalPts: 128, form: 6.2, xPtsNext: 5.4, xPts3GW: 16.0, xMins: "88%", fixtures: [
    { team: "FUL", venue: "A", difficulty: 4 },
    { team: "NFO", venue: "H", difficulty: 2 },
    { team: "LUT", venue: "A", difficulty: 2 },
  ]},
  { id: 7, name: "Virgil", team: "LIV", pos: "DEF", price: "£5.8m", totalPts: 130, form: 6.5, xPtsNext: 6.1, xPts3GW: 17.8, xMins: "90%", fixtures: [
    { team: "BHA", venue: "H", difficulty: 4 },
    { team: "WOL", venue: "A", difficulty: 2 },
    { team: "CHE", venue: "A", difficulty: 4 },
  ]},
];

const difficultyColors: Record<number | string, string> = {
  2: "bg-[#00FF88]/20 text-[#009689] border-[#00FF88]/40",
  3: "bg-gray-100 text-gray-500 border-gray-200",
  3.5: "bg-[#FF5C5C]/20 text-[#FF5C5C] border-[#FF5C5C]/40",
  4: "bg-[#2E004B] text-white border-transparent",
};

export const PlayerTable = () => {
  return (
    <div className="w-full bg-white rounded-[5px] shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 p-6">
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative w-full max-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search players..." 
            className="w-full bg-[#37003C] text-white placeholder:text-gray-400/60 rounded-[5px] pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#00F5FF]/20 transition-all text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown label="All Positions" />
          <FilterDropdown label="Max Price: £15.0m" />
          <FilterDropdown label="All Teams" />
        </div>
      </div>

      {/* Table Headers */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[180px]">Player</th>
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Price</th>
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Total Pts</th>
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Form</th>
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">xPts (Next)</th>
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">xPts (3 GW)</th>
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">xMins</th>
              <th className="py-4 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-[260px] text-center">Upcoming Fixtures</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PLAYERS.map((player) => (
              <tr key={player.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-4">
                  <Link href={`/players/${player.id}`} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[5px] overflow-hidden border border-gray-100/50 bg-gray-50/20 shrink-0">
                      <img 
                        src="/images/jersey-red.png" 
                        alt={player.name} 
                        className="w-full h-full object-contain p-1.5" 
                      />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#111827] text-[14px]">{player.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{player.team} • {player.pos}</p>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-black text-[#111827] text-[14px]">{player.price}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-black text-[#111827] text-[14px]">{player.totalPts}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={cn("font-black text-[14px]", parseFloat(player.form.toString()) >= 7 ? "text-[#00FF88]" : "text-gray-900")}>
                    {player.form}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-black text-cyan-400 text-[14px]">{player.xPtsNext}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-black text-emerald-400 text-[14px]">{player.xPts3GW}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-black text-[#111827] text-[14px]">{player.xMins}</span>
                </td>
                <td className="py-4 px-4">
                   <div className="flex items-center justify-center gap-1.5">
                      {player.fixtures.map((fix, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "px-2 px-1 rounded-[5px] border text-[9px] font-black uppercase tracking-tight w-16 text-center h-7 flex items-center justify-center",
                            difficultyColors[fix.difficulty] || difficultyColors[4]
                          )}
                        >
                          {fix.team} ({fix.venue})
                        </div>
                      ))}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label }: { label: string }) => (
  <button className="bg-[#37003C] text-white rounded-[5px] px-5 py-2.5 flex items-center gap-2.5 outline-none hover:bg-[#2D0035] transition-all group">
    <span className="text-xs font-black tracking-tight">{label}</span>
    <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
  </button>
);
