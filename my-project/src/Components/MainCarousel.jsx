import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import "swiper/css/pagination";

const MainCarousel = ({ movies }) => {
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (swiper) {
        if (swiper.isEnd) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [swiper]);

  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper text-white font-Montserrat bg-black "
      onSwiper={setSwiper}
    >
      {movies.map((el) => {
        return (
          <SwiperSlide className="flex relative" key={el.id} >
            <img
              src={`https://image.tmdb.org/t/p/original${el.backdrop_path}`}
              alt=""
              className="brightness-[.3] object-cover h-screen w-screen"
            />
            <div className="absolute ml-28 translate-y-56 flex flex-col gap-2 ">
              {/* <div id="genre">Comedy | Adventure | Fantasy</div> */}
              <div id="title" className="text-5xl font-semibold">
                {el.original_title}
              </div>
              <div id="description" className="w-6/12 text-sm">
                {el.overview}
              </div>
              <div className="flex gap-4 text-xs">
                <div>TMDb: {el.vote_average}</div>
                <div>{el.release_date}</div>
                <div>16+</div>
              </div>
              <div className="my-4 flex gap-5 items-center font-semibold">
                <a href="#" className="bg-[#3C79F5] p-2 rounded-full hover:shadow-md hover:shadow-[#3C79F5] ">
                  Watch now
                </a>
                <a href="#" className="bg-white text-[#3C79F5] p-2 rounded-full">
                  Add to list
                </a>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default MainCarousel;
