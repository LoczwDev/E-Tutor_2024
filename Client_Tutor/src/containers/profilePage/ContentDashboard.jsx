import React from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { BsFolderCheck } from "react-icons/bs";
import { TfiCup } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import SliderCourse from "./SliderCourse";

const ContentDashboard = ({ user, dataCourse }) => {
  const dataDashboard = [
    {
      id: 1,
      title: "Khóa học đã đăng ký",
      number: user?.progress?.length || 0,
      bg: "bg-primary/10",
      color: "text-primary",
      icon: <FaRegCirclePlay />,
    },
    {
      id: 2,
      title: "Khóa học đang hoạt động",
      number:
        user?.progress?.filter(
          (item) =>
            item.currentLecture !== "completed" && item.currentLecture != null
        ).length || 0,
      bg: "bg-secondary/10",
      color: "text-secondary",
      icon: <BsFolderCheck />,
    },
    {
      id: 3,
      title: "Khóa học hoàn thành",
      number:
        user?.progress.filter((item) => item.currentLecture === "completed")
          .length || 0,
      bg: "bg-success/10",
      color: "text-success",
      icon: <TfiCup />,
    },
    {
      id: 4,
      title: "Course Instructors",
      number: 241,
      bg: "bg-warning/10",
      color: "text-warning",
      icon: <FiUsers />,
    },
  ];
  return (
    <div className="w-full">
      <h3 className="font-semibold text-2xl mb-3">Tổng quan</h3>
      <div className="flex space-x-4 mb-10">
        {dataDashboard?.map((item) => (
          <div
            key={item.id}
            className={`${item.bg} p-4 w-1/4 h-28 flex flex-row items-center justify-center gap-5`}
          >
            <div
              className={`bg-white w-12 h-12 flex items-center justify-center text-xl ${item.color}`}
            >
              {item.icon}
            </div>
            <div className="flex flex-col ">
              <h2 className="text-xl font-normal">{item.number}</h2>
              <p className="text-gray7 text-sm">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <SliderCourse user={user} dataCourse={dataCourse} />
      </div>
    </div>
  );
};

export default ContentDashboard;
