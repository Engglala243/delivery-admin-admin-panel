import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, deleteCategory } from '../../redux/slices/categorySlice';
import CategoryForm from '../../components/inventory/CategoryForm';
import CategoryTable from '../../components/inventory/CategoryTable';
import Modal from '../../components/common/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Categories = () => {
  const dispatch = useDispatch();
  const { items: categories, isLoading } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreate = async (data) => {
    try {
      await dispatch(createCategory(data)).unwrap();
      toast.success('Category created successfully!');
      setShowModal(false);
    } catch (error) {
      // Error handled by Redux
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        toast.success('Category deleted successfully!');
      } catch (error) {
        // Error handled by Redux
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <CategoryTable
          categories={categories}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Categories;