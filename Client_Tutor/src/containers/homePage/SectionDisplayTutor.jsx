import React from "react";
import CardTutor from "../../components/card/CardTutor";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import SectionLayout from "../../components/layouts/SectionLayout";

const SectionDisplayTutor = () => {
  return (
    <SectionLayout>
      <div className="w-full flex items-start justify-center mb-10">
        <h3 className="text-gray9 text-3xl font-semibold capitalize">
          Top instructor of the month
        </h3>
      </div>
      <div className="w-full grid grid-cols-5 gap-5">
        <CardTutor />
        <CardTutor />
        <CardTutor />
        <CardTutor />
        <CardTutor />
      </div>
      <div className="w-full flex items-center justify-center mt-10">
        <span className="flex items-center justify-center gap-3 text-gray7 text-sm">
          Thousands of students waiting for a instructor. Start teaching &
          earning now!.
          <Link
            to={"/"}
            className="text-md flex items-center gap-2 text-primary hover:text-primary/60 duration-300"
          >
            Become Instructor
            <FaArrowRight />
          </Link>
        </span>
      </div>
    </SectionLayout>
  );
};

export default SectionDisplayTutor;
