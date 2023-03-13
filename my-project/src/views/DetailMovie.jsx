// Import React hooks and components
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// Import actions and components
import { fecthDetailMovie } from "../stores/actionCreator/moviesCreator";
import {InformationMovie} from "../Components/InformationMovie";
import Navbar from "../Components/Navbar";
import CarouselMovie from "../Components/CarouselMovie";
import Footer from "../Components/Footer";
import MovieSeatBooking from "../Components/MovieSeatBooking";

const DetailMovie = () => {
  // Retrieve the movie details from the Redux store
  const { detailMovie } = useSelector((state) => state.movies);

  // Retrieve the movie ID from the URL parameters
  const { id } = useParams();

  // Create a dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // Create a state variable to track whether the data is loading or not
  const [isLoading, setIsLoading] = useState(true);

  // Define an asynchronous function to fetch the movie details
  const fetchDataDetailMovie = async () => {
    try {
      // Set the loading state to true
      setIsLoading(true);
      // Dispatch an action to fetch the movie details from the API
      await dispatch(fecthDetailMovie(id));
    } catch (error) {
      // Handle any errors that occur
    } finally {
      // Use a timeout to set the loading state to false after 500ms
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Use the useEffect hook to fetch the movie details when the ID changes
  useEffect(() => {
    fetchDataDetailMovie();
  }, [id]);

  // If the data is still loading, show a loading spinner
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

  // If the data has finished loading, display the movie details and recommendations
  return (
    <>
      <Navbar />
      <InformationMovie
        key={detailMovie?.id}
        oneMovie={detailMovie?.detailMovie}
      />


      {/* <MovieSeatBooking /> */}
    <div className="py-14 bg-[#101116]">
      <CarouselMovie
        key={detailMovie?.dataRecomendationMovie?.results?.id}
        movies={detailMovie?.dataRecomendationMovie?.results}
        title={"Recommendation"}
      />
    </div>

      <Footer/>
    </>
  );
};

// Export the component as the default export
export default DetailMovie;
