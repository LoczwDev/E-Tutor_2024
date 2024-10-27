import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import styled from "../constants/styles/styles";

const Hero = ({ data }) => {
  return (
    <div className="w-full flex flex-row items-center justify-end gap-5 bg-linear/50">
      <div className="w-1/3">
        <div className="text-gray9 font-semibold leading-tight text-5xl">
          {/* Learn with experts anytime, anywhere */}
          {data?.title ? parse(data?.title) : ""}
        </div>
        <div className="mt-4 text-gray7 text-base font-normal w-3/4">
          {/* Our mission is to help people find the best courses online and learn
          with experts anytime, anywhere. */}
          {data?.subTitle ? parse(data?.subTitle) : ""}
        </div>

        <Link
          to={"/list-courses"}
          className={`${styled.buttonPrimary} block w-max mt-5`}
        >
          Đi tìm khóa học
        </Link>
      </div>

      <div className="w-1/2">
        <div className="relative w-full h-[400px] clip-top-left overflow-hidden">
          <img
            src={data?.imageBanner?.url}
            className="w-full h-full object-cover"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
