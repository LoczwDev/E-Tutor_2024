import React from "react";
import icons from "../../constants/icons/icons";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import SectionLayout from "../../components/layouts/SectionLayout";
import { useGetAllCategory } from "../../hooks/useCategory";

const SectionCategory = () => {
  const { data, isLoading } = useGetAllCategory();
  // const dataCategoryCourses = [
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  //   {
  //     icon: icons.IconCategory,
  //     name: "IT & Software",
  //     quantity: "17,121",
  //     background: "#FFF0F0",
  //   },
  // ];
  return (
    <SectionLayout>
      {!isLoading && (
        <div className="w-full text-center">
          <h3 className="text-gray9 text-3xl font-semibold capitalize">
            Các danh mục hàng đầu
          </h3>
          <div className="w-full grid grid-cols-4 gap-3 mt-5">
            {data?.category?.map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: item.color }}
                className={`shadow-sm border border-transparent hover:border-[${item.color}] py-2.5 px-4 hover:bg-opacity-60 duration-300 cursor-pointer`}
              >
                <div className="w-full flex items-center justify-start gap-5">
                  <div className="w-14 h-14">
                    <img
                      src={item.imgCategory.url}
                      alt={`icon- ${item.title}`}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-1">
                    <span className="text-md font-medium">{item.title}</span>
                    <p className="text-xs text-gray6">
                      {item.subCategory.length} loại
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center mt-10">
            <span className="flex items-center justify-center gap-3 text-gray7 text-sm">
              Chúng tôi có nhiều danh mục và danh mục phụ hơn
              <Link
                to={"/list-courses"}
                className="text-md flex items-center gap-2 text-primary hover:text-primary/60 duration-300"
              >
                Các khóa học
                <FaArrowRight />
              </Link>
            </span>
          </div>
        </div>
      )}
    </SectionLayout>
  );
};

export default SectionCategory;
