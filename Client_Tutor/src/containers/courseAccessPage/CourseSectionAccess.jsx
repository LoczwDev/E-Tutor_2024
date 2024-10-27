import { useState } from "react";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCheckmarkDone, IoPlayCircleOutline } from "react-icons/io5";
import LectureItem from "./LectureItem";
import { formatDuration } from "../../hooks/formatDuration";

const CourseSectionAccess = ({
  title,
  lectures,
  durationCurriculum,
  dataLectureActive,
  setDataLectureActive,
  setStepLecture,
  dataCompleted,
  currentLecture,
  sectionIndex,
  calculateStep,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const completedLecturesCount = lectures.filter((lecture) =>
    dataCompleted?.includes(lecture._id)
  ).length;

  const handleChange = (data, lectureIndex) => {
    const newStepLecture = calculateStep(sectionIndex, lectureIndex);
    setDataLectureActive(data);
    setStepLecture(newStepLecture);
  };

  return (
    <div className="w-full border-b">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-full flex items-center justify-between py-4 px-3 ${
            isOpen ? "bg-gray1 " : ""
          }`}
        >
          <div
            className={`flex items-center gap-3 duration-300 ${
              isOpen ? "text-primary " : ""
            }`}
          >
            <div>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
            <div className="font-medium text-base w-[350px] line-clamp-1">
              {title}
            </div>
          </div>
          <div className="w-full flex items-center justify-end gap-1">
            <div className="flex items-center text-gray7 text-sm gap-1">
              <IoPlayCircleOutline fontSize={15} className="text-secondary" />
              {lectures.length} bài
            </div>
            {/* <div className="flex items-center text-gray7 text-sm gap-2">
              <FaRegClock className="text-warning" fontSize={15} />
              {formatDuration(durationCurriculum)}
            </div> */}
            <div className="flex items-center text-gray7 text-sm gap-1">
              <IoCheckmarkDone className="text-success" fontSize={15} />
              {((completedLecturesCount / lectures.length) * 100).toFixed(0)}%
              <span className="ml-1 text-gray5">
                ({completedLecturesCount}/{lectures.length})
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul
        className={`w-full bg-transparent overflow-hidden duration-300 ease-in-out transition-all !pl-0 list-none ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {lectures.map((lecture, index) => (
          <LectureItem
            key={index}
            lecture={lecture}
            index={index}
            currentLecture={currentLecture}
            dataCompleted={dataCompleted}
            dataLectureActive={dataLectureActive}
            handleChange={handleChange}
          />
        ))}
      </ul>
    </div>
  );
};
export default CourseSectionAccess;
