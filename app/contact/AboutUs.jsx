import React from "react";

export default function About() {
  return (
    <section className="relative bg-[#4C86C4] text-white py-20 px-6 overflow-hidden">
      
      {/* Desktop / Tablet Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover hidden md:block"
        style={{ backgroundImage: "url('/heroside.svg')" }}
      ></div>

      {/* Mobile Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover block md:hidden"
        style={{ backgroundImage: "url('/phonehero.svg')" }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p className="mb-4">
          At <span className="font-semibold">[Company Name]</span>, we believe every drop matters. 
          We provide high-quality liquid products—from clean, refreshing water to specialty liquids 
          for homes, businesses, and industries.
        </p>
        <p className="mb-4">
          Our mission is simple: to make access to essential and premium liquids easy, reliable, and affordable. 
          With a commitment to quality and customer satisfaction, we ensure every product we deliver adds value to your life.
        </p>
        <p>
          Whether it’s hydration, refreshment, or specialized solutions, 
          <span className="font-semibold"> [Company Name]</span> is here to serve you—one drop at a time.
        </p>
      </div>
    </section>
  );
}
