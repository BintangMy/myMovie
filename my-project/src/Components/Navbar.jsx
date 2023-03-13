import { FaUserAlt , FaListUl} from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { fecthSearchMovies } from "../stores/actionCreator/moviesCreator";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const { searchMovies } = useSelector((state) => state.movies);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(fecthSearchMovies(searchTerm));
  }, [searchTerm]);

  

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setShowOptions(false);
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log(searchTerm, "??????????????", searchMovies);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const activeStyle = {
    color: "#3b82f6",
  };

  const navItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
  };

  const navItemDotStyle = {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
    marginTop: "4px",
    display: "none",
  };

  const activeNavItemDotStyle = {
    display: "block",
  };

  return (
    <>
      <div
        id="nav"
        className={`${
          isScrolled
            ? "fixed top-0 left-0 right-0 bg-black bg-opacity-20 backdrop-filter backdrop-blur-md"
            : "absolute"
        }  text-white flex items-center justify-around  z-50 w-full py-4 transition-all duration-300`}
      >
        <div id="logo"><img src="https://ik.imagekit.io/bintangtopup/MyMovie/logoMyMovie.png?updatedAt=1678691448378" alt="" width={120} /></div>
        <div className="flex gap-12 translate-x-[10%] items-center text-sm">
          <Link
            to="/"
            className=" hover:text-blue-500"
            style={pathname === "/" ? activeStyle : {}}
          >
            <div style={navItemStyle}>
              Home
              <div
                className="nav-dot"
                style={
                  pathname === "/"
                    ? { ...navItemDotStyle, ...activeNavItemDotStyle }
                    : navItemDotStyle
                }
              />
            </div>
          </Link>
          <Link
            to="/movies"
            className=" hover:text-blue-500"
            style={pathname === "/movies" ? activeStyle : {}}
          >
            <div style={navItemStyle}>
              Movies
              <div
                className="nav-dot"
                style={
                  pathname === "/movies"
                    ? { ...navItemDotStyle, ...activeNavItemDotStyle }
                    : navItemDotStyle
                }
              />
            </div>
          </Link>
          <Link
            to="/animated_movies"
            className=" hover:text-blue-500"
            style={pathname === "/animated_movies" ? activeStyle : {}}
          >
            <div style={navItemStyle}>
              Kids
              <div
                className="nav-dot"
                style={
                  pathname === "/animated_movies"
                    ? { ...navItemDotStyle, ...activeNavItemDotStyle }
                    : navItemDotStyle
                }
              />
            </div>
          </Link>
          {/* <Link
            to="/my_list"
            className=" hover:text-blue-500"
            style={pathname === "/my_list" ? activeStyle : {}}
          >
            <div style={navItemStyle}>
              My Ticket
              <div
                className="nav-dot"
                style={
                  pathname === "/my_list"
                    ? { ...navItemDotStyle, ...activeNavItemDotStyle }
                    : navItemDotStyle
                }
              />
            </div>
          </Link> */}
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21L15 15M15 15C17.7614 12.2386 17.7614 7.76142 15 5C12.2386 2.23858 7.76142 2.23858 5 5C2.23858 7.76142 2.23858 12.2386 5 15C7.76142 17.7614 12.2386 17.7614 15 15Z"
                />
              </svg>
            </span>
            <input
              className="block w-[200px] bg-gray-100 text-gray-900 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:bg-white focus:text-gray-900"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setShowOptions(true)}
              onBlur={() => setShowOptions(false)}
            />
            {showOptions && searchTerm && (
              <div className="absolute bg-white text-black w-full border rounded-lg mt-1">
                {searchMovies?.map((el) => (
                  <Link
                    to={`/detail/${el.id}`}
                    className="px-4 flex py-2 items-center gap-4 cursor-pointer"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${el.poster_path}`}
                      alt="posterImg"
                      className="rounded-sm w-5 h-9"
                    />
                    <div>{el.original_title}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <IconContext.Provider value={{ className: "icon" }}>
            {localStorage.getItem("access_token") ? (
              <BiCameraMovie className="text-[25px]" />
            ) : (
              <div>
                <Link to={"/login"}>
                  <FaUserAlt />
                </Link>
              </div>
            )}
          </IconContext.Provider>
        </div>
      </div>
      {isScrolled ? <div className="w-full h-6"></div> : null}
    </>
  );
};

export default Navbar;
