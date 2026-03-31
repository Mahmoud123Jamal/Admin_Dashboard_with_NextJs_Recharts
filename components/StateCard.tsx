"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type StateCardProps = {
  name: string;
  icon: LucideIcon;
  value: string;
};

function StateCard({ name, icon: Icon, value }: StateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="bg-[#1e1e1e] border border-blue-500/30 rounded-xl p-6 shadow-lg shadow-blue-500/5 hover:border-blue-500 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between ">
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            {name}
          </h3>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>

        <motion.div
          whileHover={{ rotate: 15 }}
          className="bg-blue-500/10 rounded-lg p-3 ms-1"
        >
          <Icon className="w-6 h-6 text-blue-500 " />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-blue-500/5 opacity-0 hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export default StateCard;
