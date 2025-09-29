"use client";
import React, { useState } from "react";

export default function Checkout() {
    const [locSelected, setLocSelected] = useState("");
    const [timeSelected, setTimeSelected] = useState([]);

  const locations = ["Ikeja", "Agege", "Ogba", "Berger", "GRA", "Oshodi", "Yaba"];

    // generate slots from 8 AM to 6 PM
  const generateSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();

    for (let hour = 8; hour <= 18; hour++) {
      const slotDate = new Date();
      let labelDay = "Today";

      if (currentHour >= hour) {
        // if the slot time is already past, assign to tomorrow
        slotDate.setDate(slotDate.getDate() + 1);
        labelDay = "Tomorrow";
      }

      slotDate.setHours(hour, 0, 0, 0);

      const labelTime = slotDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      slots.push({
        value: slotDate.toISOString(),
        label: `${labelDay} - ${labelTime}`,
      });
    }

    return slots;
  };

  const slots = generateSlots();

  const handleChange = (value) => {
    setTimeSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="text-black p-6 space-y-9 mt-4 flex flex-col justify-between">
        
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold mb-4">Payment Options</h2>
            <div className="grid grid-cols-3 gap-4 items-center justify-center">
                <button className="px-4 py-4 bg-[#4C86C4] hover:bg-[#1C4672] text-white rounded-lg transition"
                >
                Cash
                </button>
                <button className="px-4 py-4 bg-[#4C86C4] hover:bg-[#1C4672] text-white rounded-lg transition">
                Transfer
                </button>
                <button className="px-4 py-4 bg-[#4C86C4] hover:bg-[#1C4672] text-white rounded-lg transition">
                POS
                </button>
            </div>
        </div>

        <div className="space-y-3">
            <h2 className="text-2xl font-semibold mb-2">Delivery Options</h2>
            <p className="text-sm">For better service, kindly choose a time you would be available</p>

            <div className="space-y-2 grid grid-cols-2 gap-2">
                {slots.map((slot) => (
                <label key={slot.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    value={slot.value}
                    checked={timeSelected.includes(slot.value)}
                    onChange={() => handleChange(slot.value)}
                    className="h-4 w-4 text-[#4C86C4] focus:ring-[#4C86C4]"
                    />
                    <span>{slot.label}</span>
                </label>
                ))}
            </div>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-semibold mb-2">Choose Your Location</h2>
            <div className="space-y-2">
                {locations.map((location) => (
                <label
                    key={location}
                    className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="radio"
                    name="location"
                    value={location}
                    checked={locSelected === location}
                    onChange={(e) => setLocSelected(e.target.value)}
                    className="h-4 w-4 text-[#4C86C4] focus:ring-[#4C86C4]"
                    />
                    <span>{location}</span>
                </label>
                ))}
            </div>
            
        </div>
      
    </div>
  );
}