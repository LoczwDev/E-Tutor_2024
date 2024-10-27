import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaKey } from "react-icons/fa6";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import ContentInfo from "../../containers/settingPage/ContentInfo";
import ContentChangePass from "../../containers/settingPage/ContentChangePass";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { toast } from "sonner";


const SettingPage = () => {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      toast.loading("Đang về trang chủ");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  if (!user) {
    return <Loader />;
  }

  const dataBreadCumbs = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Trang cá nhân",
      link: "/profile",
    },
    {
      name: "Cài đặt",
      link: "/setting",
    },
  ];

  const dataTabs = [
    {
      id: 1,
      icon: <FaUser />,
      title: "Thông tin cá nhân",
    },
    {
      id: 2,
      icon: <FaKey />,
      title: "Mật khẩu và bảo mật",
    },
  ];
  const [chosse, setChosse] = useState(dataTabs[0].id);
  return (
    <MainLayout>
      <SectionLayout>
        <BreadCrumbs data={dataBreadCumbs} />
        <div className="w-full flex justify-between gap-5">
          <div className="w-[35%]">
            <div className="w-full flex flex-col gap-1">
              {dataTabs?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setChosse(item.id)}
                  className={`w-full text-lg flex items-center p-3 gap-3 duration-300 cursor-pointer ${
                    chosse === item.id
                      ? "bg-gray9 text-white font-medium"
                      : "bg-transparent font-medium hover:bg-gray9/10 text-gray9"
                  }`}
                >
                  <span>{item?.icon}</span>
                  <span>{item?.title}</span>
                </div>
              ))}
            </div>
          </div>
          <span className="w-0.5 bg-gray1" />
          <div className="w-[75%]">
            {chosse === 1 && <ContentInfo user={user} />}
            {chosse === 2 && <ContentChangePass />}
          </div>
        </div>
      </SectionLayout>
    </MainLayout>
  );
};

export default SettingPage;
