import { Menu } from "antd";
import React from "react";
import { IoStatsChartOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiFuturelearn } from "react-icons/si";
import { Link } from "react-router-dom";

const adminNavItems = [
  {
    text: "Trang chủ",
    link: "/admin",
    icon: <LuLayoutDashboard />,
  },
  {
    text: "Khóa học",
    link: "/admin/create-course",
    icon: <IoStatsChartOutline />,
  },
  {
    text: "Danh mục",
    link: "/admin/categories",
    icon: <SiFuturelearn />,
  },
  {
    text: "My Courses",
    link: "/admin/courses",
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
  {
    text: "Thành phần website",
    icon: <SiFuturelearn />,
    dropdown: true,
    children: [
      {
        title: "Banner",
        link: "/admin/banner",
        icon: <SiFuturelearn />,
      },
      {
        title: "Banner",
        link: "/admin/banner",
        icon: <SiFuturelearn />,
      },
    ],
  },
];

const MenuList = () => {
  return (
    <Menu mode="inline" className="px-3 !bg-gray9">
      {adminNavItems?.map((item, index) => (
        <div key={index} className="w-full !text-gray5">
          {!item.dropdown ? (
            <Menu.Item key={item.title} icon={item.icon}>
              <Link to={item.link}> {item.text}</Link>
            </Menu.Item>
          ) : (
            <Menu.SubMenu key={item.title} icon={item.icon} title={item.text}>
              {item.children.map((el) => (
                <Menu.Item key={el.title} icon={el.icon}>
                  <Link to={el.link}> {el.title}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          )}
        </div>
      ))}
    </Menu>
  );
};

export default MenuList;
