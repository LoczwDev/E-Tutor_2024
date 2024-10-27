import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { GoLightBulb } from "react-icons/go";
import { GoCopy } from "react-icons/go";

const StepCreateAI = ({ active, setActive }) => {
  const options = ["Danh mục", "Mô tả & chủ đề", "Thông tin cơ bản"];
  return (
    <div className="w-full flex items-center justify-center">
      {options.map((item, index) => (
        <div key={index} className="w-[300px] flex flex-col items-center gap-2 py-5">
          <div
            className={`relative w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-primary text-white" : "bg-primary/10"
            } relative`}
          >
            <span className="text-[20px]">
              {index === 0 && <BiCategoryAlt />}
              {index === 1 && <GoLightBulb />}
              {index === 2 && <GoCopy />}
            </span>

            {index !== options.length - 1 && (
              <div
                className={`absolute w-[265px] h-1 ${
                  active  > index ? "bg-primary" : "bg-primary/10"
                } left-full`}
              />
            )}
          </div>
          <h5
            className={`pl-3 ${active === index ? "font-bold" : ""} text-sm`}
          >
            {item}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default StepCreateAI;
