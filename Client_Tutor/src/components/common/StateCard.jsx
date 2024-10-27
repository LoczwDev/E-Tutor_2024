import { motion } from "framer-motion";
import { formatCurrency } from "../../hooks/formatCurrency";

const StatCard = ({ name, icon: Icon, value, color, price }) => {
  return (
    <motion.div
      className="bg-white backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray1"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-gray9">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold text-gray6">
          {value} <span className="text-xs">{price ? `(${formatCurrency(price)})` : ""}</span>
        </p>
      </div>
    </motion.div>
  );
};
export default StatCard;
