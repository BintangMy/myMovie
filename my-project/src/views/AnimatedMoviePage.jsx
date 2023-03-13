import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimatedMovies } from "../stores/actionCreator/moviesCreator";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import { Movies } from "../Components/Movies";

const AnimatedMoviePage = () => {
  const { animatedMovies } = useSelector((state) => state.movies);
  const dispatcher = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnimatedMovie = async () => {
    try {
      await dispatcher(fetchAnimatedMovies());
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchAnimatedMovie();
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

  console.log(animatedMovies, "ini data animateddddddddddddddddddddddd");
  return (
    <>
      <Navbar />
      <div className="w-full h-14 bg-[#101116] "></div>
      <div className="relative bg-[#101116] font-Montserrat px-28 py-4">
        <div className="py-4 text-2xl px-4 text-white">Kids Movie</div>
        <Movies movies={animatedMovies} />
      </div>
      <Footer/>
    </>
  );
};

export default AnimatedMoviePage;
