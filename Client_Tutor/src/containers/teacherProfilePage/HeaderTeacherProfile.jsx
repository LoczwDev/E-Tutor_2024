import React, { useState } from "react";
import images from "../../constants/images/images";
import { FaArrowRight, FaCirclePlay, FaStar } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { useChatClient } from "../../hooks/useChatClient";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const HeaderTeacherProfile = ({ dataTeacher }) => {
  const navigate = useNavigate();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    client,
    userId,
    isClientReady,
    isLoading: clientLoading,
  } = useChatClient();

  const handleMessageClick = async (recipientId) => {
    if (!client || !isClientReady) {
      console.error("Ứng dụng trò chuyện chưa sẵn sàng hoặc đã bị ngắt kết nối.");
      return;
    }
  
    const existingChannels = await client.queryChannels({
      type: "messaging",
      members: { $in: [userId] },
    });
  
    const channelExists = existingChannels.some((channel) => {
      return Array.isArray(channel.data.members) && channel.data.members.includes(recipientId);
    });
    
  
    if (channelExists) {
      setIsLoading(true);
      setTimeout(() => {
        navigate("/message");
        setIsLoading(false);
      }, 3000);
      return;
    }
  
    const channel = client.channel("messaging", {
      members: [userId, recipientId],
    });
  
    try {
      setIsLoading(true);
      await channel.watch();
      setSelectedChannel(channel);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/message");
      }, 3000);
    } catch (error) {
      console.error("Lỗi tạo hoặc xem kênh:", error);
    }
  };
  
  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full p-5 bg-white border border-primary/20">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div>
              <div className="w-32 h-32 overflow-hidden rounded-full">
                <img
                  src={
                    dataTeacher?.tutor.avatar
                      ? dataTeacher?.tutor.avatar?.url
                      : images.AvatarCur
                  }
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold">
                {dataTeacher?.tutor?.fullName}
              </span>
              <p className="text-sm text-gray5">
                {dataTeacher?.tutor?.title
                  ? dataTeacher?.tutor?.title
                  : "Học viên"}
              </p>
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-2 text-md">
                  <FaStar className="text-warning text-base mb-0.5" />
                  {dataTeacher?.total_ratings}
                  <span className="text-gray5 font-normal text-sm">
                    ({dataTeacher?.total_reviews} đánh giá)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-md">
                  <FiUsers className="text-secondary text-lg" />
                  {dataTeacher?.total_students}
                  <span className="text-gray5 font-normal text-sm">
                    học viên
                  </span>
                </div>
                <div className="flex items-center gap-2 text-md">
                  <FaCirclePlay className="text-primary text-base" />
                  {dataTeacher?.total_courses}
                  <span className="text-gray5 font-normal text-sm">
                    khóa học
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleMessageClick(dataTeacher?.tutor?._id)}
            className="flex items-center justify-center gap-2 w-max bg-primary/10 capitalize text-primary hover:bg-primary/50 hover:text-white duration-300 py-2.5 px-4"
          >
            Nhắn tin ngay
            <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderTeacherProfile;
