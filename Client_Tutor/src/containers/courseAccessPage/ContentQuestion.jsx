import React, { useEffect, useState } from "react";
import { VscCommentDiscussion } from "react-icons/vsc";
import { Element } from "react-scroll";
import { useAddAnwser, useAddNewQuestion } from "../../hooks/useCourses";
import images from "../../constants/images/images";
import styled from "../../constants/styles/styles";
import { toast } from "sonner";
import Loader from "../../components/loader/Loader";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";
import stable from "../../constants/stables/stables";

const ENDPOINT = stable.NODE_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, { transports: ["websocket", "polling"] });

const ContentQuestion = ({
  data,
  user,
  courseId,
  contentId,
  refetchCourse,
}) => {
  const [question, setQuestion] = useState("");
  const [visibleFeedbackCount, setVisibleFeedbackCount] = useState(2);
  const [showLoader, setshowLoader] = useState(false);

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

  const {
    mutate: addNewQuestion,
    isSuccess,
    isError,
    isPending,
  } = useAddNewQuestion();

  useEffect(() => {
    if (isSuccess) {
      refetchCourse();
      setQuestion("");
      socketId.emit("notification", {
        title: "Bình luận mới",
        message: `Bạn có một bình luận mới từ bài học ${data?.title}`,
        userId: user?._id,
      });
      toast.success("Bình luận thành công");
    }
    if (isError) {
      toast.error("Có lỗi trong quá trình");
    }
  }, [isSuccess, isError]);

  const handleCreateQuestion = async () => {
    await addNewQuestion({ question: question, courseId, contentId });
  };

  return (
    <Element name="Comment">
      {isPending && <Loader />}
      <h3 className="text-2xl font-semibold mb-3">
        Bình luận ({data?.questions.length ? data?.questions.length : "0"})
      </h3>
      <div className="flex w-full gap-5">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={user?.avatar ? user?.avatar?.url : images.AvatarCur}
            className="w-full h-full object-cover"
            alt={`avatar_${user?.lastName}`}
          />
        </div>
        <textarea
          name=""
          value={question}
          rows={5}
          onChange={(e) => setQuestion(e.target.value)}
          className={styled.textarea}
          placeholder="Bạn hãy viết câu hỏi hoặc nhận xét tại đây"
        ></textarea>
      </div>
      <div className="w-full flex items-center justify-end mt-2">
        <button onClick={handleCreateQuestion} className={styled.buttonPrimary}>
          Đăng
        </button>
      </div>
      {data?.questions.slice(0, visibleFeedbackCount).map((item, index) => (
        <div
          key={index}
          style={{ maxHeight: `${visibleFeedbackCount * 160}px` }}
          className="w-full mt-4 mb-8 overflow-auto transition-all duration-300 ease-linear"
        >
          <div className="flex mb-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={
                  item?.user?.avatar ? item.user?.avatar?.url : images.AvatarCur
                }
                className="w-full h-full object-cover"
                alt={`avatar_${item.user?.lastName}`}
              />
            </div>
            <div className="pl-3">
              <div className="flex items-center gap-3">
                <h5 className="text-sm">{item?.user?.lastName}</h5>
                <span className="w-1 h-1 rounded-full bg-gray6"></span>
                <small className="text-gray6">
                  {formatDistanceToNow(item?.createdAt, {
                    addSuffix: true,
                    locale: vi,
                  })}
                </small>
              </div>
              <p>{item.question}</p>
            </div>
          </div>

          {/* Use the ReplySection component here */}
          <ReplySection
            replies={item.questionReplies}
            questionId={item._id}
            courseId={courseId}
            contentId={contentId}
            refetchCourse={refetchCourse}
            user={user}
          />
        </div>
      ))}
      {data?.questions?.lastName > 1 && (
        <div className="flex items-end gap-2">
          <button className={styled.buttonPrimary10} onClick={handleLoadMore}>
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
    </Element>
  );
};

export default ContentQuestion;

const ReplySection = ({
  user,
  replies,
  questionId,
  courseId,
  contentId,
  refetchCourse, // Pass refetchCourse as a prop
}) => {
  const [replyActive, setReplyActive] = useState(false);
  const [answer, setAnswer] = useState("");

  const {
    mutate: addNewAnswer,
    isSuccess: isSuccessAnswer,
    isError: isErrorAnswer,
    isPending: isPendingAnswer,
  } = useAddAnwser();

  useEffect(() => {
    if (isSuccessAnswer) {
      refetchCourse();
      setAnswer("");
      socketId.emit("notification", {
        title: "Bình luận mới",
        message: `Có người trả lời bình luận của bạn`,
        userId: user?._id,
      });
      toast.success("Bình luận thành công");
    }
    if (isErrorAnswer) {
      toast.error("Có lỗi trong quá trình");
    }
  }, [isSuccessAnswer, isErrorAnswer, refetchCourse]); // Include refetchCourse

  const handleAnswer = async (questionId, answerText) => {
    await addNewAnswer({
      answer: answerText,
      questionId: questionId,
      courseId,
      contentId,
    });
  };

  const toggleReplyActive = () => {
    setReplyActive((prevState) => !prevState);
  };

  return (
    <>
      {isPendingAnswer && <Loader />}
      <div className="w-full pl-4">
        <div
          className={`w-full mt-2 flex flex-col border-gray1  ${
            replies.length !== 0 ? `border-l` : "border-none"
          }`}
        >
          <span
            className="pl-12 cursor-pointer mr-2 flex items-center gap-1"
            onClick={toggleReplyActive}
          >
            <span className="text-gray6">
              <VscCommentDiscussion size={20} />
            </span>
            {!replyActive
              ? replies.length !== 0
                ? `Tất cả (${replies.length})`
                : "Trả lời"
              : "Ẩn"}
          </span>

          {replyActive && (
            <>
              {replies.map((el, idx) => (
                <div key={idx} className="flex items-center mb-2 mt-5">
                  <span className="bg-gray1 h-[1px] w-16"></span>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={
                        el?.user?.avatar
                          ? el?.user?.avatar?.url
                          : images.AvatarCur
                      }
                      className="w-full h-full object-cover"
                      alt={`avatar_${el?.user?.lastName}`}
                    />
                  </div>
                  <div className="pl-3">
                    <div className="flex items-center gap-3">
                      <h5 className="text-sm">{el?.user?.lastName}</h5>
                      <span className="w-1 h-1 rounded-full bg-gray6"></span>
                      <small className="text-gray6">
                        {formatDistanceToNow(el?.createdAt, {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </small>
                    </div>
                    <p>{el.answer}</p>
                  </div>
                </div>
              ))}
              <div className="w-full flex relative pl-16 mt-2">
                <input
                  type="text"
                  placeholder="Nhập câu trả lời của bạn"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={`w-full py-2.5 outline-none border-b border-gray1`}
                />
                <button
                  className={`${styled.buttonPrimary10} absolute right-0 bottom-0`}
                  onClick={() => handleAnswer(questionId, answer)}
                  disabled={isPendingAnswer} // Disable while pending
                >
                  Trả lời
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
