import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/slices/uiSlice';
import {
  HomeIcon,
  TagIcon,
  CubeIcon,
  UsersIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Categories', href: '/categories', icon: TagIcon },
    { name: 'Products', href: '/products', icon: CubeIcon },
    { name: 'Users', href: '/users', icon: UsersIcon },
    { name: 'Drivers', href: '/drivers', icon: TruckIcon },
    { name: 'Orders', href: '/orders', icon: ClipboardDocumentListIcon },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 ${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <h1 className={`font-bold text-xl text-gray-800 ${!sidebarOpen && 'hidden'}`}>
          Admin Panel
        </h1>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : ''
                }`
              }
            >
              <Icon className="h-6 w-6" />
              <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;