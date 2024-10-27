import React, { useEffect, useState } from "react";
import { useGetAllCategory } from "../../../../hooks/useCategory";
import styled from "../../../../constants/styles/styles";
import { FaArrowLeftLong } from "react-icons/fa6";

const ChooseCategory = ({
  active,
  setActive,
  setdataCourseSetup,
  dataCourseSetup,
}) => {
  const { data, isLoading } = useGetAllCategory();
  const [dataSubCategory, setDataSubCategory] = useState(null);
  const [titleCategory, setTitleCategory] = useState("");
  const [titleSubCategory, setSubTitleCategory] = useState("");

  const handleChosseCategory = (title) => {
    setTitleCategory(title);
  };
  useEffect(() => {
    if (titleCategory && data) {
      const dataSubcategoryFind = data?.category.find(
        (item) => item.title === titleCategory
      );
      setDataSubCategory(dataSubcategoryFind.subCategory);
    }
  }, [titleCategory, data]);

  useEffect(() => {
    if (titleCategory !== "" && titleSubCategory !== "") {
      setdataCourseSetup((preData) => ({
        ...preData,
        category: titleCategory,
        subCategory: titleSubCategory,
      }));
    }
  }, [titleCategory, titleSubCategory]);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10">
      {!isLoading && (
        <div className="w-full">
          {titleCategory === "" ? (
            <div className="w-full">
              <h3 className={styled.label}>Chọn ngành học</h3>
              <div className="w-full grid grid-cols-5 gap-5 mt-5">
                {data?.category?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleChosseCategory(item.title)}
                    style={{ backgroundColor: item.color }}
                    className={`focus:border-primary ${dataCourseSetup.category === item.title ? "border-primary" : "border-transparent"} shadow-sm border-2  hover:border-[${item.color}] py-2.5 px-4 hover:bg-opacity-60 duration-300 cursor-pointer`}
                  >
                    <div className="w-full flex flex-col text-center items-center justify-start gap-5">
                      <div className="w-10 h-10">
                        <img
                          src={item.imgCategory.url}
                          alt={`icon- ${item.title}`}
                        />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-1">
                        <span className="text-sm font-normal">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-8 text-gray9 hover:text-gray9/10 cursor-pointer bg-gray0 flex items-center justify-center rounded-full"
                  onClick={() => {
                    setTitleCategory(""), setSubTitleCategory("");
                  }}
                >
                  <FaArrowLeftLong fontSize={15} />
                </div>
                <h3 className={styled.label}>Chọn loại bài học</h3>
              </div>

              <div className="w-full grid grid-cols-4 gap-5 mt-5">
                {dataSubCategory?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSubTitleCategory(item.title)}
                    className={`focus:bg-primary/10 h-[70px] focus:border-primary ${dataCourseSetup.subCategory === item.title ? "border-primary bg-primary/10" : "border-gray1"} w-full flex flex-col text-center items-center justify-start gap-5 border p-3`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                      <div className="text-sm font-normal line-clamp-2">{item.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="w-full flex items-center justify-between py-5">
        <button
          type="button"
          disabled={active === 0}
          onClick={() => setActive(active - 1)}
          className={`${styled.buttonTran} disabled:bg-gray1`}
        >
          Trở lại
        </button>
        <button
          disabled={dataCourseSetup.titleCategory === "" || dataCourseSetup.titleSubCategory === ""}
          onClick={() => setActive(active + 1)}
          className={`${styled.buttonPrimary} disabled:bg-gray1`}
        >
          Lưu và đi tiếp
        </button>
      </div>
    </div>
  );
};

export default ChooseCategory;
