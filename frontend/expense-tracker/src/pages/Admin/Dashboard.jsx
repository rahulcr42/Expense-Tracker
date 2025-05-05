  // pages/admin/Dashboard.jsx
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { API_PATHS } from '../../utils/apiPaths';
  import { FaUsers, FaMoneyBillWave, FaReceipt, FaChartLine } from 'react-icons/fa';

  const StatCard = ({ title, value, icon, bgColor }) => (
    <div className={`${bgColor} rounded-lg shadow-lg p-6 flex items-center`}>
      <div className="rounded-full p-3 bg-white bg-opacity-30 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-opacity-80 text-sm">{title}</h3>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  const TransactionItem = ({ transaction }) => {
    // Determine if it's income or expense
    const isIncome = transaction.type === 'income';
    
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className={`rounded-full p-2 mr-3 ${isIncome ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
            {isIncome ? <FaMoneyBillWave /> : <FaReceipt />}
          </div>
          <div>
            <p className="font-medium">{transaction.title}</p>
            <p className="text-xs text-gray-500">{transaction.date}</p>
          </div>
        </div>
        <div className={`font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
          {isIncome ? '+' : '-'}${transaction.amount}
        </div>
      </div>
    );
  };

  const AdminDashboard = () => {
    const [stats, setStats] = useState({
      totalUsers: 0,
      totalIncome: 0,
      totalExpenses: 0,
      activeBudgets: 0
    });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchDashboardData = async () => {
        try {
          setLoading(true);
          
          // Fetch dashboard statistics
          const statsResponse = await axios.get(API_PATHS.ADMIN.DASHBOARD_STATS);
          
          // Fetch recent transactions
          const transactionsResponse = await axios.get(API_PATHS.ADMIN.RECENT_TRANSACTIONS);
          
          setStats(statsResponse.data);
          setRecentTransactions(transactionsResponse.data);
        } catch (error) {
          console.error('Error fetching admin dashboard data:', error);
          setError('Failed to load dashboard data');
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardData();
    }, []);

    if (loading) {
      return <div className="flex justify-center items-center h-64">Loading dashboard data...</div>;
    }

    if (error) {
      return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
    }

    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={<FaUsers className="text-white" size={20} />} 
            bgColor="bg-blue-500" 
          />
          <StatCard 
            title="Total Income" 
            value={`$${stats.totalIncome.toLocaleString()}`} 
            icon={<FaMoneyBillWave className="text-white" size={20} />} 
            bgColor="bg-green-500" 
          />
          <StatCard 
            title="Total Expenses" 
            value={`$${stats.totalExpenses.toLocaleString()}`} 
            icon={<FaReceipt className="text-white" size={20} />} 
            bgColor="bg-red-500" 
          />
          <StatCard 
            title="Active Budgets" 
            value={stats.activeBudgets} 
            icon={<FaChartLine className="text-white" size={20} />} 
            bgColor="bg-purple-500" 
          />
        </div>
        
        {/* Recent Transactions Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <button className="text-blue-500 text-sm hover:underline">
              View All
            </button>
          </div>
          
          <div className="space-y-2">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <TransactionItem key={transaction._id} transaction={transaction} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent transactions found</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default AdminDashboard;