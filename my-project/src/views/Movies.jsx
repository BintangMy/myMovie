import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllMovies } from "../stores/actionCreator/moviesCreator";
import CarouselMovie from "../Components/CarouselMovie";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MoviePage = () => {
  const { allMoviesGenre } = useSelector((state) => state.movies);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchAllMovie = async () => {
    try {
      await dispatch(fetchAllMovies());
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchAllMovie();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
        ></div>
        <p className="ml-2">Processing...</p>
      </div>
    );
  }


  return (
    <>
      <Navbar />
      <div className="w-full h-14 bg-[#101116] "></div>
      <CarouselMovie movies={allMoviesGenre.actionMovie} title={"Action"}/>
      <CarouselMovie movies={allMoviesGenre.adventureMovie} title={"Adventure"}/>
      <CarouselMovie movies={allMoviesGenre.animationMovie} title={"Animation"}/>
      <CarouselMovie movies={allMoviesGenre.comedyMovie} title={"Comedy"}/>
      <CarouselMovie movies={allMoviesGenre.crimeMovie} title={"Crime"}/>
      <CarouselMovie movies={allMoviesGenre.documentaryMovie} title={"Documentary"}/>
    <Footer/>
    </>
  );
};

export default MoviePage;
