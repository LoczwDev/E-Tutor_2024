import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Navbar from "./Navbar";
import images from "../constants/images/images";
import { FaChevronDown } from "react-icons/fa6";
import FormSearch from "./FormSearch";
import { IoCartOutline, IoNotificationsOutline } from "react-icons/io5";
import useUser from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userAction";
import { toast } from "sonner";
import { IoIosHeartEmpty, IoIosNotificationsOutline } from "react-icons/io";
import useCart from "../hooks/useCart";
import stable from "../constants/stables/stables";
import { io } from "socket.io-client";
import {
  useGetNotificationByUser,
  useUpdateNotificationByUser,
} from "../hooks/useNotification";
import customToast from "./toasterProvider/customToast";

const ENDPOINT = stable.NODE_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, {
  transports: ["websocket"],
  withCredentials: true,
});

export const Header = () => {
  const user = useUser();
  const cart = useCart();
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [dataCart, setDataCart] = useState([]);

  const {
    data: dataQureryNotification,
    isLoading,
    refetch,
  } = useGetNotificationByUser(user ? user._id : "");

  const {
    mutate: mutateUpdateNotification,
    isPending,
    isSuccess,
  } = useUpdateNotificationByUser();

  const [checkShowNotification, setCheckShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [isCheckProfile, setIsCheckProfile] = useState(false);

  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dkpfegzir/video/upload/v1728829048/afywkyzy7ppsvbh9r1cy.mp3"
    )
  );

  const playerNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (cart) {
      setDataCart(cart);
    }
  }, [cart]);

  const handleAuth = (active) => {
    if (active === "login") {
      document.getElementById("login").classList.add("modal-open");
    } else if (active === "register") {
      document.getElementById("register").classList.add("modal-open");
    }
  };

  const handleLogout = () => {
    dispath(logout());
    toast.success("Đăng xuất thành công");
    // window.location.reload();
  };

  const handleNavigateFavorites = () => {
    if (user) {
      navigate("/user-favorites");
    } else {
      document.getElementById("login").classList.add("modal-open");
    }
  };

  useEffect(() => {
    if (dataQureryNotification && !isLoading) {
      setNotifications(
        dataQureryNotification?.notifications?.notification.filter(
          (item) => item.status === "Chưa đọc"
        )
      );
      refetch();
    }
    audio.load();
  }, [dataQureryNotification, isLoading]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      playerNotificationSound();
    });
  }, []);

  const handleUpdateNotification = (id) => {
    mutateUpdateNotification({ notificationId: id });
  };

  useEffect(() => {
    if (isSuccess) {
      customToast.success("Thành công!");
      refetch();
    }
  }, [isSuccess]);

  return (
    <>
      <Navbar />
      <header className="w-full bg-white h-[80px] shadow-sm text-sm flex items-center justify-between px-10 z-[200]">
        <div className="flex items-center gap-5">
          <div className="w-max">
            <Link to={"/"} className="block w-[120px] h-[32px]">
              <img
                src={images.Logo}
                className="w-full h-full object-cover"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="border border-gray1 flex items-center justify-between p-2.5 w-36">
            <span>Danh mục</span>
            <FaChevronDown />
          </div>
          <FormSearch />
        </div>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-5">
            <div className="flex gap-5 justify-end">
              <div className="relative flex items-center justify-center">
                <IoNotificationsOutline
                  className="cursor-pointer"
                  onClick={() =>
                    setCheckShowNotification(!checkShowNotification)
                  }
                  fontSize={25}
                />
                {notifications?.length > 0 && (
                  <div className="absolute right-0 top-0 p-0.5 rounded-full bg-white overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                )}

                <div
                  className={`w-[350px] max-h-[500px] flex flex-col gap-3 overflow-y-auto scrollbar-thin absolute transform origin-top duration-300 shadow-drop bg-white top-full right-0 p-3 z-[100] ${
                    checkShowNotification
                      ? "opacity-100 scale-y-100"
                      : "scale-y-0 "
                  }`}
                >
                  {notifications?.length > 0 ? (
                    <div className="w-full">
                      {notifications.map((item, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div className="w-full flex items-center justify-between">
                            <p className="line-clamp-1 text-primary">
                              {item.title}
                            </p>
                            <p
                              onClick={() => handleUpdateNotification(item._id)}
                              className="cursor-pointer text-secondary underline"
                            >
                              Đánh dấu đã đọc
                            </p>
                          </div>
                          <p className="line-clamp-2 text-sm">{item.message}</p>
                          <p className="text-xs">
                            {formatDistanceToNow(item?.createdAt, {
                              addSuffix: true,
                              locale: vi,
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full text-center text-gray5">
                      Bạn chưa có thông báo nào
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Link to={"/user-cart"} className="relative cursor-pointer">
              <IoCartOutline
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                size={28}
              />
              <span
                className={`absolute -top-0 -right-1 w-3 h-3 p-2 text-sm rounded-full ${dataCart.length > 0 ? "bg-primary" : "bg-transparent"} text-white flex items-center justify-center`}
              >
                {dataCart.length > 0 ? dataCart.length : ""}
              </span>
            </Link>

            <div
              onClick={handleNavigateFavorites}
              className="relative cursor-pointer"
            >
              <IoIosHeartEmpty
                className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                size={28}
              />
              <span
                className={`absolute -top-0 -right-1 w-3 h-3 p-2 text-sm rounded-full ${user?.favorites.length > 0 ? "bg-primary" : "bg-transparent"} text-white flex items-center justify-center`}
              >
                {user?.favorites.length > 0 ? user?.favorites.length : ""}
              </span>
            </div>
          </div>
          {!user ? (
            <div className="flex items-center gap-3 font-medium">
              <button
                onClick={() => handleAuth("register")}
                className="bg-primary/10 text-primary hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4"
              >
                Đăng ký
              </button>
              <button
                onClick={() => handleAuth("login")}
                className="bg-primary text-white hover:bg-primary/80 hover:text-primary duration-300 py-2.5 px-4"
              >
                Đăng nhập
              </button>
            </div>
          ) : (
            <div
              onClick={() => setIsCheckProfile(!isCheckProfile)}
              className={`relative cursor-pointer`}
            >
              <div className="flex items-center justify-center">
                <button className="w-14 h-14 rounded-full overflow-hidden focus:outline-none">
                  <img
                    src={user?.avatar ? user?.avatar.url : images.AvatarCur}
                    className="w-full h-full object-cover"
                    alt="avatar-profile"
                  />
                </button>
              </div>
              <div
                className={`absolute right-0 top-[60px] m-0 py-2 max-w-[calc(100vw-10px)] bg-white shadow-drop transform transition-all duration-300 ${isCheckProfile ? "opacity-100 translate-y-0 z-[800]" : "-translate-y-full opacity-0 z-[-1]"}`}
              >
                <ul className="list-none !ml-0 flex flex-col gap-3 text-base text-gray6 min-w-[230px] py-2 px-6">
                  <div className="border-b border-gray1 py-2">
                    <div className="w-full flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={
                            user?.avatar ? user?.avatar.url : images.AvatarCur
                          }
                          className="w-full h-full object-cover"
                          alt="avatar-profile"
                        />
                      </div>
                      <div className="flex flex-col ml-[20px] text-gray9">
                        <span className="font-bold text-xl truncate">
                          {user.lastName}
                        </span>
                        <span className="text-gray3 text-xs">
                          @{user.username}
                        </span>
                      </div>
                    </div>
                  </div>
                  <li className="w-full border-b border-gray1 py-2 hover:text-primary duration-0">
                    <Link to={"/profile"}>Trang cá nhân</Link>
                  </li>
                  <div className="w-full border-b border-gray1 py-2 ">
                    <li className="w-full py-2 hover:text-primary duration-0">
                      <Link to={"/profile"}>Viết blog</Link>
                    </li>
                    <li className="w-full py-2 hover:text-primary duration-0">
                      <Link to={"/profile"}>Bài viết của tôi</Link>
                    </li>
                    <li className="w-full py-2">
                      <Link to={"/profile"}>Bài viết đã lưu</Link>
                    </li>
                  </div>
                  <div className="w-full py-2">
                    <li className="w-full py-2 hover:text-primary duration-0">
                      <Link to={"/setting"}>Cài đặt</Link>
                    </li>
                    <button
                      className="py-2 hover:text-primary duration-0"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
