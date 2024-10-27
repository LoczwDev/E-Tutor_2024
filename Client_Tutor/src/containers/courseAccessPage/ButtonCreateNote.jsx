import React, { useRef, useState } from "react";
import styled from "../../constants/styles/styles";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { formatDurationModify } from "../../hooks/formatDuration";

const ButtonCreateNote = ({
  handleNoteLecture,
  durationVideoActive,
  textNote,
  setTextNote,
}) => {
  const quillRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const showPopup = () => {
    setIsVisible(true);
  };

  const hidePopup = () => {
    setIsVisible(false);
  };

  const handlCreateNote = () => {
    handleNoteLecture();
    setIsVisible(false);
  };

  return (
    <>
      <button onClick={showPopup} className={`${styled.buttonPrimary}`}>
        Ghi chú
      </button>

      <div
        className={`fixed bottom-0 border-t border-[#ccc] shadow-section left-1/2 transform -translate-x-1/2 w-full h-max pt-10 pb-5 bg-white flex items-center justify-center transition-all duration-300 ease-in-out z-[200] ${isVisible ? "bottom-0" : "bottom-[-100%]"}`}
      >
        <div className="w-full flex flex-col items-center justify-center max-w-[1300px]">
          <div className="w-full">
            <h3 className="text-lg font-medium">
              Thêm ghi chú tại:{" "}
              <span className="ml-1 bg-primary p-3 text-white font-bold">
                {formatDurationModify(durationVideoActive.toFixed(0))}
              </span>
            </h3>
            <div className="w-fullpx-7 py-8">
              <div className="w-full">
                <label className="block font-medium text-lg mb-1">
                  Nội dung
                </label>
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={textNote}
                  onChange={setTextNote}
                  placeholder="Nhập mô tả khóa học của bạn"
                  className="w-full flex flex-col bg-transparent overflow-hidden text-gray6 border border-gray1"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "list",
                    "bullet",
                    "link",
                    "image",
                  ]}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-end">
              <button onClick={hidePopup} className={`${styled.buttonGray}`}>
                Hủy bỏ
              </button>
              <button
                onClick={handlCreateNote}
                className={`${styled.buttonPrimary}`}
              >
                Tạo Ghi chú
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonCreateNote;
