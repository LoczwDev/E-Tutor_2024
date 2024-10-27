import React, { useEffect, useState } from "react";
import { Select } from "antd";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../assets/css/ant.css";
import { IoIosSearch } from "react-icons/io";
import CardCourseProgress from "../../components/card/CardCourseProgress";
import { useGetAllCoursePurchased } from "../../hooks/useCourses";
import Loading from "../../components/loader/Loading";

const { Option } = Select;

const ContentCourses = ({ user }) => {
  const [nameSearch, setNameSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState(""); // State to store sort option
  const [dataCourse, setDataCourse] = useState(null);

  const { data, isLoading, isFetching, refetch } = useGetAllCoursePurchased(
    nameSearch,
    sortBy,
    page,
    10
  );

  console.log(sortBy);

  useEffect(() => {
    if (data && !isLoading) {
      setDataCourse(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch();
  }, [nameSearch, page, sortBy]);

  // Function to get the list of completed courseIds based on user progress
  const getCourseIdsByProgress = (status) => {
    if (!user?.progress) return [];

    if (status === "completed") {
      // Return courseIds where percentNumber === 100
      return user.progress
        .filter((item) => item.percentNumber === 100)
        .map((item) => item.courseId);
    } else if (status === "active") {
      // Return courseIds where percentNumber !== 100
      return user.progress
        .filter((item) => item.percentNumber !== 100)
        .map((item) => item.courseId);
    } else {
      // If status is empty (""), return all courses
      return user.progress.map((item) => item.courseId);
    }
  };

  const filteredCourseIds = getCourseIdsByProgress(status);

  // Filter courses based on the selected status and completed courseIds
  const filteredCourses = dataCourse?.courses.filter((course) => {
    if (status === "completed" || status === "active") {
      return filteredCourseIds.includes(course._id);
    }
    return true; // If the status is empty (""), return all courses
  });

  // Handle change in sort by option
  const handleSortChange = (value) => {
    setSortBy(value); // Update sortBy state
  };

  return (
    <div className="w-full">
      <h3 className="font-semibold text-2xl mb-5">
        Khóa học ({user?.progress?.length})
      </h3>
      <div className="flex items-center justify-between gap-3 mb-5">
        {/* Search Input */}
        <div className="w-2/5">
          <label className="block text-gray6 text-xs font-normal mb-2">
            Tìm kiếm
          </label>
          <form className="w-full flex items-center border border-gray1">
            <IoIosSearch className="text-gray-500 ml-2" size={24} />
            <input
              type="text"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              placeholder="Bạn muốn học gì?... "
              className="flex-grow bg-transparent outline-none text-gray5 py-2.5 px-2 w-full"
            />
          </form>
        </div>

        <div className="w-3/5 flex items-center justify-between gap-3">
          {/* Sort by Select */}
          <div className="w-full">
            <label className="block text-gray6 text-xs font-normal mb-2">
              Xếp theo
            </label>
            <Select
              style={{ height: "45px" }}
              defaultValue=""
              value={sortBy} // Bind sortBy value to the select
              onChange={handleSortChange} // Handle sort by change
              className="w-full flex items-center border border-gray1"
            >
              <Option value="">Mới nhất</Option>
              <Option value="nameAsc">Tên: Từ A-Z</Option>
              <Option value="nameDesc">Tên: Từ Z-A</Option>
            </Select>
          </div>

          {/* Status Select */}
          <div className="w-full">
            <label className="block text-gray6 text-xs font-normal mb-2">
              Trạng thái:
            </label>
            <Select
              style={{ height: "45px" }}
              defaultValue=""
              onChange={(value) => setStatus(value)} // Handle the change of status
              className="w-full flex items-center border border-gray1"
            >
              <Option value="">Tất cả</Option>
              <Option value="active">Đang hoạt động</Option>
              <Option value="completed">Đã hoàn thành</Option>
            </Select>
          </div>
        </div>
      </div>
      {isLoading || isFetching ? (
        <div className="relative w-full h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {filteredCourses?.length > 0 ? (
            <div className="w-full grid grid-cols-4 gap-5 mb-10">
              {filteredCourses?.map((course) => (
                <CardCourseProgress
                  user={user}
                  course={course}
                  key={course._id}
                />
              ))}
            </div>
          ) : (
            <div className="w-full bg-warning/20 text-gray7 text-center text-base p-2">
              Hiện tại vẫn chưa có khóa học phù hợp, bạn hay chọn khóa học khác
              nhé!
            </div>
          )}
        </>
      )}
      {filteredCourses?.length > 10 && (
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
              onChange={(event, value) => {
                setPage(value);
              }}
              count={10}
              color="primary"
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default ContentCourses;
