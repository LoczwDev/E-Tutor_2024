import React, { useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import useUser, { useToggleFavorite } from "../../hooks/useUser";
import { formatCurrency } from "../../hooks/formatCurrency";
import { FaStar } from "react-icons/fa";
import styled from "../../constants/styles/styles";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { getProfileUser } from "../../services/userService";
import { userActions } from "../../store/reducers/userReducers";
import useCart from "../../hooks/useCart";
import { cartActions } from "../../store/reducers/cartReducers";

const dataBreadCumbs = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Yêu thích",
    link: "/user-favorites",
  },
];

const FavoritesPage = () => {
  const user = useUser();
  const cart = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess } = useToggleFavorite();
  const isCheckFavorite = (id) => {
    if (user) {
      const checkFavorite = user.favorites.some((course) => course._id === id);
      return checkFavorite;
    } else {
      return false;
    }
  };

  const TABLE_HEAD = ["Khóa học", "Giá", "Hành động"];
  const handleAddCart = (item) => {
    const isItemInCart = cart?.some((cartItem) => cartItem._id === item._id);

    const isCheckBuy = user?.progress?.some(
      (course) => course.courseId === item._id
    );

    if (isItemInCart) {
      toast.info("Sản phẩm đã có trong giỏ hàng");
    } else if (isCheckBuy) {
      toast.info("Bạn đã mua khoá học này rồi, không cần thêm vào giỏ!!!");
    } else {
      dispatch(cartActions.addItem(item));
      toast.success("Thêm thành công");
    }
  };

  const handleBuyCourse = (id) => {
    const isCheckBuy = user?.progress?.some((course) => course.courseId === id);
    if (isCheckBuy) {
      toast.info("Bạn đã mua khoá học này rồi!!");
      return;
    } else {
      navigate(`/checkout/${id}`);
    }
  };

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
      <div className="w-full bg-gray0 flex flex-col items-center justify-center py-5">
        <h3 className="font-semibold text-2xl">Các khóa học yêu thích</h3>
        <BreadCrumbs data={dataBreadCumbs} />
      </div>
      <SectionLayout>
        <div className="w-full">
          <h3 className="font-semibold text-2xl mb-3">
            Yêu thích({user?.favorites.length})
          </h3>

          <Card className="max-h-screen border w-full overflow-y-auto">
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
                {user?.favorites.map((item, index) => {
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
                            <button
                              onClick={() => handleBuyCourse(item._id)}
                              className={styled.buttonTran}
                            >
                              Mua ngay
                            </button>
                            <button
                              onClick={() => handleAddCart(item)}
                              className={styled.buttonPrimary}
                            >
                              Thêm vào giỏ hàng
                            </button>
                            <button
                              onClick={() => handleToggleFavorite(item?._id)}
                              className="p-3 flex items-center justify-center bg-primary/10 text-2xl cursor-pointer"
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
                {user.favorites.length <= 0 && (
                  <td colSpan={3}>
                    <div className="w-full p-2 text-center bg-warning/30">
                      Bạn chưa có khóa học được yêu thích nào
                    </div>
                  </td>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </SectionLayout>
    </MainLayout>
  );
};

export default FavoritesPage;
