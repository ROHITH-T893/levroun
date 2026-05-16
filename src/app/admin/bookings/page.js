// src/app/admin/bookings/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import BookingsTable from '@/components/admin/BookingsTable';
import styles from '@/styles/admin.module.css';

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const checkAuth = async () => {
      const userSession = localStorage.getItem('admin_session');
      if (!userSession) {
        router.push('/admin/login');
        return;
      }

      try {
        const response = await fetch('/api/leads');
        if (!response.ok) throw new Error('Failed to fetch leads');
        
        const data = await response.json();
        setBookings(data.leads || []);
      } catch (err) {
        setError('Failed to load bookings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const filteredBookings = bookings.filter(b => {
    if (activeFilter === 'all') return true;
    return b.status === activeFilter;
  });

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`/api/leads/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setBookings(bookings.map(b => 
          b.$id === bookingId ? { ...b, status: newStatus } : b
        ));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      
      <main className={styles.adminMain}>
        <div className={styles.adminHeader}>
          <h1>Bookings & Leads</h1>
          <p>Manage all customer inquiries and bookings</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.filterButtons}>
          <button 
            className={activeFilter === 'all' ? styles.active : ''} 
            onClick={() => setActiveFilter('all')}
          >
            All ({bookings.length})
          </button>
          <button 
            className={activeFilter === 'pending' ? styles.active : ''} 
            onClick={() => setActiveFilter('pending')}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button 
            className={activeFilter === 'confirmed' ? styles.active : ''} 
            onClick={() => setActiveFilter('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button 
            className={activeFilter === 'completed' ? styles.active : ''} 
            onClick={() => setActiveFilter('completed')}
          >
            Completed ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading bookings...</div>
        ) : (
          <BookingsTable 
            bookings={filteredBookings} 
            onStatusChange={handleStatusChange}
            isLoading={loading}
          />
        )}
      </main>
    </div>
  );
}
