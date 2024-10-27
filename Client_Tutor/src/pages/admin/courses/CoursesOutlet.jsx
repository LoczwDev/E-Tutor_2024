import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import HeaderAdmin from "../../../components/common/HeaderAdmin";
import CoursesTable from "../../../containers/adminPage/coursesMannager/CoursesTable";
import SalesTrendChart from "../../../containers/adminPage/coursesMannager/SalesTrendChart";
import CategoryDistributionChart from "../../../containers/adminPage/overview/CategoryDistributionChart";
import StatCard from "../../../components/common/StateCard";
import { useState } from "react";
import SetUpAICourse from "../../../containers/adminPage/createCourse/setupAICreateCourse/SetUpAICourse";

const CoursesOutlet = () => {
  const [checkCreateCourses, setCheckCreateCourses] = useState(false);

  return (
    <main className="relative max-w-7xl mx-auto py-6 px-4 lg:px-8">
      <motion.div
        className="inset-0 !will-change-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          checkCreateCourses
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
        style={{
          display: checkCreateCourses ? "block" : "none",
          // willChange: "auto",
        }}
      >
        <SetUpAICourse
          checkCreateCourses={checkCreateCourses}
          setCheckCreateCourses={setCheckCreateCourses}
        />
      </motion.div>

      <motion.div
        className="w-full !will-change-auto"
        initial={{ opacity: 1 }}
        animate={checkCreateCourses ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ display: checkCreateCourses ? "none" : "block" }}
      >
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <StatCard
            name="Total Products"
            icon={Package}
            value={1234}
            color="#6366F1"
          />
          <StatCard
            name="Top Selling"
            icon={TrendingUp}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Low Stock"
            icon={AlertTriangle}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={"$543,210"}
            color="#EF4444"
          />
        </motion.div>

        <CoursesTable
          setCheckCreateCourses={setCheckCreateCourses}
          checkCreateCourses={checkCreateCourses}
        />
      </motion.div>
    </main>
  );
};

export default CoursesOutlet;
