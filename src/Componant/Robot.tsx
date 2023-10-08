import React, { useState, useEffect } from 'react';
import "./Robot.css";

interface RobotProps {}

const Robot: React.FC<RobotProps> = () => {
  const [showFirstGif, setShowFirstGif] = useState<boolean>(true);
  const [showSecondGif, setShowSecondGif] = useState<boolean>(false);
  const [showThirdImage, setShowThirdImage] = useState<boolean>(false);

  useEffect(() => {
    // Set a timeout to hide the first GIF after 1 minute
    const firstGifTimeout = setTimeout(() => {
      setShowFirstGif(false);
    }, 1200); // 1 minute in milliseconds

    // Set a timeout to display the second GIF after 1 minute and 5 seconds
    const secondGifTimeout = setTimeout(() => {
      setShowSecondGif(true);
    }, 1300); // 1 minute and 5 seconds in milliseconds

    // Set a timeout to display the third image after both timeouts are finished
    const thirdImageTimeout = setTimeout(() => {
      setShowThirdImage(true);
    }, 5000); // Slightly longer than the combined duration

    // Clear the timeouts if the component unmounts
    return () => {
      clearTimeout(firstGifTimeout);
      clearTimeout(secondGifTimeout);
      clearTimeout(thirdImageTimeout);
    };
  }, []);

  return (
    <div className="page-container">
      <div className='robot_start'>
        {showFirstGif ? (
          <img
            src="https://media.tenor.com/SQezFxnhLR8AAAAi/coming-emo.gif"
            alt="start"
            className="small-image"
          />
        ) : null}
        {showSecondGif && !showThirdImage ? (
          <img
            src="https://media.tenor.com/GB17hfl_I_wAAAAi/yeah-emo.gif"
            alt="start"
            className="small-image"
          />
        ) : null}
        {showThirdImage ? (
          <img
            src="https://i0.wp.com/living.ai/wp-content/uploads/2021/04/interesting.gif?fit=800%2C800&ssl=1"
            alt="start"
            className="small-image"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Robot;
