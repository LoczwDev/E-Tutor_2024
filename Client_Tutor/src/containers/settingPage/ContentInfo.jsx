import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "../../constants/styles/styles";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fileToBase64 } from "../../hooks/useFileToBase64";
import Loader from "../../components/loader/Loader";
import { updateProfile } from "../../services/userService";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "sonner";
import images from "../../constants/images/images";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Tên phải có ít nhất 2 ký tự"),
  lastName: Yup.string()
    .min(2, "Họ phải có ít nhất 2 ký tự"),
  username: Yup.string()
    .min(6, "Tên đăng nhập phải có ít nhất 6 ký tự")
    .required("Tên đăng nhập là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ"),
  title: Yup.string().max(50, "Chức danh không được vượt quá 50 ký tự"),
  phone: Yup.string().matches(
    /^[0-9]{10}$/,
    "Số điện thoại không hợp lệ. Phải gồm 10 số"
  ),
  introduction: Yup.string().max(
    300,
    "Giới thiệu không được vượt quá 300 ký tự"
  ),
});

const ContentInfo = ({user}) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(user?.avatar?.url || null);
  const [avatar, setAvatar] = useState(user?.avatar?.url || null);

  const [checkEdit, setCheckEdit] = useState(false);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      const base64 = await fileToBase64(file);
      setAvatar(base64);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      firstName,
      lastName,
      phone,
      title,
      introduction,
      avatar,
    }) => {
      return updateProfile({
        firstName,
        lastName,
        phone,
        title,
        introduction,
        avatar,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      toast.success("Cập nhật thành công");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      title: user?.title,
      phone: user?.phone,
      introduction: user?.introduction,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      mutate({
        firstName: values.email,
        lastName: values.lastName,
        phone: values.phone,
        title: values.title,
        introduction: values.introduction,
        avatar: avatar,
      });
      setCheckEdit(false);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  const formFields = [
    {
      label: "Tên",
      name: "firstName",
      type: "text",
      placeholder: "Tên",
      error: errors.firstName,
      touched: touched.firstName,
      value: values.firstName,
    },
    {
      label: "Họ",
      name: "lastName",
      type: "text",
      placeholder: "Họ",
      error: errors.lastName,
      touched: touched.lastName,
      value: values.lastName,
    },
    {
      label: "Số điện thoại",
      name: "phone",
      type: "tel",
      placeholder: "Nhập số điện thoại",
      error: errors.phone,
      touched: touched.phone,
      value: values.phone,
    },
    {
      label: "Chức danh",
      name: "title",
      type: "text",
      placeholder: "Chức danh, nghề nghiệp hoặc mô tả ngắn",
      error: errors.title,
      touched: touched.title,
      value: values.title,
    },
    {
      label: "Giới thiệu bản thân",
      name: "introduction",
      type: "textarea",
      placeholder: "Viết giới thiệu về bản thân...",
      error: errors.introduction,
      touched: touched.introduction,
      value: values.introduction,
    },
  ];

  return (
    <>
      {isPending && <Loader />}
      <div className="w-full">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-semibold text-2xl mb-3">Thông tin cơ bản</h3>
          <span className="block hover:text-primary duration-300 cursor-pointer">
            <CiEdit fontSize={30} onClick={() => setCheckEdit(!checkEdit)} />
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-8 p-6">
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center justify-center max-h-max border border-gray1 p-4">
            <div className="w-48 h-48 mb-4">
              <img
                src={photo || images.AvatarCur}
                alt="Ảnh đại diện"
                className="w-full h-full object-cover"
              />
            </div>
            {checkEdit && (
              <>
                <label className="bg-gray-100 p-2 text-sm cursor-pointer">
                  Tải ảnh lên
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*" // Limit file types to images
                    onChange={handlePhotoUpload}
                  />
                </label>
                <p className="text-xs text-center mt-2">
                  Ảnh phải dưới 1MB và tỉ lệ ảnh là 1:1
                </p>
              </>
            )}
          </div>

          {/* User Information Section */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {formFields.slice(0, 2).map((field, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2">
                    <label className={styled.label}>{field.label}</label>
                    {field.touched && field.error && (
                      <p className="text-error text-xs mt-1">{field.error}</p>
                    )}
                  </div>
                  {checkEdit ? (
                    <input
                      type={field.type}
                      name={field.name}
                      // value={field.value}
                      onChange={handleChange}
                      className={styled.input}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <div className="text-base text-gray7">{field.value}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Render các input còn lại */}
            {formFields.slice(2).map((field, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2">
                  <label className={styled.label}>{field.label}</label>
                  {field.touched && field.error && (
                    <p className="text-error text-xs mt-1">{field.error}</p>
                  )}
                </div>
                {checkEdit ? (
                  <input
                    type={field.type}
                    name={field.name}
                    // value={field.value}
                    onChange={handleChange}
                    className={styled.input}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <div className="text-base text-gray7">{field.value}</div>
                )}
              </div>
            ))}
            {checkEdit && (
              <button
                type="submit"
                className={`${styled.buttonPrimary}`}
                disabled={isPending}
              >
                {isPending ? "Đang cập nhật..." : "Cập nhật"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ContentInfo;
