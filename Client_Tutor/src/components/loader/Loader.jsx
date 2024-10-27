import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="container-loader z-[99999999999999999999]">
      <div class="loader">
        <svg
          class="logo"
          width="100"
          height="100"
          viewBox="0 0 48 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.52734 17.25L24.0898 5.75L45.6523 17.25L24.0898 28.75L2.52734 17.25Z"
            stroke="#FF6636"
            stroke-width="3.45"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M34.8711 43.125V23L24.0898 17.25"
            stroke="#FF6636"
            stroke-width="3.45"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M40.6211 19.9332V29.7299C40.6217 30.04 40.5215 30.3419 40.3355 30.5901C39.125 32.2009 34.0181 38.0936 24.0898 38.0936C14.1616 38.0936 9.05471 32.2009 7.84421 30.5901C7.65825 30.3419 7.558 30.04 7.5586 29.7299V19.9332"
            stroke="#FF6636"
            stroke-width="3.45"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div class="text-white/50">
        <span class="letter letter1">C</span>
        <span class="letter letter2">h</span>
        <span class="letter letter3 mr-2">ờ</span>
        <span class="letter letter4">t</span>
        <span class="letter letter5 mr-1">ý</span>
        <span class="letter letter6">n</span>
        <span class="letter letter7">h</span>
        <span class="letter letter7">é</span>
        <span class="letter letter8">.</span>
        <span class="letter letter9">.</span>
        <span class="letter letter10">.</span>
      </div>
    </div>
  );
};

export default Loader;
