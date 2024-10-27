import React, { useEffect } from "react";
import CourseForm from "../../../containers/adminPage/createCourse/CourseForm";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const CourseEditOutlet = () => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <main className="relative max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <CourseForm />
      </main>
    </>
  );
};

export default CourseEditOutlet;
