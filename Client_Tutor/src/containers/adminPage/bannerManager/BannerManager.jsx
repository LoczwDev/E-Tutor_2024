import React, { useEffect, useRef, useState } from "react";
import images from "../../../constants/images/images";
import ReactQuill from "react-quill";
import styled from "../../../constants/styles/styles";
import { BsUpload } from "react-icons/bs";
import { PiImage } from "react-icons/pi";
import ModalCustom from "../../../components/modal/ModalCustom";
import Hero from "../../../components/Hero";
import { fileToBase64 } from "../../../hooks/useFileToBase64";
import {
  useCreateLayout,
  useEditLayout,
  useGetLayout,
} from "../../../hooks/useLayout";
import Loading from "../../../components/loader/Loading";
import { toast } from "sonner";

const BannerManager = () => {
  const { data, isLoading, refetch } = useGetLayout("Banner", {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const { mutate, isPending, isSuccess, isError } = useEditLayout();

  // State lưu giá trị ban đầu
  const [initialTitle, setInitialTitle] = useState("");
  const [initialSubTitle, setInitialSubTitle] = useState("");
  const [initialImageBanner, setInitialImageBanner] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [reviewHero, setReviewHero] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imageBanner, setImageBanner] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (data && data.layout && !isLoading) {
      setTitle(data.layout.banner.title || "");
      setSubTitle(data.layout.banner.subTitle || "");
      setImageBanner(data.layout.banner.imageBanner?.url || "");

      // Store initial values
      setInitialTitle(data.layout.banner.title || "");
      setInitialSubTitle(data.layout.banner.subTitle || "");
      setInitialImageBanner(data.layout.banner.imageBanner?.url || "");
    }
  }, [data, isLoading]);

  const handleImageBannerChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await fileToBase64(file);
    setImageBanner(base64Image);
    console.log(base64Image);
  };

  const handleChangeBanner = () => {
    mutate({
      type: "Banner",
      imageBanner: imageBanner,
      title: title,
      subTitle: subTitle,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Cập nhật thành công");
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Có lỗi vui lòng kiểm tra lại");
    }
  }, [isError]);
  useEffect(() => {
    const hasChanges =
      title !== initialTitle ||
      subTitle !== initialSubTitle ||
      imageBanner !== initialImageBanner;
    setHasChanges(hasChanges);
  }, [title, subTitle, imageBanner]);

  return (
    <>
      {isLoading || isPending ? (
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full bg-white shadow-section p-5">
          <div className="w-full flex items-center justify-between mb-5 border-b border-gray1 pb-3">
            <h3 className="text-xl font-medium">Quản lý banner website</h3>
            <div className="flex items-center gap-3">
              {/* Chỉ hiển thị nút "Cập nhật" nếu có sự thay đổi */}
              {hasChanges && (
                <button
                  className={styled.buttonPrimary}
                  onClick={handleChangeBanner}
                >
                  Cập nhật
                </button>
              )}
              <button
                className={styled.buttonPrimary}
                onClick={() => setReviewHero(!reviewHero)}
              >
                Xem
              </button>
            </div>
          </div>
          <div className="w-full mb-5">
            <label className="block font-medium text-lg mb-1">Ảnh banner</label>
            <div className="w-full h-[350px] flex items-center gap-5">
              <div className="w-1/2 h-full flex items-center justify-center bg-gray0">
                <div className="w-full h-full text-gray3 flex items-center justify-center">
                  {imageBanner ? (
                    <img
                      src={imageBanner}
                      alt="imageBanner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PiImage fontSize={100} />
                  )}
                  {data && data?.layout?.banner.imageBanner && !imageBanner && (
                    <img
                      src={data?.layout?.banner.imageBanner.url}
                      alt="imageBanner"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="w-1/3 h-full text-start flex flex-col items-start justify-start gap-5">
                <p className="text-gray5 text-[13px]">
                  Tải lên ảnh banner của website tại đây.
                  <span className="text-gray9">Hướng dẫn quan trọng</span>:
                  1200x800 pixels hoặc Tỷ lệ 12:8. Định dạng hỗ trợ:
                  <span className="text-gray9">.jpg, .jpeg, hoặc .png</span>
                </p>
                <label
                  htmlFor="imageBanner"
                  className={`${styled.buttonPrimary10} font-medium !w-max`}
                >
                  Tải Lên Hình Ảnh
                  <span>
                    <BsUpload />
                  </span>
                  <input
                    id="imageBanner"
                    name="imageBanner"
                    type="file"
                    accept="image/*"
                    onChange={handleImageBannerChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="w-full border-b border-gray1 mb-5">
            <div className="w-full">
              <label className="block font-medium text-lg mb-1">
                Tiêu đề lớn
              </label>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={title}
                onChange={setTitle}
                placeholder="Nhập mô tả khóa học của bạn"
                className="w-full flex flex-col-reverse bg-transparent text-gray6 border border-gray1"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
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
                  "color",
                  "background",
                  "link",
                  "image",
                ]}
              />
            </div>
          </div>
          <div className="w-full border-b border-gray1">
            <div className="w-full">
              <label className="block font-medium text-lg mb-1">
                Tiêu đề nhỏ
              </label>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={subTitle}
                onChange={setSubTitle}
                placeholder="Nhập mô tả khóa học của bạn"
                className="w-full flex flex-col-reverse bg-transparent text-gray6 border border-gray1"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ color: [] }, { background: [] }],
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
                  "color",
                  "background",
                  "link",
                  "image",
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {reviewHero && !isLoading && !isPending && (
        <ModalCustom>
          {data?.success ? (
            <Hero data={data?.layout?.banner} />
          ) : (
            <div className="w-full text-center">
              Bạn chưa setup banner cho website
            </div>
          )}
          <div className="w-full flex justify-end mt-5">
            <button
              className={styled.buttonGray}
              onClick={() => setReviewHero(!reviewHero)}
            >
              Trở về
            </button>
          </div>
        </ModalCustom>
      )}
    </>
  );
};

export default BannerManager;
