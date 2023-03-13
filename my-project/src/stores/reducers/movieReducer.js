import {
  FETCH_POPULER_MOVIE,
  FETCH_GENRES_MOVIE,
  FETCH_MOVIES_ONE_GENRE,
  FETCH_DETAIL_MOVIES,
  FETCH_ALL_MOVIES_GENRE,
  FETCH_ANIMATED_MOVIE,
  FETCH_SEARCH_MOVIE
} from "../actionType";

const initialState = {
  populerMovies: {},
  oneGenreMovies: {},
  genreMovies: [],
  detailMovie: {},
  allMoviesGenre: {},
  animatedMovies: {},
  searchMovies:{}
};

const movieReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case FETCH_POPULER_MOVIE:
      return {
        ...state,
        populerMovies: action.payload,
      };
    case FETCH_GENRES_MOVIE:
      return {
        ...state,
        genreMovies: action.payload,
      };
    case FETCH_MOVIES_ONE_GENRE:
      return {
        ...state,
        oneGenreMovies: action.payload,
      };
    case FETCH_DETAIL_MOVIES:
      return {
        ...state,
        detailMovie: action.payload,
      };
    case FETCH_ALL_MOVIES_GENRE:
      return {
        ...state,
        allMoviesGenre: action.payload,
      };
    case FETCH_ANIMATED_MOVIE:
      return {
        ...state,
        animatedMovies: action.payload,
      };
    case FETCH_SEARCH_MOVIE:
      return {
        ...state,
        searchMovies: action.payload
      }
    default:
      return state;
  }
};

export default movieReducer;
