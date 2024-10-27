import React from "react";
import styled from "../../../constants/styles/styles";
import parse from "html-react-parser";
import getFileIcon from "../../../hooks/getFileIcon";
import { PiVideo } from "react-icons/pi";

const ContentLecture = ({ video, attachFiles, desc, notes, lecture }) => {
  return (
    <div className="w-full py-2 px-5 bg-white relative z-[10] mb-3">
      <div className="py-3 flex items-start justify-between gap-5">
        <div className="w-[45%] h-[350px] bg-gray0 flex items-center justify-center">
          {video ? (
            <video
              src={video}
              controls
              className="w-full h-full object-cover"
            />
          ) : lecture?.video ? ( // Check if lecture.video exists if video is not present
            <video
              src={lecture.video.url || lecture.video}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center gap-2">
              <PiVideo fontSize={100} />
              <p>Chưa thêm video cho bài giảng này</p>
            </div>
          )}
        </div>

        <div className="w-1 h-32 bg-primary" />

        <div className="w-[55%]">
          <h3 className="font-semibold text-base mb-3 text-primary/80">
            Đính kèm tập tin ({attachFiles ? attachFiles.length : 0})
          </h3>
          {attachFiles && attachFiles.length > 0 ? (
            <>
              {attachFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 p-3 bg-gray0"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-[50px] text-primary">
                      {getFileIcon(file.name || file.original_filename)}
                    </span>
                    <span className="ml-2">
                      {file?.name || file?.original_filename || file?.url.name}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full flex items-center justify-center bg-warning/10 py-1.5">
              Chưa thêm file
            </div>
          )}
        </div>
      </div>
      {/* hr */}
      <div className="w-full flex items-center justify-center my-5">
        <div className="w-32 h-1 bg-primary" />
      </div>
      <div className="py-3">
        <h3 className="font-semibold text-base mb-3 text-primary/80">
          Mô tả bài giảng
        </h3>
        {desc ? (
          <div> {parse(desc)}</div>
        ) : (
          <div className="w-full flex items-center justify-center bg-warning/10 py-1.5">
            Chưa thêm mô tả
          </div>
        )}
      </div>
      <div className="py-3">
        <h3 className="font-semibold text-base mb-3 text-primary/80">
          Ghi chú bài giảng
        </h3>
        {notes ? (
          <div>{parse(notes)}</div>
        ) : (
          <div className="w-full flex items-center justify-center bg-warning/10 py-1.5">
            Chưa thêm ghi chú
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLecture;
