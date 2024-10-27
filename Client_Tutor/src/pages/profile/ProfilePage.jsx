import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import SectionLayout from "../../components/layouts/SectionLayout";
import HeaderProfile from "../../containers/profilePage/HeaderProfile";
import ContentDashboard from "../../containers/profilePage/ContentDashboard";
import ContentCourses from "../../containers/profilePage/ContentCourses";
import ContentSettings from "../../containers/profilePage/ContentSettings";
import ContentMessage from "../../containers/profilePage/ContentMessage";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useGetAllCoursePurchased } from "../../hooks/useCourses";
import Loading from "../../components/loader/Loading";
import ContentPurchase from "../../containers/profilePage/ContentPurchase";

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { data, isLoading } = useGetAllCoursePurchased("", "", 1, 10);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const dataTabs = [
    {
      id: 1,
      name: "Tổng quan",
    },
    {
      id: 2,
      name: "Khóa học",
    },
    {
      id: 3,
      name: "Tin nhắn",
    },
    {
      id: 4,
      name: "Lịch sử thanh toán",
    },
  ];
  const [activeTab, setActiveTab] = useState(dataTabs[0].name);
  const handleChangTab = (item) => {
    setActiveTab(item);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "Tổng quan":
        return <ContentDashboard user={user} dataCourse={data} />;
      case "Khóa học":
        return <ContentCourses user={user} />;
      case "Tin nhắn":
        return <ContentMessage />;
      case "Lịch sử thanh toán":
        return <ContentPurchase user={user} />;
      default:
        return <ContentDashboard />;
    }
  };
  return (
    <MainLayout>
      <div className="relative w-full">
        <div className="w-full bg-primary/10 py-36" />
        <div className="-mt-[225px]">
          <SectionLayout>
            <HeaderProfile user={user} />
            {isLoading ? (
              <div className="w-full flex items-center justify-center h-[50vh]">
                <Loading />
              </div>
            ) : (
              <>
                <div className="w-full bg-white flex items-center justify-between h-12 border-b border-gray1 mb-10 sticky top-0 z-[200]">
                  {dataTabs.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-center w-1/4 font-medium text-base h-full text-center cursor-pointer capitalize hover:text-primary/90 duration-300 ${
                        activeTab === item.name
                          ? "border-b-2 border-primary text-primary"
                          : ""
                      }`}
                      onClick={() => handleChangTab(item.name)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
                {/* Content */}
                <div className="w-full"> {renderContent()}</div>
              </>
            )}
          </SectionLayout>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
