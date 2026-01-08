import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrivers, deleteDriver } from '../../redux/slices/driverSlice';
import Modal from '../../components/common/Modal';
import DriverForm from '../../components/drivers/DriverForm';
import DriverTable from '../../components/drivers/DriverTable';

const Drivers = () => {
  const dispatch = useDispatch();
  const { drivers, loading, error } = useSelector(state => state.drivers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const handleAddDriver = () => {
    setEditingDriver(null);
    setIsModalOpen(true);
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setIsModalOpen(true);
  };

  const handleDeleteDriver = (driverId) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      dispatch(deleteDriver(driverId));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDriver(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Drivers Management</h1>
        <button
          onClick={handleAddDriver}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Driver
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <DriverTable
        drivers={drivers}
        loading={loading}
        onEdit={handleEditDriver}
        onDelete={handleDeleteDriver}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingDriver ? 'Edit Driver' : 'Add Driver'}
      >
        <DriverForm
          driver={editingDriver}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Drivers;