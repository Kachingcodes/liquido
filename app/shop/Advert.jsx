"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { adverts } from "@/public/assets";


const Advert = () => {
  return (
    <section className="w-full py-16 mt-10 bg-[#3A699A]">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={60}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 4000, 
          disableOnInteraction: false,
        }}
        speed={1200} // smooth sliding speed
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        className="px-6"
      >
        {adverts.map((adverts) => (
          <SwiperSlide key={adverts.id}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={adverts.image}
                alt={adverts.text}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <p className="text-center font-medium">{adverts.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Advert;
