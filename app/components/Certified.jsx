"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Certified() {
  const certificates = [
    { id: 1, title: " Certificate of Registration", img: "/proof/certified.png" },
    { id: 2, title: "Application for Registration of Company 1", img: "/proof/reg1.png" },
    { id: 3, title: "Application for Registration of Company 2", img: "/proof/reg2.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === certificates.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 min-h-screen overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800">
        Certifications & Licenses
      </h2>

      <div className="relative w-full max-w-lg flex items-center justify-center">
        <button
          onClick={prevImage}
          className="absolute left-0 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <ChevronLeft size={30} />
        </button>

        <div className="flex flex-col items-center overflow-hidden">
          <img
            src={certificates[currentIndex].img}
            alt={certificates[currentIndex].title}
            className="w-full max-h-[400px] object-contain rounded-lg shadow-md overflow-hidden"
          />
          <p className="mt-2 text-sm text-gray-700 text-center">
            {certificates[currentIndex].title}
          </p>
        </div>

        <button
          onClick={nextImage}
          className="absolute right-0 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
}