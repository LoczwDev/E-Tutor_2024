import React from "react";
import CardListCourse from "../../components/card/CardListCourse";
import SectionLayout from "../../components/layouts/SectionLayout";

const SectionFeatureCourses = () => {
  return (
    <SectionLayout>
      <div className="w-full flex items-start justify-between mb-10">
        <h3 className="text-gray9 text-3xl font-semibold capitalize">
          Our feature courses
        </h3>
        <p className="text-sm text-gray7 w-1/3">
          Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec
          varius purus et eleifend porta.
        </p>
      </div>
      <div className="w-full grid grid-cols-2 gap-5">
        <CardListCourse />
        <CardListCourse />
        <CardListCourse />
        <CardListCourse />
      </div>
    </SectionLayout>
  );
};

export default SectionFeatureCourses;
