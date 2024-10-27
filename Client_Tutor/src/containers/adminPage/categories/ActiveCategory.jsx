import React, { useEffect, useState } from "react";
import styled from "../../../constants/styles/styles";
import { PiImage } from "react-icons/pi";
import { BsUpload } from "react-icons/bs";
import { fileToBase64 } from "../../../hooks/useFileToBase64";
import { useCreateCategory, useEditCategory } from "../../../hooks/useCategory";
import Loader from "../../../components/loader/Loader";
import { toast } from "sonner";
import { FaArrowLeftLong } from "react-icons/fa6";
import customToast from "../../../components/toasterProvider/customToast";
import { Trash2 } from "lucide-react";

const ActiveCategory = ({
  data,
  setCheckAdd,
  checkEdit,
  setCheckEdit,
  refetch,
}) => {
  const [dataCategory, setDataCategory] = useState({
    title: checkEdit && data?.title ? data?.title : "",
    imgCategory: checkEdit && data?.imgCategory?.url ? data?.imgCategory : "",
    subCategory: checkEdit && data?.subCategory ? data?.subCategory : [""],
    color: checkEdit && data?.color ? data?.color : "#ffffff",
  });
  const [idEdit, setIdEdit] = useState("");
  useEffect(() => {
    if (data) {
      setIdEdit(data?.id);
    }
  }, [data]);
  const [imgCategoryFile, setImgCategoryFile] = useState(null);

  const { mutate, isPending, isSuccess, isError } = useCreateCategory();
  const {
    mutate: mutateEdit,
    isPending: isPendingEdit,
    isSuccess: isSuccessEdit,
    isError: isErrorEdit,
  } = useEditCategory();

  // Handle image upload
  const handleImgCategoryChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await fileToBase64(file);
    setImgCategoryFile(base64Image);
    setDataCategory((prevData) => ({
      ...prevData,
      imgCategory: base64Image,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubCategoryChange = (index, value) => {
    const updatedSubCategories = [...dataCategory.subCategory];
    updatedSubCategories[index] = { title: value };
    setDataCategory((prevData) => ({
      ...prevData,
      subCategory: updatedSubCategories,
    }));
  };

  const addSubCategory = () => {
    setDataCategory((prevData) => ({
      ...prevData,
      subCategory: [...prevData.subCategory, { title: "" }],
    }));
  };

  const removeSubCategory = (index) => {
    const updatedSubCategories = dataCategory.subCategory.filter(
      (_, i) => i !== index
    );
    setDataCategory((prevData) => ({
      ...prevData,
      subCategory: updatedSubCategories,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !dataCategory.title === "" ||
      !dataCategory.imgCategory ||
      !dataCategory.color
    ) {
      customToast.error("Thiếu dữ liệu nhé!");
      return;
    }
    if (dataCategory?.subCategory) {
      const hasEmptySubCategory = dataCategory?.subCategory?.some(
        (sub) => !sub.title.trim()
      );
      if (hasEmptySubCategory) {
        customToast.error("Danh mục cấp 2 không được để trống!");
        return;
      }
    }

    if (!checkEdit) {
      mutate({ dataCategory: dataCategory });
    } else {
      mutateEdit({ categoryId: idEdit, dataCategory: dataCategory });
    }
  };

  useEffect(() => {
    if (isSuccess || isSuccessEdit) {
      setCheckAdd(false);
      setIdEdit(false);
      setDataCategory({
        title: "",
        imgCategory: "",
        subCategory: [""],
        color: "#ffffff",
      });
      refetch();

      toast.success("Thành công");
    }
  }, [isSuccess, isSuccessEdit]);
  useEffect(() => {
    if (isError || isErrorEdit) {
      toast.success("Xãy ra lỗi");
    }
  }, [isError, isErrorEdit]);

  const handleCancel = () => {
    setDataCategory({
      title: "",
      imgCategory: "",
      subCategory: [""],
      color: "#ffffff",
    });
    setCheckEdit(false);
    setCheckAdd(false);
  };

  return (
    <>
      {(isPending || isPendingEdit) && <Loader />}
      <div className="bg-transparent w-full">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={handleCancel}
              className="cursor-pointer bg-gray5 text-white hover:text-gray7 px-5 py-1 rounded-lg overflow-hidden flex items-center justify-center"
            >
              <FaArrowLeftLong fontSize={20} />
            </div>
            <span className="text-base">Trở lại</span>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className={styled.buttonTran}
            >
              Hủy
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`${styled.buttonPrimary} !rounded-xl`}
            >
              {!checkEdit ? " Đồng ý" : "Chỉnh sửa"}
            </button>
          </div>
        </div>

        <h3 className="text-center pt-10 text-primary font-semibold text-3xl">
          Tạo danh mục mới
        </h3>
        <div className="w-full">
          {/* Title */}
          <div className="mb-4">
            <label className={styled.label}>Tên danh mục</label>
            <input
              className={styled.input}
              name="title"
              value={dataCategory.title}
              onChange={handleChange}
              placeholder="Nhập tên danh mục"
              required
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <div className="w-full h-[180px] flex items-center gap-5">
              <div className="w-full h-full flex items-center justify-center bg-gray0">
                <div className="w-full h-full border text-gray3 flex items-center justify-center">
                  {imgCategoryFile ? (
                    <img
                      src={imgCategoryFile}
                      alt="imgCategory"
                      className="w-[50px] h-[50px] object-cover"
                    />
                  ) : (
                    <PiImage fontSize={100} />
                  )}
                  {data?.imgCategory && !imgCategoryFile && checkEdit && (
                    <img
                      src={data?.imgCategory?.url}
                      alt="imgCategory"
                      className="w-[50px] h-[50px] object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="w-3/5 h-full text-start flex flex-col items-start justify-start gap-5">
                <p className="text-gray5 text-[13px]">
                  Tải lên ảnh danh mục của bạn tại đây.
                  <span className="text-gray9">Hướng dẫn quan trọng</span>: ảnh
                  tỷ lệ 4:3 là hoàn hảo. Định dạng hỗ trợ:
                </p>
                <label
                  htmlFor="imgCategory"
                  className={`${styled.buttonPrimary10} font-medium !w-max`}
                >
                  Tải Lên Hình Ảnh
                  <span>
                    <BsUpload />
                  </span>
                  <input
                    id="imgCategory"
                    name="imgCategory"
                    type="file"
                    accept="image/*"
                    onChange={handleImgCategoryChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Subcategories */}
          <div className="mb-4">
            <label className={styled.label}>Danh sách danh mục cấp 2</label>
            <div className="w-full max-h-[200px] p-1 scrollbar-thin overflow-y-auto">
              {dataCategory.subCategory.map((subCategory, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={subCategory.title}
                    onChange={(e) =>
                      handleSubCategoryChange(index, e.target.value)
                    }
                    className={styled.input}
                    placeholder="Nhập tên danh mục"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubCategory(index)}
                    className="ml-2 p-2 bg-error hover:opacity-80 text-white rounded"
                  >
                    <Trash2/>
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSubCategory}
              className={styled.buttonPrimary10}
            >
              Thêm
            </button>
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="block text-gray-700">Màu cố định</label>
            <div className="flex items-center gap-2">
              {/* Color Picker */}
              <input
                type="color"
                name="color"
                disabled
                value={dataCategory.color}
                onChange={handleChange}
                className={styled.input}
              />

              {/* Input for HEX color */}
              <input
                type="text"
                name="color"
                value={dataCategory.color}
                onChange={handleChange}
                className={styled.input}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveCategory;
