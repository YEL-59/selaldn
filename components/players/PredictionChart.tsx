"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  CartesianGrid,
} from "recharts";

interface PredictionData {
  name: string;
  venue: string;
  pts: number;
}

interface PredictionChartProps {
  data?: PredictionData[];
}

export const PredictionChart = ({ data = [] }: PredictionChartProps) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full bg-[#37003C] rounded-[5px] p-8 h-[380px] shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-1.5 h-6 bg-cyan-400 rounded-full" />
        <h3 className="text-[18px] font-semibold text-white tracking-tight">
          The Prediction (Next 3 GWs)
        </h3>
      </div>

      <div className="h-[250px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: -20, bottom: 20 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#ffffff"
              strokeOpacity={0.05}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 900 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 900 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "#2E004B",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "5px",
                fontWeight: 900,
                fontSize: "12px",
                color: "#fff",
              }}
            />
            <Bar dataKey="pts" radius={[4, 4, 0, 0]} barSize={45}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 1 ? "url(#purpleGradient)" : "url(#cyanGradient)"
                  }
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F5FF" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00F5FF" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#A855F7" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-around absolute bottom-8 left-0 right-0 px-24 pointer-events-none">
        {data.map((d, i) => (
          <div key={i} className="text-center">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
              {d.venue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
