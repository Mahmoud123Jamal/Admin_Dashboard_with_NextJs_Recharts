"use client";

import StateCard from "@/components/StateCard";
import {
  ChartBarStacked,
  DollarSign,
  ShoppingBag,
  SquareActivity,
} from "lucide-react";

function ProductsPage() {
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <main className="max-w-7xl mx-auto p-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StateCard name="Total Products" icon={ShoppingBag} value="4,444" />
          <StateCard name="Total Stock" icon={SquareActivity} value="15,888" />
          <StateCard name="Total Sold" icon={DollarSign} value="15084.22$" />
          <StateCard
            name="Total Categories"
            icon={ChartBarStacked}
            value="10"
          />
        </div>
      </main>
    </div>
  );
}

export default ProductsPage;
