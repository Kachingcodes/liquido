import React from "react";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from "lucide-react";

const Sidebar = ({ isOpen, toggle }) => {
  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { label: "Products", icon: <Package size={20} />, href: "/admin/products" },
    { label: "Orders", icon: <ShoppingBag size={20} />, href: "/admin/orders" },
    { label: "Customers", icon: <Users size={20} />, href: "/admin/customers" },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#1C4672] text-white flex flex-col transition-all duration-300`}
    >
      <div className="p-4 text-lg font-bold tracking-wide">Liquido</div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#153A59] rounded-lg transition"
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      <button
        onClick={toggle}
        className="p-3 text-center bg-[#153A59] hover:bg-[#0D2942] transition"
      >
        {isOpen ? "<" : ">"}
      </button>

      <button className="flex items-center gap-2 px-4 py-3 hover:bg-[#153A59] transition">
        <LogOut size={18} /> {isOpen && "Logout"}
      </button>
    </aside>
  );
};

export default Sidebar;
