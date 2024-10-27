import { Select } from "antd";
import React, { useEffect, useState } from "react";
import ContainerEditNote from "./ContainerEditNote";
import styled from "../../constants/styles/styles";

const ContentNoteVideo = ({
  user,
  courseId,
  lectureIdAcvite,
  refetch,
  handleRunVideoNote,
  setDurationVideoActive,
}) => {
  const [dataNote, setDataNote] = useState(null);
  const [selectedOption, setSelectedOption] = useState("1");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch the notes based on course and lecture ID
  useEffect(() => {
    if (user && courseId) {
      const courseNote = user.progress?.find(
        (item) => item.courseId === courseId
      );
      if (courseNote) {
        // Filter based on selected option
        if (selectedOption === "1") {
          // Show notes for the current lecture
          const lectureNote = courseNote.lectureNote.find(
            (item) => item.lectureId === lectureIdAcvite
          );
          setDataNote(lectureNote || null);
        } else {
          // Show notes for all lectures
          const allNotes = courseNote.lectureNote.flatMap((lecture) => lecture);
          setDataNote(allNotes);
        }
      }
    }
  }, [user, courseId, lectureIdAcvite, selectedOption]);

  // Function to handle select dropdown change
  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  // Function to open the popup
  const openPopup = () => setIsPopupOpen(true);
  // Function to close the popup
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <button
        id="step-5"
        onClick={openPopup}
        className={styled.buttonPrimary10}
      >
        Ghi chú
      </button>

      {/* Popup Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg transition-transform z-[500] ${
          isPopupOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <div className="w-full">
          {/* Close Button */}
          <button onClick={closePopup} className="w-full text-end">
            <span className="p-5 block w-max hover:rotate-180 transform transition-all ease-in-out duration-500 text-primary hover:text-primary/50">
              ✕
            </span>
          </button>

          {/* Header with Select Dropdown */}
          <div className="w-full flex items-center justify-between px-5">
            <h2 className="block text-2xl font-bold text-primary">
              Ghi chú của tôi
            </h2>
            <Select
              className="custom-select !w-1/3"
              value={selectedOption}
              onChange={handleSelectChange}
              options={[
                { value: "1", label: "Trong bài hiện tại" },
                { value: "", label: "Trong tất cả các bài giảng" },
              ]}
            />
          </div>
          <div className="w-full max-h-[90vh] p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray9">
            {dataNote ? (
              Array.isArray(dataNote) ? (
                // Display notes for all lectures
                dataNote.map((item, index) => (
                  <ContainerEditNote
                    key={index}
                    data={item.contentNote} // Pass contentNote from each lecture item
                    lectureId={item.lectureId} // Pass the lectureId from each item
                    courseId={courseId}
                    refetch={refetch}
                    handleRunVideoNote={handleRunVideoNote}
                    setDurationVideoActive
                  />
                ))
              ) : (
                // Display notes for the current lecture
                <ContainerEditNote
                  key={dataNote.lectureId}
                  data={dataNote.contentNote}
                  lectureId={dataNote.lectureId}
                  courseId={courseId}
                  refetch={refetch}
                  handleRunVideoNote={handleRunVideoNote}
                  setDurationVideoActive
                />
              )
            ) : (
              <p className="text-gray-500">Đang tải ghi chú...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentNoteVideo;
