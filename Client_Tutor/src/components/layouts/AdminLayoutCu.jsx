import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoStatsChartOutline } from "react-icons/io5";
import { SiFuturelearn } from "react-icons/si";
import images from "../../constants/images/images";
import useUser from "../../hooks/useUser";

import { io } from "socket.io-client";
import stable from "../../constants/stables/stables";
import { useGetAllNotification } from "../../hooks/useNotification";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { PiBatteryChargingVerticalDuotone } from "react-icons/pi";

const ENDPOINT = stable.NODE_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, {
  transports: ["websocket"],
  withCredentials: true,
});

const adminNavItems = [
  {
    text: "Tổng quan",
    link: "/admin",
    icon: <LuLayoutDashboard />,
  },
  {
    text: "Create New Course",
    link: "/admin/create-course",
    icon: <IoStatsChartOutline />,
  },
  {
    text: "Danh mục",
    link: "/admin/categories",
    icon: <SiFuturelearn />,
  },
  {
    text: "Khóa học",
    link: "/admin/setup-create-course",
    icon: <SiFuturelearn />,
  },
  {
    text: "Khóa học",
    link: "/admin/setup-create-course",
    icon: <SiFuturelearn />,
  },
  {
    text: "Quản lý giao diện",
    link: "/admin/banner",
    icon: <SiFuturelearn />,
  },
  {
    text: "Messages",
    link: "/admin/messages",
    icon: <SiFuturelearn />,
    badge: "(3)",
  },
  {
    text: "Settings",
    link: "/admin/settings",
    icon: <SiFuturelearn />,
  },
];
const pageTitles = {
  "/admin": "Dashboard",
  "/admin/create-course": "Create New Course",
  "/admin/categories": "Danh mục",
  "/admin/courses": "My Courses",
  "/admin/earning": "Earning",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
};

const drawerWidth = 240;

const AdminLayoutCu = () => {
  const { data, isLoading, refetch } = useGetAllNotification();
  const [checkShowNotification, setCheckShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dkpfegzir/video/upload/v1728829048/afywkyzy7ppsvbh9r1cy.mp3"
    )
  );

  const playerNotificationSound = () => {
    audio.play(); // Chỉnh sửa ở đây
  };

  useEffect(() => {
    if (data && !isLoading) {
      setNotifications(
        data?.notifications.filter((item) => item.status === "Chưa đọc")
      );
    }
    audio.load();
  }, [data, isLoading]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      playerNotificationSound();
    });
  }, []);

  const location = useLocation();

  const user = useUser();
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#1D2026",
        position: "relative",
        zIndex: 10,
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          position: "relative",
          zIndex: 10,
          bgcolor: "#1D2026",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box className="flex items-center justify-center py-5">
          <div className="w-max">
            <div className="w-[120px] h-[32px]">
              <img
                src={images.LogoFooter}
                className="w-full h-full object-cover"
                alt="Logo"
              />
            </div>
          </div>
        </Box>
        <List>
          {adminNavItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                sx={{
                  bgcolor:
                    location.pathname === item.link ? "#FF6636" : "inherit",
                  color: location.pathname === item.link ? "white" : "inherit",
                  "&:hover": {
                    bgcolor: "#FF6636",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.link ? "white" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box className="bg-background" component="main" sx={{ flexGrow: 1 }}>
        <div className="w-full bg-white px-5 py-2">
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-primary">
                Chào
                <span className="ml-1 text-gray9 font-medium">
                  {user?.firstName}
                  <span className="ml-1">{user?.lastName}</span>
                </span>
              </span>
              <span className="text-xl font-semibold">
                {pageTitles[location.pathname] || ""}
              </span>
            </div>

            <div className="flex gap-5 justify-end">
              <div className="relative h-14 w-14 flex items-center justify-center bg-gray1">
                <IoIosNotificationsOutline
                  onClick={() =>
                    setCheckShowNotification(!checkShowNotification)
                  }
                  fontSize={30}
                />
                <div className="absolute right-3 top-3 p-0.5 rounded-full bg-white overflow-hidden">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div
                  className={`w-[350px] max-h-[500px] flex flex-col gap-3 overflow-y-scroll scrollbar-thin absolute transform origin-top duration-300 shadow-drop bg-white top-full right-0 p-3 z-[100] ${
                    checkShowNotification
                      ? "opacity-100 scale-y-100"
                      : "scale-y-0 "
                  }`}
                >
                  {notifications &&
                    notifications?.map((item, index) => (
                      <div key={index} className="w-full flex flex-col gap-3">
                        <div className="w-full flex items-center justify-between">
                          <p className="line-clamp-1 text-primary">
                            {item.title}
                          </p>
                          <p className="cursor-pointer text-secondary underline">
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
        </div>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayoutCu;
