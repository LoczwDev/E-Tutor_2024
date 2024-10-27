import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import images from "../../constants/images/images";
import SectionLayout from "../../components/layouts/SectionLayout";

const SectionStepTutor = () => {
  const dataStepTutor = [
    {
      bg: "bg-[#564FFD]/10",
      color: "text-[#564FFD]",
      title: "Apply to become instructor",
    },
    {
      bg: "bg-[#E34444]/10",
      color: "text-[#FF6636]",
      title: "Build & edit your profile",
    },
    {
      bg: "bg-[#E34444]/10",
      color: "text-[#E34444]",
      title: "Create your new course",
    },
    {
      bg: "bg-[#23BD33]/10",
      color: "text-[#23BD33]",
      title: "Start teaching & earning",
    },
  ];
  return (
    <SectionLayout className={"bg-gray0 my-10 !py-16"}>
      <div className="w-full flex justify-between gap-5">
        <div className="w-[50%] bg-[#CC522B] overflow-hidden relative">
          <div className="p-8">
            <h2 className="text-[32px] font-semibold text-white mb-3">
              Become an instructor
            </h2>
            <p className="w-2/3 text-white font-normal text-base mb-3">
              Instructors from around the world teach millions of students on
              Udemy. We provide the tools and skills to teach what you love.
            </p>
            <button className="w-max flex items-center gap-3 capitalize bg-white text-primary hover:bg-primary/80 hover:text-primary duration-300 py-2.5 px-4">
              Start teaching <FaArrowRightLong />
            </button>
          </div>
          <div className="absolute -right-[30px] -bottom-16 w-[300px]">
            <img src={images.TutorBe} alt="tutor-become" />
          </div>
        </div>
        <div className="w-[50%] bg-white p-8">
          <h3 className="font-semibold text-2xl mb-5">
            Your teaching & earning steps
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {dataStepTutor?.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${item.color} ${item.bg}`}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="font-normal text-base">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

export default SectionStepTutor;
