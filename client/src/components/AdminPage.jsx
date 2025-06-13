import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    inStock: false,
    dealScore: '',
    rating: '',
    affiliateLinks: [{ name: '', url: '' }],
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAffiliateLinkChange = (index, e) => {
    const { name, value } = e.target;
    const newAffiliateLinks = [...formData.affiliateLinks];
    newAffiliateLinks[index] = { ...newAffiliateLinks[index], [name]: value };
    setFormData({ ...formData, affiliateLinks: newAffiliateLinks });
  };

  const addAffiliateLink = () => {
    setFormData({
      ...formData,
      affiliateLinks: [...formData.affiliateLinks, { name: '', url: '' }],
    });
  };

  const removeAffiliateLink = (index) => {
    const newAffiliateLinks = formData.affiliateLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, affiliateLinks: newAffiliateLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('brand', formData.brand);
    data.append('price', formData.price);
    data.append('inStock', formData.inStock);
    data.append('dealScore', formData.dealScore);
    data.append('rating', formData.rating);
    data.append('affiliateLinks', JSON.stringify(formData.affiliateLinks));
    if (image) {
      data.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Product uploaded successfully!');
      // Reset form
      setFormData({
        name: '',
        category: '',
        brand: '',
        price: '',
        inStock: false,
        dealScore: '',
        rating: '',
        affiliateLinks: [{ name: '', url: '' }],
      });
      setImage(null);
    } catch (err) {
      setMessage('Error uploading product: ' + (err.response?.data?.message || err.message));
      console.error('Error uploading product:', err);
    }
  };

  return (
    <div className={styles.adminPage}>
      <h1>Add New Product</h1>
      {message && <div className={styles.message}>{message}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleImageChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="inStock">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dealScore">Deal Score</label>
          <input
            type="number"
            id="dealScore"
            name="dealScore"
            value={formData.dealScore}
            onChange={handleChange}
            step="0.1"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rating">Rating (out of 5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Affiliate Links</label>
          {formData.affiliateLinks.map((link, index) => (
            <div key={index} className={styles.affiliateLinkGroup}>
              <input
                type="text"
                name="name"
                placeholder="Store Name (e.g., Amazon)"
                value={link.name}
                onChange={(e) => handleAffiliateLinkChange(index, e)}
              />
              <input
                type="text"
                name="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleAffiliateLinkChange(index, e)}
              />
              <button
                type="button"
                onClick={() => removeAffiliateLink(index)}
                className={styles.removeLink}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addAffiliateLink} className={styles.addLink}>
            Add Another Link
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default AdminPage;