import React from "react";
import { Input, Select } from "antd";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../assets/css/ant.css";
import { IoIosSearch } from "react-icons/io";
import CardCourseProgress from "../../components/card/CardCourseProgress";
import images from "../../constants/images/images";
import CardTutor from "../../components/card/CardTutor";

const { Option } = Select;

const ContentTeachers = () => {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-2xl mb-5">Courses (957)</h3>
      <div className="flex items-center justify-between gap-3 mb-5">
        {/* Search Input */}
        <div className="w-1/2">
          <label className="block text-gray6 text-xs font-normal mb-2">
            Search:
          </label>
          <form className="w-full flex items-center border border-gray1">
            <IoIosSearch className="text-gray-500 ml-2" size={24} />
            <input
              type="text"
              placeholder="What do you want learn..."
              className="flex-grow bg-transparent outline-none text-gray5 py-2.5 px-2 w-full"
            />
          </form>
        </div>

        <div className="w-1/2 flex items-center justify-between gap-3">

          {/* Status Select */}
          <div className="w-2/3">
            <label className="block text-gray6 text-xs font-normal mb-2">
              Status:
            </label>
            <Select
              style={{ height: "45px" }}
              defaultValue="All Courses"
              className="w-full flex items-center border border-gray1"
            >
              <Option value="All Courses">All Courses</Option>
              <Option value="Active">Active</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </div>

          {/* Teacher Select */}
          <div className="w-1/3">
            <label className="block text-gray6 text-xs font-normal mb-2">
              Teacher:
            </label>
            <Select
              style={{ height: "45px" }}
              defaultValue="All Teachers"
              className="w-full flex items-center border border-gray1"
            >
              <Option value="All Teachers">All Teachers</Option>
              <Option value="Teacher 1">Teacher 1</Option>
              <Option value="Teacher 2">Teacher 2</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-5 mb-10">
        <CardTutor message={true} />
        <CardTutor message={true} />
        <CardTutor message={true} />
        <CardTutor message={true} />
        <CardTutor message={true} />
        <CardTutor message={true} />
        <CardTutor message={true} />
        <CardTutor message={true} />
      </div>
      <div className="w-full flex items-center justify-center">
        <Stack spacing={2}>
          <Pagination
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#333",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#FF6636",
                color: "white",
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "#FF6636",
              },
            }}
            className="!text-[40px]"
            count={10}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default ContentTeachers;
