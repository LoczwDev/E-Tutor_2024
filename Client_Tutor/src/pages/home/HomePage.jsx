import React, { useEffect } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import Hero from "../../components/Hero";
import SectionCategory from "../../containers/homePage/SectionCategory";
import SectionTopCourses from "../../containers/homePage/SectionTopCourses";
import SectionStepTutor from "../../containers/homePage/SectionStepTutor";
import SectionFeatureCourses from "../../containers/homePage/SectionFeatureCourses";
import SectionDisplayTutor from "../../containers/homePage/SectionDisplayTutor";
import { useGetLayout } from "../../hooks/useLayout";

export const HomePage = () => {
  const { data, isLoading } = useGetLayout("Banner");
  return (
    <MainLayout>
      {!isLoading && <Hero data={data?.layout?.banner} />}
      <SectionCategory />
      <SectionTopCourses />
      <SectionFeatureCourses />
      <SectionStepTutor />
      <SectionDisplayTutor />
    </MainLayout>
  );
};
