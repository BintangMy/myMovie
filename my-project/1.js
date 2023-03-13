import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSnapToken } from "./src/stores/actionCreator/paymentCreator";
import SelectOptions from "./SelectOptions";
const MovieSeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [location, setLocation] = useState({});
  const [bookingData, setBookingData] = useState({});
 

  function fectRandomSeat(locationn) {
    setLocation(locationn);
    setBookingData({
      ...dataUser,
      location: locationn
    });
  }
  // Menentukan posisi kursi secara random saat komponen pertama kali dirender
  function generateSeatArray() {
    const totalNumberOfSeats = 341;
    const reservedSeats = Array.from({ length: 100 }, () =>
      Math.floor(Math.random() * totalNumberOfSeats)
    );
    const seatArray = Array.from({ length: totalNumberOfSeats }, (_, i) => {
      const isReserved = reservedSeats.includes(i);
      const rowNumber = Math.floor(i / 31) + 1;
      const seatNumber = 31 - (i % 31);
      const seatLetter = String.fromCharCode(65 + 11 - rowNumber);
      const seatId = `${seatLetter}${seatNumber}`;
      return { id: seatId, isReserved };
    });
    return seatArray;
  }
  useEffect(() => {
    const seatArray = generateSeatArray();
    setSeats(seatArray);
  }, []);

  useEffect(() => {
    const seatArray = generateSeatArray();
    setSeats(seatArray);
  }, [bookingData.location, bookingData.seat]);

  const seatStatus = (isReserved, isSelected) =>
    isReserved
      ? "bg-gray-600 text-white cursor-default"
      : isSelected
      ? "bg-blue-500 text-white"
      : "bg-gray-200 text-gray-900";

  const handleSeatSelect = (seatId) =>
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((seat) => seat !== seatId)
        : [...prevSelectedSeats, seatId]
    );

  const renderSeat = ({ id, isReserved }, i) => {
    const isDisabled =
      selectedSeats.length === 10 && !selectedSeats.includes(id);

    if (
      [
        0, 1, 30, 31, 8, 9, 21, 22, 29, 61, 39, 40, 52, 53, 70, 71, 83, 84, 101,
        102, 114, 115, 132, 133, 145, 146, 163, 164, 176, 177, 194, 195, 207,
        208, 225, 226, 238, 239, 256, 257, 269, 270, 287, 288, 300, 301,
      ].includes(i)
    ) {
      return <div key={i}></div>;
    }

    

    return (
      <button
        key={i}
        className={`w-7 h-7 rounded-t-xl rounded-b-sm text-[8px] font-semibold m-0.5 ${seatStatus(
          isReserved,
          selectedSeats.includes(id)
        )} hover:bg-blue-400 transition-colors duration-300`}
        disabled={isDisabled || isReserved}
        onClick={() => !isReserved && handleSeatSelect(id)}
      >
        {id}
      </button>
    );
  };
  const price = selectedSeats.length * 35000;
  const selectedSeatsInfo =
    selectedSeats.length > 0 ? `${selectedSeats.join(" ")}` : " ";
    const dataUser = {
      location: location,
      seat: selectedSeatsInfo,
      price: price
    };

//PAYMENT MIDTRANS 

const [snapToken, setSnapToken] = useState("");
const { midtransSnapToken } = useSelector((state) => state.payment);
const dispatcher = useDispatch();


const handlePayment = () => {
    getSnapToken
    if (!snapToken) {
      return;
    }
    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        setShowModal(false);
        updateStatus();
        movePage("/membership");
        console.log("Transaction success:", result);
      },
      onPending: (result) => {
        console.log("Transaction pending:", result);
      },
      onError: (result) => {
        console.error("Transaction error:", result);
      },
    });
  };
  
  return (
    <div className="flex flex-col py-4  bg-[#101116] text-white items-center font-Montserrat">
      <SelectOptions fetchSeat={fectRandomSeat} />

      <div className="w-10/12 h-16 relative mt-16">
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <div className="w-full h-full rounded-full border-t-[5px] border-blue-300 transform  origin-bottom"></div>
        </div>
      </div>
      <div className="translate-x-[-25%]">SCREEN</div>
      <div className="translate-x-[-13%] mb-5">REGULER | Rp.35.000</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(31, 1fr)",
          gridTemplateRows: "repeat(11, 1fr)",
          gap: "2px",
        }}
      >
        {seats.map(renderSeat)}
      </div>
      <div className="flex text-xs gap-10 my-5">
        <div className="flex gap-2  items-center">
          <div className="w-7 h-7 rounded-t-xl rounded-b-sm bg-gray-600 rounded-md"></div>
          <div>Tidak Tersedia</div>
        </div>
        <div className="flex gap-2  items-center">
          <div className="w-7 h-7 rounded-t-xl rounded-b-sm bg-white rounded-md"></div>
          <div>Tersedia</div>
        </div>
        <div className="flex gap-2  items-center">
          <div className="w-7 h-7 rounded-t-xl rounded-b-sm bg-blue-500 rounded-md"></div>
          <div>Terpilih</div>
        </div>
      </div>
      {selectedSeats.length ? (
        <>
        <div className="flex justify-between w-10/12">
          <div>
            <div>{`${selectedSeats.length} Seat is selected`}</div>
            <div className="font-semibold">{`${selectedSeatsInfo}`}</div>
          </div>
          <div>
            <div>Price</div>
            <div className="font-semibold">{`Rp.${price.toLocaleString("en", {
              useGrouping: true,
            })}`}</div>
          </div>
        </div>
        <button onClick={handlePayment} className="font-semibold w-10/12 h-9 rounded-lg my-5 bg-light-blue-400 hover:bg-blue-800">Next to pay</button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieSeatBooking;
