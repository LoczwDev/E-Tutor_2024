import React from "react";
import { Link, useLocation } from "react-router-dom";

export const NavItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.link;
  return (
    <li className="group flex items-center justify-center m-3 lg:m-0 relative h-full">
      <Link
        to={item.link}
        className={`h-full flex items-center justify-center relative p-2 before:absolute before:h-[3px] before:rounded-full before:transition-all before:duration-500 before:bg-primary before:top-0 ${
          isActive
            ? "before:w-full text-white"
            : "before:w-0 group-hover:before:w-full text-gray5"
        }`}
      >
        {item.name}
      </Link>
    </li>
  );
};
