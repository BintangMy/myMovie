// import Card from "./Card";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CardMovie } from "./CardMovie";
function CarouselMovie({ movies, title }) {
  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 400;
  };
  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 400;
  };

  const ScrollbarHide = () => {
    return (
      <style>
        {`
        #content::-webkit-scrollbar {
          display: none;
        }
      `}
      </style>
    );
  };

  return (
    <div className="relative bg-[#101116] font-Montserrat px-28">
      <div className="py-4 text-2xl px-4 text-white">{title}</div>
      <div className="absolute right-0 top-5 pr-28">
        <button onClick={scrollLeft} className="p-2 m-2 rounded-full bg-white">
          <FiChevronLeft />
        </button>
        <button onClick={scrollRight} className="p-2 m-2 rounded-full bg-white">
          <FiChevronRight />
        </button>
      </div>
      <ScrollbarHide />
      <div
        id="content"
        className="carousel p-4 flex gap-4 items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide"
      >
        {movies.map((el) => {
          return (
            <Link to={`/detail/${el.id}`}>
              <CardMovie  key={el.id} oneMovie={el} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CarouselMovie;
