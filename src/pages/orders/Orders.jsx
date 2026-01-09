import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../redux/slices/orderSlice';
import Modal from '../../components/common/Modal';
import OrderTable from '../../components/orders/OrderTable';
import OrderDetails from '../../components/orders/OrderDetails';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Orders Management</h1>
        <div className="flex items-center space-x-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-white border border-black text-black px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <OrderTable
        orders={filteredOrders}
        loading={loading}
        onView={handleViewOrder}
        onStatusUpdate={handleStatusUpdate}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Order Details"
        size="large"
      >
        {selectedOrder && (
          <OrderDetails
            order={selectedOrder}
            onClose={handleCloseModal}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default Orders;