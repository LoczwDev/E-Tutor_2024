import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowRight } from "react-icons/fa6";
import images from "../../constants/images/images";
import { registerUser } from "../../services/userService";
import ActivationAuth from "./ActivationAuth";
import Loader from "../loader/Loader";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Trống"),
  lastName: Yup.string().required("Trống"),
  email: Yup.string().email("Hãy nhập email đúng").required("Trống"),
  password: Yup.string().min(6, "Mật khẩu dài hơn 6 ký tự").required("Trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu phải trùng khớp")
    .required("Trống"),
});


const Register = () => {
  const [dataRegister, setDataRegister] = useState(null);
  const [email, setEmail] = useState("");

  const { mutate, isPending: isPendingRegister } = useMutation({
    mutationFn: ({ firstName, lastName, email, password }) => {
      return registerUser({
        firstName,
        lastName,
        email,
        password,
      });
    },
    onSuccess: (data) => {
      toast.success("Hãy chú ý email của bạn");
      setDataRegister(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCloseModal = (active) => {
    const modal = document.getElementById(active);
    if (modal) {
      modal.classList.remove("modal-open");
      setDataRegister(null);
  
      // Use formik's resetForm to reset the values
      formik.resetForm();
    }
  };
  

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ firstName, lastName, email, password }) => {
      mutate({
        firstName,
        lastName,
        email,
        password,
      });
      setEmail(email);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const handleChangeAuth = () => {
    const loginModal = document.getElementById("login");
    const registerModal = document.getElementById("register");
    loginModal.classList.add("modal-open");
    registerModal.classList.remove("modal-open");
  };

  return (
    <>
      {isPendingRegister && <Loader />}
      <dialog id="register" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => handleCloseModal("register")}
            >
              ✕
            </button>
          </form>
          {!dataRegister ? (
            <div className="w-full flex items-center justify-between gap-5">
              <div className="w-1/2 h-[85vh]">
                <img
                  src={images.Register}
                  className="w-full h-full object-cover"
                  alt="img-register"
                />
              </div>
              <span className="h-10 w-0.5 bg-primary" />
              <div className="w-1/2 flex justify-center items-center h-max">
                <div className="w-full p-8">
                  <h2 className="text-3xl font-semibold text-center mb-6">
                    Đăng ký tài khoản
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Họ
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Nhập họ"
                          value={values.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${
                            errors.firstName && touched.firstName
                              ? "border-warning"
                              : "border-gray3"
                          } rounded focus:outline-none`}
                        />
                        {errors.firstName && touched.firstName && (
                          <div className="text-warning text-sm mt-1">
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Tên
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Nhập tên"
                          value={values.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${
                            errors.lastName && touched.lastName
                              ? "border-warning"
                              : "border-gray3"
                          } rounded focus:outline-none`}
                        />
                        {errors.lastName && touched.lastName && (
                          <div className="text-warning text-sm mt-1">
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Địa chỉ email"
                        value={values.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border ${
                          errors.email && touched.email
                            ? "border-warning"
                            : "border-gray3"
                        } rounded focus:outline-none`}
                      />
                      {errors.email && touched.email && (
                        <div className="text-warning text-sm mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    {/* Password inputs */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="*******"
                          value={values.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${
                            errors.password && touched.password
                              ? "border-warning"
                              : "border-gray3"
                          } rounded focus:outline-none`}
                        />
                        {errors.password && touched.password && (
                          <div className="text-warning text-sm mt-1">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Xác nhận mật khẩu
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="*******"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "border-warning"
                              : "border-gray3"
                          } rounded focus:outline-none`}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="text-warning text-sm mt-1">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex items-center justify-center mb-10">
                      <button
                        type="submit"
                        disabled={isPendingRegister}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                      >
                        Đăng ký
                        <FaArrowRight />
                      </button>
                    </div>
                  </form>
                  <span className="block mt-10 capitalize text-sm text-gray6">
                    Bạn đã có tài khoản, đăng nhập ngay
                    <button onClick={handleChangeAuth} className="text-primary">
                      Đăng nhập
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <ActivationAuth
              token={dataRegister?.activationToken}
              email={email}
            />
          )}
        </div>
      </dialog>
    </>
  );
};

export default Register;
