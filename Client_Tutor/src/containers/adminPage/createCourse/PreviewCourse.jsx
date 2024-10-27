import React, { useEffect, useState } from "react";
import images from "../../../constants/images/images";
import {
  FaArrowRight,
  FaRegClock,
  FaRegFolderOpen,
  FaStar,
} from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { BsDot } from "react-icons/bs";
import parse from "html-react-parser";
import { FaPlay } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { CourseSection } from "../../courseDetailPage/ContentCurriculum";
import useUser from "../../../hooks/useUser";
import { MdAccessAlarms } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { LuBookMinus, LuUser2 } from "react-icons/lu";
import { PiNewspaperLight } from "react-icons/pi";
import { formatDuration } from "../../../hooks/formatDuration";

const PreviewCourse = ({ data }) => {
  const user = useUser();
  const [viewTrailer, setViewTrailer] = useState(false);
  const [totalDurationCourse, setTotalDurationCourse] = useState(0);
  const totalLectures = data.curriculumData.reduce(
    (sum, item) => sum + (item.lectures ? item.lectures.length : 0),
    0
  );

  const [promotionRemainingDays, setPromotionRemainingDays] = useState(0);

  useEffect(() => {
    const calculateRemainingDays = () => {
      const currentDate = new Date();
      const promotionEndDate = new Date(data.dayExpiry);
      const remainingTime = promotionEndDate - currentDate;

      // Kiểm tra nếu thời gian còn lại là hợp lệ
      if (remainingTime > 0) {
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
        setPromotionRemainingDays(remainingDays);
      } else {
        setPromotionRemainingDays(0);
      }
    };

    calculateRemainingDays();

    const interval = setInterval(calculateRemainingDays, 86400000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full h-full">
      <div className="flex items-start gap-5">
        <div className="w-full">
          <h3 className="text-3xl font-medium line-clamp-2 mb-3">
            {data?.name}
          </h3>
          <p className="mb-3 line-clamp-1 text-gray7 text-base">{data.topic}</p>
          <div className="w-full flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white">
                <img
                  src={user?.avatar ? user?.avatar?.url : images.Avt}
                  className="w-14 h-14 rounded-full object-cover p-[3px]"
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray5 text-xs">
                  {new Date().toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <div className="text-base font-medium">
                  <span className="mr-1">{user?.firstName}</span>
                  {user?.lastName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-warning">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="font-bold">0</span>
              <span className="text-gray5">(0 Rating)</span>
            </div>
          </div>
          {/* Video trailer */}
          <div className="mb-10 w-full h-[400px]">
            {!viewTrailer ? (
              <div className="relative w-full h-full overflow-hidden z-10">
                {
                  <img
                    src={data.thumbnail}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                }
                <div className="absolute w-full h-full top-0 bottom-0 right-0 left-0 flex items-center justify-center z-[50]">
                  <div
                    onClick={() => setViewTrailer(true)}
                    className="w-16 h-16 flex items-center justify-center bg-white rounded-full overflow-hidden cursor-pointer hover:bg-opacity-60"
                  >
                    <FaPlay className="text-2xl text-primary" />
                  </div>
                </div>
                <div className="absolute w-full h-full top-0 bottom-0 right-0 left-0 bg-black/50 z-[20]" />
              </div>
            ) : (
              <video className="w-full h-full object-cover" autoPlay controls>
                <source src={data.trailer} type="video/mp4" />
              </video>
            )}
          </div>

          <div className="w-full">
            <div className="w-full bg-white px-4 py-2">
              <div className="w-full pb-3 border-b border-gray1">
                <div className="flex items-center gap-3">
                  <p className="text-3xl text-primary font-normal">
                    {data.estimatedPrice.toLocaleString("vi-VN")}
                    <span className="text-xs align-baseline">đ</span>
                    <span className="!text-base text-gray5 line-through ml-2">
                      {data.price.toLocaleString("vi-VN")} đ
                    </span>
                  </p>
                  <div className="py-1 px-3 text-center text-md font-medium bg-primary/10 text-primary">
                    Giảm {data.promotion}%
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#E34444] pt-3">
                  <MdAccessAlarms /> Còn {promotionRemainingDays} ngày ở mức giá
                  này!
                </div>
              </div>
              {/* details */}
              <div className="flex flex-col gap-5 py-5 border-b border-gray1">
                <div className="w-full flex items-center justify-between text-base">
                  <div className="flex items-center gap-3">
                    <FaRegClock className="text-gray5 text-sm" />
                    Thời lượng khóa học
                  </div>
                  <span className="text-gray5">
                    {data.durations}{" "}
                    <span className="ml-1">{data.typeDurations}</span>
                  </span>
                </div>
                <div className="w-full flex items-center justify-between text-base">
                  <div className="flex items-center gap-3">
                    <FiBarChart className="text-gray5 text-sm" />
                    Trình độ khóa học
                  </div>
                  <span className="text-gray5">{data.level}</span>
                </div>
                <div className="w-full flex items-center justify-between text-base">
                  <div className="flex items-center gap-3">
                    <LuBookMinus className="text-gray5 text-sm" />
                    Ngôn ngữ
                  </div>
                  <span className="text-gray5"> {data.language}</span>
                </div>
                <div className="w-full flex items-center justify-between text-base">
                  <div className="flex items-center gap-3">
                    <PiNewspaperLight className="text-gray5 text-sm" />
                    Phụ đề
                  </div>
                  <span className="text-gray5">{data.subLanguage}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="font-semibold text-2xl mb-3">Mô tả khóa học</h3>
            <div className="w-full text-sm text-gray7 font-normal mb-10">
              {parse(data.desc)}
            </div>
            <div className="bg-success/10 p-10 mb-5">
              <h3 className="font-semibold text-2xl mb-5">
                Bạn sẽ học được gì trong khóa học này
              </h3>
              <div className="w-full grid grid-cols-2 gap-5">
                {data.benefits?.map((item, index) => (
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
                {data.audience?.map((item, index) => (
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
                {data.requirements?.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <BsDot className="text-primary" fontSize={15} />
                    <p className="text-gray7 font-normal text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Du lieu khoa hoc */}

            <div className="w-full flex items-center justify-between mb-5">
              <h3 className="font-semibold text-2xl">Chương trình giảng dạy</h3>
              <div className="flex items-center justify-end gap-5">
                <div className="flex items-center text-gray7 text-sm gap-2">
                  <FaRegFolderOpen className="text-primary" />{" "}
                  {data.curriculumData.length} bài học
                </div>
                <div className="flex items-center text-gray7 text-sm gap-2">
                  <IoPlayCircleOutline className="text-secondary" />{" "}
                  {totalLectures} bài giảng
                </div>
                <div className="flex items-center text-gray7 text-sm gap-2">
                  <FaRegClock className="text-warning" />{" "}
                  {formatDuration(totalDurationCourse)}
                </div>
              </div>
            </div>
            <div className="border">
              {data.curriculumData.map((course, index) => (
                <CourseSection
                  key={index}
                  title={course.title}
                  setTotalDurationCourse={setTotalDurationCourse}
                  checkPreview={true}
                  lectures={course.lectures}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCourse;
