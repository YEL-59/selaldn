"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useFixtures, Fixture } from "@/hooks/useFixtures";

const FixturesPage = () => {
  const [activeTab, setActiveTab] = useState<"fixtures" | "fdr">("fixtures");
  const [selectedGw, setSelectedGw] = useState<number | undefined>(undefined);
  
  const { data, loading, error } = useFixtures(selectedGw, activeTab);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#37003C] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500 font-semibold">
        Error: {error.message}
      </div>
    );
  }

  if (!data) return null;

  const { navigation, fixtures, fdr, fdr_key } = data.data;

  // If the backend returns empty arrays for fdr.rows[].fixtures,
  // we can attempt to derive them from the top-level fixtures array.
  const derivedFdrRows = fdr.rows.map((row) => {
    if (row.fixtures && row.fixtures.length > 0) return row;

    const teamFixtures: any[] = [];
    fixtures.forEach((group) => {
      group.fixtures.forEach((game) => {
        if (game.home_team.id === row.team.id) {
          teamFixtures.push({
            event: game.event,
            opponent_short_name: game.away_team.short_name,
            is_home: true,
            difficulty: game.difficulty,
            color: game.color,
          });
        } else if (game.away_team.id === row.team.id) {
          teamFixtures.push({
            event: game.event,
            opponent_short_name: game.home_team.short_name,
            is_home: false,
            difficulty: game.difficulty,
            color: game.color,
          });
        }
      });
    });

    return {
      ...row,
      fixtures: teamFixtures,
    };
  });

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
            <div className="rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] p-10 mb-12 flex items-center justify-center relative">
              <div className="text-center w-full flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-[#37003C]">
                    Gameweek
                  </h2>
                  <input
                    type="number"
                    min="1"
                    max="38"
                    value={selectedGw || navigation.selected_gameweek || navigation.title.replace('Gameweek ', '') || ''}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setSelectedGw(undefined);
                        return;
                      }
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1 && val <= 38) {
                        setSelectedGw(val);
                      }
                    }}
                    className="w-20 text-center text-2xl font-bold text-[#37003C] border-b-2 border-gray-200 focus:border-[#37003C] focus:outline-none pb-1 bg-transparent"
                  />
                </div>
                <p className="text-xs font-bold text-[#666] tracking-[0.2em] mb-6 uppercase">
                  {navigation.range}
                </p>
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-[#37003C] mb-1">
                    Deadline: {navigation.deadline}
                  </p>
                  <p className="text-xs text-[#666]">
                    *{navigation.notice}
                  </p>
                </div>
              </div>
            </div>

            {/* Fixture List */}
            <div className="space-y-16">
              {fixtures.map((group, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-base font-bold text-[#1e1b4b] px-2">
                    {group.date}
                  </h3>
                  <div className="space-y-4">
                    {group.fixtures.map((game, gIdx) => (
                      <div
                        key={gIdx}
                        className="p-4 border border-gray-50/50 rounded-lg bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] grid grid-cols-3 items-center group hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                      >
                        {/* Home Team */}
                        <div className="flex items-center justify-end gap-6">
                          <span className="text-base font-extrabold text-[#1e1b4b]">
                            {game.home_team.name}
                          </span>
                          <img
                            src={game.home_team.badge_url}
                            alt={game.home_team.name}
                            className="w-10 h-10 object-contain drop-shadow-sm"
                          />
                        </div>

                        {/* Match Time */}
                        <div className="flex justify-center">
                          <div className="bg-[#2B003D] text-white px-7 py-2.5 rounded text-sm font-bold shadow-xl shadow-purple-900/20 group-hover:bg-[#3d0057] transition-colors">
                            {game.kickoff_time_formatted}
                          </div>
                        </div>

                        {/* Away Team */}
                        <div className="flex items-center justify-start gap-6">
                          <img
                            src={game.away_team.badge_url}
                            alt={game.away_team.name}
                            className="w-10 h-10 object-contain drop-shadow-sm"
                          />
                          <span className="text-base font-extrabold text-[#1e1b4b]">
                            {game.away_team.name}
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
            <div className="p-4 rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] flex flex-wrap items-center gap-6">
              <span className="text-xs font-bold text-[#1e1b4b] uppercase tracking-widest">
                FDR Key:
              </span>
              <div className="flex items-center gap-3">
                {fdr_key.map((key) => (
                  <div key={key.value} className="flex items-center gap-1.5">
                    <div
                      className="w-6 h-6 rounded-[4px] flex items-center justify-center text-[10px] font-bold shadow-md"
                      style={{ backgroundColor: key.color, color: key.value >= 4 ? '#fff' : '#1A1A2E' }}
                    >
                      {key.value}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{key.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FDR Table Wrapper */}
            <div className="">
              <div className="flex justify-end items-center p-8">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-bold text-[#37003C]">Gameweek</h2>
                  <input
                    type="number"
                    min="1"
                    max="38"
                    value={selectedGw || navigation.selected_gameweek || navigation.title.replace('Gameweek ', '') || ''}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setSelectedGw(undefined);
                        return;
                      }
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1 && val <= 38) {
                        setSelectedGw(val);
                      }
                    }}
                    className="w-16 text-center text-sm font-bold text-[#37003C] border-b-2 border-gray-200 focus:border-[#37003C] focus:outline-none pb-1 bg-transparent"
                  />
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar rounded-xl bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="p-8 pb-4 text-xs font-bold text-gray-400 uppercase tracking-[0.25em] sticky left-0 bg-white z-10 w-48">
                        Team
                      </th>
                      {fdr.columns.map((col) => (
                        <th key={col.id} className="p-6 pb-4 text-center">
                          <p className="text-sm font-semibold text-[#37003C] uppercase mb-0.5 tracking-tight">
                            {col.label.replace("Gameweek ", "GW")}
                          </p>
                          <p className="text-xs text-[#666]">{col.deadline}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {derivedFdrRows.map((row) => (
                      <tr
                        key={row.team.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-8 py-5 sticky left-0 bg-white shadow-[10px_0_20px_-10px_rgba(0,0,0,0.05)] z-10">
                          <div className="flex items-center gap-5">
                            <div className="w-9 h-9 flex items-center justify-center">
                              <img
                                src={row.team.badge_url}
                                alt={row.team.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="text-sm font-semibold text-[#1A1A2E] whitespace-nowrap">
                              {row.team.name}
                            </span>
                          </div>
                        </td>
                        {fdr.columns.map((col) => {
                          const fixture = row.fixtures.find((f: any) => f.event === col.id);
                          return (
                            <td key={col.id} className="p-2 min-w-[100px]">
                              {fixture ? (
                                <div
                                  className="h-14 w-full rounded-xl flex flex-col items-center justify-center text-white border border-white/10 transition-all hover:scale-[1.05] hover:shadow-lg cursor-help"
                                  style={{ backgroundColor: fixture.color, color: fixture.difficulty >= 4 ? '#fff' : '#1A1A2E' }}
                                >
                                  <p className="text-xs font-bold leading-none mb-1">
                                    {fixture.opponent_short_name}
                                  </p>
                                  <p className="text-[9px] font-bold opacity-70 leading-none">
                                    ({fixture.is_home ? "H" : "A"})
                                  </p>
                                </div>
                              ) : (
                                <div className="h-14 w-full rounded-xl bg-gray-50 flex items-center justify-center border border-dashed border-gray-200">
                                  <div className="w-3 h-0.5 bg-gray-200" />
                                </div>
                              )}
                            </td>
                          );
                        })}
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

export default FixturesPage;

