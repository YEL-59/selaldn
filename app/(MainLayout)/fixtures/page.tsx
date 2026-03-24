"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FixturesPage = () => {
  const [activeTab, setActiveTab] = useState("fixtures");

  const fixtures = [
    {
      date: "Sat 14 Mar",
      games: [
        {
          home: "Burnley",
          away: "Bournemouth",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t90.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t91.svg",
        },
        {
          home: "Sunderland",
          away: "Brighton",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t56.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t36.svg",
        },
        {
          home: "Arsenal",
          away: "Everton",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t3.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t11.svg",
        },
        {
          home: "Chelsea",
          away: "Newcastle",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t8.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t4.svg",
        },
      ],
    },
    {
      date: "Sun 15 Mar",
      games: [
        {
          home: "Burnley",
          away: "Bournemouth",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t90.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t91.svg",
        },
        {
          home: "Sunderland",
          away: "Brighton",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t56.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t36.svg",
        },
        {
          home: "Arsenal",
          away: "Everton",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t3.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t11.svg",
        },
        {
          home: "Chelsea",
          away: "Newcastle",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t8.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t4.svg",
        },
      ],
    },
    {
      date: "Tue 17 Mar",
      games: [
        {
          home: "Burnley",
          away: "Bournemouth",
          time: "21:00",
          homeLogo:
            "https://resources.premierleague.com/premierleague/badges/t90.svg",
          awayLogo:
            "https://resources.premierleague.com/premierleague/badges/t91.svg",
        },
      ],
    },
  ];

  return (
    <div className="w-full pb-20">
      <h1 className="text-4xl font-bold text-[#1A1A2E] mb-10 tracking-tight">
        Fixtures
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-10">
        <button
          onClick={() => setActiveTab("fixtures")}
          className={cn(
            "px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border border-transparent",
            activeTab === "fixtures"
              ? "text-white rounded-lg bg-[#37003C] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
              : "rounded-lg bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] cursor-pointer",
          )}
        >
          Fixtures
        </button>
        <button
          onClick={() => setActiveTab("fdr")}
          className={cn(
            "px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border border-transparent",
            activeTab === "fdr"
              ? "text-white rounded-lg bg-[#37003C] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]"
              : "rounded-lg bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] cursor-pointer",
          )}
        >
          FDR
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "fixtures" ? (
          <motion.div
            key="fixtures-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Gameweek Selector */}
            <div className="rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] p-10 mb-12 flex items-center justify-between relative">
              <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#2B003D] hover:bg-gray-100 transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#37003C] mb-2">
                  Gameweek 30
                </h2>
                <p className="text-xs font-bold text-[#666] tracking-[0.2em] mb-6">
                  Sat 14 Mar - Tue 17 Mar
                </p>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-[#37003C] mb-1">
                    Deadline: Sat 14 Mar, 18:30
                  </p>
                  <p className="text-xs text-[#666]">
                    *All times are shown in your local time
                  </p>
                </div>
              </div>

              <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#2B003D] hover:bg-gray-100 transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Fixture List */}
            <div className="space-y-16">
              {fixtures.map((group, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-base font-bold text-[#1e1b4b] px-2">
                    {group.date}
                  </h3>
                  <div className="space-y-4">
                    {group.games.map((game, gIdx) => (
                      <div
                        key={gIdx}
                        className="p-4 border border-gray-50/50 rounded-lg bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] grid grid-cols-3 items-center group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                      >
                        {/* Home Team */}
                        <div className="flex items-center justify-end gap-6">
                          <span className="text-base font-extrabold text-[#1e1b4b]">
                            {game.home}
                          </span>
                          <img
                            src={game.homeLogo}
                            alt={game.home}
                            className="w-10 h-10 object-contain drop-shadow-sm"
                          />
                        </div>

                        {/* Match Time */}
                        <div className="flex justify-center">
                          <div className="bg-[#2B003D] text-white px-7 py-2.5 rounded text-sm font-bold shadow-xl shadow-purple-900/20 group-hover:bg-[#3d0057] transition-colors">
                            {game.time}
                          </div>
                        </div>

                        {/* Away Team */}
                        <div className="flex items-center justify-start gap-6">
                          <img
                            src={game.awayLogo}
                            alt={game.away}
                            className="w-10 h-10 object-contain drop-shadow-sm"
                          />
                          <span className="text-base font-extrabold text-[#1e1b4b]">
                            {game.away}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="fdr-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* FDR Key */}
            <div className="p-4 rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] inline-flex items-center gap-8">
              <span className="text-xs font-bold text-[#1e1b4b] uppercase tracking-widest">
                FDR Key:
              </span>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={cn(
                      "w-8 h-8 rounded-[4px] flex items-center justify-center text-xs font-medium shadow-md",
                      num === 1
                        ? "bg-[#00FF87] text-[#1A1A2E]"
                        : num === 2
                          ? "bg-[#4effab] text-[#1A1A2E]"
                          : num === 3
                            ? "bg-[#04f5ff] text-[#1A1A2E]"
                            : num === 4
                              ? "bg-[#ff4793] text-white"
                              : "bg-[#ff0054] text-white",
                    )}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <span className="text-sm font-bold text-[#666] tracking-widest">
                Easy → Hard
              </span>
            </div>

            {/* FDR Table Wrapper */}
            <div className="">
              <div className="flex justify-between items-center p-8">
                <div className="w-32" />
                <div className="flex items-center gap-6">
                  <button className="text-xs font-bold text-[#666] hover:text-[#2B003D] flex items-center gap-2 transition-all hover:-translate-x-1">
                    <ChevronLeft className="w-4 h-4" /> Previous GW
                  </button>
                  <button className="text-xs font-bold text-[#666] hover:text-[#2B003D] flex items-center gap-2 transition-all hover:translate-x-1">
                    Next GW <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="p-8 pb-4 text-xs font-bold text-gray-400 uppercase tracking-[0.25em] sticky left-0 bg-white z-10 w-48">
                        Team
                      </th>
                      {[30, 31, 32, 33, 34, 35, 36, 37, 38].map((gw) => (
                        <th key={gw} className="p-6 pb-4 text-center">
                          <p className="text-sm font-semibold text-[#37003C] uppercase mb-0.5 tracking-tight">
                            GW{gw}
                          </p>
                          <p className="text-xs text-[#666]">11 Mar</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {teams.map((team, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-8 py-5 sticky left-0 bg-white shadow-[10px_0_20px_-10px_rgba(0,0,0,0.05)] z-10">
                          <div className="flex items-center gap-5">
                            <div className="w-9 h-9 flex items-center justify-center">
                              <img
                                src={team.logo}
                                alt={team.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="text-sm font-semibold text-[#1A1A2E] whitespace-nowrap">
                              {team.name}
                            </span>
                          </div>
                        </td>
                        {team.schedule.map((match, mIdx) => (
                          <td key={mIdx} className="p-2 min-w-[100px]">
                            {match.opp ? (
                              <div
                                className={cn(
                                  "h-14 w-full rounded-xl flex flex-col items-center justify-center text-white border border-white/10 transition-all hover:scale-[1.05] hover:shadow-lg cursor-help",
                                  match.fdr === 1
                                    ? "bg-[#00FF87] text-[#1A1A2E]"
                                    : match.fdr === 2
                                      ? "bg-[#4effab] text-[#1A1A2E]"
                                      : match.fdr === 3
                                        ? "bg-[#04f5ff] text-[#1A1A2E]"
                                        : match.fdr === 4
                                          ? "bg-[#ff4793] text-white"
                                          : "bg-[#ff0054] text-white",
                                )}
                              >
                                <p className="text-xs font-bold leading-none mb-1">
                                  {match.opp}
                                </p>
                                <p className="text-[9px] font-bold opacity-70 leading-none">
                                  ({match.loc})
                                </p>
                              </div>
                            ) : (
                              <div className="h-14 w-full rounded-xl bg-gray-50 flex items-center justify-center border border-dashed border-gray-200">
                                <div className="w-3 h-0.5 bg-gray-200" />
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const teams = [
  {
    name: "Arsenal",
    logo: "https://resources.premierleague.com/premierleague/badges/t3.svg",
    schedule: [
      { opp: "EVE", loc: "A", fdr: 1 },
      { opp: "", loc: "", fdr: 0 },
      { opp: "BOU", loc: "A", fdr: 1 },
      { opp: "MCI", loc: "H", fdr: 5 },
      { opp: "NEW", loc: "A", fdr: 1 },
      { opp: "FUL", loc: "H", fdr: 3 },
      { opp: "WHU", loc: "H", fdr: 3 },
      { opp: "BUR", loc: "A", fdr: 1 },
      { opp: "CRY", loc: "A", fdr: 3 },
    ],
  },
  {
    name: "Aston Villa",
    logo: "https://resources.premierleague.com/premierleague/badges/t7.svg",
    schedule: [
      { opp: "MUN", loc: "H", fdr: 4 },
      { opp: "WHU", loc: "A", fdr: 3 },
      { opp: "NFO", loc: "H", fdr: 3 },
      { opp: "SUN", loc: "A", fdr: 1 },
      { opp: "FUL", loc: "H", fdr: 1 },
      { opp: "TOT", loc: "A", fdr: 4 },
      { opp: "BUR", loc: "H", fdr: 1 },
      { opp: "LIV", loc: "A", fdr: 5 },
      { opp: "MCI", loc: "H", fdr: 5 },
    ],
  },
  {
    name: "Bournemouth",
    logo: "https://resources.premierleague.com/premierleague/badges/t91.svg",
    schedule: [
      { opp: "BUR", loc: "H", fdr: 1 },
      { opp: "MUN", loc: "A", fdr: 4 },
      { opp: "ARS", loc: "H", fdr: 5 },
      { opp: "NEW", loc: "H", fdr: 3 },
      { opp: "LEE", loc: "A", fdr: 1 },
      { opp: "CRY", loc: "H", fdr: 3 },
      { opp: "FUL", loc: "H", fdr: 3 },
      { opp: "MCI", loc: "A", fdr: 5 },
      { opp: "NFO", loc: "H", fdr: 3 },
    ],
  },
  {
    name: "Brentford",
    logo: "https://resources.premierleague.com/premierleague/badges/t94.svg",
    schedule: [
      { opp: "WOL", loc: "A", fdr: 1 },
      { opp: "LEE", loc: "H", fdr: 1 },
      { opp: "EVE", loc: "H", fdr: 1 },
      { opp: "FUL", loc: "A", fdr: 1 },
      { opp: "MUN", loc: "H", fdr: 4 },
      { opp: "WHU", loc: "A", fdr: 3 },
      { opp: "MCI", loc: "H", fdr: 5 },
      { opp: "CRY", loc: "A", fdr: 3 },
      { opp: "LIV", loc: "H", fdr: 5 },
    ],
  },
  {
    name: "Brighton",
    logo: "https://resources.premierleague.com/premierleague/badges/t36.svg",
    schedule: [
      { opp: "SUN", loc: "H", fdr: 1 },
      { opp: "LIV", loc: "A", fdr: 5 },
      { opp: "BUR", loc: "H", fdr: 1 },
      { opp: "TOT", loc: "H", fdr: 4 },
      { opp: "CHE", loc: "A", fdr: 4 },
      { opp: "NEW", loc: "H", fdr: 3 },
      { opp: "WOL", loc: "A", fdr: 1 },
      { opp: "LEE", loc: "H", fdr: 1 },
      { opp: "MUN", loc: "A", fdr: 4 },
    ],
  },
  {
    name: "Burnley",
    logo: "https://resources.premierleague.com/premierleague/badges/t90.svg",
    schedule: [
      { opp: "BOU", loc: "A", fdr: 3 },
      { opp: "FUL", loc: "H", fdr: 1 },
      { opp: "BHA", loc: "A", fdr: 3 },
      { opp: "NFO", loc: "H", fdr: 3 },
      { opp: "MCI", loc: "A", fdr: 5 },
      { opp: "LEE", loc: "H", fdr: 1 },
      { opp: "AVL", loc: "A", fdr: 3 },
      { opp: "ARS", loc: "H", fdr: 5 },
      { opp: "WOL", loc: "A", fdr: 1 },
    ],
  },
  {
    name: "Chelsea",
    logo: "https://resources.premierleague.com/premierleague/badges/t8.svg",
    schedule: [
      { opp: "NEW", loc: "A", fdr: 3 },
      { opp: "EVE", loc: "H", fdr: 3 },
      { opp: "MCI", loc: "A", fdr: 5 },
      { opp: "MUN", loc: "H", fdr: 4 },
      { opp: "BHA", loc: "H", fdr: 3 },
      { opp: "NFO", loc: "A", fdr: 3 },
      { opp: "LIV", loc: "H", fdr: 5 },
      { opp: "TOT", loc: "A", fdr: 4 },
      { opp: "SUN", loc: "H", fdr: 1 },
    ],
  },
  {
    name: "Crystal Palace",
    logo: "https://resources.premierleague.com/premierleague/badges/t31.svg",
    schedule: [
      { opp: "LEE", loc: "A", fdr: 1 },
      { opp: "", loc: "", fdr: 0 },
      { opp: "NEW", loc: "A", fdr: 3 },
      { opp: "WHU", loc: "A", fdr: 3 },
      { opp: "LIV", loc: "H", fdr: 5 },
      { opp: "BOU", loc: "H", fdr: 1 },
      { opp: "EVE", loc: "H", fdr: 1 },
      { opp: "BRE", loc: "H", fdr: 1 },
      { opp: "ARS", loc: "H", fdr: 5 },
    ],
  },
  {
    name: "Everton",
    logo: "https://resources.premierleague.com/premierleague/badges/t11.svg",
    schedule: [
      { opp: "ARS", loc: "H", fdr: 5 },
      { opp: "CHE", loc: "A", fdr: 4 },
      { opp: "BRE", loc: "A", fdr: 1 },
      { opp: "LIV", loc: "A", fdr: 5 },
      { opp: "WHU", loc: "H", fdr: 3 },
      { opp: "MCI", loc: "H", fdr: 5 },
      { opp: "CRY", loc: "H", fdr: 1 },
      { opp: "SUN", loc: "A", fdr: 1 },
      { opp: "TOT", loc: "A", fdr: 4 },
    ],
  },
];

export default FixturesPage;
