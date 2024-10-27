import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBarAdmin from "../common/SideBarAdmin";
import HeaderAdmin from "../common/HeaderAdmin";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-white text-gray9 overflow-hidden">
      <SideBarAdmin />
      <div className="flex-1 bg-background bg-gray overflow-auto relative z-10 scrollbar-thin">
        <div className="w-full sticky top-0 z-[100]">
          <HeaderAdmin />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
