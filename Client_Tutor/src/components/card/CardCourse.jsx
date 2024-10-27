import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { FiBarChart } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import images from "../../constants/images/images";
import { IoCartOutline, IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import useUser, { useGetProfile, useToggleFavorite } from "../../hooks/useUser";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import { getProfileUser } from "../../services/userService";
import styled from "../../constants/styles/styles";
import { toast } from "sonner";
import useCart from "../../hooks/useCart";
import { cartActions } from "../../store/reducers/cartReducers";
import { getColorByTitle } from "../../services/getColorCategory";

const CardCourse = ({ item }) => {
  const [tooltipPosition, setTooltipPosition] = useState("left-[90%]");
  const [isCheckFavorite, setIsCheckFavorite] = useState(false);
  const [isCheckpurchased, setIsCheckpurchased] = useState(false);

  const cardRef = useRef(null);
  const dispatch = useDispatch();
  const user = useUser();
  const cart = useCart();

  useEffect(() => {
    if (user) {
      const isPurchased = user?.progress?.some(
        (el) => el.courseId === item._id
      );

      setIsCheckpurchased(isPurchased);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const checkFavorite = user.favorites.some(
        (course) => course._id === item._id
      );

      setIsCheckFavorite(checkFavorite);
    }
  }, [user]);

  const { mutate, isPending, isSuccess } = useToggleFavorite();

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

  const handleToggleFavorite = () => {
    if (user) {
      mutate({ courseId: item._id });
    } else {
      const loginModal = document.getElementById("login");
      loginModal.classList.add("modal-open");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      const loadData = async () => {
        const profileData = await getProfileUser();
        dispatch(userActions.setUserInfo(profileData));
      };
      loadData();
    }
  }, [isSuccess]);

  const handleAddCart = () => {
    const isItemInCart = cart?.some((cartItem) => cartItem._id === item._id);
    if (isItemInCart) {
      toast.info("Sản phẩm đã có trong giỏ hàng");
    } else {
      dispatch(cartActions.addItem(item));

      toast.success("Thêm thành công");
    }
  };

  return (
    <div className="relative group" ref={cardRef}>
      <div className="w-full rounded-lg border border-gray1 overflow-hidden h-max bg-white group-hover:shadow-card group-hover:translate-y-[-4px] duration-300">
        <div className="w-full h-[200px]">
          <img
            src={item.thumbnail.url}
            className="w-full h-full object-cover"
            alt="card-course"
          />
        </div>
        <div className="p-3 border-b border-gray1">
          <div className="flex flex-col items-start justify-between">
            <div
              style={{ backgroundColor: getColorByTitle(item.category) }}
              className="p-1 font-medium uppercase text-xs"
            >
              {item.category}
            </div>
            <div className="flex items-center">
              <div className="text-sm font-light">
                <span className="line-through mr-1">
                  {item.price.toLocaleString("vi-VN")}đ
                </span>
                <span className="!text-lg font-medium text-error">
                  {item.estimatedPrice.toLocaleString("vi-VN")}đ
                </span>
              </div>
            </div>
          </div>
          <div className="h-[70px] flex flex-col justify-end py-2 text-start">
            {isCheckpurchased ? (
              <Link
                to={`/course-access/${item._id}`}
                className="w-full line-clamp-2 text-lg font-medium hover:text-primary"
              >
                {item.name}
              </Link>
            ) : (
              <Link
                to={`/course/${item._id}`}
                className="w-full line-clamp-2 text-lg font-medium hover:text-primary"
              >
                {item.name}
              </Link>
            )}
          </div>
        </div>
        <div className="w-full p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-md">
              <FaStar className="mb-1 text-warning" />
              {item.ratings}
            </div>
            <div className="flex items-center gap-2 text-md">
              <LuUser2 className="text-[#564FFD] text-lg mb-1" />
              {item.purchased}
              <span className="text-gray5 font-normal text-sm">học viên</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute w-[450px] border border-gray1 -bottom-1/2 ${tooltipPosition} bg-white transform scale-y-0 origin-top shadow-tooltip opacity-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all ease-in-out duration-500 z-50 `}
      >
        <div className="w-full h-max">
          <div className="w-full h-max py-4 px-5 border-b border-gray1">
            <div
              style={{ backgroundColor: getColorByTitle(item.category) }}
              className={`w-max p-2 text-gray9 uppercase text-xs font-medium mb-3`}
            >
              {item.category}
            </div>
            <p className="w-full text-lg font-medium text-start mb-3">
              {item.name}
            </p>
            {/* teacher */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={
                      item?.tutor?.avatar
                        ? item?.tutor?.avatar?.url
                        : images.AvatarCur
                    }
                    alt="avt"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray5">Giảng viên</span>
                  <span className="text-base font-normal">
                    {item?.tutor?.fullName}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-md">
                <FaStar className="mb-1 text-warning" />
                <span>
                  {item.ratings}.0
                  <span className="text-gray5">({item.reviews.length})</span>
                </span>
              </div>
            </div>
            {/* rating */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-md">
                <LuUser2 className="text-[#564FFD] text-lg mb-1" />
                {item.purchased}
                <span className="text-gray5 font-normal text-sm">học viên</span>
              </div>
              <div className="flex items-center gap-2 text-md">
                <FiBarChart className="text-[#E34444] text-lg mb-1" />
                <span className="text-gray5 font-normal text-sm">
                  {item.level}
                </span>
              </div>
              <div className="flex items-center gap-2 text-md">
                <FaRegClock className="text-[#23BD33] text-lg mb-1" />
                <span className="text-gray5 font-normal text-sm">
                  {item.durations} ngày
                </span>
              </div>
            </div>
            {/* price */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-2xl font-normal">
                    {item.estimatedPrice.toLocaleString("vi-VN")}đ
                    <span className="!text-lg text-gray5 line-through">
                      {item.price.toLocaleString("vi-VN")}đ
                    </span>
                  </p>
                </div>
                <div className="py-1 px-3 text-center text-md font-medium bg-primary/10 text-primary">
                  {item.promotion}% off
                </div>
              </div>
              <div
                onClick={handleToggleFavorite}
                className="p-3 flex items-center justify-center bg-primary/10 text-2xl cursor-pointer"
              >
                {isCheckFavorite ? (
                  <IoHeartSharp className="text-primary" />
                ) : (
                  <IoHeartOutline className="text-primary" />
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-max py-4 px-5 border-b border-gray1">
            <span className="block text-sm text-start font-medium mb-3">
              Bạn sẽ học được gì
            </span>
            <div className="w-full text-start flex flex-col items-start gap-3">
              {item.benefits.map((item, index) => (
                <div key={index} className="w-full flex items-start gap-3">
                  <IoMdCheckmark className="text-[#23BD33] text-2xl" />
                  <p className="text-gray6 text-sm font-normal w-5/6">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-max py-4 px-5">
            {isCheckpurchased ? (
              <div className="w-full flex flex-col gap-3">
                <Link
                  to={`/course-access/${item._id}`}
                  className="w-full text-center capitalize bg-primary/10 text-pretty hover:bg-primary/80 hover:text-primary duration-300 py-2.5 px-4"
                >
                  Vào học
                </Link>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={handleAddCart}
                  className={styled.buttonPrimary}
                >
                  Thêm vào giỏ hàng
                </button>
                <Link
                  to={`/course/${item._id}`}
                  className="w-full text-center capitalize bg-primary/10 text-pretty hover:bg-primary/80 hover:text-primary duration-300 py-2.5 px-4"
                >
                  Xem khóa học
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCourse;
