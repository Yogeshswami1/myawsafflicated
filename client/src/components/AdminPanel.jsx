import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    inStock: true,
    dealScore: '',
    rating: '',
    affiliateLinks: [{ name: '', url: '' }],
    tags: [],
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setMessage('Error fetching products: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('brand', formData.brand);
    data.append('price', formData.price);
    data.append('inStock', formData.inStock);
    data.append('dealScore', formData.dealScore);
    data.append('rating', formData.rating);
    data.append('affiliateLinks', JSON.stringify(formData.affiliateLinks));
    data.append('tags', JSON.stringify(formData.tags));
    if (image) {
      data.append('image', image);
    }

    try {
      if (editingProduct) {
        const response = await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          data,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setProducts(products.map((p) => (p._id === editingProduct._id ? response.data : p)));
        setMessage('Product updated successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProducts([...products, response.data]);
        setMessage('Product added successfully!');
        window.dispatchEvent(new Event('productAdded'));
      }
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
      console.error('Error submitting product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      setMessage('Product deleted successfully!');
      window.dispatchEvent(new Event('productAdded'));
    } catch (err) {
      setMessage('Error deleting product: ' + err.message);
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    console.log('Opening edit modal for product:', product);
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || '',
      brand: product.brand || '',
      price: product.price || '',
      inStock: product.inStock || false,
      dealScore: product.dealScore || '',
      rating: product.rating || '',
      affiliateLinks: product.affiliateLinks && Array.isArray(product.affiliateLinks)
        ? product.affiliateLinks
        : [{ name: '', url: '' }],
      tags: product.tags && Array.isArray(product.tags) ? product.tags : [],
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      brand: '',
      price: '',
      inStock: true,
      dealScore: '',
      rating: '',
      affiliateLinks: [{ name: '', url: '' }],
      tags: [],
    });
    setImage(null);
    setEditingProduct(null);
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAffiliateLinkChange = (index, field, value) => {
    const newAffiliateLinks = [...formData.affiliateLinks];
    newAffiliateLinks[index][field] = value;
    setFormData((prev) => ({ ...prev, affiliateLinks: newAffiliateLinks }));
  };

  const addAffiliateLink = () => {
    setFormData((prev) => ({
      ...prev,
      affiliateLinks: [...prev.affiliateLinks, { name: '', url: '' }],
    }));
  };

  const removeAffiliateLink = (index) => {
    setFormData((prev) => ({
      ...prev,
      affiliateLinks: prev.affiliateLinks.filter((_, i) => i !== index),
    }));
  };

  const handleOpenModal = () => {
    console.log('Opening add product modal');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div>
      {message && <p className={styles.message}>{message}</p>}

      <Button type="primary" onClick={handleOpenModal} disabled={loading}>
        Add Product
      </Button>

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        centered
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>In Stock</label>
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Deal Score (0-10)</label>
            <input
              type="number"
              name="dealScore"
              value={formData.dealScore}
              onChange={handleInputChange}
              min="0"
              max="10"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Rating (0-5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.1"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Affiliate Links</label>
            {formData.affiliateLinks && Array.isArray(formData.affiliateLinks) ? (
              formData.affiliateLinks.map((link, index) => (
                <div key={index} className={styles.affiliateLink}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={link.name || ''}
                    onChange={(e) => handleAffiliateLinkChange(index, 'name', e.target.value)}
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={link.url || ''}
                    onChange={(e) => handleAffiliateLinkChange(index, 'url', e.target.value)}
                    disabled={loading}
                  />
                  <Button
                    type="danger"
                    onClick={() => removeAffiliateLink(index)}
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p>No affiliate links available.</p>
            )}
            <Button type="dashed" onClick={addAffiliateLink} disabled={loading}>
              Add Affiliate Link
            </Button>
          </div>

          <div className={styles.formGroup}>
            <label>Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value.split(',').map((tag) => tag.trim()),
                }))
              }
              disabled={loading}
            />
          </div>

          <div className={styles.formActions}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
            <Button onClick={handleCloseModal} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <div className={styles.productList}>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className={styles.productItem}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Brand: {product.brand}</p>
              <p>Price: ${product.price}</p>
              <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
              <Button
                type="primary"
                onClick={() => handleEdit(product)}
                disabled={loading}
                style={{ marginRight: '10px' }}
              >
                Edit
              </Button>
              <Button type="danger" onClick={() => handleDelete(product._id)} disabled={loading}>
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;