"use client";

import { motion } from "framer-motion";

const SUGGESTIONS = [
  "Who should I captain this week?",
  "Is it worth taking a -4?",
  "Who is the best captain?",
];

export const ChatSuggestions = () => {
  return (
    <div className="flex flex-wrap gap-3 mb-4 mt-8">
      {SUGGESTIONS.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#00F5FF] hover:bg-[#00D9E6] text-[#2E004B] text-[13px] font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap"
        >
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
};
