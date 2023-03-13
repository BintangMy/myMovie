import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const CardMovie = ({ oneMovie }) => {
  const rating = Math.min(Math.floor(oneMovie.vote_average * 10), 100);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        return newScore > rating ? rating : newScore;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [rating]);

  let pathColor;
  if (score < 50) {
    pathColor = "#FF4136"; // red
  } else if (score < 70) {
    pathColor = "#FFDC00"; // yellow
  } else {
    pathColor = "#2ECC40"; // green
  }

  return (
    <div className="w-[155px] h-[270px] relative text-white rounded-lg">
      <img
        src={`https://image.tmdb.org/t/p/original${oneMovie.poster_path}`}
        alt="posterImg"
        className="rounded-xl"
      />
      {/* <DynamicCircularProgress rating={rate}/> */}

      <div className="absolute p-1 top-0 right-0 text-center">
        <div className="bg-black rounded-full w-10 h-10 border-2 border-black">
          <CircularProgressbar
            className="font-Poppins font-bold text-center text-white"
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              pathColor,
              textColor: "#fff",
              trailColor: "#d6d6d6",
              textSize: "25px",
              fontWeight: "900",
            })}
          />
        </div>
      </div>

      <div className="text-center">
        <div id="title" className="text-[11px]">
          {oneMovie.original_title}
        </div>
      </div>
    </div>
  );
};

// export default CardMovie;
