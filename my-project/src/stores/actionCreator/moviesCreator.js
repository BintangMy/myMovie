import {
  FETCH_POPULER_MOVIE,
  FETCH_GENRES_MOVIE,
  FETCH_MOVIES_ONE_GENRE,
  FETCH_DETAIL_MOVIES,
  FETCH_ALL_MOVIES_GENRE,
  FETCH_ANIMATED_MOVIE,
  FETCH_SEARCH_MOVIE
} from "../actionType";

export const actionSetPopulerMovies = (payload) => {
  return {
    type: FETCH_POPULER_MOVIE,
    payload,
  };
};

export const actionSetGenres = (payload) => {
  return {
    type: FETCH_GENRES_MOVIE,
    payload,
  };
};

export const actionSetGenresOneGenre = (payload) => {
  return {
    type: FETCH_MOVIES_ONE_GENRE,
    payload,
  };
};

export const actionSetDetailMovie = (payload) => {
  return {
    type: FETCH_DETAIL_MOVIES,
    payload,
  };
};

export const actionSetAllMoviesGenre = (payload) => {
  return {
    type: FETCH_ALL_MOVIES_GENRE,
    payload,
  };
};

export const actionSetAnimatedMovie = (payload) => {
  return {
    type: FETCH_ANIMATED_MOVIE,
    payload,
  };
};

export const actionSetSearchMovie = (payload) => {
  return {
    type: FETCH_SEARCH_MOVIE,
    payload,
  }
}

export const fetchDataPopulerMovies = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        "http://localhost:3000/movie", {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      let data = await response.json();
      // data = data.results.slice(0, -15)

      let newMovies = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=c38a741944578d5acf377d60139360ef&language=en-US&page=1", {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!newMovies.ok) {
        throw new Error("Response not ok");
      }

      newMovies = await newMovies.json();

      let kidsMovies = await fetch(
        "http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=16", {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!kidsMovies.ok) {
        throw new Error("Response not ok");
      }

      kidsMovies = await kidsMovies.json();

      let horrorMovies = await fetch(
        " http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=27", {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!horrorMovies.ok) {
        throw new Error("Response not ok");
      }

      horrorMovies = await horrorMovies.json();

      let result = {};

      result.newMovies = newMovies.results.slice(0, -15);
      result.movies = data.results;
      result.kidsMovies = kidsMovies.results;
      result.horrorMovies = horrorMovies.results;

      dispatch(actionSetPopulerMovies(result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDataGenres = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=c38a741944578d5acf377d60139360ef&language=en-US", {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      let data = await response.json();
      data = data.genres.slice(0, -5);
      // console.log(data.genres.slice(0, -5), 'ini genressssssssssssssssssssssssssssssssssssss')
      dispatch(actionSetGenres(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOneGenreMovies = (genre = 28) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=${genre}`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      let data = await response.json();
      data = data.results.slice(0, -2);
      console.log(data, "ini 1 genre ya ges yaaaaaaaaaaaaaaa");
      dispatch(actionSetGenresOneGenre(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fecthDetailMovie = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=c38a741944578d5acf377d60139360ef&append_to_response=casts,videos,images,release`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      let data = await response.json();

      const recomendationMovie = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=c38a741944578d5acf377d60139360ef&page=1`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!recomendationMovie.ok) {
        throw new Error("Response not ok");
      }

      let dataRecomendationMovie = await recomendationMovie.json();

      let results = {}
      results.detailMovie = data
      results.dataRecomendationMovie = dataRecomendationMovie

      dispatch(actionSetDetailMovie(results));
    } catch (error) {
      console.log(error)
    }
  };
};


export const fetchAllMovies = () => {
  return async (dispatch, getState) => {
    try {
      const responseActionMovie = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=28`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseActionMovie.ok) {
        throw new Error("Response not ok");
      }

      let actionMovie = await responseActionMovie.json();

      const responseAdventureMovie = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&api_key=c38a741944578d5acf377d60139360ef&with_genres=12`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseAdventureMovie.ok) {
        throw new Error("Response not ok");
      }

      let adventureMovie = await responseAdventureMovie.json();


      const responseAnimationMovie = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=16`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseAnimationMovie.ok) {
        throw new Error("Response not ok");
      }

      let animationMovie = await responseAnimationMovie.json();


      const responseComedyMovie = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=35`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseComedyMovie.ok) {
        throw new Error("Response not ok");
      }

      let comedyMovie = await responseComedyMovie.json();

      const responseCrimeMovie = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=80`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseCrimeMovie.ok) {
        throw new Error("Response not ok");
      }

      let crimeMovie = await responseCrimeMovie.json();

      const responseDocumentaryMovie = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=99`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!responseDocumentaryMovie.ok) {
        throw new Error("Response not ok");
      }

      let documentaryMovie = await responseDocumentaryMovie.json();


      let results = {}
      results.actionMovie = actionMovie.results
      results.adventureMovie = adventureMovie.results
      results.animationMovie = animationMovie.results
      results.comedyMovie = comedyMovie.results
      results.crimeMovie = crimeMovie.results
      results.documentaryMovie = documentaryMovie.results

      // console.log(actionMovie, 'ini data all movie dariiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
      dispatch(actionSetAllMoviesGenre(results));
    } catch (error) {
      console.log(error);
    }
  };
};


export const fetchAnimatedMovies = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `http://api.themoviedb.org/3/discover/movie?query=drama&sort_by=vote_count.desc&api_key=c38a741944578d5acf377d60139360ef&with_genres=16`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      let data = await response.json();

      dispatch(actionSetAnimatedMovie(data.results));
    } catch (error) {
      console.log(error);
    }
  };
};


export const fecthSearchMovies = (query) => {
  console.log(query,'kkkkkkkkkkkkk')
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c38a741944578d5acf377d60139360ef&query=${query}`, {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if(!response.ok){
        throw new Error("Response not ok");
      }

      let data = await response.json()
      // console.log(data, 'ini data hasil search')
      dispatch(actionSetSearchMovie(data.results))
    } catch (error) {
      console.log(error)
    }
  }
}