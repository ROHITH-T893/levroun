// src/components/admin/AdminSidebar.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/admin-sidebar.module.css';

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>Levroun Admin</h2>
      </div>

      <nav className={styles.nav}>
        <Link href="/admin" className={styles.navItem}>
          📊 Dashboard
        </Link>
        <Link href="/admin/bookings" className={styles.navItem}>
          📋 Bookings
        </Link>
        <Link href="/admin/services" className={styles.navItem}>
          ⚙️ Services
        </Link>
        <Link href="/admin/content" className={styles.navItem}>
          📝 Content
        </Link>
        <Link href="/admin/portfolio" className={styles.navItem}>
          🖼️ Portfolio
        </Link>
      </nav>

      <div className={styles.sidebarFooter}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
