import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { Element } from "react-scroll";
import parse from "html-react-parser";

const ContentOverview = ({ data }) => {
  return (
    <Element name={"Overview"} className="my-10">
      <h3 className="font-semibold text-2xl mb-3">Mô tả</h3>
      <div className="w-full text-sm text-gray7 font-normal mb-5 text-justify">
        {parse(data.desc)}
      </div>
      <div className="bg-success/10 p-10 mb-5">
        <h3 className="font-semibold text-2xl mb-5">
          Bạn sẽ học được gì trong khóa học này
        </h3>
        <div className="w-full grid grid-cols-2 gap-5">
          {data?.benefits.map((item, index) => (
            <div key={index} className="w-full flex items-start gap-2">
              <div className="pt-1">
                <div className="bg-success text-white flex items-center justify-center text-[60px] w-5 h-5 rounded-full">
                  <IoIosCheckmark />
                </div>
              </div>
              <p className="text-gray7 font-normal text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-sm mb-5">
        <h3 className="font-semibold text-2xl mb-3">
          Khóa học này dành cho ai:
        </h3>
        <div className="w-full flex flex-col gap-3">
          {data?.audience?.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <FaArrowRight className="text-primary" fontSize={15} />
              <p className="text-gray7 font-normal text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-sm mb-5">
        <h3 className="font-semibold text-2xl mb-3">Yêu cầu khóa học:</h3>
        <div className="w-full flex flex-col gap-3">
          {data?.requirements?.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <BsDot className="text-primary" fontSize={15} />
              <p className="text-gray7 font-normal text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
};

export default ContentOverview;
