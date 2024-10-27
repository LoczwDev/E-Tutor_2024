import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../../hooks/formatCurrency";
import { useGetAllCourses } from "../../../hooks/useCourses";
import styled from "../../../constants/styles/styles";
import Loading from "../../../components/loader/Loading";
import { Link } from "react-router-dom";

const CoursesTable = ({ checkCreateCourses, setCheckCreateCourses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllCourses();
  const [dataCourses, setDataCourses] = useState([]);

  useEffect(() => {
    if (data && !isLoading) {
      setDataCourses(data?.courses);
    }
  }, [data, isLoading]);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data?.courses?.filter(
      (course) =>
        course.name.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term)
    );

    setDataCourses(filtered);
  };

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray1 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray9">Danh sách khóa học</h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm khóa học..."
              className="bg-gray1 text-gray9 placeholder-gray9 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray9" size={18} />
          </div>
          <button
            onClick={() => setCheckCreateCourses(!checkCreateCourses)}
            className={`${styled.buttonPrimary10} !rounded-xl`}
          >
            Thêm khóa học
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray9 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray9 uppercase tracking-wider">
                  Giáo viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray9 uppercase tracking-wider">
                  Tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray9 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray9 uppercase tracking-wider">
                  Lượt mua
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray9 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {dataCourses?.map((course) => (
                <motion.tr
                  key={course._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray5 flex gap-2 items-center">
                    <img
                      src={course.thumbnail.url}
                      alt="course img"
                      className="size-10 rounded-full"
                    />
                    {course.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray5">
                    {course.tutor.fullName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">
                    {formatCurrency(
                      course.estimatedPrice
                        ? course.estimatedPrice
                        : course.price
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray5">
                    {course.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray5">
                    {course.purchased}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray5">
                    <Link to={`/admin/manager-course/edit/${course._id}`} className="inline-block text-indigo-400 hover:text-indigo-300 mr-3">
                      <Edit size={18} />
                    </Link>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                  {dataCourses.length <= 0 && (
                    <td
                      colSpan={5}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray5"
                    >
                      Không có dữ liệu
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};
export default CoursesTable;
