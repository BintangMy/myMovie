import CarouselDetail from "../Components/CarouselDetail";
import { FaStar } from "react-icons/fa ";

export const InformationMovie = ({ oneMovie }) => {
  const ScrollbarHide = () => {
    return (
      <style>
        {`
              #information::-webkit-scrollbar {
                display: none;
              }
            `}
      </style>
    );
  };

  return (
    <div className="flex relative h-screen bg-[#101116]">
      {/* bg-[url('https://image.tmdb.org/t/p/original/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg')] */}
      <div
        className="bg-cover bg-center flex w-10/12 p-4 mx-28 mt-28 rounded-xl"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 20%, rgba(0,0,0,0.7) 45%), url('https://image.tmdb.org/t/p/original${oneMovie.backdrop_path}')`,
        }}
      >
        <img
          className="w-[210px] h-[290px] rounded-md"
          src={`https://image.tmdb.org/t/p/original${oneMovie.poster_path}`}
          alt=""
        />

        <ScrollbarHide />
        <div
          id="information"
          className="ml-5 font-Montserrat flex flex-col gap-4  text-white overflow-y-auto"
        >
          <h1 className="text-4xl font-semibold ">{oneMovie.original_title}</h1>
          <div className="flex gap-2 items-center text-sm">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" /> 6.8
            </div>
            .<div>{oneMovie.runtime}m</div>.<div>{oneMovie.release_date}</div>
            <div className="bg-black py-0.5 px-1 rounded text-xs">{oneMovie.original_language.toUpperCase()}</div>
          </div>
          <div id="genre" className="text-gray-400 font-medium text-sm">
            {oneMovie.genres.map((el, i) => (
              <span key={el.id}>
                {el.name}
                {i !== oneMovie.genres.length - 1 && ", "}
              </span>
            ))}
          </div>
          <div id="description" className="text-sm w-10/12">
            {oneMovie.overview}
          </div>
          <div className="flex text-sm w-10/12">
            <div className="text-gray-400 font-semibold">Starring</div>
            <div className="ml-16">
            {oneMovie.casts.cast.map((el, i) => (
              <span key={el.id}>
                {el.name}
                {i !== oneMovie.casts.cast.length - 1 && ", "}
              </span>
            ))}
            </div>
          </div>
          {oneMovie.tagline ? (<div className="flex gap-9 text-sm">
            <div className="text-gray-400 font-semibold">Directed By</div>
            <div>{oneMovie.tagline}</div>
          </div>):""}
          
          <div className="font-semibold pt-4">Traillers and Clips</div>
          <CarouselDetail videos={oneMovie.videos.results}/>

          
        </div>
      </div>
    </div>
  );
};