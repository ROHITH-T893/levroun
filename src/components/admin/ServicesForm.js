// src/components/admin/ServicesForm.js
'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/admin-forms.module.css';

export default function ServicesForm({ onSave, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '⚙️',
    order: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave(formData);
      setFormData({
        title: '',
        description: '',
        icon: '⚙️',
        order: 0
      });
    } catch (error) {
      console.error('Form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Service Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Web Development"
          required
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe this service..."
          rows={4}
          required
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="icon">Emoji Icon</label>
        <input
          type="text"
          id="icon"
          name="icon"
          value={formData.icon}
          onChange={handleChange}
          placeholder="🌐"
          maxLength="2"
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="order">Order</label>
        <input
          type="number"
          id="order"
          name="order"
          value={formData.order}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className={styles.formButtons}>
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? 'Saving...' : 'Save Service'}
        </button>
        {initialData && (
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={loading}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
