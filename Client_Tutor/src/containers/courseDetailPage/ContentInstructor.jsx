import React, { useState } from "react";
import images from "../../constants/images/images";
import { FaStar, FaCirclePlay } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import { useGetTeacherInfo } from "../../hooks/useUser";

export const CardTutorDetail = ({ instructor }) => {
  const { data, isLoading } = useGetTeacherInfo(instructor._id);

  const [showReadMore, setShowReadMore] = useState(false);

  return (
    <div key={instructor._id} className="w-full p-5 border border-gray1 mb-5">
      <div className="flex items-start gap-5">
        <div className="w-1/6">
          <div className="w-32 h-32 overflow-hidden rounded-full">
            <img
              src={
                instructor.avatar ? instructor.avatar?.url : images.AvatarCur
              }
              className="w-full h-full object-cover"
              alt="avatar"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-5/6">
          <Link
            to={`/teacher/${instructor._id}`}
            className="text-xl font-medium"
          >
            {instructor.fullName}
          </Link>
          <p className="text-sm text-gray5">
            {instructor.title ? instructor.title : "Chưa được xác nhận"}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-md">
              <FaStar className="text-warning text-lg mb-1" />
              {data?.total_ratings}
              <span className="text-gray5 font-normal text-sm">
                Đánh giá khóa học
              </span>
            </div>
            <div className="flex items-center gap-2 text-md">
              <FiUsers className="text-secondary text-lg" />
              {data?.total_students}
              <span className="text-gray5 font-normal text-sm">học viên</span>
            </div>
            <div className="flex items-center gap-2 text-md">
              <FaCirclePlay className="text-primary text-lg" />
              {data?.total_courses}
              <span className="text-gray5 font-normal text-sm">khóa học</span>
            </div>
          </div>
          <div className="w-full text-[13px] text-gray6">
            <p
              className={`w-full overflow-hidden ease-in-out transition-all duration-300 ${
                showReadMore ? "max-h-[500px]" : "max-h-[60px]"
              }`}
            >
              {instructor.description}
            </p>
            <span
              onClick={() => setShowReadMore(!showReadMore)}
              className="uppercase text-sm hover:text-primary duration-500 underline cursor-pointer"
            >
              thêm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
const ContentInstructor = ({ data }) => {
  // Dữ liệu giảng viên
  const instructors = [
    {
      id: 1,
      name: "Tran Huu Loc",
      title: "Web Designer & Best-Selling Instructor",
      rating: 4.9,
      students: 236568,
      courses: 9,
      description:
        "One day Vako had enough with the 9-to-5 grind, or more like 9-to-9 in his case, and quit his job, or more like got himself fired from his own startup. He decided to work on his dream: be his own boss, travel the world, only do the work he enjoyed...",
      avatar: images.Avt,
    },
    {
      id: 2,
      name: "Nguyen Van A",
      title: "Software Engineer & Tech Speaker",
      rating: 4.8,
      students: 198432,
      courses: 7,
      description:
        "Nguyen Van A is a passionate software engineer who has been building applications for over a decade. He loves teaching and sharing his knowledge with others...Nguyen Van A is a passionate software engineer who has been building applications for over a decade. He loves teaching and sharing his knowledge with others...Nguyen Van A is a passionate software engineer who has been building applications for over a decade. He loves teaching and sharing his knowledge with others...Nguyen Van A is a passionate software engineer who has been building applications for over a decade. He loves teaching and sharing his knowledge with others...",
      avatar: images.Tutor,
    },
  ];

  return (
    <Element name={"Instructor"} className="my-10">
      <div className="w-full">
        <h3 className="font-semibold text-2xl mb-3">Giảng viên khóa học</h3>

        {/* {instructors.map((instructor, index) => ( */}
        <CardTutorDetail instructor={data?.tutor} />
        {/* ))} */}
      </div>
    </Element>
  );
};

export default ContentInstructor;
