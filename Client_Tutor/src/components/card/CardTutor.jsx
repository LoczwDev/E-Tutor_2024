import React from "react";
import images from "../../constants/images/images";
import { FaStar } from "react-icons/fa";

const CardTutor = ({ message }) => {
  return (
    <div className="w-auto">
      <div className="w-full h-72">
        <img
          src={images.Tutor}
          className="w-full h-full object-cover"
          alt="tutor"
        />
      </div>
      <div className="w-full h-max border-b border-r border-l border-gray1">
        <div className="w-full flex flex-col items-center justify-center h-16 border-b border-gray1">
          <span className="text-lg font-medium capitalize">Tran Huu Loc</span>
          <p className="text-gray5 font-normal text-sm">Senior Developer</p>
        </div>
        <div className="p-3 w-full">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 text-md">
              <FaStar className="mb-1 text-warning" />
              5.0
            </div>
            <div className="flex items-center gap-2 text-gray5">
              <span className="text-sm font-medium text-gray9">854</span>
              students
            </div>
          </div>
          {message && (
            <div className="w-full">
              <button className="flex items-center justify-center text-sm font-semibold gap-2 w-full bg-primary/10 capitalize text-primary hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4">
                Send message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTutor;
