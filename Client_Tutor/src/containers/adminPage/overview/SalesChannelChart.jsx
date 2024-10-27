import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

// Hàm định dạng giá
const formatCurrencyAdmin = (amount) => {
  if (amount >= 1e12) {
    return (amount / 1e12).toFixed(1) + "T";
  } else if (amount >= 1e9) {
    return (amount / 1e9).toFixed(1) + "B";
  } else if (amount >= 1e6) {
    return (amount / 1e6).toFixed(1) + "M";
  } else if (amount >= 1e3) {
    return (amount / 1e3).toFixed(1) + "K";
  }
  return amount.toString(); // Nếu giá nhỏ hơn 1000
};

const SalesChannelChart = ({ data }) => {
  console.log(data);

  // Chuyển đổi dữ liệu thành mảng
  const dataChart = Object.entries(data?.totalPaymentsByCategory).map(
    ([name, value]) => ({
      name,
      value, // Lưu giá trị gốc để sử dụng trong YAxis
    })
  );

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray9">
        Tổng thanh toán theo danh mục
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={dataChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis
              stroke="#9CA3AF"
              tickFormatter={(value) => formatCurrencyAdmin(value)} // Định dạng giá trị y-axis
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                // borderColor: "#FF6636",
                color: "#fff",
              }}
              itemStyle={{ color: "#E34444", fontWeight: 600 }}
              formatter={(value) => [formatCurrencyAdmin(value), "VND"]} // Định dạng cho tooltip
            />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {dataChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesChannelChart;
