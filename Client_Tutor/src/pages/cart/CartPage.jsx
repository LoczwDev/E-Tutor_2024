import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import useUser, { useToggleFavorite } from "../../hooks/useUser";
import { formatCurrency } from "../../hooks/formatCurrency";
import { FaStar } from "react-icons/fa";
import styled from "../../constants/styles/styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { getProfileUser } from "../../services/userService";
import { userActions } from "../../store/reducers/userReducers";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../components/loader/Loader";
import useCart from "../../hooks/useCart";
import { cartActions } from "../../store/reducers/cartReducers";

const CartPage = () => {
  const user = useUser();
  const cart = useCart();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataCart, setDataCart] = useState([]);
  const [tooltipItem, setTooltipItem] = useState(null);

  useEffect(() => {
    if (cart) {
      setDataCart(cart);
    }
  }, [cart]);

  const totalPrice = dataCart?.reduce(
    (total, item) => total + item.estimatedPrice,
    0
  );

  const handleDeleteItemCart = (id) => {
    dispatch(cartActions.removeItem(id));
    setTooltipItem(null);
  };

  const handleOrderCart = () => {
    const purchasedCourses = user.progress
      .map((item) => {
        const course = dataCart.find((course) => course._id === item.courseId);
        return course ? course : null;
      })
      .filter((course) => course !== null);

    if (purchasedCourses && purchasedCourses.length > 0) {
      purchasedCourses.map((item) => {
        toast.error(`Bạn đã mua khóa học: ${item.name}`);
      });
      return;
    }
    if (user) {
      navigate("/checkout/cart");
    } else {
      const loginModal = document.getElementById("login");
      loginModal.classList.add("modal-open");
    }
  };

  const { mutate, isPending, isSuccess } = useToggleFavorite();

  const isCheckFavorite = (id) => {
    if (user) {
      const checkFavorite = user.favorites.some((course) => course._id === id);
      return checkFavorite;
    } else {
      return false;
    }
  };

  const dataBreadCumbs = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Giỏ hàng",
      link: "/user-cart",
    },
  ];

  const TABLE_HEAD = ["Khóa học", "Giá", "Hành động"];

  const handleToggleFavorite = (id) => {
    if (user) {
      mutate({ courseId: id });
    } else {
      const loginModal = document.getElementById("login");
      loginModal.classList.add("modal-open");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const loadData = async () => {
        const profileData = await getProfileUser();
        dispatch(userActions.setUserInfo(profileData));
      };
      loadData();
    }
  }, [isSuccess]);

  return (
    <MainLayout>
      {isPending && <Loader />}
      <div className="w-full bg-gray0 flex flex-col items-center justify-center py-5">
        <h3 className="font-semibold text-2xl">Giỏ hàng</h3>
        <BreadCrumbs data={dataBreadCumbs} />
      </div>
      <SectionLayout>
        <div className="w-full">
          <h3 className="font-semibold text-2xl mb-3">
            Giỏ hàng({dataCart?.length})
          </h3>
          <div className="w-full flex items-start gap-7">
            <Card className="max-h-screen border !rounded-none w-full overflow-y-auto">
              <table className="w-full table-auto text-left">
                <thead className="border-b">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th key={head} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold leading-none"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataCart?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            <div className="flex items-start gap-5">
                              <div className="w-56 h-28 overflow-hidden shadow-card">
                                <div className="w-full h-full">
                                  <img
                                    src={item.thumbnail.url}
                                    className="w-full h-full object-cover"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="w-full h-28 flex flex-col justify-between">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-1">
                                    <FaStar className="text-warning mb-0.5" />
                                    <span>{item.ratings}</span>{" "}
                                    <span className="text-gray4">
                                      ({item.reviews.length} đánh giá)
                                    </span>
                                  </div>
                                  <div className="text-lg font-medium line-clamp-2">
                                    {item.name}
                                  </div>
                                </div>

                                <div className="text-xs text-gray4">
                                  Giảng viên:
                                  <span className="text-gray7 text-base">
                                    {item.tutor.fullName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            <div className="text-base font-semibold text-primary">
                              {item.price === item.estimatedPrice ? (
                                <span>{formatCurrency(item.price)}</span>
                              ) : (
                                <div className="flex flex-col">
                                  <span>
                                    {formatCurrency(item.estimatedPrice)}
                                  </span>

                                  <span className="text-sm line-through text-gray5">
                                    {formatCurrency(item.price)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-600"
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <button
                                  onClick={() => setTooltipItem(item._id)}
                                >
                                  <AiOutlineDelete
                                    className="text-error"
                                    fontSize={25}
                                  />
                                </button>
                                {tooltipItem === item._id && (
                                  <div className="absolute p-3 w-max h-max -top-[50px] right-0 bg-white shadow-tooltip">
                                    <div className="text-sm text-center py-3">
                                      Xoá ghi chú này
                                    </div>
                                    <div className="w-full text-sm flex items-center gap-3 justify-center">
                                      <button
                                        onClick={() => setTooltipItem(null)}
                                        className={`bg-gray3 text-white hover:bg-opacity-80 px-3`}
                                      >
                                        Hủy
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteItemCart(item._id)
                                        }
                                        className={`bg-error text-white hover:bg-opacity-80 px-3`}
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <span className="h-10 w-[1px] bg-gray1" />
                              <button
                                onClick={() => handleToggleFavorite(item?._id)}
                                className="p-2 flex items-center justify-center bg-primary/10 text-2xl cursor-pointer"
                              >
                                {isCheckFavorite(item._id) ? (
                                  <IoHeartSharp className="text-primary" />
                                ) : (
                                  <IoHeartOutline className="text-primary" />
                                )}
                              </button>
                            </div>
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                  {dataCart.length <= 0 && (
                    <td colSpan={3}>
                      <div className="w-full p-2 text-center bg-warning/30">
                        Chưa có khóa học nào trong giỏ
                      </div>
                    </td>
                  )}
                </tbody>
              </table>
            </Card>
            {dataCart.length > 0 && (
              <div className="w-[40%] ">
                <div className="w-full flex flex-col gap-3 border-b pb-5">
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
                    onClick={handleOrderCart}
                    className={`${styled.buttonPrimary} w-full`}
                  >
                    <div id="button-text">Tiến hành thanh toán </div>
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionLayout>
    </MainLayout>
  );
};

export default CartPage;
