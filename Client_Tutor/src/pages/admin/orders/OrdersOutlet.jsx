import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import HeaderAdmin from "../../../components/common/HeaderAdmin";
import StatCard from "../../../components/common/StateCard";
import DailyOrders from "../../../containers/adminPage/ordersManager/DailyOrders";
import OrderDistribution from "../../../containers/adminPage/ordersManager/OrderDistribution";
import OrdersTable from "../../../containers/adminPage/ordersManager/OrdersTable";

const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completedOrders: "1,178",
  totalRevenue: "$98,765",
};

const OrdersOutlet = () => {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          name="Total Orders"
          icon={ShoppingBag}
          value={orderStats.totalOrders}
          color="#6366F1"
        />
        <StatCard
          name="Pending Orders"
          icon={Clock}
          value={orderStats.pendingOrders}
          color="#F59E0B"
        />
        <StatCard
          name="Completed Orders"
          icon={CheckCircle}
          value={orderStats.completedOrders}
          color="#10B981"
        />
        <StatCard
          name="Total Revenue"
          icon={DollarSign}
          value={orderStats.totalRevenue}
          color="#EF4444"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DailyOrders />
        <OrderDistribution />
      </div>

      <OrdersTable />
    </main>
  );
};
export default OrdersOutlet;
