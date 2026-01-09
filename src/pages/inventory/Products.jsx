import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../redux/slices/productSlice';
import { fetchCategories } from '../../redux/slices/categorySlice';
import ProductForm from '../../components/inventory/ProductForm';
import ProductTable from '../../components/inventory/ProductTable';
import Modal from '../../components/common/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products, isLoading } = useSelector((state) => state.products);
  const { items: categories } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreate = async (data) => {
    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct._id, data })).unwrap();
        toast.success('Product updated successfully!');
      } else {
        await dispatch(createProduct(data)).unwrap();
        toast.success('Product created successfully!');
      }
      setShowModal(false);
      setEditingProduct(null);
    } catch (error) {
      // Error handled by Redux
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await dispatch(deleteProduct(product._id)).unwrap();
        toast.success('Product deleted successfully!');
      } catch (error) {
        // Error handled by Redux
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <ProductTable
          products={products}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={handleCreate}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Products;