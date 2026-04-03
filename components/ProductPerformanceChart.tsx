"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { motion } from "framer-motion";

function ProductPerformanceChart() {
  const [productData, setProductData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProductData(data.productPerformance || []);
      })
      .catch((err) => console.error("Error loading product data:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      className="bg-[#1e1e1e] border border-blue-500/30 rounded-xl p-6 shadow-lg shadow-blue-500/5 hover:border-blue-500 transition-all cursor-pointer"
    >
      <h2 className="text-xl font-bold text-white mb-4">
        Product Performance
      </h2>
      <div className="w-full h-96 sm:h-96 md:h-100">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => value.length > 8 ? value.substring(0, 8) + '...' : value}
            />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                borderColor: "#333",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Retention" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <RechartsDevtools />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default ProductPerformanceChart;
