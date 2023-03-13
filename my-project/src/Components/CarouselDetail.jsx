import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { CardMovie } from "./CardMovie";

function CarouselDetail({ videos }) {
  // console.log(videos, "ini videoooooooooooooooooooooo");
  if(videos.length >= 20){
    videos = videos.slice(0, -15);
  }else if(videos.length >= 30){
    videos = videos.slice(0, -20);
  }

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

  const VideosCard = ({ oneVideo }) => {
    return (
      <iframe
        className="w-[360px] h-[18 0px] rounded-md mt-2"
        src={`https://www.youtube.com/embed/${oneVideo.key}?rel=0`}
        allow="autoplay"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );
  };

  return (
    <div className="relative font-Montserrat">
      {/* <div className="py-4 text-2xl px-4 text-white">{title}</div> */}
      <ScrollbarHide />
      <div
        id="content"
        className="carousel flex gap-4 items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {videos.map((el) => {
          return <VideosCard oneVideo={el} />;
        })}
      </div>
    </div>
  );
}

export default CarouselDetail;
