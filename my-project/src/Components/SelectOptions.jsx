import { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";

const DynamicSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col w-60 text-white">
      <label>{label}</label>
      <Select
        variant="standard"
        className="text-white"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default function SelectOptions({ fetchSeat }) {
  const cities = ["Jakarta", "Bekasi"];
  const theaters = ["Babelan City Mall", "Kebalen City Mall"];

  const [selectedCity, setSelectedCity] = useState(cities[1]);
  const [selectedTheater, setSelectedTheater] = useState(theaters[1]);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };
  const currentDate = new Date();

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  let data = {
    day: day,
    time: time,
    city: selectedCity,
    theater: selectedTheater,
  };

  const days = [];
  const options = { weekday: "long" };

  for (let i = 0; i < 5; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    const formattedDate = capitalize(date.toLocaleString("en-US", options));
    const isSelected = selectedButtonIndex === i;
    days.push(
      <button
        key={i}
        className={`flex flex-col items-center`}
        onClick={() => {
          setSelectedButtonIndex(i);
          setDay(
            `${formattedDate}, ${date.getDate()} ${date.toLocaleString(
              "en-US",
              { month: "long" }
            )}`
          );
        }}
      >
        <div className="text-sm">{formattedDate.substring(0, 3)}</div>
        <div
          className={`w-8 h-8 pt-1.5 text-center mt-2 font-semibold text-sm rounded-full ${
            isSelected ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          }`}
        >
          {date.getDate()}
        </div>
      </button>
    );
  }

  const defaultDate = new Date(currentDate);
  defaultDate.setDate(currentDate.getDate() + selectedButtonIndex);
  const defaultFormattedDate = capitalize(
    defaultDate.toLocaleString("en-US", options)
  );

  useEffect(() => {
    const data = {
      day: day,
      time: time,
    };
    fecthRandomSeat(data);
  }, [time, day]);

  const [selectedTime, setSelectedTime] = useState("10:45");

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const times = [
    "10:45",
    "12:30",
    "14:00",
    "14:30",
    "16:00",
    "16:15",
    "16:35",
    "18:35",
  ];

  const getTimeClass = (time) => {
    return selectedTime === time
      ? "text-blue-500 border-b-2 border-blue-500"
      : "";
  };

  function fecthRandomSeat() {
    // console.log(data);
    fetchSeat(data);
  }

  return (
    <>
      <div className="flex justify-between px-64 w-full">
        <DynamicSelect
          label="City"
          options={cities}
          value={selectedCity}
          onChange={handleCityChange}
        />
        <DynamicSelect
          label="Theater"
          options={theaters}
          value={selectedTheater}
          onChange={handleTheaterChange}
        />
      </div>

      <div className="flex justify-between px-64 w-full mt-5">
        <div>
          <div id="hari">
            {defaultFormattedDate}, {defaultDate.getDate()}{" "}
            {defaultDate.toLocaleString("en-US", { month: "long" })}
          </div>
          <div className="flex gap-5">{days}</div>
        </div>

        <div className="pr-2">
          <div>Time</div>
          <div className="grid grid-cols-4 gap-3">
            {times.map((time) => (
              <div
                key={time}
                className={getTimeClass(time)}
                onClick={() => {
                  handleTimeClick(time), setTime(time);
                }}
              >
                {time.replace(":", " : ")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
