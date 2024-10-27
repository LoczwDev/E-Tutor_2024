import { Select } from "antd";
import React from "react";
import styled from "../../../../constants/styles/styles";

const SetupOptions = ({
  active,
  setActive,
  handleChange,
  setdataCourseSetup,
  dataCourseSetup,
  handleCreateCourse,
}) => {
  const handleSelectChange = (name, value) => {
    setdataCourseSetup((preData) => ({
      ...preData,
      [name]: value,
    }));
  };
  console.log(dataCourseSetup);
  
  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-5 mb-5">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <label className={styled.label}>Trình độ</label>
          </div>
          <Select
            showSearch
            id="level"
            name="level"
            value={dataCourseSetup.level || null}
            onChange={(value) => handleSelectChange("level", value)}
            className="custom-select"
            placeholder="Chọn trình độ"
            options={[
              { value: "Cơ bản", label: "Cơ bản" },
              { value: "Trung cấp", label: "Trung cấp" },
              { value: "Nâng cao", label: "Nâng cao" },
              { value: "Chuyên gia", label: "Chuyên gia" },
            ]}
          />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2">
            <label className={styled.label}>Thời lượng khuyến nghị</label>
          </div>
          <div className="relative flex items-center justify-between text-gray5">
            <input
              type="number"
              name="durations"
              value={dataCourseSetup.durations || ""}
              onChange={handleChange}
              className={`${styled.input}`}
              placeholder="Nhập thời gian"
            />
            {/* Select for Day, Week, Month */}
            <Select
              showSearch
              id="typeDurations"
              name="typeDurations"
              value={dataCourseSetup.typeDurations || "Ngày"}
              onChange={(value) => handleSelectChange("typeDurations", value)}
              className="absolute right-0 !w-[120px] custom-select"
              options={[
                { value: "Ngày", label: "Ngày" },
                { value: "Tuần", label: "Tuần" },
                { value: "Tháng", label: "Tháng" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center gap-5 mb-5">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <label className={styled.label}>
              Tự động mô tả (hệ thống sẽ gợi ý mô tả và ghi chú cho bài học)
            </label>
          </div>
          <Select
            showSearch
            id="autoSuggest"
            name="autoSuggest"
            value={dataCourseSetup.autoSuggest}
            onChange={(value) => handleSelectChange("autoSuggest", value)}
            className="custom-select"
            placeholder="Chọn"
            options={[
              { value: true, label: "Đồng ý" },
              { value: false, label: "Không" },
            ]}
          />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2">
            <label className={styled.label}>
              Số lượng bài học (hệ thống sẽ tự tạo số bài học tương tự)
            </label>
          </div>
          <div className="relative flex items-center justify-between text-gray5">
            <input
              type="number"
              name="numberCurriculum"
              value={dataCourseSetup.numberCurriculum || ""}
              onChange={handleChange}
              className={`${styled.input}`}
              placeholder="Nhập số lượng"
            />
          </div>
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
          disabled={
            !dataCourseSetup.typeDurations ||
            !dataCourseSetup.durations ||
            !dataCourseSetup.level ||
            !dataCourseSetup.numberCurriculum
          }
          onClick={handleCreateCourse}
          className={`${styled.buttonPrimary} disabled:bg-gray1`}
        >
          Đồng ý tạo khóa học
        </button>
      </div>
    </div>
  );
};

export default SetupOptions;
