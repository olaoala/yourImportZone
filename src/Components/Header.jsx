import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import img1 from '../Assets/LH1.jpg'
import img2 from '../Assets/LW1.jpg'
import img3 from '../Assets/P1.jpg'


const Header = () => {
  const images = [img1,img2,img3];

  return (
    <header className="relative w-full h-[300px] md:h-[500px] mt-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 h-96 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
              <h1 className="text-xl font-nunito md:text-4xl font-bold mb-4">
                DISCOVER YOUR WINNING VENDORS - <br /> DON'T MISS OUT
              </h1>
              <p className="text-sm text-gray-400 font-poppins md:text-md mb-4">
                Unlock business success with exclusive access.
              </p>
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
};

export default Header;
