import React, { useState, useRef } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import images from "../../constants/images/images";
import { useMutation } from "@tanstack/react-query";
import { activitionUser } from "../../services/userService";
import Loader from "../loader/Loader";
import { toast } from "sonner";

const ActivationAuth = ({ token, email }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const [invalidError, setInvalidError] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ activation_token, activation_code }) => {
      return activitionUser({
        activation_token,
        activation_code,
      });
    },
    onSuccess: (data) => {
      toast.success(
        data.message || "Đã xác thực thành công! Xin hãy tiến hành đăng nhập"
      );

      const loginModal = document.getElementById("login");
      const registerModal = document.getElementById("register");
      registerModal.classList.remove("modal-open");
      loginModal.classList.add("modal-open");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");

    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      toast.success("Sai mã OTP");
      return;
    }
    if (!verificationNumber) {
      toast.error("Bạn cần nhập mã xác minh.");
      return;
    }
    try {
      mutate({
        activation_token: token,
        activation_code: verificationNumber,
      });
      setInvalidError(true);
    } catch (error) {
      console.error("Failed to activate:", error);
    }
  };

  const handlerInputChange = (index, value) => {
    setInvalidError(false);

    if (!/^\d*$/.test(value)) return;
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <>
      {isPending && <Loader />}
      <div className="w-full h-full flex items-center justify-between gap-5">
        <div className="w-1/2">
          <div className="w-full h-full">
            <img
              src={images.Activation}
              className="w-full h-full object-cover"
              alt="img-login"
            />
          </div>
        </div>
        <span className="h-10 w-0.5 bg-primary" />
        <div className="w-2/5 p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Xác minh tài khoản của bạn
          </h2>
          <p className="text-sm text-gray6 text-center">
            Vui lòng kiểm tra email của bạn, Chúng tôi đã gửi mã tới
            <span className="text-primary text-base font-medium ml-1">
              {email}
            </span>
          </p>
          <br />
          <div className="w-full flex items-center justify-center mt-2">
            <div className="w-[80px] h-[80px] rounded-full bg-primary text-white flex items-center justify-center">
              <VscWorkspaceTrusted size={40} />
            </div>
          </div>
          <br />
          <br />
          <div className="m-auto flex items-center justify-around">
            {Object.keys(verifyNumber).map((key, index) => (
              <input
                type="text"
                key={key}
                className={`w-[65px] h-[65px] bg-transparent border-b-2 flex items-center justify-center text-[24px] outline-none text-center ${
                  invalidError ? "animate-shake border-error" : " border-gray5"
                }`}
                ref={inputRefs[index]}
                placeholder=""
                maxLength={1}
                value={verifyNumber[key]}
                onChange={(e) => handlerInputChange(index, e.target.value)}
              />
            ))}
          </div>
          <br />
          <br />
          <div className="w-full flex justify-center">
            <button
              disabled={isPending}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              onClick={verificationHandler}
            >
              Xác minh OTP
            </button>
          </div>
          <br />
          <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Quay lại để đăng nhập?
            <span className="text-primary pl-1 cursor-pointer">Đăng nhập</span>
          </h5>
        </div>
      </div>
    </>
  );
};

export default ActivationAuth;
