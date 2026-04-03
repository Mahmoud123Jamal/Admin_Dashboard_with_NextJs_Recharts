import Image from "next/image";
import uk from "../public/images/uk.png";
import admin from "../public/images/admin.jpg";
import { Bell } from "lucide-react";
function Header() {
  return (
    <header className="bg-[#1e1e1e] text-white  shadow-2xl mx-4 md:mx-6 lg:mx-8 mt-4 mb-2 rounded-lg relative">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-100">
          Dashboard
        </h1>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image
            src={uk}
            alt="Country flag"
            width={25}
            height={18}
            className="rounded-sm"
          />
          <div className="relative">
            <Bell className="size-5 text-gray-300 cursor-pointer hover:text-white " />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src={admin}
              alt="admin"
              width={35}
              height={35}
              className="rounded-full border border-gray-200"
            />
            <span className="hidden sm:block font-medium text-gray-100">
              John Mark
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
