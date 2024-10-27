import { IoIosClose, IoIosSearch } from "react-icons/io";
import styled from "../../../constants/styles/styles";
import images from "../../../constants/images/images";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import PreviewCourse from "./PreviewCourse";
import { toast } from "sonner";

const Modal = ({ handlePublish, title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999]">
      <div className="bg-white w-[70%]">
        <div className="flex items-center justify-between p-5 border-b border-gray1">
          <h2 className="font-extrabold text-primary text-xl">{title}</h2>
          <div className="flex items-center gap-3 justify-between">
            <button
              onClick={handlePublish}
              type="button"
              className={styled.buttonPrimary}
            >
              Dồng ý tạo
            </button>
            <button onClick={onClose} className={`${styled.buttonGray} bg-gray5`}>
              Xem lại
            </button>
          </div>
        </div>
        <div className="w-full p-5 h-[80vh] overflow-y-scroll overflow-x-hidden scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};

const PublishCourse = ({
  handleChangeStep,
  step,
  data,
  setData,
  handlePublish,
  setCheckValue,
  checkValue,
}) => {
  const countCheckValue = () => {
    let count = 0;
    if (data.welcomeMessage) count++;
    if (data.congratulationsMessage) count++;
    setCheckValue(count);
  };
  useEffect(() => {
    countCheckValue();
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    if (checkValue < 2) {
      toast.error("Bạn kiểm tra các giá trị lại nhé!");
      return;
    } else {
      setIsOpenModal(true);
    }
  };
  console.log(data);

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="w-full border-b border-gray1 px-7 py-5">
          <h3 className="font-semibold text-2xl">Xuất bản khóa học</h3>
        </div>

        <div className="w-full border-b border-gray1 px-7 py-5">
          <div className="w-full flex items-start gap-5">
            <div className="w-1/2">
              <div className="flex items-center gap-2">
                <label className={styled.label}>Tin nhắn chào mừng</label>
              </div>
              <div className="relative flex items-center justify-between">
                <textarea
                  name="welcomeMessage"
                  value={data.welcomeMessage}
                  onChange={handleChange}
                  rows={5}
                  className={styled.textarea}
                  placeholder="Nhập tin nhắn bắt đầu khóa học tại đây..."
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex items-center gap-2">
                <label className={styled.label}>Tin nhắn chúc mừng</label>
              </div>
              <div className="relative flex items-center justify-between">
                <textarea
                  name="congratulationsMessage"
                  value={data.congratulationsMessage}
                  onChange={handleChange}
                  rows={5}
                  className={styled.textarea}
                  placeholder="Nhập tin nhắn hoàn thành khóa học của bạn vào đây..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="w-full flex items-center justify-between px-7 py-5">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => handleChangeStep(step - 1)}
            className={styled.buttonTran}
          >
            Back
          </button>
          <button onClick={handleNextStep} className={styled.buttonPrimary}>
            Save & Next
          </button>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          title={"Xem trước khi xuất bản"}
          handlePublish={handlePublish}
          onClose={() => setIsOpenModal(false)}
        >
          <PreviewCourse data={data} />
        </Modal>
      )}
    </>
  );
};

export default PublishCourse;
