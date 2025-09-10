import React, { useState, useEffect } from 'react';
import Modal from './ui/Modal';
import Button from './ui/Button';
import Input from './ui/Input';
import { Save } from 'lucide-react';

const categories = [
  "Electronics", "Clothing", "Books", "Home & Garden", 
  "Sports", "Beauty", "Toys", "Automotive","Food" ,"Furniture","Grocery","Footwear","Other"
];

export default function ProductForm({ product, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || ''
      });
    } else {
      setFormData({ name: '', price: '', description: '', category: '' });
    }
    setErrors({});
  }, [product, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave({ id: product?._id, ...formData, price: parseFloat(formData.price) });
    } catch (error) {
      console.error('Error saving product:', error);
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onCancel}
      title={product ? 'Edit Product' : 'Add New Product'}
    >
      <form onSubmit={handleSubmit} className="form-container">
        
        {/* Product Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Product Name *</label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter product name"
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">Price *</label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="0.00"
            className={`form-input ${errors.price ? 'error' : ''}`}
          />
          {errors.price && <p className="error-text">{errors.price}</p>}
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">Category *</label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`form-input ${errors.category ? 'error' : ''}`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="error-text">{errors.category}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter product description (optional)"
            className="form-textarea"
          />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="btn-cancel"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="btn-save"
            disabled={isSubmitting}
          >
            <Save className="w-5 h-5 mr-2 inline-block" />
            {isSubmitting ? 'Saving...' : (product ? 'Update' : 'Save')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
