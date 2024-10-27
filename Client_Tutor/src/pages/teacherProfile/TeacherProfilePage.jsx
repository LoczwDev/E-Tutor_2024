import React, { useEffect, useState } from "react";
import HeaderTeacherProfile from "../../containers/teacherProfilePage/HeaderTeacherProfile";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import { useParams } from "react-router-dom";
import { useGetTeacherInfo } from "../../hooks/useUser";
import Loading from "../../components/loader/Loading";
import ContentCoursesTutor from "../../containers/teacherProfilePage/ContentCoursesTutor";
import ContentInfoOveviewTutor from "../../containers/teacherProfilePage/ContentInfoOveviewTutor";

const TeacherProfilePage = () => {
  const { teacherId } = useParams();
  const [dataTeacher, setDataTeacher] = useState(null);
  const { data, isLoading } = useGetTeacherInfo(teacherId);

  useEffect(() => {
    if (data && !isLoading) {
      setDataTeacher(data);
    }
  }, [data, isLoading]);


  return (
    <MainLayout>
      <div className="relative w-full">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="w-full bg-primary/10 py-20" />
            <div className="-mt-[135px]">
              <SectionLayout>
                <HeaderTeacherProfile dataTeacher={dataTeacher} />

                <div className="w-full flex gap-5 mt-5">
                  <div className="w-[40%]">
                  <ContentInfoOveviewTutor dataTeacher={dataTeacher?.tutor} />

                  </div>
                  <div className="w-[60%]">
                  <ContentCoursesTutor dataTeacher={dataTeacher} />

                  </div>
                </div>
              </SectionLayout>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default TeacherProfilePage;
