"use client";
import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Menu,
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
  const [isExpanded, setIsExpanded] = useState(true);
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
    <aside
      className={`h-screen bg-[#1e1e1e] text-white flex flex-col border-r border-gray-800 shrink-0 transition-all duration-300 ${isExpanded ? "w-20 sm:w-64" : "w-20"}`}
    >
      <div
        className={`p-6 mb-2 flex ${isExpanded ? "justify-center sm:justify-start" : "justify-center"}`}
      >
        <Menu
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-6 h-6 text-gray-200 cursor-pointer hover:text-white transition-colors"
        />
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
                    flex items-center p-3 mx-2 rounded-lg transition-all duration-200
                    ${isExpanded ? "justify-center sm:justify-start space-x-0 sm:space-x-4" : "justify-center space-x-0"}
                    ${
                      isActive
                        ? "bg-[#2a2a2a] text-white"
                        : "hover:bg-gray-800/50 text-gray-400 hover:text-white"
                    }
                  `}
                  title={
                    !isExpanded ||
                    (typeof window !== "undefined" && window.innerWidth < 640)
                      ? item.name
                      : undefined
                  }
                >
                  {IconComponent ? (
                    <IconComponent
                      className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`}
                    />
                  ) : (
                    <div className="w-5 h-5 shrink-0 bg-gray-700 rounded-full" />
                  )}
                  <span
                    className={`font-medium text-sm whitespace-nowrap overflow-hidden ${isExpanded ? "hidden sm:block" : "hidden"}`}
                  >
                    {item.name}
                  </span>
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
