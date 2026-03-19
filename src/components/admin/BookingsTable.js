// src/components/admin/BookingsTable.js
'use client';

import { useState } from 'react';
import styles from '@/styles/admin-table.module.css';

export default function BookingsTable({ bookings, onStatusChange, isLoading }) {
  const [expandedId, setExpandedId] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!bookings.length) {
    return (
      <div className={styles.emptyState}>
        <p>No bookings found</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.$id} className={styles.tableRow}>
              <td>
                <strong>{booking.firstName} {booking.lastName}</strong>
              </td>
              <td>
                <a href={`mailto:${booking.email}`}>{booking.email}</a>
              </td>
              <td>{booking.service_requested || 'General'}</td>
              <td>{formatDate(booking.created_at)}</td>
              <td>
                <span className={`${styles.statusBadge} ${styles[booking.status]}`}>
                  {booking.status}
                </span>
              </td>
              <td>
                <button
                  className={styles.expandBtn}
                  onClick={() => setExpandedId(expandedId === booking.$id ? null : booking.$id)}
                >
                  {expandedId === booking.$id ? '−' : '+'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {expandedId && (
        <div className={styles.expandedRow}>
          {bookings.map(booking => 
            booking.$id === expandedId && (
              <div key={`expanded-${booking.$id}`} className={styles.expandedContent}>
                <div className={styles.expandedHeader}>
                  <h3>{booking.firstName} {booking.lastName}</h3>
                  <button 
                    className={styles.closeBtn}
                    onClick={() => setExpandedId(null)}
                  >
                    ✕
                  </button>
                </div>

                <div className={styles.expandedBody}>
                  <div className={styles.detailGroup}>
                    <label>Message:</label>
                    <p>{booking.message}</p>
                  </div>

                  <div className={styles.detailGroup}>
                    <label>Phone:</label>
                    <p>{booking.phone || 'Not provided'}</p>
                  </div>

                  <div className={styles.detailGroup}>
                    <label>Preferred Date:</label>
                    <p>{booking.preferred_date || 'Not specified'}</p>
                  </div>

                  <div className={styles.statusUpdateGroup}>
                    <label>Update Status:</label>
                    <div className={styles.statusButtons}>
                      <button
                        className={booking.status === 'pending' ? styles.active : ''}
                        onClick={() => onStatusChange(booking.$id, 'pending')}
                      >
                        Pending
                      </button>
                      <button
                        className={booking.status === 'confirmed' ? styles.active : ''}
                        onClick={() => onStatusChange(booking.$id, 'confirmed')}
                      >
                        Confirmed
                      </button>
                      <button
                        className={booking.status === 'completed' ? styles.active : ''}
                        onClick={() => onStatusChange(booking.$id, 'completed')}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
