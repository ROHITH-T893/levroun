"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Mail, 
  CalendarCheck, 
  Eye,
  Activity,
  Edit, 
  Trash2, 
  Plus, 
  LogOut, 
  ExternalLink,
  Loader2,
  Terminal,
  Send,
  Save,
  X,
  ImageUp
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  const [contactSubmissions, setContactSubmissions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [analytics, setAnalytics] = useState({ totalVisitors: 0, todayVisitors: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(null); // 'team' or 'service'
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/contact');
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        setIsAuthenticated(true);
        await loadData();
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const loadData = async () => {
    try {
      const [teamRes, contactRes, bookingRes, analyticsRes] = await Promise.all([
        fetch('/api/team'),
        fetch('/api/contact'),
        fetch('/api/scheduling'),
        fetch('/api/analytics'),
      ]);

      if (teamRes.ok) {
        const teamData = await teamRes.json();
        setTeamMembers(teamData.data || []);
      }


      if (contactRes.ok) {
        const contactData = await contactRes.json();
        setContactSubmissions(contactData.data || []);
      }

      if (bookingRes.ok) {
        const bookingData = await bookingRes.json();
        setBookings(bookingData.data || []);
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics({
          totalVisitors: analyticsData.totalVisitors || 0,
          todayVisitors: analyticsData.todayVisitors || 0
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const { path } = await res.json();
        setFormData(prev => ({ ...prev, image: path }));
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      alert('Image upload error');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const res = await fetch('/api/team', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEditMode ? { id: formData._id, ...formData } : formData),
      });
      if (res.ok) {
        setShowModal(null);
        setFormData({});
        setIsEditMode(false);
        await loadData();
        alert(`Member ${isEditMode ? 'updated' : 'added'} successfully!`);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Failed to save data'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Network error or server unreachable');
    }
  };

  const handleEdit = (member) => {
    setIsEditMode(true);
    setShowModal('team');
    setFormData({
      ...member,
      socialLinks: member.socialLinks || { linkedin: '', twitter: '', github: '', dribbble: '', behance: '' }
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    try {
      const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadData();
        alert('Member deleted correctly.');
      }
    } catch (error) {
      alert('Error deleting member');
    }
  };

  const openModal = () => {
    setIsEditMode(false);
    setShowModal('team');
    setFormData({ 
      name: '', role: '', email: '', phone: '', bio: '', image: '', 
      socialLinks: { linkedin: '', twitter: '', github: '', dribbble: '', behance: '' } 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06060c]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#1AC2FF] mx-auto"></div>
          <p className="text-gray-400 font-['Righteous'] uppercase tracking-widest text-xs">Decrypting Access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-transparent text-[#e2e8f0] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Righteous'] flex items-center gap-4">
            <Terminal className="text-[#1AC2FF]" size={40} />
            Terminal <span className="text-[#1AC2FF]">/</span> Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 font-black py-2 px-8 rounded-xl transition-all flex items-center gap-2"
          >
            <LogOut size={16} /> TERMINATE SESSION
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 border-b border-white/5 overflow-x-auto pb-px">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'team', label: 'Team Members' },
            { id: 'contact', label: 'Submissions' },
            { id: 'bookings', label: 'Bookings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 font-bold uppercase tracking-widest text-xs transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#1AC2FF] border-[#1AC2FF]'
                  : 'text-gray-500 border-transparent hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Sections */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { label: "Today's Visitors", value: analytics.todayVisitors, icon: Activity },
              { label: 'Total Visitors', value: analytics.totalVisitors, icon: Eye },
              { label: 'Bookings', value: bookings.length, icon: CalendarCheck },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0e0e1a] rounded-2xl border border-white/5 p-8 group hover:border-[#1AC2FF]/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                   <p className="text-[#1AC2FF] text-xs font-black uppercase tracking-widest">{stat.label}</p>
                   <stat.icon className="text-[#1AC2FF]/20 group-hover:text-[#1AC2FF] transition-colors" size={20} />
                </div>
                <p className="text-5xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { label: 'Team', value: teamMembers.length, icon: Users },
              { label: 'Submissions', value: contactSubmissions.length, icon: Mail },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0e0e1a] rounded-2xl border border-white/5 p-8 group hover:border-[#7000FF]/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                   <p className="text-gray-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                   <stat.icon className="text-[#1AC2FF]/20 group-hover:text-[#1AC2FF] transition-colors" size={20} />
                </div>
                <p className="text-5xl font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Team Section */}
        {activeTab === 'team' && (
          <div className="bg-[#0e0e1a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h2 className="text-2xl font-bold text-white font-['Righteous']">Personnel Registry ({teamMembers.length})</h2>
              <button 
                onClick={() => openModal()}
                className="bg-[#1AC2FF] text-[#06060c] font-black text-xs px-6 py-2 rounded-lg hover:bg-white transition-all flex items-center gap-2"
              >
                <Plus size={16} /> ADD AGENT
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-black text-gray-500 uppercase tracking-widest bg-black/20">
                    <th className="text-left py-4 px-8">Name</th>
                    <th className="text-left py-4 px-8">Designation</th>
                    <th className="text-left py-4 px-8">Endpoint</th>
                    <th className="text-right py-4 px-8">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {teamMembers.map((member) => (
                    <tr key={member._id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-4 px-8 font-bold text-white">{member.name}</td>
                      <td className="py-4 px-8 text-gray-400">{member.role}</td>
                      <td className="py-4 px-8 font-mono text-xs text-[#1AC2FF]/60">{member.email}</td>
                      <td className="py-4 px-8 text-right flex justify-end gap-3 text-lg">
                        <button 
                          onClick={() => handleEdit(member)}
                          className="text-gray-500 hover:text-[#1AC2FF] transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(member._id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}



        {activeTab === 'contact' && (
          <div className="bg-[#0e0e1a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-white/5">
              <h2 className="text-2xl font-bold text-white font-['Righteous']">Contact Submissions ({contactSubmissions.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-black text-gray-500 uppercase tracking-widest bg-black/20">
                    <th className="text-left py-4 px-8">Contact</th>
                    <th className="text-left py-4 px-8">Service</th>
                    <th className="text-left py-4 px-8">Message</th>
                    <th className="text-left py-4 px-8">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {contactSubmissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-8">
                        <div className="font-bold text-white">{sub.firstName} {sub.lastName}</div>
                        <div className="text-[10px] text-[#1AC2FF]">{sub.email}</div>
                      </td>
                      <td className="py-4 px-8 text-gray-400">{sub.service || 'General'}</td>
                      <td className="py-4 px-8 text-gray-500 max-w-xs truncate">{sub.message}</td>
                      <td className="py-4 px-8 text-gray-600">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-[#0e0e1a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-white/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white font-['Righteous']">Call Bookings ({bookings.length})</h2>
              <a href="/scheduling" target="_blank" className="text-xs font-bold text-[#1AC2FF] hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                Public Page <ExternalLink size={14} />
              </a>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
              {[
                { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'text-yellow-400' },
                { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'text-green-400' },
                { label: 'Rejected', value: bookings.filter(b => b.status === 'rejected').length, color: 'text-red-400' },
              ].map(s => (
                <div key={s.label} className="p-4 text-center">
                  <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-600">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-black text-gray-500 uppercase tracking-widest bg-black/20">
                    <th className="text-left py-4 px-8">Client</th>
                    <th className="text-left py-4 px-8">Date & Time</th>
                    <th className="text-left py-4 px-8">Service</th>
                    <th className="text-center py-4 px-8">Status</th>
                    <th className="text-right py-4 px-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.length === 0 ? (
                    <tr><td colSpan={5} className="py-16 text-center text-gray-600 text-xs uppercase tracking-widest">No bookings yet</td></tr>
                  ) : bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-8">
                        <div className="font-bold text-white">{booking.name}</div>
                        <div className="text-[10px] text-[#1AC2FF]/60 font-mono">{booking.email}</div>
                        <div className="text-[10px] text-gray-600">{booking.phone}</div>
                      </td>
                      <td className="py-4 px-8">
                        <div className="text-white font-bold">{new Date(booking.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
                        <div className="text-[10px] text-[#1AC2FF]">{booking.time}</div>
                      </td>
                      <td className="py-4 px-8">
                        <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-400">
                          {booking.service || 'General'}
                        </span>
                      </td>
                      <td className="py-4 px-8 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          booking.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20'
                          : booking.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-8">
                        <div className="flex gap-3 justify-end">
                          {booking.status !== 'confirmed' && (
                            <button
                              onClick={async () => {
                                const res = await fetch('/api/scheduling', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id: booking._id, status: 'confirmed' }) });
                                if (res.ok) await loadData();
                              }}
                              className="text-[10px] font-black text-green-400 hover:text-white border border-green-500/20 hover:border-green-400 px-3 py-1.5 rounded-lg transition-all uppercase tracking-wider"
                            >
                              ✓ Confirm
                            </button>
                          )}
                          {booking.status !== 'rejected' && (
                            <button
                              onClick={async () => {
                                if (!confirm('Reject this booking?')) return;
                                const res = await fetch('/api/scheduling', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id: booking._id, status: 'rejected' }) });
                                if (res.ok) await loadData();
                              }}
                              className="text-[10px] font-black text-red-400 hover:text-white border border-red-500/20 hover:border-red-400 px-3 py-1.5 rounded-lg transition-all uppercase tracking-wider"
                            >
                              ✕ Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal Overlay */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[#06060c]/80 backdrop-blur-sm" onClick={() => setShowModal(null)}></div>
            <div className="relative bg-[#0e0e1a] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 font-['Righteous'] uppercase tracking-widest">
                {isEditMode ? 'Modify Agent Profile' : 'Initialize New Agent'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] mb-1 block">Identification</label>
                  <input
                    type="text"
                    placeholder="Agent Name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] mb-1 block">Designation</label>
                  <input
                    type="text"
                    placeholder="Role (e.g. Lead Developer)"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] mb-1 block">System Endpoint</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] mb-2 block">Profile Image</label>
                  {/* Image preview */}
                  {formData.image && (
                    <div className="mb-3 relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {/* File upload zone */}
                  <label className={`flex flex-col items-center justify-center gap-2 w-full border border-dashed rounded-xl px-4 py-5 cursor-pointer transition-all ${imageUploading ? 'border-[#1AC2FF]/50 bg-[#1AC2FF]/5' : 'border-white/10 bg-white/5 hover:border-[#1AC2FF]/40'}`}>
                    {imageUploading
                      ? <Loader2 size={22} className="animate-spin text-[#1AC2FF]" />
                      : <ImageUp size={22} className="text-gray-500" />
                    }
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">
                      {imageUploading ? 'Uploading...' : 'Click to upload from your device'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={imageUploading}
                    />
                  </label>
                  {/* Manual URL fallback */}
                  <input
                    type="text"
                    placeholder="Or paste an image URL"
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-[#1AC2FF]"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] mb-1 block">Telecom Contact (Phone)</label>
                  <input
                    type="text"
                    placeholder="+1 (xxx) xxx-xxxx"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] mb-1 block">Description / Bio</label>
                  <textarea
                    placeholder="Agent Biography"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] min-h-[100px]"
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] mb-1 block">Neural Links (Socials)</label>
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.socialLinks?.linkedin || ''}
                    onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})}
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.socialLinks?.github || ''}
                    onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, github: e.target.value}})}
                  />
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.socialLinks?.twitter || ''}
                    onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, twitter: e.target.value}})}
                  />
                  <input
                    type="text"
                    placeholder="Dribbble URL"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.socialLinks?.dribbble || ''}
                    onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, dribbble: e.target.value}})}
                  />
                  <input
                    type="text"
                    placeholder="Behance URL"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF]"
                    value={formData.socialLinks?.behance || ''}
                    onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, behance: e.target.value}})}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(null)}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all uppercase text-xs font-black"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-[#1AC2FF] text-[#06060c] font-black hover:bg-white transition-all uppercase text-xs"
                  >
                    Confirm Deployment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
