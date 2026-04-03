"use client";
import SalesOverview from "@/components/SalesOverviewChart";
import StateCard from "@/components/StateCard";
import { DollarSign, ShoppingBag, SquareActivity, Users } from "lucide-react";
import CategoryChart from "../../components/CategoryChart";

function Overview() {
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <main className="max-w-7xl mx-auto p-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StateCard name="Total Sales" icon={DollarSign} value="158.22$" />
          <StateCard name="Total Clients" icon={Users} value="158,888" />
          <StateCard name="Total Products" icon={ShoppingBag} value="758" />
          <StateCard name="Stock" icon={SquareActivity} value="58,800" />
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
          <SalesOverview />
          <CategoryChart />
        </div>
      </main>
    </div>
  );
}

export default Overview;
