import { useState, useEffect } from "react";
import styled from "../../../constants/styles/styles";
import SectionCourse from "./SectionCourse";
import { toast } from "sonner";

const Curriculum = ({
  handleChangeStep,
  step,
  data,
  setData,
  setCheckValue,
  checkValue,
}) => {
  const curriculumDataCur = data?.curriculumData || [];
  const [sections, setSections] = useState(curriculumDataCur);

  const [errorMessages, setErrorMessages] = useState([]);

  // Count check value for validation
  const countCheckValue = () => {
    let count = data.curriculumData?.length || 0;
    setCheckValue(count);
  };

  useEffect(() => {
    countCheckValue();
  }, [data]);

  // Sync sections with parent component
  useEffect(() => {
    if (sections) {
      setData({
        curriculumData: sections,
      });
    }
  }, [sections, curriculumDataCur]);
  console.log(sections.length);
  console.log(data.curriculumData.length);

  // Handle adding a new section
  const handleAddSection = () => {
    const newSection = {
      title: "New Section",
      lectures: [
        {
          title: "Lecture 1",
          video: "",
          attachFiles: [],
          desc: "",
          notes: "",
          duration: 0,
        },
      ],
    };
    setSections((prevSections) => [...prevSections, newSection]);
  };

  // Handle deleting a section
  const handleDeleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  // Handle adding a lecture to a specific section
  const handleAddLecture = (index, lectureName) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].lectures.push({
        title: lectureName || "New Lecture",
        video: "",
        attachFiles: [],
        desc: "",
        notes: "",
        duration: 0,
      });
      return updatedSections;
    });
  };

  // Handle deleting a lecture from a specific section
  const handleDeleteLecture = (sectionIndex, lectureIndex) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].lectures = updatedSections[
        sectionIndex
      ].lectures.filter((_, i) => i !== lectureIndex);
      return updatedSections;
    });
  };

  // Handle editing a lecture
  const handleEditLecture = (sectionIndex, lectureIndex, updatedLecture) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[sectionIndex].lectures[lectureIndex] = updatedLecture; // Update the specific lecture
      return updatedSections;
    });
  };

  // Handle editing a section name
  const handleEditSection = (index, newName) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].title = newName; // Update section title
      return updatedSections;
    });
  };

  // Validate sections and lectures
  const validateSections = () => {
    const errors = [];
    sections.forEach((section) => {
      section.lectures.forEach((lecture, lectureIndex) => {
        if (lecture.title === "") {
          errors.push(
            `Bài giảng ${lectureIndex + 1} trong phần "${section.title}" chưa có tiêu đề.`
          );
        }

        if (lecture.video === "") {
          errors.push(
            `Bài giảng ${lectureIndex + 1} trong phần "${section.title}" chưa có video.`
          );
        }
        if (lecture.desc === "") {
          errors.push(
            `Bài giảng ${lectureIndex + 1} trong phần "${section.title}" chưa có mô tả.`
          );
        }
        if (lecture.notes === "") {
          errors.push(
            `Bài giảng ${lectureIndex + 1} trong phần "${section.title}" chưa có ghi chú.`
          );
        }
      });
    });
    setErrorMessages(errors);
    return errors.length === 0;
  };

  // Handle the next step in the workflow
  const handleNextStep = () => {
    setErrorMessages([]);
    if (checkValue < 0) {
      toast.error("Cần phải có 3 bài học để xuất bản");
      return;
    }

    if (validateSections()) {
      handleChangeStep(step + 1);
    } else {
      errorMessages.forEach((error) => toast.error(error));
      return;
    }
  };

  return (
    <div className="space-y-6">
      <div className="w-full border-b border-gray1 px-7 py-5">
        <h3 className="font-semibold text-2xl">Giáo trình khóa học</h3>
      </div>

      {/* Curriculum sections */}
      <div className="w-full border-b border-gray1 px-7 py-5">
        <div className="w-full">
          {sections.map((section, index) => (
            <div key={index} className="w-full">
              {index >= 1 && (
                <div className="h-1 w-full flex items-center justify-center my-4">
                  <div className="bg-primary w-32 h-full" />
                </div>
              )}
              <SectionCourse
                step={index + 1}
                section={section}
                onAddLecture={(lectureName) =>
                  handleAddLecture(index, lectureName)
                }
                onDeleteLecture={(lectureIndex) =>
                  handleDeleteLecture(index, lectureIndex)
                }
                onEditLecture={(lectureIndex, updatedLecture) =>
                  handleEditLecture(index, lectureIndex, updatedLecture)
                }
                onDeleteSection={() => handleDeleteSection(index)}
                onEditSection={(newName) => handleEditSection(index, newName)}
              />
            </div>
          ))}

          {/* Add Section */}
          <div className="w-full flex items-center justify-center my-5">
            <button
              onClick={handleAddSection}
              className={`${styled.buttonPrimary10} !w-full font-semibold text-base`}
            >
              Thêm bài học
            </button>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="w-full flex items-center justify-between px-7 py-5">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => handleChangeStep(step - 1)}
          className={styled.buttonTran}
        >
          Back
        </button>
        <button
          onClick={handleNextStep}
          type="button"
          className={styled.buttonPrimary}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default Curriculum;
