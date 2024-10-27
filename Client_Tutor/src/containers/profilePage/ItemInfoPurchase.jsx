import React, { useRef, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { GoArrowDown } from "react-icons/go";
import { TfiMoney } from "react-icons/tfi";
import { CiCreditCard1 } from "react-icons/ci";
import { IoPlayCircleOutline } from "react-icons/io5";
import { formatCurrency } from "../../hooks/formatCurrency";
import { FaStar } from "react-icons/fa";

const ItemInfoPurchase = ({ item }) => {
  console.log(item.courses);

  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  // format-DateOrder
  const formatDateOrder = (dateString) => {
    const date = new Date(dateString);
    return format(date, "do MMMM, yyyy 'lúc' HH:mm", {
      locale: vi,
    });
  };

  const totalLectures = item.courses.reduce((total, course) => {
    return (
      total +
      course.curriculumData.reduce((sum, curriculum) => {
        return sum + curriculum.lectures.length;
      }, 0)
    );
  }, 0);

  return (
    <div className="border border-gray1 w-full">
      {/* Dropdown header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex justify-between items-center p-4"
      >
        <div>
          <p
            className={`text-lg pb-2 duration-300 ${isOpen ? "text-primary" : "text-gray9"}`}
          >
            {formatDateOrder(item.createdAt)}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray7 text-sm">
              <IoPlayCircleOutline className="text-secondary" fontSize={20} />
              <span>{totalLectures} bài</span>
            </div>
            <div className="flex items-center gap-1 text-gray7 text-sm">
              <TfiMoney className="text-primary" fontSize={15} />
              <span> {formatCurrency(item?.payment_info?.amount)} </span>
            </div>
            <div className="flex items-center gap-1 text-gray7 text-sm">
              <CiCreditCard1 className="text-success" fontSize={20} />
              <span>
                {item.payment_info.confirmation_method === "Momo"
                  ? "MoMo"
                  : "Thẻ tín dụng"}
              </span>
            </div>
          </div>
        </div>
        <button className={`transform bg-primary text-white p-1.5`}>
          <GoArrowDown
            fontSize={25}
            className={`${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
          />
        </button>
      </div>

      {/* Dropdown content with smooth expand/collapse */}
      <div
        ref={contentRef}
        className="overflow-hidden border-t border-gray1 transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
        }}
      >
        <div className="w-full flex items-center justify-between px-4 py-3">
          <div className="w-1/2 flex flex-col gap-3">
            {item.courses.map((course, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="w-2/3 flex items-start gap-5">
                  <div className="w-56 h-28 overflow-hidden shadow-card">
                    <div className="w-full h-full">
                      <img
                        src={course.thumbnail.url}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col justify-between h-auto">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-warning mb-0.5" />{" "}
                        <span>{course.ratings}</span>{" "}
                        <span className="text-gray4">
                          ({course.reviews.length} đánh giá)
                        </span>
                      </div>
                      <div className="text-lg font-medium line-clamp-2">
                        {course.name}
                      </div>
                    </div>

                    <div className="text-xs text-gray4">
                      Giảng viên:{" "}
                      <span className="text-gray7 text-base">
                        {course.tutor.fullName}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-lg font-semibold text-primary w-1/6 flex justify-end">
                  {formatCurrency(course.estimatedPrice)}
                </div>
              </div>
            ))}
          </div>
          <span className="h-10 w-0.5 bg-primary" />

          <div className="w-1/3 flex flex-col justify-center items-center gap-3">
            <p className={`text-lg pb-2 duration-300 `}>
              {formatDateOrder(item.createdAt)}
            </p>
            <p className={`text-lg pb-2 duration-300 `}>
             Phí: {formatCurrency(7000)}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gray7 text-sm">
                <IoPlayCircleOutline className="text-secondary" fontSize={20} />
                <span>{totalLectures} bài</span>
              </div>
              <div className="flex items-center gap-1 text-gray7 text-sm">
                <TfiMoney className="text-primary" fontSize={15} />
                <span> {formatCurrency(item?.payment_info?.amount)} </span>
              </div>
              <div className="flex items-center gap-1 text-gray7 text-sm">
                <CiCreditCard1 className="text-success" fontSize={20} />
                <span>
                  {item.payment_info.confirmation_method === "Momo"
                    ? "MoMo"
                    : "Thẻ tín dụng"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default ItemInfoPurchase;
