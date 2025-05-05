// components/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaChartLine, FaUsers, FaExchangeAlt, 
  FaWallet, FaFileAlt, FaCog, FaBars, FaTimes 
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: <FaChartLine />, title: 'Dashboard' },
    { path: '/admin/users', icon: <FaUsers />, title: 'Users' },
    { path: '/admin/transactions', icon: <FaExchangeAlt />, title: 'Transactions' },
    { path: '/admin/budgets', icon: <FaWallet />, title: 'Budgets' },
    { path: '/admin/reports', icon: <FaFileAlt />, title: 'Reports' },
    { path: '/admin/settings', icon: <FaCog />, title: 'Settings' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="flex items-center justify-between px-4">
          <div className="text-2xl font-semibold">Admin Panel</div>
          <button onClick={toggleSidebar} className="md:hidden">
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-10">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
            >
              <div className="mr-3">{item.icon}</div>
              <div>{item.title}</div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-md py-4 px-4">
          <div className="flex items-center justify-between">
            <button onClick={toggleSidebar} className="md:hidden">
              <FaBars className="h-6 w-6" />
            </button>
            <div className="text-xl font-semibold">Expense Tracker Admin</div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-600">Admin User</div>
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;