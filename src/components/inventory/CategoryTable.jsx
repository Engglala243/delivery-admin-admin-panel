import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const CategoryTable = ({ categories, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No categories found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {categories.map((category) => (
            <tr key={category._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                {category.image ? (
                  <img
                    src={`https://delivery-admin-server.onrender.com${category.image}`}
                    alt={category.name}
                    className="h-10 w-10 rounded-lg object-cover border border-gray-300"
                    onError={(e) => {
                      console.log("Image failed:", e.target.src);
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                    <span className="text-gray-600 text-xs">No Image</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-black">
                  {category.name}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-600 max-w-xs truncate">
                  {category.description || "No description"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                    category.isActive
                      ? "bg-white text-black border-black"
                      : "bg-black text-white border-black"
                  }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-black hover:text-gray-600 border border-gray-300 rounded p-1 hover:border-black"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(category._id)}
                    className="text-black hover:text-gray-600 border border-gray-300 rounded p-1 hover:border-black"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
