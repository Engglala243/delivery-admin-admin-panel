import React from 'react';

const OrderDetails = ({ order, onClose, onStatusUpdate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-black">Order #{order.orderNumber}</h2>
          <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-white text-black border border-black">
          {order.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Customer Information */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <h3 className="text-lg font-semibold text-black mb-3">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-black">{order.user?.name || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-black">{order.user?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-black">{order.user?.phone || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <h3 className="text-lg font-semibold text-black mb-3">Delivery Address</h3>
        <div className="text-black">
          {order.deliveryAddress ? (
            <div>
              <p>{order.deliveryAddress.street}</p>
              <p>{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
            </div>
          ) : (
            <p>No delivery address provided</p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-3">Order Items</h3>
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-black uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {order.items?.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-black">
                      {item.product?.name || 'Unknown Product'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-black">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm text-black">${item.price?.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-black">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-black">Total Amount</span>
          <span className="text-xl font-bold text-black">${order.totalAmount?.toFixed(2)}</span>
        </div>
      </div>

      {/* Driver Information */}
      {order.driver && (
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold text-black mb-3">Assigned Driver</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium text-black">{order.driver.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-black">{order.driver.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Vehicle</p>
              <p className="font-medium text-black">
                {order.driver.vehicleInfo?.type} - {order.driver.vehicleInfo?.model}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Plate Number</p>
              <p className="font-medium text-black">{order.driver.vehicleInfo?.plateNumber}</p>
            </div>
          </div>
        </div>
      )}

      {/* Status Update */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <h3 className="text-lg font-semibold text-black mb-3">Update Status</h3>
        <select
          value={order.status}
          onChange={(e) => onStatusUpdate(order._id, e.target.value)}
          className="input-field"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Delivery Information */}
      {order.deliveredAt && (
        <div className="bg-white p-4 rounded-lg border border-black">
          <h3 className="text-lg font-semibold text-black mb-2">Delivery Completed</h3>
          <p className="text-black">Delivered on {formatDate(order.deliveredAt)}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;