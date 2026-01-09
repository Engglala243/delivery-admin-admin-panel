import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';

const ProductTable = ({ products, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found</p>
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
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Stock
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
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex-shrink-0 h-16 w-16">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img
                        className="h-16 w-16 rounded-lg object-cover border border-gray-300"
                        src={getImageUrl(product.images[0])}
                        alt={product.name}
                        onError={handleImageError}
                      />
                      <div className="hidden h-16 w-16 bg-gray-200 rounded-lg items-center justify-center border border-gray-300">
                        <span className="text-gray-600 text-xs">No Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                      <span className="text-gray-600 text-xs">No Image</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-black">{product.name}</div>
                <div className="text-sm text-gray-600 truncate max-w-xs">
                  {product.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-black">
                  {product.category?.name || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-black">
                  ${product.price?.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-black">{product.stock}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                  product.isActive ? 'bg-white text-black border-black' : 'bg-black text-white border-black'
                }`}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-black hover:text-gray-600 border border-gray-300 rounded p-1 hover:border-black"
                    title="Edit Product"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="text-black hover:text-gray-600 border border-gray-300 rounded p-1 hover:border-black"
                    title="Delete Product"
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

export default ProductTable;