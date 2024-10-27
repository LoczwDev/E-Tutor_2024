import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import styled from "../../../constants/styles/styles";
import { CiEdit } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { PiVideo } from "react-icons/pi";
import { BsUpload } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fileToBase64 } from "../../../hooks/useFileToBase64";
import ContentLecture from "./ContentLecture";
import getFileIcon from "../../../hooks/getFileIcon";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999]">
      <div className="bg-white w-2/5">
        <div className="flex items-center justify-between p-5 border-b border-gray1">
          <h2 className="font-medium text-base">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray5 transform duration-500 hover:text-primary hover:rotate-180"
          >
            <IoIosClose fontSize={30} />
          </button>
        </div>
        <div className="w-full p-5">{children}</div>
      </div>
    </div>
  );
};

const LectureSection = ({
  title,
  onDelete,
  onEdit,
  step,
  lecture,
  lengthLectures,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  // Lecture content state
  const [video, setVideo] = useState(lecture?.video?.url || null);
  const [durationVideo, setDurationVideo] = useState(
    lecture.durationVideo || 0
  );
  const [attachFiles, setAttachFiles] = useState(lecture.attachFiles || []);
  const [desc, setDesc] = useState(lecture.desc || "");
  const [notes, setNotes] = useState(lecture.notes || "");
  const [contentData, setContentData] = useState(null);
  const quillRef = useRef(null);
  const videoEl = useRef(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    const video64 = await fileToBase64(file);
    setVideo(video64);
  };
  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    const durationInSeconds = Math.floor(video?.duration);
    setDurationVideo(durationInSeconds);
  };

  const handleAttachFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleEdit = async () => {
    setIsEditing(false);
    setIsOpenModal(false);
    let base64AttachFiles = [];

    if (attachFiles) {
      for (const file of attachFiles) {
        if (file.url) {
          base64AttachFiles.push({
            url: file.url,
            public_id: file.public_id,
            original_filename: file.original_filename,
          });
        } else {
          const base64File = await fileToBase64(file);
          base64AttachFiles.push({
            url: base64File,
            original_filename: file.name,
          });
        }
      }
    }

    // if (editedTitle.trim()) {
    onEdit({
      title: editedTitle || title,
      video: video || "",
      attachFiles: base64AttachFiles || [],
      desc: desc || "",
      notes: notes || "",
      duration: durationVideo,
    });
    setContentData({
      video: video || "",
      attachFiles: base64AttachFiles || [],
      desc: desc || "",
      notes: notes || "",
    });
    // }
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [actionModal, setActionModal] = useState("");
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center bg-white p-4 mb-0">
        <div className="flex items-center space-x-2">
          <span
            className="cursor-pointer"
            onClick={() => setShowContent(!showContent)}
          >
            <IoIosMenu />
          </span>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className={`${styled.input} bg-gray0`}
              onBlur={handleEdit}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleEdit();
              }}
            />
          ) : (
            <span>{editedTitle}</span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className={`${styled.buttonPrimary10}`}>
              Nội dung
              <span>
                <FaAngleDown />
              </span>
            </button>
            <div className="absolute right-0 top-[60px] m-0 z-[-1] p-4 border border-gray1 w-[180px] bg-white opacity-0 transform -translate-y-4 transition-all duration-300 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:z-[9999]">
              <ul className="list-none !pl-0">
                <li
                  className="hover:bg-gray1 p-2 cursor-pointer"
                  onClick={() => {
                    setIsOpenModal(true);
                    setActionModal("Video");
                  }}
                >
                  Video
                </li>
                <li
                  className="hover:bg-gray1 p-2 cursor-pointer"
                  onClick={() => {
                    setIsOpenModal(true);
                    setActionModal("attachFile");
                  }}
                >
                  Đính kèm tập tin
                </li>
                <li
                  className="hover:bg-gray1 p-2 cursor-pointer"
                  onClick={() => {
                    setIsOpenModal(true);
                    setActionModal("description");
                  }}
                >
                  Mô tả
                </li>
                <li
                  className="hover:bg-gray1 p-2 cursor-pointer"
                  onClick={() => {
                    setIsOpenModal(true);
                    setActionModal("notes");
                  }}
                >
                  Ghi chú
                </li>
              </ul>
            </div>
          </div>

          <div>
            <button
              disabled={lengthLectures < 2}
              className="text-error hover:text-primary disabled:text-gray6"
              onClick={onDelete}
            >
              <RiDeleteBinLine fontSize={20} />
            </button>
          </div>
          <div>
            <button
              className="text-error hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              <CiEdit fontSize={20} />
            </button>
          </div>
        </div>
      </div>
      {(video || attachFiles || desc || notes) && (
        <div
          className={`w-full max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray9 ${
            showContent ? "h-[400px] visible" : "h-0 invisible"
          } transition-all ease-in-out duration-300`}
        >
          <ContentLecture
            video={video}
            attachFiles={attachFiles}
            desc={desc}
            notes={notes}
            lecture={lecture}
          />
        </div>
      )}

      {/* {isOpen && (
        <div className="absolute bg-white border border-gray1 shadow-lg p-4 top-[337px] right-[148px] z-[1000]">
          <ul className="list-none !pl-0">
            <li
              className="hover:bg-gray1 p-2"
              onClick={() => {
                setIsOpenModal(true);
                setActionModal("Video");
              }}
            >
              Video
            </li>
            <li
              className="hover:bg-gray1 p-2"
              onClick={() => {
                setIsOpenModal(true);
                setActionModal("attachFile");
              }}
            >
              Attach File
            </li>
            <li
              className="hover:bg-gray1 p-2"
              onClick={() => {
                setIsOpenModal(true);
                setActionModal("description");
              }}
            >
              Description
            </li>
            <li
              className="hover:bg-gray1 p-2"
              onClick={() => {
                setIsOpenModal(true);
                setActionModal("notes");
              }}
            >
              Lecture Notes
            </li>
          </ul>
        </div>
      )} */}

      {/* Video Modal */}
      {isOpenModal && actionModal === "Video" && (
        <Modal title="Lecture Video" onClose={() => setIsOpenModal(false)}>
          <div className="w-full h-[200px] flex gap-5 pb-5 border-b border-gray1">
            <div className="w-full h-full flex items-center justify-center bg-gray0">
              <div className="w-full h-full text-gray3 flex items-center justify-center">
                {video ? (
                  <video
                    ref={videoEl}
                    src={video}
                    controls
                    onLoadedMetadata={handleLoadedMetadata}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PiVideo fontSize={100} />
                )}
                {/* {lecture?.video && !video && (
                  <video
                    src={lecture?.video?.url}
                    controls
                    onLoadedMetadata={handleLoadedMetadata}
                    className="w-full h-full object-cover"
                  />
                )} */}
              </div>
            </div>
            <div className="w-max h-full text-start flex flex-col items-start justify-start gap-5">
              <label
                htmlFor="video"
                className={`${styled.buttonPrimary10} font-medium !w-max cursor-pointer`}
              >
                Chọn video
                <span>
                  <BsUpload />
                </span>
                <input
                  id="video"
                  name="video"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <span className="text-sm font-normal block py-3">
            Note:
            <span className="text-gray7">
              Tệp phải có ít nhất 720p và nhỏ hơn 4,0 GB.
            </span>
          </span>
          <button className={styled.buttonPrimary} onClick={handleEdit}>
            Cập nhật
          </button>
        </Modal>
      )}

      {/* Attach File Modal */}
      {isOpenModal && actionModal === "attachFile" && (
        <Modal title="Attach File" onClose={() => setIsOpenModal(false)}>
          <div className="w-full h-[300px] flex gap-5 pb-5 border-b border-gray1">
            <div className="w-full h-full flex flex-col items-center justify-center">
              {attachFiles.length > 0 ? (
                <>
                  <div className="w-full h-full flex flex-col items-center justify-start text-base font-medium border border-gray1 p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray9">
                    {/* Display attached files */}
                    <div className="mb-5 w-full">
                      {attachFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2"
                        >
                          <div className="flex items-center gap-1">
                            <span className="text-[50px] text-primary">
                              {getFileIcon(file.name || file.original_filename)}
                            </span>
                            <span className="ml-2">
                              {file?.name ||
                                file?.original_filename ||
                                file?.url.name}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setAttachFiles((prevFiles) =>
                                prevFiles.filter((_, i) => i !== index)
                              );
                            }}
                            className="text-error hover:text-primary disabled:text-gray3 bg-error/10 p-2 flex items-center justify-center gap-1"
                          >
                            <RiDeleteBinLine fontSize={25} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full flex justify-end mt-5">
                    <label
                      htmlFor="attachFile"
                      className={`${styled.buttonGray} w-max cursor-pointer`}
                    >
                      <FaPlus /> Thêm nhiều file
                    </label>
                  </div>
                </>
              ) : (
                <label
                  htmlFor="attachFile"
                  className={`w-full h-full flex flex-col items-center justify-center text-base font-medium border border-gray1 p-5`}
                >
                  <div className="text-center">
                    <p>Attach File</p>
                    <span className="font-normal text-sm">
                      Kéo và thả một tập tin hoặc nhiều
                    </span>
                  </div>
                </label>
              )}
              <input
                id="attachFile"
                name="attachFile"
                type="file"
                multiple
                onChange={handleAttachFileChange}
                className="sr-only"
              />
            </div>
          </div>
          <div className="mt-3 w-full">
            <button className={styled.buttonPrimary} onClick={handleEdit}>
              Cập nhật
            </button>
          </div>
        </Modal>
      )}

      {/* Description Modal */}
      {isOpenModal && actionModal === "description" && (
        <Modal
          title="Add Lecture Description"
          onClose={() => setIsOpenModal(false)}
        >
          <div className="w-full flex gap-5 pb-5 border-b border-gray1">
            <div className="w-full h-full flex items-center justify-center">
              <ReactQuill
                ref={quillRef}
                value={desc}
                onChange={setDesc}
                placeholder="Nhập mô tả khóa học của bạn"
                className="w-full flex flex-col-reverse bg-transparent text-gray6 border border-gray1"
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
          <button className={styled.buttonPrimary} onClick={handleEdit}>
            Cập nhật
          </button>
        </Modal>
      )}

      {/* Notes Modal */}
      {isOpenModal && actionModal === "notes" && (
        <Modal title="Add Lecture Notes" onClose={() => setIsOpenModal(false)}>
          <div className="w-full flex gap-5 pb-5 border-b border-gray1">
            <div className="w-full h-full flex items-center justify-center">
              <ReactQuill
                ref={quillRef}
                value={notes}
                onChange={setNotes}
                placeholder="Kéo và thả một tập tin hoặc"
                className="w-full flex flex-col-reverse bg-transparent text-gray6 border border-gray1"
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
          <button className={styled.buttonPrimary} onClick={handleEdit}>
            Cập nhật
          </button>
        </Modal>
      )}
    </>
  );
};

export default LectureSection;
