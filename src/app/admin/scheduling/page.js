"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSchedulingPage() {
  const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/scheduling');
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        setIsAuthenticated(true);
        const data = await response.json();
        setBookings(data.data || []);
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch('/api/scheduling', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (response.ok) {
        setBookings(
          bookings.map((booking) =>
            booking._id === id ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (error) {
      console.error('Error updating booking:', error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06060c]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#1AC2FF] mx-auto"></div>
          <p className="text-gray-400 font- mono uppercase text-xs">Accessing Schedule...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-transparent text-[#e2e8f0] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['Righteous']">Personnel <span className="text-[#1AC2FF]">/</span> Bookings</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 font-black py-2 px-8 rounded-xl transition-all"
          >
            TERMINATE SESSION
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-[#0e0e1a] rounded-3xl border border-white/5 p-20 text-center space-y-4">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-600">
                <i className="fas fa-calendar-times text-2xl"></i>
             </div>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No Scheduled Events Detected</p>
          </div>
        ) : (
          <div className="bg-[#0e0e1a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-black text-gray-500 uppercase tracking-widest bg-black/20">
                    <th className="px-8 py-5 text-left">Identity</th>
                    <th className="px-8 py-5 text-left">Timestamp</th>
                    <th className="px-8 py-5 text-left">Service Cluster</th>
                    <th className="px-8 py-5 text-center">Protocol Status</th>
                    <th className="px-8 py-5 text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-5">
                        <div className="font-bold text-white">{booking.name}</div>
                        <div className="text-[10px] font-mono text-[#1AC2FF]/60">{booking.email}</div>
                        <div className="text-[10px] text-gray-500">{booking.phone}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-white font-bold">{new Date(booking.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">{booking.time}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                          {booking.service || 'General Inq.'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            booking.status === 'confirmed'
                              ? 'bg-green-500/10 text-green-500 border-green-500/20'
                              : booking.status === 'rejected'
                              ? 'bg-red-500/10 text-red-500 border-red-500/20'
                              : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex gap-4 justify-end">
                          {booking.status !== 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(booking._id, 'confirmed')}
                              className="text-xs font-black text-green-500 hover:text-white transition-colors uppercase tracking-widest"
                            >
                              Confirm
                            </button>
                          )}
                          {booking.status !== 'rejected' && (
                            <button
                              onClick={() => handleStatusChange(booking._id, 'rejected')}
                              className="text-xs font-black text-red-500 hover:text-white transition-colors uppercase tracking-widest"
                            >
                              Reject
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
      </div>
    </div>
  );
}
