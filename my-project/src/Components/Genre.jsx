import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Genres = ({ genres, onEmits }) => {
  const [activeGenre, setActiveGenre] = useState(null);
  const handleGenreClick = (genreId) => {
    setActiveGenre(genreId);
    onEmits(genreId);
  };

  return (
    <div
      id="genre"
      className="mx-4 grid grid-cols-7 gap-4 text-center text-xs font-bold"
    >
      {genres.map((el) => {
        const isActive = activeGenre === el.id;
        return (
          <Link
            to={"/"}
            key={el.id}
            onClick={() => handleGenreClick(el.id)}
            className={`bg-white py-2 px-6 rounded-full ${
              isActive ? "bg-[#3780f7] text-white" : ""
            }`}
          >
            {el.name}
          </Link>
        );
      })}
    </div>
  );
};
