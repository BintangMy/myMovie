import { FaTwitter, FaYoutube, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return(
        <div
        id="footer"
        className="mt-0.5 text-gray-400 bg-cover bg-no-repeat h-60 pt-8 font-Montserrat flex flex-col gap-4 items-center px-20 backdrop-brightness-50 bg-[#101116]"
      >
        <div className="text-4xl"><img src="https://ik.imagekit.io/bintangtopup/MyMovie/logoMyMovie.png?updatedAt=1678691448378" alt="" width={120} /></div>
        <div className="flex gap-6 text-sm font-semibold text-white">
          <a href="#" className="text-blue-500">Home</a>
          <a href="#">Movies</a>
          <a href="#">TV Series</a>
          <a href="#">Genre</a>
          <a href="#">Help</a>
        </div>
        <div id="icon" className="flex gap-5 text-sm">
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black border hover:border-blue-500 hover:text-blue-500">
            <FaTwitter  className=""/>
          </div>
          <div className="w-8 h-8 flex justify-center items-center rounded-full  bg-black border hover:border-red-600 hover:text-red-600">
            <FaYoutube className=""/>
          </div>
          <div className="w-8 h-8 flex justify-center items-center rounded-full  bg-black border hover:border-blue-500 hover:text-blue-500">
            <FaFacebook className=""/>
          </div>
          <div className="w-8 h-8 flex justify-center items-center rounded-full  bg-black border hover:border-green-500 hover:text-green-500">
            <FaWhatsapp className=""/>
          </div>
        </div>
        <div id="quotes" className="w-5/12 text-center text-sm ">
          BintangMy
        </div>
      </div>
    )
}

export default Footer