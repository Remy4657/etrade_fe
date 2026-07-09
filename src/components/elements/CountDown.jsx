"use client";
import { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";

const CountDown = (props) => {
  const [countDownStart, setcountDownStart] = useState(false);

  useEffect(() => {
    setcountDownStart(true);
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <>
        <div className="countdown-section">
          <div>
            <div className="countdown-number">{zeroPad(days)}</div>
            {props.unit && (
              <div className="countdown-unit">
                {props.unitShort ? "D" : "Ngày"}
              </div>
            )}
          </div>
        </div>
        <div className="countdown-section">
          <div>
            <div className="countdown-number">{zeroPad(hours)}</div>
            {props.unit && (
              <div className="countdown-unit">
                {props.unitShort ? "H" : "Giờ"}
              </div>
            )}
          </div>
        </div>
        <div className="countdown-section">
          <div>
            <div className="countdown-number">{zeroPad(minutes)}</div>
            {props.unit && (
              <div className="countdown-unit">
                {props.unitShort ? "M" : "Phút"}
              </div>
            )}
          </div>
        </div>
        <div className="countdown-section">
          <div>
            <div className="countdown-number">{zeroPad(seconds)}</div>
            {props.unit && (
              <div className="countdown-unit">
                {props.unitShort ? "S" : "Giây"}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {countDownStart && (
        <Countdown
          date={props.date ? props.date : Date.now()}
          renderer={renderer}
        />
      )}
    </>
  );
};

export default CountDown;
