import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CardCourseProgress = ({ course, user }) => {
  const [nameLectureCur, setnameLectureCur] = useState("");
  const dataCoursePurcha = user?.progress?.find(
    (item) => item.courseId === course._id
  );

  useEffect(() => {
    if (course && user) {
      if (dataCoursePurcha) {
        const currentLecture = dataCoursePurcha?.currentLecture;
        if (currentLecture === "completed") {
          setnameLectureCur(course?.curriculumData[0]?.lectures[0]?.title);
        } else {
          const title = course.curriculumData
            .map((item) => item.lectures)
            .flat()
            .find((el) => el._id === currentLecture)?.title;

          setnameLectureCur(title);
        }
      }
    }
  }, [course, user]);

  // {
  //   id: 5,
  //   image: images.CardCourse,
  //   title: "2021 Complete Python Bootcamp",
  //   lecture: "9. Advanced CSS - Selector Priority",
  //   status: "Watch Lecture",
  //   progress: "12%",
  //   completed: false,
  // },

  return (
    <div key={course.id} className="item">
      <div className="overflow-hidden">
        <img
          src={course.thumbnail.url}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="w-full border-b border-r border-l border-gray1">
          <div className="border-b border-gray1 p-3">
            <h3 className="text-sm font-normal text-gray6 line-clamp-1 mb-2">
              {course.name}
            </h3>
            <p className="text-base font-medium line-clamp-1">
              {nameLectureCur}
            </p>
          </div>

          <div className="w-full h-16 flex items-center justify-between text-sm font-semibold px-3">
            <div
              className={`w-full h-full flex items-center ${
                dataCoursePurcha?.percentNumber == "0" ||
                dataCoursePurcha?.percentNumber == "100"
                  ? ""
                  : "border-b border-primary"
              }`}
            >
              <Link
                to={`/course-access/${dataCoursePurcha?.courseId}`}
                className={`px-4 py-2.5 text-center ${
                  dataCoursePurcha?.percentNumber == "100"
                    ? "bg-success/10 text-success"
                    : "bg-primary/10 text-primary"
                } ${
                  dataCoursePurcha?.percentNumber == "0" ||
                  dataCoursePurcha?.percentNumber == "100"
                    ? "w-full"
                    : "w-max"
                }`}
              >
                Xem khóa học
              </Link>
            </div>

            {dataCoursePurcha?.percentNumber != "0" &&
              dataCoursePurcha?.percentNumber != "100" && (
                <div className="text-success w-full h-full flex justify-end items-center">
                  {dataCoursePurcha?.percentNumber.toFixed(2)}% Completed
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCourseProgress;
