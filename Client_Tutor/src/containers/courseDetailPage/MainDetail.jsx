import React, { useState } from "react";
import images from "../../constants/images/images";
import { FaPlay, FaStar } from "react-icons/fa6";
import ContentOverview from "./ContentOverview";
import ContentCurriculum from "./ContentCurriculum";
import ContentInstructor from "./ContentInstructor";
import TabsScrollDetail from "./TabsScrollDetail";
import ContentReview from "./ContentReview";
import MainSkeleton from "../../components/skeletons/courseDetailPage/MainSkeleton";
import Plyr from "plyr-react";
import "plyr-react/plyr.css"

const MainDetail = ({ data, isLoading }) => {
  const dataTabs = [
    {
      link: "Overview",
      title: "Tổng quan",
    },
    {
      link: "Curriculum",
      title: "Chương trình",
    },
    {
      link: "Instructor",
      title: "Giảng viên",
    },
    {
      link: "Review",
      title: "Đánh giá",
    },
  ];
  const [viewTrailer, setViewTrailer] = useState(false);
  return (
    <div className="w-full">
      {isLoading ? (
        <MainSkeleton />
      ) : (
        <>
          <h3 className="text-3xl font-medium line-clamp-2 mb-3">
            {data?.name}
          </h3>
          <p className="mb-3 line-clamp-1 text-gray7 text-base">
            {data?.topic}
          </p>
          <div className="w-full flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white">
                <img
                  src={
                    data?.tutor.avatar
                      ? data?.tutor.avatar.url
                      : images.AvatarCur
                  }
                  className="w-14 h-14 rounded-full object-cover p-[3px]"
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray5 text-xs">Tạo bởi</span>
                <div className="text-base font-medium">
                  {data?.tutor?.fullName}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-warning">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="font-bold">{data?.ratings}</span>
              <span className="text-gray5">
                ({data?.reviews?.length} đánh giá)
              </span>
            </div>
          </div>
          {/* Video trailer */}
          <div className="mb-5 w-full h-[500px]">
            {!viewTrailer ? (
              <div className="relative w-full h-full overflow-hidden z-1">
                {
                  <img
                    src={data?.thumbnail?.url}
                    className="w-full h-full object-cover relative z-1"
                    alt=""
                  />
                }
                <div className="absolute w-full h-full top-0 bottom-0 right-0 left-0 flex items-center justify-center z-[3]">
                  <div
                    onClick={() => setViewTrailer(true)}
                    className="w-16 h-16 flex items-center justify-center bg-white rounded-full overflow-hidden cursor-pointer hover:bg-opacity-60"
                  >
                    <FaPlay className="text-2xl text-primary" />
                  </div>
                </div>
                <div className="absolute w-full h-full top-0 bottom-0 right-0 left-0 bg-black/50 z-[2]" />
              </div>
            ) : (
              <Plyr
                source={{
                  type: "video",
                  // @ts-ignore
                  sources: [{ src: data?.trailer?.url }],
                }}
              />
            )}
          </div>
          <div className="relative z-1 mb-5">
            <TabsScrollDetail dataTabs={dataTabs} />
            <div className="mb-5">
              <ContentOverview data={data} />
            </div>
            <div className="mb-5">
              <ContentCurriculum data={data} />
            </div>
            <div className="mb-5">
              <ContentInstructor data={data} />
            </div>
            <div className="mb-5">
              <ContentReview data={data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainDetail;
