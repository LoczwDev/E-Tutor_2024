import React, { useEffect, useState } from "react";
import { MdAccessAlarms } from "react-icons/md";
import { LuUser2 } from "react-icons/lu";
import { FiBarChart } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { LuBookMinus } from "react-icons/lu";
import { PiNewspaperLight } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa6";
import { LuMonitorSmartphone } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import { FiCopy } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import ExtraSkeleton from "../../components/skeletons/courseDetailPage/ExtraSkeleton";
import useUser, { useToggleFavorite } from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import styled from "../../constants/styles/styles";
import { getProfileUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import Loader from "../../components/loader/Loader";

const ExtraBuyCourse = ({ data, isLoading }) => {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPurchased, setIsPurchased] = useState(false);
  const [promotionRemainingDays, setPromotionRemainingDays] = useState(0);

  const [isCheckFavorite, setIsCheckFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      const checkFavorite = user.favorites.some(
        (course) => course?._id === data?._id
      );

      setIsCheckFavorite(checkFavorite);
    }
  }, [user]);

  const { mutate, isPending, isSuccess } = useToggleFavorite();

  const handleToggleFavorite = () => {
    if (user) {
      mutate({ courseId: data._id });
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

  useEffect(() => {
    if (data?.dayExpiry) {
      const calculateRemainingDays = () => {
        const currentDate = new Date();
        const promotionEndDate = new Date(data?.dayExpiry);
        const remainingTime = promotionEndDate - currentDate;
        if (remainingTime > 0) {
          const remainingDays = Math.ceil(
            remainingTime / (1000 * 60 * 60 * 24)
          );
          setPromotionRemainingDays(remainingDays);
        } else {
          setPromotionRemainingDays(0);
        }
      };

      calculateRemainingDays();

      const interval = setInterval(calculateRemainingDays, 86400000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [data?.dayExpiry]);

  useEffect(() => {
    if (data && !isLoading && user) {
      const purchasedItem = user?.progress.find(
        (item) => item.courseId === data?._id
      );
      setIsPurchased(!!purchasedItem);
    }
  }, [data, isLoading, user]);

  const handleBuyCourse = () => {
    if (user) {
      navigate(`/checkout/${data?._id}`);
    } else {
      const loginModal = document.getElementById("login");
      loginModal.classList.add("modal-open");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full">
          <ExtraSkeleton />
        </div>
      ) : (
        <>
          <div className="relative w-full bg-white px-4 py-2">
            {/* {isPending && <Loader />} */}
            <div className="w-full pb-3 border-b border-gray1">
              <div className="flex items-center justify-between gap-3">
                <p className="text-3xl font-semibold text-primary">
                  {new Intl.NumberFormat("vi-VN", {
                    currency: "VND",
                  }).format(data?.estimatedPrice)}
                  đ
                  <span className="!text-base text-gray5 line-through ml-1">
                    {new Intl.NumberFormat("vi-VN", {
                      currency: "VND",
                    }).format(data?.price)}
                    đ
                  </span>
                </p>
                <div className="py-1 px-3 text-center text-md font-medium bg-primary/10 text-primary">
                  {data?.promotion}% off
                </div>
              </div>

              {data?.dayExpiry && (
                <div className="flex items-center gap-1 text-sm text-[#E34444] pt-3">
                  <MdAccessAlarms /> Còn {promotionRemainingDays} ngày ở mức giá
                </div>
              )}
            </div>
            {/* details */}
            <div className="flex flex-col gap-5 py-5 border-b border-gray1">
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <FaRegClock className="text-gray5 text-sm" />
                  Thời lượng khóa học
                </div>
                <span className="text-gray5">{data?.durations}</span>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <FiBarChart className="text-gray5 text-sm" />
                  Cấp bậc
                </div>
                <span className="text-gray5">{data?.level}</span>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <LuUser2 className="text-gray5 text-sm" />
                  Học viên đã đăng ký
                </div>
                <span className="text-gray5 text-sm">{data?.purchased}</span>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <LuBookMinus className="text-gray5 text-sm" />
                  Ngôn ngữ
                </div>
                <span className="text-gray5">{data?.language}</span>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <PiNewspaperLight className="text-gray5 text-sm" />
                  Phụ đề
                </div>
                <span className="text-gray5">
                  {data?.subLanguage !== "" ? data?.subLanguage : "Không có"}
                </span>
              </div>
            </div>
            {/* checkout */}
            {isPurchased ? (
              <div className={styled.buttonPrimary10}>
                <Link to={`/course-access/${data?._id}`}>Vào khóa học</Link>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3 py-5 border-b border-gray1">
                <button
                  onClick={handleToggleFavorite}
                  className={`${isCheckFavorite ? styled.buttonPrimary10 : styled.buttonTran}`}
                >
                  {isCheckFavorite ? "Đã thích" : " Thêm yêu thích"}
                </button>
                <button
                  // to={`/checkout/${data?._id}`}
                  onClick={handleBuyCourse}
                  className={styled.buttonPrimary}
                >
                  Mua ngay
                </button>

                {/* note */}
                <div className="w-full">
                  <span className="gray6 text-xs">
                    Note:
                    <span className="text-gray5 ml-1">
                      tất cả các khóa học đều có đảm bảo hoàn tiền trong 30 ngày
                    </span>
                  </span>
                </div>
              </div>
            )}

            {/* benefit */}
            <div className="flex flex-col gap-5 py-5 border-b border-gray1">
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <FaRegClock className="text-primary text-sm" />
                  Truy cập trọn đời
                </div>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <FaDollarSign className="text-primary text-sm" />
                  Đảm bảo hoàn tiền trong 30 ngày
                </div>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <LuBookMinus className="text-primary text-sm" />
                  Tệp bài tập miễn phí và tài nguyên có thể tải xuống
                </div>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <LuMonitorSmartphone className="text-primary text-sm" />
                  Truy cập web trên nhiều thiết bị
                </div>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <PiNewspaperLight className="text-primary text-sm" />
                  Phụ đề tiếng anh
                </div>
              </div>
              <div className="w-full flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-3">
                  <LuLayers className="text-primary text-sm" />
                  Khóa học trực tuyến 100%
                </div>
              </div>
            </div>
            {/* share */}
            <div className="w-full py-5">
              <span className="text-base font-medium pb-5 block">
                Chia sẻ khóa học này:
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-gray0 w-2/3 h-[50px] text-base  text-gray7 gap-2 hover:bg-primary duration-300 cursor-pointer">
                  <FiCopy /> Sao chép
                </div>
                <div className="flex items-center justify-center bg-gray0 w-1/6 h-[50px] text-lg  text-gray7 gap-2 hover:bg-primary duration-300 cursor-pointer">
                  <FaFacebookF />
                </div>
                <div className="flex items-center justify-center bg-gray0 w-1/6 h-[50px] text-lg  text-gray7 gap-2 hover:bg-primary duration-300 cursor-pointer">
                  <FaTwitter />
                </div>
                <div className="flex items-center justify-center bg-gray0 w-1/6 h-[50px] text-lg  text-gray7 gap-2 hover:bg-primary duration-300 cursor-pointer">
                  <FaInstagram />
                </div>
                <div className="flex items-center justify-center bg-gray0 w-1/6 h-[50px] text-lg  text-gray7 gap-2 hover:bg-primary duration-300 cursor-pointer">
                  <FaWhatsapp />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ExtraBuyCourse;
