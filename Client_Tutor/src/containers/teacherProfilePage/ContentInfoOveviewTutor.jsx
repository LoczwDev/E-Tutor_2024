import React from "react";

const ContentInfoOveviewTutor = ({ dataTeacher }) => {
  console.log(dataTeacher);

  return (
    <div className="p-3 border border-gray1">
      <h3>Giới thiệu về tôi</h3>
      <p className="text-justify">
        {dataTeacher?.introduction
          ? dataTeacher?.introduction
          : "Giảng viên chưa cập nhât"}
      </p>
    </div>
  );
};

export default ContentInfoOveviewTutor;
