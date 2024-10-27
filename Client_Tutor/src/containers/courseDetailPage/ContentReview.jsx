import React, { useState } from "react";
import { Rate, Progress, List, Avatar, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "../../assets/css/ant.css";
import { Element } from "react-scroll";
import images from "../../constants/images/images";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion"; // Import motion from framer-motion

const ratings = [
  { stars: 5, percent: 0 },
  { stars: 4, percent: 0 },
  { stars: 3, percent: 0 },
  { stars: 2, percent: 0 },
  { stars: 1, percent: 0 },
];

const calculateRatingDistribution = (comments) => {
  const totalRatings = comments.length;
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  // Count ratings
  comments.forEach(({ rating }) => {
    const flooredRating = Math.floor(rating);
    if (starCounts[flooredRating] !== undefined) {
      starCounts[flooredRating]++;
    }
  });

  // Calculate percentages
  ratings.forEach((rating) => {
    const count = starCounts[rating.stars];
    rating.percent =
      totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
  });
};

const ContentReview = ({ data }) => {
  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(2);
  const [showLoader, setshowLoader] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5); // Default to 5 stars
  calculateRatingDistribution(data?.reviews);

  const handleLoadMore = () => {
    setshowLoader(true);
    setTimeout(() => {
      setVisibleFeedbackCount((prevCount) => prevCount + 2);
      setshowLoader(false);
    }, 3000);
  };

  const handleRatingSelect = (rating) => {
    // If "Tất cả" is selected, show all reviews
    if (rating === "Tất cả") {
      setSelectedRating(rating);
    } else {
      setSelectedRating(rating);
    }
  };

  const menu = (
    <Menu>
      {[5, 4, 3, 2, 1, "Tất cả"].map((star) => (
        <Menu.Item key={star} onClick={() => handleRatingSelect(star)}>
          {star === "Tất cả" ? star : `${star} sao`}
        </Menu.Item>
      ))}
    </Menu>
  );

  // Filter reviews based on selected rating
  const filteredReviews =
    selectedRating === "Tất cả"
      ? data?.reviews // Show all reviews if "Tất cả" is selected
      : data?.reviews.filter((item) => Math.floor(item.rating) === selectedRating);

  return (
    <Element name={"Review"} className="my-10">
      <h3 className="font-semibold text-2xl mb-3">Đánh giá khóa học</h3>

      <div className="w-full h-max flex items-stretch justify-between gap-5 mb-5">
        {/* Tổng điểm đánh giá */}
        <div className="w-1/4">
          <div className="h-full w-full flex flex-col gap-5 items-center justify-center border border-gray1 p-5">
            <div className="text-4xl font-bold">{data?.ratings}</div>
            <div className="w-full flex flex-col items-center justify-center text-center">
              <Rate
                className="w-full"
                disabled
                defaultValue={data?.ratings === 0 ? 5 : data?.ratings}
                allowHalf
              />
              <p className="font-medium text-base w-full">Đánh giá khóa học</p>
            </div>
          </div>
        </div>

        {/* Thanh hiển thị phần trăm */}
        <div className="w-3/4 h-full flex flex-col gap-5">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between mb-2 h-full"
            >
              <span className="w-2/5 flex items-center gap-2">
                <Rate disabled defaultValue={rating.stars} className="mr-2" />
                <span className="text-gray6 text-sm">
                  Đánh giá {`${rating.stars} sao`}
                </span>
              </span>
              <Progress
                percent={rating.percent}
                status="active"
                className="w-3/5"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Feedback từ học viên */}
      <div className="w-full flex items-center justify-between mb-3">
        <h3 className="font-semibold text-2xl">Phản hồi của sinh viên</h3>
        {/* Dropdown chọn số sao */}
        <Dropdown overlay={menu} className="text-[13px] px-10 !rounded-lg">
          <button className="p-2.5 border border-gray-300 rounded">
            {selectedRating === "Tất cả" ? "Tất cả" : `${selectedRating} sao`} <DownOutlined />
          </button>
        </Dropdown>
      </div>
      {filteredReviews.length > 0 ? (
        <>
          <div
            className="transition-all duration-500 overflow-hidden"
            style={{ maxHeight: `${visibleFeedbackCount * 160}px` }}
          >
            <List
              className="mb-5 ease-in-out transition-all duration-300"
              itemLayout="horizontal"
              dataSource={filteredReviews.slice(0, visibleFeedbackCount)}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        className="!w-12 !h-12"
                        src={
                          item.user?.avatar
                            ? item.user?.avatar?.url
                            : images.AvatarCur
                        }
                      />
                    }
                    title={
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {item?.user?.fullName}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray6"></span>
                        <div className="text-gray6 text-xs">
                          {formatDistanceToNow(item?.updatedAt, {
                            addSuffix: true,
                            locale: vi,
                          })}
                        </div>
                      </div>
                    }
                    description={
                      <>
                        <Rate disabled allowHalf defaultValue={item.rating} />
                        <p className="text-gray7 pt-1">{item.comment}</p>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </div>

          {visibleFeedbackCount < filteredReviews.length && (
            <div className="flex items-center">
              <button
                className="bg-primary/10 text-primary text-sm font-medium hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4"
                onClick={handleLoadMore}
              >
                Load more
              </button>
              <div
                className={`${
                  showLoader ? "flex" : "hidden"
                } items-center justify-center py-2.5 px-4 transition-all ease-in-out duration-300`}
              >
                <div className="w-12 h-12 rounded-full animate-spin border-2 border-dashed border-primary border-t-transparent"></div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full">
          <div className="text-center p-2 bg-warning/10">
            Hiện tại chưa có đánh giá phù hợp cho khóa học này 😒
          </div>
        </div>
      )}
    </Element>
  );
};

export default ContentReview;

