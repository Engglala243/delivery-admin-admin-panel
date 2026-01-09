import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center border border-black rounded-lg p-8">
        <h1 className="text-6xl font-bold text-black mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/dashboard"
          className="btn-primary"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;