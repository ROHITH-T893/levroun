// src/app/admin/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import styles from '@/styles/admin.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalServices: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userSession = localStorage.getItem('admin_session');
        if (!userSession) {
          router.push('/admin/login');
          return;
        }
        
        const userData = JSON.parse(userSession);
        setUser(userData);
        
        // Fetch stats
        const [leadsRes, servicesRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/services')
        ]);

        if (leadsRes.ok && servicesRes.ok) {
          const leadsData = await leadsRes.json();
          const servicesData = await servicesRes.json();

          const pendingCount = leadsData.leads?.filter(l => l.status === 'pending').length || 0;

          setStats({
            totalLeads: leadsData.leads?.length || 0,
            totalServices: servicesData.services?.length || 0,
            pendingBookings: pendingCount
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('admin_session');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      
      <main className={styles.adminMain}>
        <div className={styles.adminHeader}>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.email}!</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Total Leads</h3>
            <p className={styles.statNumber}>{stats.totalLeads}</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>Services</h3>
            <p className={styles.statNumber}>{stats.totalServices}</p>
          </div>
          
          <div className={`${styles.statCard} ${styles.alert}`}>
            <h3>Pending Bookings</h3>
            <p className={styles.statNumber}>{stats.pendingBookings}</p>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <a href="/admin/bookings" className={styles.actionBtn}>View Bookings</a>
            <a href="/admin/services" className={styles.actionBtn}>Manage Services</a>
            <a href="/admin/content" className={styles.actionBtn}>Edit Content</a>
          </div>
        </div>
      </main>
    </div>
  );
}
