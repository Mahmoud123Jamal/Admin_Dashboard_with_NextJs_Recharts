"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { motion } from "framer-motion";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function CategoryChart() {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data.categories || []);
      })
      .catch((err) => console.error("Error loading categories data:", err));
  }, []);

  const dataWithColors = categoryData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      className="bg-[#1e1e1e] border border-blue-500/30 rounded-xl p-6 shadow-lg shadow-blue-500/5 hover:border-blue-500 transition-all cursor-pointer"
    >
      <h2 className="text-xl font-bold text-white mb-4">
        Category Distribution
      </h2>
      <div className="w-full h-96 sm:h-96 md:h-100">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithColors}
              labelLine={false}
              label={({ name, percent }) => {
                if (windowWidth < 640) {
                  return `${(percent! * 100).toFixed(0)}%`;
                }
                const charLimit = windowWidth < 1024 ? 9 : 12;
                const shortName =
                  name!.length > charLimit
                    ? name!.substring(0, charLimit) + "..."
                    : name;
                return `${shortName} ${(percent! * 100).toFixed(0)}%`;
              }}
              nameKey="name"
              dataKey="value"
              isAnimationActive={true}
              animationBegin={400}
              animationDuration={1500}
              animationEasing="ease-out"
              outerRadius={windowWidth < 1024 ? "50%" : "60%"}
              cx="50%"
              cy="45%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1e1e",
                borderColor: "#333",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend
              verticalAlign="bottom"
              height={windowWidth < 640 ? 72 : 36}
              iconType="circle"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
                width: "100%",
                fontSize: windowWidth < 640 ? "11px" : "12px",
                paddingTop: "10px",
              }}
            />
            <RechartsDevtools />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default CategoryChart;
