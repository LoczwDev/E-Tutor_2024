import { IoIosNotificationsOutline } from "react-icons/io";
import {
  useGetNotificationByUser,
  useUpdateNotificationByUser,
} from "../../hooks/useNotification";
import { useEffect, useState } from "react";
import stable from "../../constants/stables/stables";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import images from "../../constants/images/images";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import customToast from "../toasterProvider/customToast";

const ENDPOINT = stable.NODE_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, {
  transports: ["websocket"],
  withCredentials: true,
});

const pageTitles = {
  "/admin": "Tổng quan",
  "/admin/manager-courses": "Khóa học",
  "/admin/manager-course/edit/": "Cập nhật khóa học",
  "/admin/manager-users": "Tài khoản",
  "/admin/manager-category": "Danh mục",
  "/admin/manager-sales": "Thông tin",
  "/admin/manager-orders": "Đơn hàng",
  "/admin/manager-settings": "Cài đặt",
};

const HeaderAdmin = () => {
  const user = useUser();
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
    if (dataQureryNotification && !isLoading) {
      setNotifications(
        dataQureryNotification?.notifications?.notification.filter(
          (item) => item.status === "Chưa đọc"
        )
      );
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

  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitleCur = currentPath.startsWith("/admin/manager-course/edit/")
    ? "Cập nhật khóa học"
    : pageTitles[currentPath] || "";

  return (
    <header className="!bg-white bg-opacity-50 backdrop-blur-md shadow- border-b border-gray0">
      <div className="max-w-7xl flex items-center justify-between mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray9">{pageTitleCur}</h1>
        <div className="flex gap-5 justify-end">
          <div className="relative flex items-center justify-center">
            <IoIosNotificationsOutline
              className="cursor-pointer"
              onClick={() => setCheckShowNotification(!checkShowNotification)}
              fontSize={30}
            />
            {notifications?.length > 0 && (
              <div className="absolute right-3 top-3 p-0.5 rounded-full bg-white overflow-hidden">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            )}

            <div
              className={`w-[350px] max-h-[500px] flex flex-col gap-3 overflow-y-auto scrollbar-thin absolute transform origin-top duration-300 shadow-drop bg-white top-full right-0 p-3 z-[100] ${
                checkShowNotification ? "opacity-100 scale-y-100" : "scale-y-0 "
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
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img
              src={user?.avatar ? user?.avatar?.url : images?.AvatarCur}
              className="w-full h-full object-cover"
              alt={`${user?.lastName}_avatar`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderAdmin;
