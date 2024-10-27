import React from "react";
import TabsScrollDetail from "../courseDetailPage/TabsScrollDetail";
import CardCourse from "../../components/card/CardCourse";
import { Avatar, List, Rate } from "antd";
import images from "../../constants/images/images";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const dataTabs = [
  {
    link: "Coursestutor",
    title: "Khóa học",
  },
  {
    link: "reviewsTutur",
    title: "Đánh giá của học viên",
  },
];

const ContentCoursesTutor = ({ dataTeacher }) => {
  console.log(dataTeacher);

  // Flatten reviews from all courses
  const allReviews =
    dataTeacher?.courses.flatMap((course) => course.reviews) || [];

  return (
    <div className="w-full">
      <TabsScrollDetail dataTabs={dataTabs} />

      <div className="w-full mt-5">
        <h3 className="text-lg font-medium">
          {dataTeacher?.tutor.fullName} ({dataTeacher?.courses?.length})
        </h3>
        <div className="w-full grid grid-cols-2 gap-5 mt-7">
          {dataTeacher?.courses.map((item, index) => (
            <CardCourse key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="w-full mt-20">
        <h3 className="text-lg font-medium">Đánh giá của học viên</h3>
        <div className="transition-all duration-500 overflow-hidden">
          <List
            className="mb-5 ease-in-out transition-all duration-300"
            itemLayout="horizontal"
            dataSource={allReviews}
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
      </div>
    </div>
  );
};

export default ContentCoursesTutor;
