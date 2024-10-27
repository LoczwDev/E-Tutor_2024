import React, { useEffect, useState } from "react";
import { GoCreditCard } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import useUser from "../hooks/useUser";
import { createOrder } from "../services/orderService";
import { redirect, useNavigate } from "react-router-dom";
import styled from "../constants/styles/styles";
import VisaIcon from "../assets/icons/visaIcon.svg";
import MasterCardIcon from "../assets/icons/masterIcon.svg";
import AmexIcon from "../assets/icons/amexIcon.svg";
import { userActions } from "../store/reducers/userReducers";
import stable from "../constants/stables/stables";
import { io } from "socket.io-client";
import Loader from "../components/loader/Loader";
import images from "../constants/images/images";
import { usePaymentMomo } from "../hooks/useOrder";
import { getProfileUser } from "../services/userService";
import { cartActions } from "../store/reducers/cartReducers";

const ENDPOINT = stable.NODE_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = io(ENDPOINT, {
  transports: ["websocket"],
  withCredentials: true,
});

export const CheckOutForm = ({ data, clientSecret }) => {
  const [dataCourseCheckOut, setDataCourseCheckOut] = useState(null);
  useEffect(() => {
    if (!Array.isArray(data)) {
      setDataCourseCheckOut([data]);
    } else {
      setDataCourseCheckOut(data);
    }
  }, [data]);

  const totalPrice = dataCourseCheckOut?.reduce(
    (total, item) => total + item.estimatedPrice,
    0
  );

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [dataOrder, setDataOrder] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [cardBrand, setCardBrand] = useState("");
  const [emailOrder, setEmailOrder] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("new_card");
  const {
    mutate: mutateMomo,
    isPending: isPendingMomo,
    data: dataPaymentMomo,
  } = usePaymentMomo();

  useEffect(() => {
    if (!isPendingMomo && dataPaymentMomo) {
      window.location.href = dataPaymentMomo.payUrl;
    }
  }, [isPendingMomo, dataPaymentMomo]);

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const user = useUser();

  useEffect(() => {
    if (user) {
      setEmailOrder(user?.email);
    }
  }, [user]);

  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ courseIds, payment_info, emailOrder, amount }) =>
      createOrder({ courseIds, payment_info, emailOrder, amount }),
    onSuccess: (data) => {
      setDataOrder(data);
      toast.success(data.message || "Thanh toán thành công");
      setTimeout(() => {
        navigate(`/course-access/${data?._id}`);
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      console.error(error);
    },
  });

  useEffect(() => {
    if (dataOrder) {
      setLoadUser(true);
      socketId.emit("notification", {
        title: "Thanh toán mới",
        message: `Bạn có một thanh toán mới với số tiền  ${new Intl.NumberFormat(
          "vi-VN",
          {
            currency: "VND",
          }
        ).format(totalPrice)}
                    đ`,
        userId: user?._id,
      });
      redirect(`/course-access/${data._id}`);
    }
  }, [dataOrder]);

  useEffect(() => {
    if (loadUser) {
      const loadData = async () => {
        const profileData = await getProfileUser();
        dispatch(userActions.setUserInfo(profileData));
        dispatch(cartActions.removeItem(data._id));
      };
      loadData();
    }
  }, [loadUser, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedMethod === "new_card") {
      if (!stripe || !elements) {
        return;
      }
      setIsLoading(true);
      setMessage("");
      const cardElement = elements.getElement(CardNumberElement);
      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );
        if (error) {
          setMessage(error.message);
          setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          mutate({
            courseIds: [data._id],
            payment_info: paymentIntent,
            emailOrder: emailOrder,
            amount: totalPrice + 7000,
          });
        }
      } catch (error) {
        setMessage(
          "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
        );
        console.error("Payment error: ", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      await mutateMomo({
        amount: totalPrice + 7000,
        orderInfo: "Thanh toán mới từ E-tutor",
      });
    }
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setMessage(event.error.message);
    } else {
      setMessage("");
      if (event.brand) {
        setCardBrand(event.brand);
      }
    }
  };
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  const getCardBrandIcon = () => {
    switch (cardBrand) {
      case "visa":
        return <img src={VisaIcon} alt="Visa" className="h-6" />;
      case "mastercard":
        return <img src={MasterCardIcon} alt="MasterCard" className="h-6" />;
      case "amex":
        return <img src={AmexIcon} alt="American Express" className="h-6" />;
      default:
        return null;
    }
  };
  const options = {
    classes: {
      base: "w-full h-[40px] px-4 pt-[10px] placeholder:text-gray5 text-gray6 border border-gray1",
      focus: "outline-none ring-2 ring-primary",
      invalid: "!text-error !border-error !ring-error !ring-2",
    },
    style: {
      base: {
        fontSize: "16px",
      },
    },
  };

  return (
    <div className="w-full">
      {isPending && <Loader />}
      <form
        id="payment-form"
        className="w-full flex items-start gap-20"
        onSubmit={handleSubmit}
      >
        <div className="w-[55%]">
          <label
            className={`w-full relative flex items-center justify-between h-[45px] px-4 border-2 mb-10 cursor-pointer ${
              selectedMethod === "new_card" ? "border-success" : "border-gray1"
            }`}
          >
            <div className="flex items-center">
              <GoCreditCard fontSize={30} className="text-primary" />
              <span className="ml-4">Thẻ thanh toán mới</span>
            </div>
            {selectedMethod === "new_card" && (
              <div className="text-success">
                <FaCheckCircle fontSize={20} />
              </div>
            )}
            <input
              type="radio"
              name="paymentMethod"
              value="new_card"
              onChange={() => handleSelect("new_card")}
              className="absolute inset-0 opacity-0 w-full h-full"
            />
          </label>

          {/* Thanh toán bằng MoMo */}
          <label
            className={`group w-full relative flex items-center justify-between h-[45px] px-4 border-2 mb-10 cursor-pointer ${
              selectedMethod === "momo" ? "border-success" : "border-gray1"
            }`}
          >
            <div className="flex items-center">
              <img
                src={images.Momo}
                className="w-7 h-7 object-cover"
                alt="icon_momo"
              />
              <span className="ml-4">Thanh toán bằng MoMo</span>
            </div>
            {selectedMethod === "momo" && (
              <div className="text-success">
                <FaCheckCircle fontSize={20} />
              </div>
            )}
            <input
              type="radio"
              name="paymentMethod"
              value="momo"
              onChange={() => handleSelect("momo")}
              className="absolute inset-0 opacity-0 w-full h-full"
            />
          </label>
          <div className="w-full mb-5">
            <label
              htmlFor="emailOrder"
              className={`${styled.label} !font-normal`}
            >
              Email
            </label>
            <input
              type="email"
              id="emailOrder"
              name="emailOrder"
              value={emailOrder}
              onChange={(e) => setEmailOrder(e.target.value)}
              placeholder="Nhập email nhận thông tin"
              className={`${styled.input}`}
            />
          </div>
          {selectedMethod === "new_card" && (
            <>
              <div className="w-full mb-5">
                <label
                  htmlFor="number"
                  className={`${styled.label} !font-normal`}
                >
                  Số thẻ
                </label>
                <div className="relative w-full flex items-center">
                  <div className="border focus-within:border-primary border-r-0 h-[40px] w-[50px] flex items-center justify-center">
                    <GoCreditCard fontSize={20} className="text-primary" />
                  </div>
                  <CardNumberElement
                    options={options}
                    onChange={handleCardChange}
                  />
                  <div className="absolute right-10">{getCardBrandIcon()}</div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-5 mb-5">
                <div className="w-full">
                  <label
                    htmlFor="expiry"
                    className={`${styled.label} !font-normal`}
                  >
                    Ngày hết hạn
                  </label>
                  <CardExpiryElement
                    options={options}
                    onChange={handleCardChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="cvc"
                    className={`${styled.label} !font-normal`}
                  >
                    CVC
                  </label>
                  <CardCvcElement
                    options={options}
                    onChange={handleCardChange}
                  />
                </div>
              </div>
            </>
          )}

          {/* Display the card brand icon */}
        </div>
        <div className="w-[45%] border border-gray1 p-5">
          <h3 className="font-medium text-2xl mb-5">Khóa học</h3>

          <div className="w-full flex flex-col gap-3 border-b pb-5">
            {dataCourseCheckOut?.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-64 h-24 overflow-hidden">
                  <div className="w-full h-full">
                    <img
                      src={item.thumbnail.url}
                      className="w-full h-full object-cover"
                      alt={`${item.name}_thumbnail`}
                    />
                  </div>
                </div>
                <div className="flex flex-col h-24 justify-between">
                  <div className="flex flex-col gap-2">
                    <span className="text-gray4 text-base">
                      Giảng viên:
                      <span className="text-gray7">
                        {item.tutor.firstName} {item.tutor.lastName}
                      </span>
                    </span>
                    <p className="text-lg line-clamp-1 ">{item.name}</p>
                  </div>
                  <div className="text-primary font-medium text-lg">
                    {new Intl.NumberFormat("vi-VN", {
                      currency: "VND",
                    }).format(item.estimatedPrice)}
                    đ
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-3 border-b py-5">
            <h3 className="font-medium text-2xl">Thông tin thanh toán</h3>
            <div className="w-full flex items-center justify-between mb-1">
              <span className="text-gray6 text-sm">Tổng phụ:</span>
              <span className="font-medium">
                {new Intl.NumberFormat("vi-VN", {
                  currency: "VND",
                }).format(totalPrice)}
                đ
              </span>
            </div>
            <div className="w-full flex items-center justify-between">
              <span className="text-gray6 text-sm">Phí xử lý:</span>
              <span className="font-medium">
                {new Intl.NumberFormat("vi-VN", {
                  currency: "VND",
                }).format(7000)}
                đ
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 py-5">
            <div className="w-full flex items-center justify-between mb-1">
              <span className="text-base font-medium">Tổng giá:</span>
              <span className="font-bold text-2xl">
                {new Intl.NumberFormat("vi-VN", {
                  currency: "VND",
                }).format(totalPrice + 7000)}
                đ
              </span>
            </div>

            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className={`${styled.buttonPrimary} w-full`}
            >
              <span id="button-text">Tiến hành thanh toán</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
