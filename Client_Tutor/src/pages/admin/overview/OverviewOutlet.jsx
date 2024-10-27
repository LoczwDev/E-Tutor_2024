import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../../../components/common/StateCard";
import SalesOverviewChart from "../../../containers/adminPage/overview/SalesOverviewChart";
import CategoryDistributionChart from "../../../containers/adminPage/overview/CategoryDistributionChart";
import { useEffect, useState } from "react";
import SalesChannelChart from "../../../containers/adminPage/overview/SalesChannelChart";
import { usegetOverviewAnalytics } from "../../../hooks/useAnalytics";
import Loading from "../../../components/loader/Loading";

const formatCurrencyAdmin = (amount) => {
  if (amount >= 1e12) {
    // 1 tỷ
    return (amount / 1e12).toFixed(1) + "T";
  } else if (amount >= 1e9) {
    // 1 triệu
    return (amount / 1e9).toFixed(1) + "B";
  } else if (amount >= 1e6) {
    // 1 triệu
    return (amount / 1e6).toFixed(1) + "M";
  } else if (amount >= 1e3) {
    // 1 ngàn
    return (amount / 1e3).toFixed(1) + "K";
  }
  return amount.toString(); // Nếu giá nhỏ hơn 1000
};

const OverviewOutlet = () => {
  const { data, isLoading } = usegetOverviewAnalytics();
  const [dataOverview, setDataOverview] = useState(null);

  // Cập nhật khi data sẵn sàng
  useEffect(() => {
    if (data && !isLoading) {
      setDataOverview(data?.data);
    }
  }, [data, isLoading]);

  const stats = [
    {
      name: "Tổng doanh thu",
      icon: Zap,
      price: dataOverview?.totalAmount || 0,
      value: dataOverview
        ? formatCurrencyAdmin(dataOverview?.totalAmount) || "0 VND"
        : "0 VND", // Xử lý khi dữ liệu chưa sẵn sàng
      color: "#6366F1",
    },
    {
      name: "Tổng tài khoản",
      icon: Users,
      value: dataOverview ? dataOverview?.totalUsers || "0" : "0",
      color: "#8B5CF6",
    },
    {
      name: "Tổng khoá học",
      icon: ShoppingBag,
      value: dataOverview ? dataOverview?.totalCourses || "0" : "0",
      color: "#EC4899",
    },
    {
      name: "Tổng danh mục",
      icon: BarChart2,
      value: dataOverview ? dataOverview?.totalCategories || "0" : "0",
      color: "#10B981",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      {/* STATS */}
      {isLoading ? (
        <div className="relative w-full flex items-center justify-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Duyệt qua từng phần tử stats và render StatCard */}
            {stats.map((item, index) => (
              <StatCard
                key={index}
                price={item.price}
                name={item.name}
                icon={item.icon}
                value={item.value}
                color={item.color}
              />
            ))}
          </motion.div>

          {/* CHARTS */}
          {!isLoading && dataOverview && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SalesOverviewChart data={dataOverview} />
              <CategoryDistributionChart data={dataOverview} />
              <SalesChannelChart data={dataOverview} />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default OverviewOutlet;
