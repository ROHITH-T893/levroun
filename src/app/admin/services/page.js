// src/app/admin/services/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ServicesForm from '@/components/admin/ServicesForm';
import styles from '@/styles/admin.module.css';

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const userSession = localStorage.getItem('admin_session');
      if (!userSession) {
        router.push('/admin/login');
        return;
      }

      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        
        const data = await response.json();
        setServices(data.services || []);
      } catch (err) {
        setError('Failed to load services');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSave =   async (formData) => {
    try {
      if (editingId) {
        // Update existing service
        const response = await fetch(`/api/services/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setServices(services.map(s => 
            s.$id === editingId ? { ...s, ...formData } : s
          ));
          setEditingId(null);
        }
      } else {
        // Create new service
        const response = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const data = await response.json();
          setServices([...services, data.service]);
        }
      }
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleDelete = async (serviceId) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setServices(services.filter(s => s.$id !== serviceId));
      }
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      
      <main className={styles.adminMain}>
        <div className={styles.adminHeader}>
          <h1>Services Management</h1>
          <p>Create, edit, and manage your services</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginBottom: '30px' }}>
          <div>
            <h2 style={{ color: '#060134', marginTop: 0 }}>Add New Service</h2>
            <ServicesForm 
              onSave={handleSave} 
              onCancel={() => setEditingId(null)}
              initialData={editingId ? services.find(s => s.$id === editingId) : null}
            />
          </div>

          <div>
            <h2 style={{ color: '#060134', marginTop: 0 }}>Services List</h2>
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : services.length === 0 ? (
              <p>No services yet. Create your first service!</p>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {services.map(service => (
                  <div key={service.$id} style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #1AC2FF',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h3 style={{ margin: '0 0 5px 0', color: '#060134' }}>
                          {service.icon} {service.title}
                        </h3>
                        <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>
                          {service.description}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button 
                          onClick={() => setEditingId(service.$id)}
                          style={{
                            background: '#1AC2FF',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(service.$id)}
                          style={{
                            background: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
