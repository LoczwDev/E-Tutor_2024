import React from "react";
import { CiLock } from "react-icons/ci";
import { formatDurationModify } from "../../hooks/formatDuration";

const LectureItem = ({
  lecture,
  index,
  currentLecture,
  dataCompleted,
  dataLectureActive,
  handleChange,
}) => {
  const isCheckClock =
    currentLecture === lecture._id ||
    dataCompleted?.find((item) => item === lecture._id);
  const checkComplete = dataCompleted?.find((item) => item === lecture._id);

  return (
    <button
      disabled={!isCheckClock}
      key={index}
      id={`${index === 0 ? "step-3" : index === 1 ? "step-4" : ""}`}
      onClick={() => handleChange(lecture, index)}
      className={`w-full flex items-center justify-between p-4 hover:bg-gray1 disabled:bg-gray0 ${
        dataLectureActive?._id === lecture._id
          ? "bg-primary/10 text-gray9 font-medium"
          : ""
      }`}
    >
      <div className="flex items-center gap-3 text-gray7 text-base">
        <div className="">
          <input
            type="checkbox"
            readOnly
            disabled
            checked={checkComplete === lecture._id}
            className="checkbox h-4 w-4 border-orange-400 [--chkbg:theme(colors.primary)] [--chkfg:white] rounded-none disabled:checked:opacity-100"
          />
        </div>

        <div className="line-clamp-1 w-full">
          <span className="mr-1">{index + 1}.</span>
          {lecture.title}
        </div>
      </div>
      {!isCheckClock ? (
        <CiLock />
      ) : (
        <div className="flex items-center gap-1 text-gray7 text-xs">
          {formatDurationModify(lecture.video.duration)}
        </div>
      )}
    </button>
  );
};

export default LectureItem;
