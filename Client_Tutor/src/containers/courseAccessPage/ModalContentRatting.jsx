import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import styled from "../../constants/styles/styles";
import { useAddReview } from "../../hooks/useCourses";
import { toast } from "sonner";
import Loader from "../../components/loader/Loader";

const ModalContentRatting = ({
  courseId,
  dataCourse,
  user,
  refetchCourse,
  refetch,
}) => {
  const [numberRatting, setNumberRatting] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const { mutate, isError, isSuccess, isPending } = useAddReview();
  useEffect(() => {
    if (dataCourse && user) {
      const dataRatingByUser = dataCourse.content.reviews.find(
        (item) => item.user._id === user._id
      );
      if (dataRatingByUser) {
        setReviewText(dataRatingByUser?.comment);
        setNumberRatting(dataRatingByUser.rating);
      }
    }
  }, [dataCourse, user]);
  const handleCloseModal = (active) => {
    const modal = document.getElementById(active);
    if (modal) {
      modal.classList.remove("modal-open");
    }
  };

  const getRatingDescription = (rating) => {
    if (rating === 0) return "";
    if (rating <= 1) return "Kém";
    if (rating <= 2) return "Trung bình";
    if (rating <= 3) return "Tốt";
    if (rating <= 4) return "Rất tốt";
    return "Tuyệt vời";
  };

  const handleRatingChange = (value) => {
    setNumberRatting(value);
  };

  const handleSubmitReview = async () => {
    await mutate({
      review: reviewText,
      rating: numberRatting,
      courseId: courseId,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Đánh giá thành công");
      refetchCourse();
      refetch();
      setNumberRatting(0);
      setReviewText("");

      const modal = document.getElementById("rattingCourse");
      if (modal) {
        modal.classList.remove("modal-open");
      }
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error("Đã xảy ra lỗi trong quá trình đánh giá");
    }
  }, [isError]);
  return (
    <>
      {isPending && <Loader />}
      <dialog id="rattingCourse" className="modal">
        <div className="modal-box w-[600px] rounded-none">
          <form method="dialog" className="max-h-[500px]">
            <div className="w-full flex items-center justify-between border-b border-gray1 p-3">
              <h3 className="font-medium text-lg">Đánh giá của bạn</h3>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => handleCloseModal("rattingCourse")}
            >
              ✕
            </button>
            <div className="w-full p-4">
              <div className="w-full flex flex-col items-center justify-center">
                <div className="text-xl font-bold">
                  {numberRatting}
                  <span className="ml-1 text-gray-500 text-sm font-normal">
                    ({getRatingDescription(numberRatting)})
                  </span>
                </div>
                <Rate
                  style={{ fontSize: "30px", transform: "scale(2)" }}
                  allowHalf
                  className="mb-5"
                  value={numberRatting}
                  onChange={handleRatingChange} // Handle rating change here
                />
              </div>

              <div className="w-full">
                <label htmlFor="ratting-form" className={styled.label}>
                  Lời nhắn
                </label>
                <textarea
                  id="ratting-form"
                  rows={5}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className={styled.textarea}
                  placeholder="Hãy viết lời nhắn của bạn tại đây nhé"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-between p-4">
              <button
                onClick={() => handleCloseModal("rattingCourse")}
                type="button"
                className={`${styled.buttonGray} !bg-gray0 !text-gray9 font-bold`}
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitReview}
                className={`${styled.buttonPrimary}`}
              >
                Gửi đánh giá
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalContentRatting;
