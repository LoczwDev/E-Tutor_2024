import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "../../constants/styles/styles";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";
import useUser from "../../hooks/useUser";
import { updatePasswordUser } from "../../services/userService";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "sonner";

// Password strength levels
const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[$@%#!]/.test(password)) strength++;
  return strength;
};

// Schema validation
const schema = Yup.object().shape({
  oldPassword: Yup.string().required("Mật khẩu hiện tại là bắt buộc"),
  newPassword: Yup.string()
    .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
    .matches(/[0-9]/, "Mật khẩu phải bao gồm số")
    .matches(/[A-Z]/, "Mật khẩu phải bao gồm chữ in hoa")
    .matches(/[$@%#!]/, "Mật khẩu phải bao gồm ký tự đặc biệt ($@%#!)")
    .required("Mật khẩu mới là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const ContentChangePass = () => {
  const dispatch = useDispatch();

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ oldPassword, newPassword }) => {
      return updatePasswordUser({ oldPassword, newPassword });
    },
    onSuccess: (data) => {
      toast.success("Đổi mật khẩu thành công");
      dispatch(userActions.setUserInfo(data));
      formik.resetForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      mutate({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswordStrength(getPasswordStrength(newPassword));
    handleChange(e);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Define the input fields data
  const inputFields = [
    {
      name: "oldPassword",
      label: "Mật khẩu hiện tại",
      placeholder: "Nhập mật khẩu hiện tại",
      onChange: handleChange,
      type: showPasswords.oldPassword ? "text" : "password",
      error: touched.oldPassword && errors.oldPassword,
      value: values.oldPassword,
    },
    {
      name: "newPassword",
      label: "Mật khẩu mới",
      placeholder: "Nhập mật khẩu mới",
      onChange: handlePasswordChange,
      type: showPasswords.newPassword ? "text" : "password",
      error: touched.newPassword && errors.newPassword,
      value: values.newPassword,
    },
    {
      name: "confirmPassword",
      label: "Xác nhận mật khẩu",
      placeholder: "Xác nhận mật khẩu mới",
      onChange: handleChange,
      type: showPasswords.confirmPassword ? "text" : "password",
      error: touched.confirmPassword && errors.confirmPassword,
      value: values.confirmPassword,
    },
  ];

  return (
    <>
      {isPending && <Loader />}
      <div className="w-full">
        <h3 className="font-semibold text-2xl mb-3">Đổi mật khẩu</h3>
        <p className="text-base text-gray5">
          Mật khẩu của bạn phải có tối thiểu 8 ký tự, bao gồm cả chữ số, chữ cái
          và ký tự đặc biệt (!$@%...).
        </p>
        <form onSubmit={handleSubmit} className="py-6">
          {/* Map through input fields */}
          {inputFields.map((field, index) => (
            <div key={field.name} className="mb-4">
              <label className={styled.label}>{field.label}</label>
              {field.error && (
                <p className="text-error text-xs mt-1">{field.error}</p>
              )}
              <div className="relative">
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  className={styled.input}
                  placeholder={field.placeholder}
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility(field.name)}
                >
                  {showPasswords[field.name] ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>

              {/* Password Strength Indicator only for "Mật khẩu mới" */}
              {index === 1 &&
                inputFields[1].value && ( // Check if this is the second input field
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mt-2">
                      {Array(4)
                        .fill(0)
                        .map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1/4 h-1.5 ${
                              passwordStrength > idx
                                ? passwordStrength === 3 && idx === 2
                                  ? "bg-warning"
                                  : passwordStrength === 4
                                  ? "bg-success"
                                  : "bg-error"
                                : "bg-gray3"
                            }`}
                          />
                        ))}
                    </div>
                    <p className="text-xs mt-1">
                      {passwordStrength === 4
                        ? "Mật khẩu mạnh"
                        : passwordStrength === 3
                        ? "Mật khẩu trung bình"
                        : passwordStrength > 0
                        ? "Mật khẩu yếu"
                        : ""}
                    </p>
                  </div>
                )}
            </div>
          ))}

          <button
            type="submit"
            className={`${styled.buttonPrimary}`}
            disabled={isPending}
          >
            {isPending ? "Đang cập nhật..." : "Đổi mật khẩu"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ContentChangePass;
