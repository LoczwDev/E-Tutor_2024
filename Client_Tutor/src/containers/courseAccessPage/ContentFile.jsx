import React from "react";
import { Element } from "react-scroll";
import styled from "../../constants/styles/styles";
import getFileIcon from "../../hooks/getFileIcon";

const ContentFile = ({ dataFile }) => {
  return (
    <Element name="File">
      <h3 className="text-2xl font-semibold mb-3">
        Đính kèm tập tin ({dataFile ? dataFile.length : 0})
      </h3>
      <div className="w-full bg-gray0 py-4 px-5">
        {dataFile && dataFile.length > 0 ? (
          dataFile.map((file, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between py-1"
            >
              <div className="mb-2 flex items-center gap-5">
                <span className="text-4xl text-primary">
                  {getFileIcon(file.public_id)}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-base">
                    {file.original_filename
                      ? file.original_filename
                      : "File không tên"}
                  </span>
                  <p className="text-xs">Dug luong</p>
                </div>
              </div>
              <button>
                <a href={file.url} className={styled.buttonPrimary} download>
                  Tải xuống
                </a>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không có tập tin nào để tải xuống.</p>
        )}
      </div>
    </Element>
  );
};

export default ContentFile;
