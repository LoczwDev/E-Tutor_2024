import React, { useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import TabsScrollDetail from "../courseDetailPage/TabsScrollDetail";
import ContentDesc from "./ContentDesc";
import ContentNote from "./ContentNote";
import ContentFile from "./ContentFile";
import Loader from "../../components/loader/Loader";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setCompleteLecture } from "../../services/coursesService";
import { getCommentByLecture } from "../../services/commentService";
import CommentsContainer from "../../components/comments/CommentsContainer";
import styled from "../../constants/styles/styles";
import ButtonCreateNote from "./ButtonCreateNote";
import { Element } from "react-scroll";
import images from "../../constants/images/images";

const dataTabs = [
  { link: "Desc", title: "Mô tả" },
  { link: "Note", title: "Ghi chú" },
  { link: "File", title: "File đính kèm" },
  { link: "Comment", title: "Bình luận" },
];

const MainCourse = ({
  user,
  dataCourse,
  dataLectureActive,
  stepLecture,
  isLoading,
  dataCompleted,
  courseId,
  refetch,
  dataStudents,
  purchased,
  setDataLectureActive,
  setDurationVideoActive,
  showSection,
  textNote,
  setTextNote,
  durationVideoActive,
  handleNoteLecture,
  durationNote,
}) => {
  useEffect(() => {
    if (dataLectureActive && dataCourse && !isLoading) {
      const lecture = dataCourse?.content?.curriculumData
        .flatMap((section) => section.lectures)
        .find((lecture) => lecture._id === dataLectureActive?._id);

      if (lecture) {
        setDataLectureActive(lecture);
      }
    }
  }, [dataLectureActive, dataCourse, isLoading]);

  const isCheck = dataCompleted?.find(
    (item) => item === dataLectureActive?._id
  );
  // video
  const videoRef = useRef(null);
  const maxSkipAllowed = 3;
  const watchProgressLimit = 0.9;
  const [currentTime, setCurrentTime] = useState(0);
  const [lastAllowedTime, setLastAllowedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasReached90Percent, setHasReached90Percent] = useState(false);

  // comment
  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(2);
  const [showLoader, setshowLoader] = useState(false);

  useEffect(() => {
    if (durationNote) {
      setCurrentTime(durationNote);
    }
  }, [durationNote]);

  const handleLoadMore = () => {
    setshowLoader(true);
    setTimeout(() => {
      setVisibleFeedbackCount((prevCount) => prevCount + 2);
      setshowLoader(false);
    }, 3000);
  };
  const handleHide = () => {
    setVisibleFeedbackCount(2);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (videoRef.current) {
        setDurationVideoActive(videoRef.current?.currentTime);
      }
    }, 1000); // Lấy giá trị mỗi 1 giây

    return () => clearInterval(intervalId);
  }, []);

  const {
    data: dataComment,
    isLoading: isLoadingComment,
    isError,
    refetch: refectchComment,
  } = useQuery({
    queryFn: () => getCommentByLecture({ lectureId: dataLectureActive?._id }),
    queryKey: ["getCommentByLecture", dataLectureActive?._id],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ courseId, completedLectureId }) => {
      return setCompleteLecture({
        courseId,
        completedLectureId,
      });
    },
    onSuccess: (data) => {
      refetch();
      toast.success(data.message || "Đã mở khóa bài học tiếp theo");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeeked = () => {
    const currentTime = videoRef.current?.currentTime;
    if (currentTime - lastAllowedTime > maxSkipAllowed && !isCheck) {
      toast.warning("Hãy học một cách nghiêm túc để mở khóa bài tiếp theo!", {
        position: "top-center",
        autoClose: 3000,
      });

      videoRef.current?.pause();
      videoRef.current.currentTime = lastAllowedTime;
    } else {
      setLastAllowedTime(currentTime);
    }
  };

  useEffect(() => {
    const playerElement = videoRef.current;

    if (!playerElement) return;
    const currentTime = playerElement.currentTime;
    if (
      duration &&
      currentTime >= duration * watchProgressLimit &&
      !hasReached90Percent &&
      !isCheck
    ) {
      mutate({
        courseId: courseId,
        completedLectureId: dataLectureActive?._id,
      });
      toast.info("Đã mở khóa bài học mới!", {
        position: "top-center",
        autoClose: 3000,
      });
      setHasReached90Percent(true);
    }
  }, [
    duration,
    dataLectureActive,
    courseId,
    isCheck,
    hasReached90Percent,
    videoRef.current?.currentTime,
  ]);

  useEffect(() => {
    setHasReached90Percent(false);
  }, [dataLectureActive]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <div
            id="step-1"
            className="w-full h-[600px] overflow-hidden flex items-center justify-center bg-black"
          >
            <div className="w-[1050px] h-full overflow-hidden">
              <MediaPlayer
                ref={videoRef}
                onDurationChange={handleDuration}
                onSeeked={handleSeeked}
                title={dataLectureActive?.title}
                src={dataLectureActive?.video?.url}
                autoPlay
                // className="w-full h-full object-contain"
                currentTime={currentTime}
              >
                <MediaProvider className="h-full w-full" />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
          </div>
          <div
            className={`w-full flex flex-col items-start justify-between py-5 border-b ${showSection ? "px-10" : ""}`}
          >
            <div className="w-full flex items-start justify-between">
              <div className="text-2xl font-bold mb-5 w-[85%]">
                <span>{stepLecture}.</span>{" "}
                <span className="ml-1">{dataLectureActive?.title}</span>
              </div>
              <ButtonCreateNote
                setTextNote={setTextNote}
                textNote={textNote}
                durationVideoActive={durationVideoActive}
                handleNoteLecture={handleNoteLecture}
              />
            </div>

            <div className="w-full flex items-end justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {dataStudents.slice(0, 4).map((item, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-white -ml-3.5 first:ml-0"
                    >
                      <img
                        src={item?.avatar ? item?.avatar?.url : images.AvatarCur}
                        alt={`${item.fullName}_avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  <span className="text-lg font-medium">{purchased}</span>
                  <p className="text-xs text-gray6">Học viên đã xem</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 text-xs">
                <span className="text-gray6">
                  Gần đây:
                  <span className="text-gray9 font-medium">
                    {new Date().toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </span>
                <span className="text-gray6">
                  Bình luận:
                  <span className="text-gray9 font-medium">
                    {dataLectureActive?.questions?.length}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={`w-full ${showSection ? "px-10" : ""}`}>
            <div className="pb-5 top-0 sticky">
              <TabsScrollDetail dataTabs={dataTabs} />
            </div>
            <div className="pb-10">
              <ContentDesc desc={dataLectureActive?.desc} />
            </div>
            <div className="pb-10">
              <ContentNote notes={dataLectureActive?.notes} />
            </div>
            <div className="pb-10">
              <ContentFile dataFile={dataLectureActive?.attachFiles} />
            </div>
            {!isLoadingComment && (
              <Element name="Comment" className="pb-10">
                <div className="w-full flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-semibold">
                    Bình luận ({dataComment?.comment?.length})
                  </h3>
                  {dataComment?.comment?.length > 1 && !isLoadingComment && (
                    <div className="flex items-end gap-2">
                      <button
                        className={styled.buttonPrimary10}
                        onClick={handleLoadMore}
                      >
                        Hiện thêm
                      </button>
                      {visibleFeedbackCount > 2 && (
                        <button
                          className={`${styled.buttonTran} !items-end !justify-normal border-none bg-transparent hover:bg-transparent`}
                          onClick={handleHide}
                        >
                          Ẩn bớt
                        </button>
                      )}
                      <div
                        className={`${
                          showLoader ? "flex" : "hidden"
                        } items-center justify-center py-2.5 px-4 transition-all ease-in-out duration-300`}
                      >
                        <div className="w-12 h-12 rounded-full animate-spin border-2 border-dashed border-primary border-t-transparent"></div>
                      </div>
                    </div>
                  )}
                </div>

                <CommentsContainer
                  logginedUserId={user?._id}
                  comments={dataComment?.comment?.slice(
                    0,
                    visibleFeedbackCount
                  )}
                  courseId={courseId}
                  lectureId={dataLectureActive?._id}
                  refetch={refectchComment}
                />
              </Element>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MainCourse;
