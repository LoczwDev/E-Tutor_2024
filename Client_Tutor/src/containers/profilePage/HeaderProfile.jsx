import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import images from "../../constants/images/images";

const HeaderProfile = ({ user }) => {
  return (
    <div className="w-full p-5 bg-white border border-primary/20">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div>
            <div className="w-32 h-32 overflow-hidden rounded-full">
              <img
                src={user?.avatar ? user?.avatar?.url : images.AvatarCur}
                className="w-full h-full object-cover"
                alt="avatar"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">{user?.fullName}</span>
            <p className="text-sm text-gray5">
              {user?.title ? user?.title : "Học viên"}
            </p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 w-max bg-primary/10 capitalize text-primary hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4">
          Giảng dạy trên E-tutor
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HeaderProfile;
