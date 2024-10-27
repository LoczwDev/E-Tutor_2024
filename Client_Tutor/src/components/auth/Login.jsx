import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowRight } from "react-icons/fa6";
import images from "../../constants/images/images";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/userService";
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Bạn đã nhập sai email").required("Trống"),
  password: Yup.string()
    .min(6, "Mật khẩu phải dài hơn 6 ký tự")
    .required("Trống"),
});
const Login = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginUser({ email, password });
    },
    onSuccess: (data) => {
      setIsLoading(true);
      toast.success("Chào mừng bạn trở lại");
      dispatch(userActions.setUserInfo(data));
      queryClient.invalidateQueries(["userAuth"]);
      setIsLoading(false);
      navigate("/");
      document.getElementById("login")?.classList?.remove("modal-open");
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      mutate({ email, password });
      setIsLoading(true);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const handleChangeAuth = () => {
    const loginModal = document.getElementById("login");
    const registerModal = document.getElementById("register");
    loginModal.classList.remove("modal-open");
    registerModal.classList.add("modal-open");
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full h-full flex items-center justify-between gap-5">
        <div className="w-1/2">
          <div className="w-full h-full">
            <img
              src={images.Login}
              className="w-full h-full object-cover"
              alt="img-login"
            />
          </div>
        </div>
        <span className="h-10 w-0.5 bg-primary" />
        <div className="w-1/2 flex justify-center items-center h-max">
          <div className="w-full p-8">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Đăng nhập
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Nhập email của bạn..."
                  className={`w-full px-4 py-2 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu của bạn"
                  className={`w-full px-4 py-2 border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:ring-1 focus:ring-primary`}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="w-full flex items-center justify-end mb-10">
                {/* Remember Me Checkbox */}
                {/* <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={values.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="ml-2 text-sm">Remember me</span>
                  </label>
                </div> */}

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center justify-center gap-3 w-max px-4 py-2.5 bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
                >
                  {isPending ? "Xin chờ" : "Đăng nhập"}
                  <FaArrowRight />
                </button>
              </div>

              {/* Social Login Options */}
              <div className="text-center">
                <p className="relative w-full text-sm text-gray1 border-b z-0 mb-10">
                  <span className="absolute bg-white z-10 px-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max uppercase text-gray5 text-sm font-medium">
                    Đăng nhập với
                  </span>
                </p>

                <div className="flex justify-center gap-3 mt-4">
                  {/* Social buttons */}
                  <button className="w-full max-w-xs flex items-center justify-center py-2 border border-gray-300 rounded hover:bg-gray-100">
                    <img
                      src="https://img.icons8.com/color/24/000000/google-logo.png"
                      alt="Google"
                      className="mr-2"
                    />
                    Google
                  </button>
                  <button className="w-full max-w-xs flex items-center justify-center py-2 border border-gray-300 rounded hover:bg-gray-100">
                    <img
                      src="https://img.icons8.com/ios-filled/24/000000/facebook-new.png"
                      alt="Facebook"
                      className="mr-2"
                    />
                    Facebook
                  </button>
                  <button className="w-full max-w-xs flex items-center justify-center py-2 border border-gray-300 rounded hover:bg-gray-100">
                    <img
                      src="https://img.icons8.com/ios-filled/24/000000/mac-os.png"
                      alt="Apple"
                      className="mr-2"
                    />
                    Apple
                  </button>
                </div>
              </div>
            </form>
            <span className="block mt-10 capitalize text-sm text-gray6">
              Bạn chưa có tài khoản?{" "}
              <button onClick={handleChangeAuth} className="text-primary">
                Đăng ký ngay
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
