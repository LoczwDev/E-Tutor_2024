import React from "react";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
const BreadCrumbs = ({ data, classname }) => {
  return (
    <div
      className={`flex items-center py-4 overflow-x-auto font-bold whitespace-nowrap`}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center text-gray6 font-medium text-sm opacity-50 z-10 ${classname} `}
        >
          <Link to={item.link} className="truncate w-max max-w-[150px]">{item.name}</Link>
          {index !== data.length - 1 && (
            <span className="px-3">
              <GoChevronRight />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
