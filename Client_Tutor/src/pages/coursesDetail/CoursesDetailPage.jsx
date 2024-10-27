import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainDetail from "../../containers/courseDetailPage/MainDetail";
import ExtraBuyCourse from "../../containers/courseDetailPage/ExtraBuyCourse";
import RelatedCourses from "../../containers/courseDetailPage/RelatedCourses";
import { useParams } from "react-router-dom";
import { useSingleCourse } from "../../hooks/useCourses";

const CoursesDetailPage = () => {
  const { courseId } = useParams();
  const { data: dataCourse, isLoading } = useSingleCourse(courseId);

  const dataBreadCumbs = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: dataCourse?.course?.category,
      link: "/list-courses",
    },
    {
      name: dataCourse?.course?.subCategory,
      link: "/list-courses",
    },
    {
      name: dataCourse?.course?.name,
      link: `/couse/${courseId}`,
    },
  ];

  // Fetch the course details

  return (
    <MainLayout>
      <div className="relative w-full">
        {/* <div className="w-full bg-gray0 py-40" />
        <div className="-mt-[275px]"> */}
          <SectionLayout>
            <div className="flex items-start gap-5 border-b border-gray1 pb-20">  
              <div className="w-[70%]">
                <BreadCrumbs data={dataBreadCumbs} />
                <MainDetail data={dataCourse?.course} isLoading={isLoading} />
              </div>
              <div className="w-[30%] sticky top-0">
                <ExtraBuyCourse
                  data={dataCourse?.course}
                  isLoading={isLoading}
                />
              </div>
            </div>
            <div className="w-full my-10">
              {/* <RelatedCourses isLoading={isLoading} /> */}
            </div>
          </SectionLayout>
        {/* </div> */}
      </div>
    </MainLayout>
  );
};

export default CoursesDetailPage;
