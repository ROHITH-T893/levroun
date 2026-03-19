// src/app/admin/content/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import styles from '@/styles/admin.module.css';

export default function ContentPage() {
  const router = useRouter();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const userSession = localStorage.getItem('admin_session');
      if (!userSession) {
        router.push('/admin/login');
        return;
      }

      try {
        const response = await fetch('/api/content');
        if (!response.ok) throw new Error('Failed to fetch content');
        
        const data = await response.json();
        setContent(data.content || {
          hero_title: 'We Build Secure, Scalable Digital Platforms',
          hero_subtitle: 'From websites to custom apps, we empower startups and businesses with clean code and rock-solid infrastructure.',
          about_content: 'At Levroun Enterprises, we are a next-generation technology company...'
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const endpoint = content.$id 
        ? `/api/content/${content.$id}` 
        : '/api/content';
      
      const method = content.$id ? 'PATCH' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });

      if (response.ok) {
        setEditMode(false);
        alert('Content saved successfully!');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      
      <main className={styles.adminMain}>
        <div className={styles.adminHeader}>
          <h1>Edit Content</h1>
          <p>Manage website content and copy</p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading content...</div>
        ) : (
          <div style={{ maxWidth: '800px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#060134', marginBottom: '8px' }}>
                  Hero Title
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={content?.hero_title || ''}
                    onChange={(e) => handleChange('hero_title', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                ) : (
                  <p style={{ margin: '10px 0', color: '#666' }}>{content?.hero_title}</p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#060134', marginBottom: '8px' }}>
                  Hero Subtitle
                </label>
                {editMode ? (
                  <textarea
                    value={content?.hero_subtitle || ''}
                    onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <p style={{ margin: '10px 0', color: '#666', lineHeight: 1.6 }}>{content?.hero_subtitle}</p>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#060134', marginBottom: '8px' }}>
                  About Content
                </label>
                {editMode ? (
                  <textarea
                    value={content?.about_content || ''}
                    onChange={(e) => handleChange('about_content', e.target.value)}
                    rows={6}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <p style={{ margin: '10px 0', color: '#666', lineHeight: 1.6 }}>{content?.about_content}</p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {editMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      style={{
                        background: '#1AC2FF',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        opacity: saving ? 0.6 : 1
                      }}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      style={{
                        background: '#f0f0f0',
                        color: '#666',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    style={{
                      background: '#1AC2FF',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Edit Content
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
