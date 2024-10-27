import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useGetAllCourses } from "../hooks/useCourses";
import Loading from "./loader/Loading";
import CardSearch from "./card/CardSearch";

const FormSearch = () => {
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useGetAllCourses(searchText);
  
  return (
    <form className="relative flex items-center border border-gray1 w-[400px]">
      <IoIosSearch className="text-gray-500 ml-2" size={24} />
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Bạn muốn học gì..."
        className="flex-grow bg-transparent outline-none text-gray5 py-2.5 px-2 w-full peer"
      />
      <div className="absolute shadow-tooltip w-full right-0 top-full pt-[5px] z-[400] overflow-hidden transition-all transform scale-y-0 peer-focus-within:scale-y-100 origin-top duration-300">
        <div className="w-full flex p-3 max-h-[315px] min-h-[150px] bg-white overflow-auto scrollbar-thin">
          {searchText === "" && (
            <div className="font-light w-full flex items-center justify-center">
              Danh sách khóa học
            </div>
          )}
          {isLoading && (
            <div className="font-light w-full flex items-center justify-center">
              <Loading />
            </div>
          )}
          {!isLoading && searchText !== "" && (
            <div className="w-full flex flex-col h-full items-start gap-3">
              {data.courses?.map((item, index) => (
                <CardSearch item={item} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormSearch;
