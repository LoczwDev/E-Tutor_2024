import React from "react";
import { NavItem } from "./NavItem";
import CurrencyLanguageSelector from "./CurrencyLanguageSelector";

const Navbar = () => {
  const navInfoItem = [
    {
      link: "/",
      name: "Trang chủ",
    },
    {
      link: "/courses",
      name: "Khóa học",
    },
    {
      link: "/about",
      name: "Về chúng tôi",
    },
    {
      link: "/contact",
      name: "Liên hê",
    },
    {
      link: "/become-tutor",
      name: "Đăng ký giáo viên",
    },
  ];
  return (
    <div className="w-full flex items-center justify-between text-sm font-medium bg-gray9 px-10 h-[52px]">
      <ul className="flex items-center justify-center gap-5 h-full pl-0">
        {navInfoItem?.map((item, index) => (
          <NavItem item={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
