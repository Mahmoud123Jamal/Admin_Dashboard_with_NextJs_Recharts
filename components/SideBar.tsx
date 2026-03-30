"use client";
import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface SidebarItem {
  name: string;
  icon: string;
  href: string;
}

function SideBar() {
  const icons: Record<string, LucideIcon> = {
    House,
    DollarSign,
    Settings,
    ShoppingBag,
    ShoppingCart,
    Mail,
    Users,
    Bell,
    Info,
  };

  const [sideBarItems, setSideBarItems] = useState<SidebarItem[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => {
        setSideBarItems(data.sidebarItems || []);
      })
      .catch((err) => console.error("Error loading sidebar data:", err));
  }, []);

  return (
    <aside className="w-64 h-screen bg-[#1e1e1e] text-white  shadow-2xl mx-4 md:mx-6 lg:mx-8  mb-2 rounded-lg flex flex-col border-r border-gray-800">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Admin Dashboard
        </h1>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {sideBarItems.map((item, index) => {
            const IconComponent = icons[item.icon];
            const isActive = pathname === item.href;

            return (
              <li key={item.name || index}>
                <Link
                  href={item.href || "#"}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                        : "hover:bg-gray-800 text-gray-400 hover:text-white"
                    }
                  `}
                >
                  {IconComponent ? (
                    <IconComponent
                      className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
                    />
                  ) : (
                    <div className="w-5 h-5 bg-gray-700 rounded-full" />
                  )}
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default SideBar;
