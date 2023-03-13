import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataPopulerMovies,
  fetchDataGenres,
  fetchOneGenreMovies,
} from "../stores/actionCreator/moviesCreator";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import MainCarousel from "../Components/MainCarousel";
import CarouselMovie from "../Components/CarouselMovie";
import { Genres } from "../Components/Genre";
import { Movies } from "../Components/Movies";

const HomePage = () => {
  const { populerMovies } = useSelector((state) => state.movies);
  const { genreMovies } = useSelector((state) => state.movies);
  const { oneGenreMovies } = useSelector((state) => state.movies);
  let [genreId, setGenreId] = useState(null);
  const dispatcher = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopulerMovies = async () => {
    try {
      await dispatcher(fetchDataPopulerMovies());
      await dispatcher(fetchDataGenres());
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const handleChildEmit = (messageFromChild) => {
    setGenreId(messageFromChild);
    dispatcher(fetchOneGenreMovies(messageFromChild));
  };

  useEffect(() => {
    fetchPopulerMovies();
  }, []);

  useEffect(() => {
    dispatcher(fetchOneGenreMovies(genreId));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          style={{ "border-top-color": "transparent" }}
          className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
        ></div>
        <p className="ml-2">Processing...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <MainCarousel movies={populerMovies.newMovies} />
      <CarouselMovie movies={populerMovies.movies} title={"Trending"} />

      <div className="relative bg-[#101116] font-Montserrat px-28 py-4">
        <div className="py-4 text-2xl px-4 text-white">Movies</div>
        <Genres genres={genreMovies} onEmits={handleChildEmit} />
        <Movies movies={oneGenreMovies} />
      </div>
      <CarouselMovie movies={populerMovies.kidsMovies} title={"Animation"} />
      <CarouselMovie movies={populerMovies.horrorMovies} title={"Horror"} />

      <div
        id="subscribe"
        className="bg-cover bg-no-repeat h-60 font-Poppins flex justify-around items-center px-20 backdrop-brightness-50"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/d6/13/1c/d6131c3912e32640d583da8db8dffeb9.jpg')",
        }}
      >
        <div className="w-6/12 text-xl">
          Subscribe to the newsletter and be the fist to know about new release
          of your TV series and movies.
        </div>
        <div className="w-4/12">
          <div className="mt-3 flex flex-row flex-wrap ">
            <input
              type="text"
              className="bg-none text-gray-600 w-2/3 p-2 rounded-l-lg border-2 border-[#3C79F5]"
              placeholder="john@mail.com"
            />
            <button
              className="p-2 w-1/3 bg-[#3C79F5] rounded-r-lg text-white"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default HomePage;
