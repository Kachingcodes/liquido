'use client';
import React from 'react';

const Wave = () => {
  return (
   <section className="w-full bg-white relative overflow-hidden py-8">

    <div
      className="absolute top-0 left-0 w-full h-40 bg-no-repeat bg-cover hidden md:block"
      style={{ backgroundImage: "url('/footer.svg')" }}
    ></div>

    <div
      className="absolute top-0 left-0 w-full h-40 bg-no-repeat bg-cover block md:hidden"
      style={{ backgroundImage: "url('/phonewaves.svg')" }}
    ></div>

  </section>
  );
};

export default Wave;