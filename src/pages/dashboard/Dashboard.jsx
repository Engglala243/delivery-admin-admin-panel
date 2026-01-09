import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '../../redux/slices/dashboardSlice';
import StatCard from '../../components/dashboard/StatCard';
import RecentOrders from '../../components/dashboard/RecentOrders';
import {
  UsersIcon,
  CubeIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ClipboardDocumentListIcon,
      color: 'bg-black',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'bg-black',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: CubeIcon,
      color: 'bg-black',
    },
    {
      title: 'Total Drivers',
      value: stats.totalDrivers,
      icon: TruckIcon,
      color: 'bg-black',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-300">
        <div className="px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg font-medium text-black">Recent Orders</h2>
        </div>
        <RecentOrders orders={stats.recentOrders} />
      </div>
    </div>
  );
};

export default Dashboard;