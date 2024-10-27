import React from "react";
import SectionLayout from "../../components/layouts/SectionLayout";
import CardCourse from "../../components/card/CardCourse";
import { FaArrowRight } from "react-icons/fa6";
import CardSkeleton from "../../components/skeletons/CardSkeleton";

const RelatedCourses = ({ isLoading }) => {
  return (
    <SectionLayout>
      {isLoading ? (
        <div className="w-full grid grid-cols-5 gap-3">
          {Array(5)
            .fill()
            .map((_, index) => (
              <div key={index}>
                <CardSkeleton />
              </div>
            ))}
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-between mb-3">
            <h3 className="font-semibold text-2xl">Related Courses</h3>
            <button className="flex items-center justify-center gap-2 w-max bg-primary/10 capitalize text-primary hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4">
              View all
              <FaArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-3">
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
            <CardCourse />
          </div>
        </>
      )}
    </SectionLayout>
  );
};

export default RelatedCourses;
