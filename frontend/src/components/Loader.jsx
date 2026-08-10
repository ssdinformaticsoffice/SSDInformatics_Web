import React, { useEffect } from "react";
import logo from "../assets/444 logoai.png";
const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return (
    <div className="loader-container">
      {" "}
      <div className="loader-wrapper">
        {" "}
        <svg className="loader-circle" viewBox="0 0 100 100">
          {" "}
          <circle className="loader-bg" cx="50" cy="50" r="45" />{" "}
          <circle className="loader-progress" cx="50" cy="50" r="45" />{" "}
        </svg>{" "}
        <img src={logo} alt="SSD Informatics" className="loader-logo" />{" "}
      </div>{" "}
    </div>
  );
};
export default Loader;
