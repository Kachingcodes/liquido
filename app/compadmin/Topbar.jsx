import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <button onClick={toggleSidebar} className="lg:hidden">
        <Menu size={22} />
      </button>
      <h1 className="text-[#1C4672] font-semibold text-lg">Admin Dashboard</h1>
      <span className="text-gray-500 text-sm">Welcome back 👋</span>
    </header>
  );
};

export default Topbar;
