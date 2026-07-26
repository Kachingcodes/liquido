"use client";

import { useState } from "react";
import { Settings2, Truck, CircleHelp, LayoutGrid, Boxes } from "lucide-react";

import DeliveryFees from "./DeliveryFees";
import FAQs from "./FAQs";
import Categories from "./Categories";


export default function Configuration() {
  const [tab, setTab] = useState("delivery");

  const tabs = [
    {
      id: "delivery",
      label: "Delivery Fees",
      icon: Truck,
    },
    {
      id: "faqs",
      label: "FAQs",
      icon: CircleHelp,
    },
    {
      id: "categories",
      label: "Categories",
      icon: LayoutGrid,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

        {/* Header */}
        <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">

            <div className="flex items-center gap-3">

                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-[#1C4672]/10 flex items-center justify-center flex-shrink-0">
                <Settings2
                    size={24}
                    className="text-[#1C4672] md:w-7 md:h-7"
                />
                </div>

                <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-[#1C4672]">
                    Configuration
                </h1>

                <p className="text-sm md:text-base text-gray-500 mt-1">
                    Manage global settings across the application.
                </p>
                </div>

            </div>

            </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b sticky top-0 z-30">

            <div className="max-w-7xl mx-auto px-4 md:px-6">

            <div className="flex gap-2 overflow-x-auto no-scrollbar py-3">

                {tabs.map((item) => {
                const Icon = item.icon;

                return (
                    <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`
                        flex items-center gap-2
                        px-4 md:px-5
                        py-2.5 md:py-3
                        rounded-xl
                        whitespace-nowrap
                        transition
                        flex-shrink-0

                        ${
                        tab === item.id
                            ? "bg-[#1C4672] text-white shadow-md"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }
                    `}
                    >
                    <Icon size={18} />

                    <span className="text-sm md:text-base">
                        {item.label}
                    </span>
                    </button>
                );
                })}

            </div>

            </div>

        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">

            {tab === "delivery" && <DeliveryFees />}

            {tab === "faqs" && <FAQs />}

            {tab === "categories" && <Categories />}

        </div>

        </div>
  );
}