import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DynamicCircularProgress = ({ rating }) => {
  const [score, setScore] = useState(0);

  if(rating.length > 2){
    rating = `${rating[0]}${rating[1]}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        return newScore > rating ? rating : newScore;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [rating]);

  let pathColor;
  if (score < 50) {
    pathColor = '#FF4136'; // red
  } else if (score < 70) {
    pathColor = '#FFDC00'; // yellow
  } else {
    pathColor = '#2ECC40'; // green
  }

  return (
    <div className='absolute p-1 top-0 right-0 text-center'>

    <div className="bg-black rounded-full w-10 h-10 border-2 border-black">
      <CircularProgressbar className='font-Poppins font-bold text-center text-white'
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          pathColor: pathColor,
          textColor: '#fff',
          trailColor: '#d6d6d6',
          textSize: '25px',
          fontWeight: '900',
        })}
        />
        </div>
    </div>
  );
};

export default DynamicCircularProgress;
