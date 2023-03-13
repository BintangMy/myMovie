import { CardMovie } from "./CardMovie";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Movies = ({ movies }) => {
  const [numMovies, setNumMovies] = useState(12);
  const [isShowingAll, setIsShowingAll] = useState(false);

  const handleViewMoreClick = () => {
    if (isShowingAll) {
      setNumMovies(12);
      setIsShowingAll(false);
      document.getElementById("movies").scrollIntoView({ behavior: "smooth" });
    } else {
      setNumMovies(numMovies + 12);
      setIsShowingAll(true);
      document.getElementById("movies").scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div id="movies" className="my-6 grid grid-cols-6 gap-5">
        {movies.slice(0, numMovies).map((el) => {
          return (
            <Link to={`/detail/${el.id}`}>
              {/* <div key={el.id}> */}
              <CardMovie  key={el.id} oneMovie={el} />
              {/* </div> */}
            </Link>
          );
        })}
      </div>
      {numMovies < movies.length ? (
        <div
          className="translate-x-[345%] rounded-xl text-white border-2 text-center w-[130px] py-2 cursor-pointer"
          onClick={handleViewMoreClick}
        >
          View more
        </div>
      ) : (
        <div
          className="translate-x-[345%] rounded-xl text-white border-2 text-center w-[130px] py-2 cursor-pointer"
          onClick={() => {
            setNumMovies(12);
            document
              .getElementById("movies")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          See less
        </div>
      )}
    </>
  );
};
