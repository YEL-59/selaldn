"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  CircleCheck, 
  Zap, 
  Bot, 
  TrendingUp, 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const LandingPage = () => {
  const router = useRouter();
  const [teamId, setTeamId] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const steps = [
    { id: 1, label: "Scouting your defenders...", icon: TrendingUp },
    { id: 2, label: "Calculating Captaincy...", icon: Zap },
    { id: 3, label: "Optimizing Transfers...", icon: Bot },
  ];

  const handleStartCoaching = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamId) return;
    setIsAnalyzing(true);
  };

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisStep((prev) => {
          if (prev >= steps.length) {
            clearInterval(interval);
            setTimeout(() => {
              router.push("/dashboard");
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, router, steps.length]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#ededfe]">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-100/30 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 px-4 py-1.5 rounded-full border border-[#37003C] flex items-center gap-2 mb-8"
        >
          <Zap className="w-3.5 h-3.5 text-[#37003C]" fill="currentColor" />
          <span className="text-[11px] font-bold text-[#37003C] uppercase tracking-wider">FPL Season 2025/2026 Ready</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-[#37003C] mb-8 tracking-tight leading-[0.95]"
        >
          Your AI-Powered FPL <br /> 
          <span className="text-[#37003C]">Coach.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#6B7280] text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed"
        >
          Stop guessing. Let AI optimize your squad, predict points, and find the perfect captain using advanced data models.
        </motion.p>

        {/* Input Section */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleStartCoaching}
          className="w-full max-w-xl bg-white p-2 rounded-2xl shadow-xl shadow-purple-900/5 flex items-center gap-2 border border-white"
        >
          <div className="flex-1 flex items-center px-4 gap-3">
            <span className="text-gray-400 font-bold">#</span>
            <input
              type="text"
              placeholder="Enter your FPL Team ID..."
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full outline-none text-gray-700 font-medium placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            disabled={!teamId || isAnalyzing}
            className="bg-[#2B003D] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#1e002b] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Coaching
          </button>
        </motion.form>

        {/* Analysis Card */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-12 w-full max-w-xl bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[16px] shadow-2xl shadow-purple-900/10 text-left"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E1B4B]">Analyzing Team ID: {teamId}</h3>
                  <p className="text-xs text-gray-500 font-medium">Running 10,000 predictive simulations...</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(analysisStep / steps.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                />
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isActive = analysisStep > index;
                  const isCurrent = analysisStep === index;
                  
                  return (
                    <div key={step.id} className="flex items-center gap-4 transition-all">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                        isActive ? "bg-emerald-500 text-white" : 
                        isCurrent ? "bg-[#37003C] text-white animate-pulse" : 
                        "bg-gray-100 text-gray-300"
                      )}>
                        {isActive ? (
                          <CircleCheck className="w-5 h-5" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <span className={cn(
                        "text-xs font-bold transition-all",
                        isActive ? "text-gray-400" : 
                        isCurrent ? "text-[#1E1B4B]" : 
                        "text-gray-300"
                      )}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default LandingPage;
