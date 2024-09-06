import React from "react";
import { Link } from "react-router-dom";

const BackBtn = () => {
  return (
    <button className="back-btn">
      <Link to="/">
        <svg
          className="back-icon"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
      </Link>
    </button>
  );
};

export default BackBtn;
