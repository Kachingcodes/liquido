"use client";
import React, { useState } from "react";
import { Quicksand } from "next/font/google";
import { faqs } from '@/public/assets';
import { ChevronDown, ChevronUp } from "lucide-react";

const quick = Quicksand({
  subsets: ["latin"],
  weight: ["700"]
});


export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="frequent"
      className="bg-white relative w-full py-8 flex items-center justify-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-10 w-full max-w-6xl">
        {/* Left */}
        <div className="space-y-8 max-w-xl">
          <h1 className={` ${quick.className} text-3xl font-bold text-black tracking-wide`}>
            Frequently Asked Questions
          </h1>

          <div className="bg-gray-100 space-y-4 p-4 rounded-lg">
            <h3 className="font-semibold">Still have questions?</h3>
            <span className="text-gray-700 text-sm block">
              Can't find the answer to your question? Send us an email and we
              will get back to you as soon as possible.
            </span>

            <button className="px-4 py-2 text-white bg-[#4C86C4] hover:bg-[#1C4672] rounded-md">
              Send email
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-gray-300 pb-2 cursor-pointer"
            >
              <div
                className="flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <h2 className="font-medium text-gray-800">{faq.q}</h2>
                {openIndex === i ? (
                  <ChevronUp size={20} className="text-gray-600" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600" />
                )}
              </div>

              {openIndex === i && (
                <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}