import React, { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionManagement from "./components/PermissionManagement";
import Dashboard from './components/Dashboard';
import MenuBar from "./components/MenuBar";

const Body = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UserManagement />;
      case "roles":
        return <RoleManagement />;
      case "permissions":
        return <PermissionManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className={`hidden lg:block my-4 gap-4 h-screen transition-all duration-300 bg-white ${showSidebar ? 'w-[8%]' : 'w-0'}`}>
          <SideBar setActiveTab={setActiveTab} showSidebar={showSidebar} />
        </div>
        
        <div className="block lg:hidden">
          <MenuBar setActiveTab={setActiveTab}/>
        </div>

        <div className={`flex-grow transition-all duration-300 ${showSidebar ? 'w-[92%]' : 'w-full'}`}>
          <Header toggleSidebar={() => setShowSidebar(!showSidebar)} showSidebar={showSidebar} />
          <div className="bg-gray-100 pt-20">
            {renderActiveTab()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Body;
