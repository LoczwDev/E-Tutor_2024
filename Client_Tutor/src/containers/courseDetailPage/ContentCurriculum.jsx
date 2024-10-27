import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaPlay } from "react-icons/fa";
import { Element } from "react-scroll";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { formatDuration } from "../../hooks/formatDuration";

export const CourseSection = ({
  title,
  lectures,
  checkPreview,
  setTotalDurationCourse,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lectureDurations, setLectureDurations] = useState({});
  const [totalDuration, setTotalDuration] = useState(0);

  // Create an array of refs, one for each video
  const videoRefs = useRef([]);

  const handleLoadedMetadata = (index, event) => {
    const video = videoRefs.current[index];
    if (video) {
      const videoDuration = Math.floor(video.duration);
      // Set lecture durations for individual videos
      setLectureDurations((prev) => ({
        ...prev,
        [index]: videoDuration,
      }));
      setTotalDuration((prev) => prev + videoDuration);
    }
  };

  useEffect(() => {
    if (checkPreview) {
      setTotalDurationCourse((pre) => pre + totalDuration);
    }
  }, [totalDuration, checkPreview]);

  return (
    <div className="w-full border-b">
      <div
        className="w-full flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full flex items-center justify-between">
          <div
            className={`flex items-center gap-3 duration-300 ${
              isOpen ? "text-primary" : ""
            }`}
          >
            <div>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
            <h2 className="font-medium text-base">{title}</h2>
          </div>
          <div className="flex items-center justify-end gap-5">
            <div className="flex items-center text-gray7 text-xs gap-2">
              <IoPlayCircleOutline className="text-secondary" />
              {lectures.length} video
            </div>
            <div className="flex items-center text-gray7 text-xs gap-2">
              <FaRegClock className="text-warning" />{" "}
              {formatDuration(lectures.durationCurriculum || totalDuration)}
            </div>
          </div>
        </div>
      </div>
      <ul
        className={`w-full bg-transparent overflow-hidden duration-300 ease-in-out transition-all ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {lectures.map((lecture, index) => (
          <li
            key={index}
            className="w-full flex justify-between p-4 hover:bg-gray-100"
          >
            <div className="flex items-center text-sm">
              {lecture?.video && <FaPlay fontSize={10} className="mr-3" />}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover sr-only hidden"
                controls
                onLoadedMetadata={(event) => handleLoadedMetadata(index, event)}
              >
                <source
                  src={lecture?.video?.url || lecture?.video}
                  type="video/mp4"
                />
              </video>
              <span>{lecture.title}</span>
            </div>
            <div className="text-gray5 text-xs">
              {/* Ensure that lectureDurations[index] is defined before rendering */}
              {lectureDurations.hasOwnProperty(index)
                ? formatDuration(lectureDurations[index])
                : "Loading..."}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContentCurriculum = ({ data }) => {
  const totalLectures = data?.curriculumData.reduce((total, section) => {
    return total + section.lectures.length;
  }, 0);
  return (
    <Element name={"Curriculum"} className="my-10">
      <div className="w-full flex items-center justify-between mb-5">
        <h3 className="font-semibold text-2xl">Chương trình giảng dạy</h3>
        <div className="flex items-center justify-end gap-5">
          <div className="flex items-center text-gray7 text-sm gap-1">
            <FaRegFolderOpen className="text-primary" />{" "}
            {data?.curriculumData.length} <span className="ml-1">Bài học</span>
          </div>
          <div className="flex items-center text-gray7 text-sm gap-1">
            <IoPlayCircleOutline className="text-secondary" /> {totalLectures}
            <span className="ml-1">Bài giảng</span>
          </div>
          {data?.durationCourse && (
            <div className="flex items-center text-gray7 text-sm gap-2">
              <FaRegClock className="text-warning" />{" "}
              {formatDuration(data?.durationCourse)}
            </div>
          )}
        </div>
      </div>
      <div className="border">
        {data?.curriculumData.map((course, index) => (
          <CourseSection
            key={index}
            title={course.title}
            lectures={course.lectures}
          />
        ))}
      </div>
    </Element>
  );
};

export default ContentCurriculum;
