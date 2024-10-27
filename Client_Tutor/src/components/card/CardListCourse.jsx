import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { FiBarChart } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import images from "../../constants/images/images";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";

const CardListCourse = () => {
  const [tooltipPosition, setTooltipPosition] = useState("left-[90%]");
  const cardRef = useRef(null);

  useEffect(() => {
    const handlePosition = () => {
      const cardElement = cardRef.current;
      if (cardElement) {
        const rect = cardElement.getBoundingClientRect();
        if (rect.right > window.innerWidth - 500) {
          setTooltipPosition("right-[90%]");
        } else {
          setTooltipPosition("left-[90%]");
        }
      }
    };

    handlePosition();
    window.addEventListener("resize", handlePosition);

    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, []);

  return (
    <div className="relative group" ref={cardRef}>
      <div className="w-full h-max grid grid-cols-[30%,70%] bg-white shadow-lg border border-gray1 overflow-hidden">
        <div className="h-full">
          <img
            src={images.CardCourse}
            className="w-full h-full object-cover"
            alt="card-course"
          />
        </div>
        <div className="px-5 py-3">
          <div className="w-full border-b border-gray1">
            <div className="w-full flex items-center justify-between">
              <div className="p-1 bg-primary/10 text-primary uppercase text-xs font-medium">
                Developments
              </div>
              <div>
                <p className="text-xl font-normal">
                  $14.00{" "}
                  <span className="!text-base text-gray5 line-through">
                    $26.00
                  </span>
                </p>
              </div>
            </div>
            <div className="py-2 text-start">
              <p className="w-full line-clamp-1 text-base font-medium">
                2021 Complete Python Bootcamp From Zero to Hero in Python
              </p>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img src={images.Avt} alt="avt" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-normal">Tran Huu Loc</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FaStar className="mb-1 text-warning" />
                <span>
                  5.0 <span className="text-gray5">(357,914)</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2 text-sm">
              <LuUser2 className="text-[#564FFD] text-lg mb-1" />
              265.7K
              <span className="text-gray5 font-normal text-sm">students</span>
            </div>
            <div className="flex items-center gap-2 text-md">
              <FiBarChart className="text-[#E34444] text-lg mb-1" />
              <span className="text-gray5 font-normal text-sm">Beginner</span>
            </div>
            <div className="flex items-center gap-2 text-md">
              <FaRegClock className="text-[#23BD33] text-lg mb-1" />
              <span className="text-gray5 font-normal text-sm">6 hour</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute w-[450px] border border-gray1 -top-1/2 ${tooltipPosition} bg-white transform scale-y-0 origin-top shadow-tooltip opacity-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all ease-in-out duration-500 z-50 `}
      >
        <div className="w-full h-max">
          <div className="w-full h-max py-4 px-5 border-b border-gray1">
            <div className="w-max p-2 bg-primary/10 text-primary uppercase text-xs font-medium mb-3">
              Developments
            </div>
            <p className="w-full text-lg font-medium text-start mb-3">
              2021 Complete Python Bootcamp From Zero to Hero in Python
            </p>
            {/* teacher */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={images.Avt} alt="avt" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray5">Course by</span>
                  <span className="text-base font-normal">Tran Huu Loc</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-md">
                <FaStar className="mb-1 text-warning" />
                <span>
                  5.0 <span className="text-gray5">(357,914)</span>
                </span>
              </div>
            </div>
            {/* rating */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-md">
                <LuUser2 className="text-[#564FFD] text-lg mb-1" />
                265.7K
                <span className="text-gray5 font-normal text-sm">students</span>
              </div>
              <div className="flex items-center gap-2 text-md">
                <FiBarChart className="text-[#E34444] text-lg mb-1" />
                <span className="text-gray5 font-normal text-sm">Beginner</span>
              </div>
              <div className="flex items-center gap-2 text-md">
                <FaRegClock className="text-[#23BD33] text-lg mb-1" />
                <span className="text-gray5 font-normal text-sm">6 hour</span>
              </div>
            </div>
            {/* price */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-2xl font-normal">
                    $14.00{" "}
                    <span className="!text-lg text-gray5 line-through">
                      $26.00
                    </span>
                  </p>
                </div>
                <div className="py-1 px-3 text-center text-md font-medium bg-primary/10 text-primary">
                  56% off
                </div>
              </div>
              <div className="p-3 flex items-center justify-center bg-primary/10 text-2xl">
                <IoHeartOutline className="text-primary" />
              </div>
            </div>
          </div>
          <div className="w-full h-max py-4 px-5 border-b border-gray1">
            <span className="block text-sm text-start font-medium mb-3">
              What you’ll learn
            </span>
            <div className="w-full text-start flex flex-col items-start gap-3">
              <div className="w-full flex items-start gap-3">
                <IoMdCheckmark className="text-[#23BD33] text-2xl" />
                <p className="text-gray6 text-sm font-normal w-5/6">
                  Learn to use Python professionally, learning both Python 2 and
                  Python 3!
                </p>
              </div>
              <div className="w-full flex items-start gap-3">
                <IoMdCheckmark className="text-[#23BD33] text-2xl" />
                <p className="text-gray6 text-sm font-normal w-5/6">
                  Create games with Python, like Tic Tac Toe and Blackjack!
                </p>
              </div>
              <div className="w-full flex items-start gap-3">
                <IoMdCheckmark className="text-[#23BD33] text-2xl" />
                <p className="text-gray6 text-sm font-normal w-5/6">
                  Create games with Python, like Tic Tac Toe and Blackjack!
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-max py-4 px-5">
            <div className="w-full flex flex-col gap-3">
              <button className="w-full capitalize flex items-center justify-center gap-3 bg-primary text-white hover:bg-primary/60 hover:text-primary duration-300 py-2.5 px-4">
                <IoCartOutline className="text-xl font-bold mb-1" />
                Add to card
              </button>
              <button className="w-full capitalize bg-primary/10 text-pretty hover:bg-primary/80 hover:text-primary duration-300 py-2.5 px-4">
                Course Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardListCourse;
