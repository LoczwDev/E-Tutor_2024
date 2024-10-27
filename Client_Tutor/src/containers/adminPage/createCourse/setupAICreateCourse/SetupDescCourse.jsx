import React, { useState } from "react";
import styled from "../../../../constants/styles/styles";

const SetupDescCourse = ({
  active,
  setActive,
  handleChange,
  dataCourseSetup,
}) => {
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");

  const isDescValid = dataCourseSetup.desc.length >= 100;

  return (
    <div className="w-full mt-10">
      <div className="w-full mb-5">
        <label className={styled.label}>
          Tên khóa học (thường đề cập đến một phần hoặc một khía cạnh cụ thể của
          nội dung khóa học.)
        </label>
        <textarea
          className={styled.textarea}
          value={dataCourseSetup.name}
          name="name"
          rows={5}
          onChange={(e) => {
            setName(e.target.value);
            handleChange(e);
          }}
          maxLength={100}
        />
        <div className="text-right text-sm text-gray-500">
          {100 - name.length} ký tự còn lại
        </div>
      </div>
      <div className="w-full mb-5">
        <label className={styled.label}>
          Chủ đề (thường đề cập đến một phần hoặc một khía cạnh cụ thể của nội
          dung khóa học.)
        </label>
        <textarea
          className={styled.textarea}
          value={dataCourseSetup.topic}
          name="topic"
          rows={5}
          onChange={(e) => {
            setTopic(e.target.value);
            handleChange(e);
          }}
          maxLength={300}
        />
        <div className="text-right text-sm text-gray-500">
          {300 - topic.length} ký tự còn lại
        </div>
      </div>
      <div className="w-full mb-5">
        <label className={styled.label}>
          Mô tả (cung cấp một cái nhìn tổng quan về khóa học, giúp học viên hiểu
          rõ nội dung và mục tiêu của khóa học.)
        </label>
        <textarea
          className={styled.textarea}
          value={dataCourseSetup.desc}
          name="desc"
          rows={5}
          onChange={(e) => {
            setDesc(e.target.value);
            handleChange(e);
          }}
        />
        <div className="text-right text-sm text-gray-500">
          {desc.length} / ít nhất 100 ký tự
        </div>
      </div>
      <div className="w-full flex items-center justify-between py-5">
        <button
          type="button"
          onClick={() => setActive(active - 1)}
          className={styled.buttonTran}
        >
          Trở lại
        </button>
        <button
          disabled={dataCourseSetup.name === "" || dataCourseSetup.topic === "" || dataCourseSetup.desc === "" || !isDescValid} // Thêm điều kiện kiểm tra mô tả
          onClick={() => setActive(active + 1)}
          className={`${styled.buttonPrimary} disabled:bg-gray1`}
        >
          Lưu và đi tiếp
        </button>
      </div>
    </div>
  );
};

export default SetupDescCourse;
