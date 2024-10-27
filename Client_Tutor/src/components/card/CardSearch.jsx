import React from "react";
import { Link } from "react-router-dom";
import { formatDuration } from "../../hooks/formatDuration";

const CardSearch = ({ item }) => {
  return (
    <div className="w-full">
      <Link
        to={`/course/${item._id}`}
        className="w-full flex items-start gap-2"
      >
        <div className="relative w-[100px] h-[56px] flex-shrink-0 overflow-hidden">
          <img
            src={item.thumbnail.url}
            className="w-full h-full object-cover"
            alt={`${item.name}_thumbnail`}
          />

          <div className="bg-primary/80 z-[100] text-[10px] font-extralight text-white absolute px-2 top-1 left-1">
            {formatDuration(item.durationCourse)}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm hover:text-primary font-light line-clamp-2">
            {item.name}
          </h4>
          <span className="text-xs text-gray6">{item.purchased} lượt mua</span>
        </div>
      </Link>
    </div>
  );
};

export default CardSearch;
