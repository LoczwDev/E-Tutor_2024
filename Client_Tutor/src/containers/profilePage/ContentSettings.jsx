import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "../../constants/styles/styles";

const ContentSettings = () => {
  const schema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    username: Yup.string()
      .min(6, "Username must be at least 6 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    title: Yup.string().max(50, "Title must not exceed 50 characters"),
  });
  const [photo, setPhoto] = useState(null);

  // Xử lý upload avatar
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(URL.createObjectURL(file));
  };

  // Khởi tạo formik và Yup schema
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Logic xử lý form khi nhấn nút Save Changes
      console.log(values);
      console.log("Uploaded photo: ", photo);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h3 className="font-semibold text-2xl mb-3">Account settings</h3>
      <form onSubmit={handleSubmit} className="flex gap-8 p-6">
        {/* Upload Photo Section */}
        <div className="flex flex-col items-center justify-center border border-gray1 p-4">
          <div className="w-48 h-48 mb-4">
            <img
              src={photo || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="bg-gray-100 p-2 text-sm cursor-pointer">
            Upload Photo
            <input
              type="file"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
          <p className="text-xs text-center mt-2">
            Image size should be under 1MB and image ratio needs to be 1:1
          </p>
        </div>

        {/* User Information Section */}
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <label className={styled.label}>First name</label>
                {errors.firstName && touched.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                className={styled.input}
                placeholder="First name"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <label className={styled.label}>Last name</label>
                {touched.lastName && errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                className={styled.input}
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Username</label>
              {touched.username && errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              className={styled.input}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Email</label>
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={styled.input}
              placeholder="Email address"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <label className={styled.label}>Title</label>
              {touched.title && errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div className="relative flex items-center justify-between">
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                className={styled.input}
                placeholder="Your title, profession or small biography"
              />
              <span className="absolute right-5 text-xs text-gray-500 ml-2">0/50</span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 hover:bg-orange-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentSettings;
