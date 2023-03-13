import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../views/HomePage";
import DetailMovie from "../views/DetailMovie";
import MoviePage from "../views/Movies";
import AnimatedMoviePage from "../views/AnimatedMoviePage";
import BookingSeats from "../Components/MovieSeatBooking";
import LoginPage from "../views/LoginPage"
const router = createBrowserRouter([
    {
        path:"/",
        element: <HomePage />
    },
    {
        path:"/login",
        element: <LoginPage />
    },
    {
        path:"/movies",
        element: <MoviePage />
    },
    {
        path:"/animated_movies",
        element: <AnimatedMoviePage />
    },
    {
        path:"/my_list",
        element: <BookingSeats />
    },
    {
        path:"/detail/:id",
        element: <DetailMovie/>
    }
])

export default router