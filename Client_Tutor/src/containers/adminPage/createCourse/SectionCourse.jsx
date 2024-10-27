import React, { useState } from "react";
import LectureSection from "./LectureSection";
import styled from "../../../constants/styles/styles";
import { IoIosMenu } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

const SectionCourse = ({
  section,
  onAddLecture,
  onDeleteLecture,
  onEditLecture,
  onDeleteSection,
  onEditSection,
  step,
}) => {
  const { title, lectures } = section;
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [editedSectionTitle, setEditedSectionTitle] = useState(title);

  const handleEditSection = () => {
    setIsEditingSection(false);
    if (editedSectionTitle.trim()) {
      onEditSection(editedSectionTitle);
    }
  };

  const handleAddLecture = (numberLecture) => {
    onAddLecture(`Lecture ${numberLecture + 1}`);
  };

  return (
    <div className="bg-gray0 p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span>
            <IoIosMenu />
          </span>
          {isEditingSection ? (
            <input
              type="text"
              value={editedSectionTitle}
              onChange={(e) => setEditedSectionTitle(e.target.value)}
              className={styled.input}
              onBlur={handleEditSection}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleEditSection();
              }}
            />
          ) : (
            <h2 className="text-base font-normal">
              Bài học {step}:
              <span className="ml-1 text-lg !font-medium">{title}</span>
            </h2>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Them bai hoc */}
          <div className="relative">
            <button
              className="bg-success/10 hover:bg-success/70 hover:text-white text-success p-2 flex items-center justify-center gap-1 duration-300"
              onClick={() => handleAddLecture(lectures?.length)}
            >
              <FaPlus fontSize={15} /> Thêm bài giảng
            </button>
          </div>
          {/* Edit ten bai */}
          <div>
            <button
              className="bg-secondary/10 text-secondary hover:bg-secondary/70 hover:text-white p-2 flex items-center duration-300"
              onClick={() => setIsEditingSection(true)}
            >
              <CiEdit fontSize={20} />
            </button>
          </div>
          {/* Xoa bai */}
          <div>
            <button
              disabled={step === 1}
              className="text-error hover:text-primary disabled:text-gray3 bg-error/10 p-2 flex items-center justify-center gap-1"
              onClick={onDeleteSection}
            >
              <RiDeleteBinLine fontSize={20} />
            </button>
          </div>
        </div>
      </div>

      {lectures.map((lecture, index) => (
        <LectureSection
          key={index}
          step={index + 1}
          lecture={lecture}
          title={lecture.title}
          lengthLectures={lectures.length}
          onDelete={() => onDeleteLecture(index)}
          onEdit={(newName) => onEditLecture(index, newName)}
        />
      ))}
    </div>
  );
};

export default SectionCourse;
