import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import Dashboard from './components/Dashboard';
import MenuBar from "./components/MenuBar";
import { useAuth } from "./components/AuthProvider";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');  // redirect to login page
    }
  }, [user, navigate]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <UserManagement />;
      case "roles":
        return <RoleManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar for large screens */}
        <div className={`hidden lg:block mt-4 h-screen transition-all duration-300 bg-white ${showSidebar ? 'w-[10%] p-4' : 'w-0'}`}>
          <SideBar setActiveTab={setActiveTab} showSidebar={showSidebar} />
        </div>

        {/* MenuBar for small screens */}
        <div className="block lg:hidden">
          <MenuBar setActiveTab={setActiveTab} />
        </div>

        {/* Main content area */}
        <div className={`flex-grow transition-all duration-300 ${showSidebar ? 'lg:w-[90%]' : 'w-full'}`}>
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
