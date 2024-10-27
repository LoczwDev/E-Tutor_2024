import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetOrdersAnalytics } from "../../../hooks/useAnalytics";

const SalesOverviewChart = () => {
  const [salesData, setSalesData] = useState([]);

  const { data, isLoading } = useGetOrdersAnalytics();
  useEffect(() => {
    if (data?.orders?.last12Months) {
      const transformedData = data.orders.last12Months.map((item) => ({
        name: item.month,
        sales: item.count,
      }));
      setSalesData(transformedData);
    }
  }, [data]);

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray9">Đơn thanh toán</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey={"name"} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#23BD33"
              strokeWidth={3}
              dot={{ fill: "#23BD33", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
