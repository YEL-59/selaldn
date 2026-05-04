"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, RotateCcw, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePlayers } from "@/hooks/usePlayers";
import { useState, useEffect } from "react";

const POSITIONS = [
  { label: "All Positions", value: "" },
  { label: "Goalkeepers", value: "GKP" },
  { label: "Defenders", value: "DEF" },
  { label: "Midfielders", value: "MID" },
  { label: "Forwards", value: "FWD" },
];

const TEAMS = [
  { id: null, name: "All Teams" },
  { id: 1, name: "Arsenal" },
  { id: 2, name: "Aston Villa" },
  { id: 3, name: "Bournemouth" },
  { id: 4, name: "Brentford" },
  { id: 5, name: "Brighton" },
  { id: 6, name: "Chelsea" },
  { id: 7, name: "Crystal Palace" },
  { id: 8, name: "Everton" },
  { id: 9, name: "Fulham" },
  { id: 10, name: "Ipswich" },
  { id: 11, name: "Leicester" },
  { id: 12, name: "Liverpool" },
  { id: 13, name: "Man City" },
  { id: 14, name: "Man Utd" },
  { id: 15, name: "Newcastle" },
  { id: 16, name: "Nott'm Forest" },
  { id: 17, name: "Southampton" },
  { id: 18, name: "Spurs" },
  { id: 19, name: "West Ham" },
  { id: 20, name: "Wolves" },
];

const PRICES = [
  { label: "Max Price: Any", value: null },
  { label: "Max: £4.0m", value: 4.0 },
  { label: "Max: £5.0m", value: 5.0 },
  { label: "Max: £6.0m", value: 6.0 },
  { label: "Max: £7.0m", value: 7.0 },
  { label: "Max: £8.0m", value: 8.0 },
  { label: "Max: £9.0m", value: 9.0 },
  { label: "Max: £10.0m", value: 10.0 },
  { label: "Max: £12.0m", value: 12.0 },
  { label: "Max: £15.0m", value: 15.0 },
];

const difficultyColors: Record<number | string, string> = {
  1: "bg-[#00FF88]/20 text-[#009689] border-[#00FF88]/40",
  2: "bg-[#00FF88]/20 text-[#009689] border-[#00FF88]/40",
  3: "bg-gray-100 text-gray-500 border-gray-200",
  4: "bg-[#FF5C5C]/20 text-[#FF5C5C] border-[#FF5C5C]/40",
  5: "bg-[#2E004B] text-white border-transparent",
};

export const PlayerTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [position, setPosition] = useState("");
  const [teamId, setTeamId] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const { data, loading, error } = usePlayers({
    search: search || undefined,
    page,
    limit: 10,
    position: position || undefined,
    team_id: teamId || undefined,
    max_price: maxPrice || undefined,
  });

  const players = data?.data?.players || [];
  const meta = data?.data?.meta;

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, position, teamId, maxPrice]);

  return (
    <div className="w-full bg-white rounded-[5px] shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100/50 p-6">
      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative w-full max-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#37003C] text-white placeholder:text-gray-400/60 rounded-[5px] pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#00F5FF]/20 transition-all text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-3">
          <FilterDropdown 
            options={POSITIONS} 
            value={position} 
            onChange={setPosition} 
            placeholder="All Positions"
          />
          <FilterDropdown 
            options={PRICES} 
            value={maxPrice} 
            onChange={setMaxPrice} 
            placeholder="Any Price"
          />
          <FilterDropdown 
            options={TEAMS.map(t => ({ label: t.name, value: t.id }))} 
            value={teamId} 
            onChange={setTeamId} 
            placeholder="All Teams"
          />
          <button 
            onClick={() => {
              setSearch("");
              setPosition("");
              setTeamId(null);
              setMaxPrice(null);
            }}
            className="p-2.5 bg-gray-100 rounded-[5px] text-gray-500 hover:bg-gray-200 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto no-scrollbar relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
            <Loader2 className="w-8 h-8 text-[#37003C] animate-spin" />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-500">
            Error loading players: {error.message}
          </div>
        ) : players.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
            <p className="font-semibold">No players found</p>
            <p className="text-xs">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest w-[180px]">
                    Player
                  </th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center">
                    Price
                  </th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center">
                    Total Pts
                  </th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center">
                    Form
                  </th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center">
                    PPG
                  </th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center">
                    ICT Index
                  </th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center">
                    Mins
                  </th>
                  <th className="py-4 px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest w-[260px] text-center">
                    Upcoming Fixtures
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {players.map((player) => (
                  <tr
                    key={player.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <Link
                        href={`/players/${player.id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-[5px] overflow-hidden border border-gray-100/50 bg-gray-50/20 shrink-0">
                          <img
                            src={player.photo_url || "/images/jersey-red.png"}
                            alt={player.name}
                            className="w-full h-full object-contain p-1.5"
                          />
                        </div>
                        <div>
                          <p className="font-extrabold text-[#111827] text-[14px]">
                            {player.web_name}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase">
                            {player.team?.short_name} • {player.position_code}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-[#111827] text-[14px]">
                        £{player.cost.toFixed(1)}m
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-[#111827] text-[14px]">
                        {player.total_points}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={cn(
                          "font-semibold text-[14px]",
                          player.form >= 7 ? "text-[#00FF88]" : "text-gray-900",
                        )}
                      >
                        {player.form.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-cyan-400 text-[14px]">
                        {player.points_per_game}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-emerald-400 text-[14px]">
                        {player.ict_index}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-semibold text-[#111827] text-[14px]">
                        {player.minutes}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {player.next_fixtures && player.next_fixtures.length > 0 ? (
                          player.next_fixtures.slice(0, 3).map((fix: any, i: number) => (
                            <div
                              key={i}
                              className={cn(
                                "px-2 rounded-[5px] border text-[9px] font-semibold uppercase tracking-tight w-16 text-center h-7 flex items-center justify-center",
                                difficultyColors[fix.difficulty] || difficultyColors[3],
                              )}
                            >
                              {fix.opponent_short_name} ({fix.is_home ? "H" : "A"})
                            </div>
                          ))
                        ) : (
                          <span className="text-[10px] text-gray-400">No fixtures</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {meta && meta.last_page > 1 && (
              <div className="flex items-center justify-between mt-8 border-t border-gray-50 pt-8">
                <p className="text-xs font-semibold text-gray-400">
                  Showing <span className="text-[#37003C]">{meta.from}</span> to <span className="text-[#37003C]">{meta.to}</span> of <span className="text-[#37003C]">{meta.total}</span> players
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-[5px] border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, meta.last_page))].map((_, i) => {
                      let pageNum = page;
                      if (page <= 3) pageNum = i + 1;
                      else if (page >= meta.last_page - 2) pageNum = meta.last_page - 4 + i;
                      else pageNum = page - 2 + i;
                      
                      if (pageNum < 1 || pageNum > meta.last_page) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={cn(
                            "w-8 h-8 rounded-[5px] text-xs font-bold transition-all",
                            page === pageNum
                              ? "bg-[#37003C] text-white shadow-lg shadow-[#37003C]/20"
                              : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          )}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
                    disabled={page === meta.last_page}
                    className="p-2 rounded-[5px] border border-gray-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const FilterDropdown = ({ options, value, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o: any) => o.value === value);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#37003C] text-white rounded-[5px] px-5 py-2.5 flex items-center gap-2.5 outline-none hover:bg-[#2D0035] transition-all group min-w-[140px] justify-between"
      >
        <span className="text-xs font-semibold tracking-tight">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={cn(
          "w-3.5 h-3.5 opacity-60 transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-20" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-[200px] bg-white rounded-[5px] shadow-xl border border-gray-100 z-30 py-2 max-h-[300px] overflow-y-auto"
            >
              {options.map((option: any) => (
                <button
                  key={String(option.value)}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-xs font-semibold transition-colors",
                    value === option.value 
                      ? "bg-cyan-50 text-cyan-600" 
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {option.label || option.name}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
