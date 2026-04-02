"use client";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { motion } from "framer-motion";

export default function SalesOverviewChart() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setSalesData(data.sales || []);
      })
      .catch((err) => console.error("Error loading sales data:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-[#1e1e1e] border border-blue-500/30 rounded-xl p-6 shadow-lg shadow-blue-500/5 hover:border-blue-500 transition-all cursor-pointer"
    >
      <h2 className="text-xl font-bold text-white mb-4">Sales Overview</h2>
      <div className="w-full h-62.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={salesData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                borderColor: "#333",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="var(--color-chart-1, #3b82f6)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-surface-base, #1e1e1e)",
              }}
              activeDot={{
                stroke: "var(--color-surface-base, #1e1e1e)",
              }}
              isAnimationActive={true}
              animationBegin={400}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <RechartsDevtools />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
