import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Avatar from "/public/image/avatar.jpg";
import SpiderMan from "/public/image/spider-man.jpeg";
import Wicked from "/public/image/wicked.jpeg";
import InsideOut from "/public/image/insideout.jpeg";

const slides = [
  { src: Avatar, alt: "Avatar Poster" },
  { src: SpiderMan, alt: "Spider-Man Poster" },
  { src: Wicked, alt: "Wicked Poster" },
  { src: InsideOut, alt: "InsideOut Poster" },
];

function Banner() {
  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        effect="fade"
        speed={2000}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="aspect-video max-h-[40vh] object-cover w-full"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
