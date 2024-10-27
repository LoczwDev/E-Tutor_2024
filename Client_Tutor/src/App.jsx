import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import CoursesFilterPage from "./pages/coursesFilter/CoursesFilterPage";
import CoursesDetailPage from "./pages/coursesDetail/CoursesDetailPage";
import ProfilePage from "./pages/profile/ProfilePage";
import SettingPage from "./pages/setting/SettingPage";
import CheckOutSingle from "./pages/checkOut/CheckOutSingle";
import CourseAccessPage from "./pages/coursesAccess/CourseAccessPage";
import CategoryOutlet from "./pages/admin/category/CategoryOutlet";
import DashboardLayoutBasic from "./components/DashboardLayoutBasic";
import Testvideo from "./components/Testvideo";
import CheckOutCart from "./pages/checkOut/CheckOutCart";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import CartPage from "./pages/cart/CartPage";
import OverviewOutlet from "./pages/admin/overview/OverviewOutlet";
import CoursesOutlet from "./pages/admin/courses/CoursesOutlet";
import UsersOutlet from "./pages/admin/users/UsersOutlet";
import SalesOutlet from "./pages/admin/sales/SalesOutlet";
import OrdersOutlet from "./pages/admin/orders/OrdersOutlet";
import SettingsOutlet from "./pages/admin/settings/SettingsOutlet";
import AdminLayout from "./components/layouts/AdminLayout";
import CourseEditOutlet from "./pages/admin/courseEdit/CourseEditOutlet";
import TeacherProfilePage from "./pages/teacherProfile/TeacherProfilePage";
import MessagePage from "./pages/message/MessagePage";
import BannerOutlet from "./pages/admin/banner/BannerOutlet";

export default function App() {
  return (
    <div className="App text-gray9">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/teacher/:teacherId" element={<TeacherProfilePage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/test" element={<DashboardLayoutBasic />} />
        <Route path="/testVideo" element={<Testvideo />} />
        <Route path="/user-favorites" element={<FavoritesPage />} />
        <Route path="/user-cart" element={<CartPage />} />

        <Route path="/list-courses" element={<CoursesFilterPage />} />
        <Route path="/course/:courseId" element={<CoursesDetailPage />} />
        <Route path="/checkout/:courseId" element={<CheckOutSingle />} />
        <Route path="/checkout/cart" element={<CheckOutCart />} />
        <Route path="/course-access/:courseId" element={<CourseAccessPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<OverviewOutlet />} />
          <Route path="manager-courses" element={<CoursesOutlet />} />
          <Route
            path="manager-course/edit/:courseId"
            element={<CourseEditOutlet />}
          />
          <Route path="manager-users" element={<UsersOutlet />} />
          <Route path="manager-category" element={<CategoryOutlet />} />
          <Route path="manager-banner" element={<BannerOutlet />} />
          <Route path="manager-sales" element={<SalesOutlet />} />
          <Route path="manager-orders" element={<OrdersOutlet />} />
          <Route path="manager-analytics" element={<OrdersOutlet />} />
          <Route path="manager-settings" element={<SettingsOutlet />} />
          <Route
            path="/admintest/manager-settings"
            element={<SettingsOutlet />}
          />
        </Route>
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="setup-create-course" element={<SetUpAICourse />} />
          <Route path="course/edit/:courseId" element={<CreateCourse />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="categories" element={<CategoryOutlet />} />
          <Route path="banner" element={<BannerOutlet />} />
          <Route path="earning" element={<Earning />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route> */}
      </Routes>
    </div>
  );
}
