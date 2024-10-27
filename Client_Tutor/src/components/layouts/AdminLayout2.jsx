import { Button, Layout } from "antd";
import React, { useState } from "react";
import images from "../../constants/images/images";
import MenuList from "./MenuList";
import { RiMenuFold2Fill, RiMenuUnfold2Fill } from "react-icons/ri";

const { Header, Sider } = Layout;

const AdminLayout2 = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="!text-gray5 h-screen max-w-[240px] min-w-[240px] !bg-gray9"
      >
        {/* Logo */}
        <div className="flex items-center py-5 border-b border-white/10 px-3">
          <div className="w-max">
            <div className="w-[120px] h-[32px]">
              <img
                src={images.LogoFooter}
                className="w-full h-full object-cover"
                alt="Logo"
              />
            </div>
          </div>
        </div>
        {/* Menu */}
        <MenuList />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: "#fff", padding: "0" }}>
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <RiMenuUnfold2Fill /> : <RiMenuFold2Fill />}
          />
        </Header>
      </Layout>
    </Layout>
  );
};

export default AdminLayout2;
