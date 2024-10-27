import React from "react";

import { FaFileAlt, FaFolder, FaRegFileAlt } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";

const getFileIcon = (fileName) => {
  
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <CiImageOn />;
    case "pdf":
      return <FaRegFileAlt />;
    case "zip":
    case "rar":
      return <FaFolder />;
    default:
      return <FaFileAlt />;
  }
};

export default getFileIcon;
