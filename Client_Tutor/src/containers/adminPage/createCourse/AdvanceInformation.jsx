import { useState, useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "../../../assets/css/quillEditor.css";
import styled from "../../../constants/styles/styles";
import { PiImage } from "react-icons/pi";
import { PiVideo } from "react-icons/pi";
import { BsUpload } from "react-icons/bs";
import FieldList from "./FieldList";
import { fileToBase64 } from "../../../hooks/useFileToBase64";
import { toast } from "sonner";

const AdvanceInformation = ({
  handleChangeStep,
  step,
  data,
  setData,
  setCheckValue,
  checkValue,
}) => {
  const countCheckValue = () => {
    let count = 0;
    if (data?.thumbnail) count++;
    if (data?.trailer) count++;
    if (data?.benefits?.length >= 4) count++;
    if (data?.audience?.length >= 4) count++;
    if (data?.requirements?.length >= 4) count++;
    if (data.desc) count++;
    setCheckValue(count);
  };
  const initialFields = Array(4).fill("");
  const [benefits, setBenefits] = useState(data?.benefits || initialFields);
  const [audience, setAudience] = useState(data?.audience || initialFields);
  const [requirements, setRequirements] = useState(
    data?.requirements || initialFields
  );
  const [thumbnail, setThumbnail] = useState(null);
  const [videoTrailer, setVideoTrailer] = useState(null);
  const [description, setDescription] = useState(data.desc || "");
  const quillRef = useRef(null);
  useEffect(() => {
    const updateParentData = async () => {
      setData({
        desc: description || "",
        benefits: benefits.filter((item) => item.trim() !== ""),
        audience: audience.filter((item) => item.trim() !== ""),
        requirements: requirements.filter((item) => item.trim() !== ""),
      });
    };

    updateParentData();
  }, [benefits, audience, requirements, description]);
  useEffect(() => {
    if (thumbnail) {
      setData({
        thumbnail: thumbnail,
      });
    }
    if (videoTrailer) {
      setData({
        trailer: videoTrailer,
      });
    }
  }, [thumbnail, videoTrailer]);

  useEffect(() => {
    countCheckValue();
  }, [data]);

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    const thumbnail64 = await fileToBase64(file);
    setThumbnail(thumbnail64);
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    const videoTrailer = await fileToBase64(file);
    setVideoTrailer(videoTrailer);
  };

  const handleNextStep = () => {
    countCheckValue();

    if (checkValue < 6) {
      toast.error("Bạn kiểm tra các giá trị lại nhé!");
      return;
    } else {
      handleChangeStep(step + 1);
    }
  };
  return (
    <div>
      <div className="w-full border-b border-gray1 px-7 py-5">
        <h3 className="font-semibold text-2xl">Thông Tin Nâng Cao</h3>
      </div>

      {/* Thumbnail và Trailer */}
      <div className="w-full border-b border-gray1 px-7 py-8">
        <div className="w-full flex items-center justify-between gap-5">
          <div className="w-full">
            <label className="block font-medium text-lg mb-1">
              Ảnh Đại Diện Khóa Học
            </label>
            <div className="w-full h-[180px] flex items-center gap-5">
              <div className="w-2/5 h-full flex items-center justify-center bg-gray0">
                <div className="w-full h-full text-gray3 flex items-center justify-center">
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : data?.thumbnail ? (
                    <img
                      src={data?.thumbnail}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PiImage fontSize={100} />
                  )}
                </div>
              </div>
              <div className="w-3/5 h-full text-start flex flex-col items-start justify-start gap-5">
                <p className="text-gray5 text-[13px]">
                  Tải lên ảnh đại diện khóa học của bạn tại đây.
                  <span className="text-gray9">Hướng dẫn quan trọng</span>:
                  1200x800 pixels hoặc Tỷ lệ 12:8. Định dạng hỗ trợ:
                  <span className="text-gray9">.jpg, .jpeg, hoặc .png</span>
                </p>
                <label
                  htmlFor="thumbnail"
                  className={`${styled.buttonPrimary10} font-medium !w-max`}
                >
                  Tải Lên Hình Ảnh
                  <span>
                    <BsUpload />
                  </span>
                  <input
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block font-medium text-lg mb-1">
              Video Giới Thiệu Khóa Học
            </label>
            <div className="w-full h-[180px] flex items-center gap-5">
              <div className="w-2/5 h-full flex items-center justify-center bg-gray0">
                <div className="w-full h-full text-gray3 flex items-center justify-center">
                  {videoTrailer ? (
                    <video
                      src={videoTrailer}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : data?.trailer ? (
                    <video
                      src={data?.trailer}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PiVideo fontSize={100} />
                  )}
                </div>
              </div>
              <div className="w-3/5 h-full text-start flex flex-col items-start justify-start gap-5">
                <p className="text-gray5 text-[13px]">
                  Học viên xem một video giới thiệu chất lượng có khả năng ghi
                  danh cao gấp 5 lần. Thống kê cho thấy con số này có thể lên
                  tới 10 lần với những video đặc biệt xuất sắc.
                </p>
                <label
                  htmlFor="videoTrailer"
                  className={`${styled.buttonPrimary10} font-medium !w-max`}
                >
                  Tải Lên Video
                  <span>
                    <BsUpload />
                  </span>
                  <input
                    id="videoTrailer"
                    name="videoTrailer"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mô Tả Khóa Học */}
      <div className="w-full border-b border-gray1 px-7 py-8">
        <div className="w-full">
          <label className="block font-medium text-lg mb-1">
            Mô Tả Khóa Học
          </label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Nhập mô tả khóa học của bạn"
            className="w-full flex flex-col-reverse bg-transparent text-gray6 border border-gray1"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "link",
            ]}
          />
        </div>
      </div>

      {/* Các Thành Phần FieldList */}
      <div className="w-full border-b border-gray1 px-7 py-8">
        <FieldList
          title="Lợi ích mà khóa học mang lại"
          placeholder={"Những gì mà khóa học mang lại"}
          fields={benefits}
          setFields={setBenefits}
          maxFields={8}
        />
      </div>
      <div className="w-full border-b border-gray1 px-7 py-8">
        <FieldList
          title="Đối tượng nào sẽ tham gia khóa học"
          placeholder={"Dối tượng nào sẽ phù hợp với khóa học"}
          fields={audience}
          setFields={setAudience}
          maxFields={8}
        />
      </div>
      <div className="w-full border-b border-gray1 px-7 py-8">
        <FieldList
          title="Yêu cầu đối với học viên"
          placeholder={"Những điều cần thiết khi tham gia khóa học"}
          fields={requirements}
          setFields={setRequirements}
          maxFields={8}
        />
      </div>

      <div className="w-full flex items-center justify-between px-7 py-5">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => handleChangeStep(step - 1)}
          className={styled.buttonTran}
        >
          Trở về
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className={styled.buttonPrimary}
        >
          Lưu và tiếp túc
        </button>
      </div>
    </div>
  );
};

export default AdvanceInformation;
