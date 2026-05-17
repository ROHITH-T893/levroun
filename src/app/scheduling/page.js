"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, Mail, Phone, MessageSquare, Calendar, CheckCircle, Loader2 } from 'lucide-react';

// Available time slots
const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
];

const SERVICES = [
  'Web Development',
  'App Development',
  'Custom ERP / Application',
  'E-Commerce Solutions',
  'SEO & Digital Marketing',
  'UI/UX Design',
  'General Consultation',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function MiniCalendar({ selectedDate, onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const next = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-[#0e0e1a] rounded-3xl border border-white/10 p-6">
      {/* Month header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prev} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <ChevronLeft size={18} className="text-gray-400" />
        </button>
        <span className="font-black text-white text-sm uppercase tracking-widest">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={next} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-black uppercase tracking-widest text-gray-600 py-1">{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;
          const thisDate = new Date(viewYear, viewMonth, day);
          const isPast = thisDate < today;
          const isWeekend = thisDate.getDay() === 0 || thisDate.getDay() === 6;
          const disabled = isPast || isWeekend;
          const isSelected = selectedDate &&
            selectedDate.getFullYear() === viewYear &&
            selectedDate.getMonth() === viewMonth &&
            selectedDate.getDate() === day;
          const isToday = today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day;

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
              className={`aspect-square rounded-xl text-sm font-bold transition-all
                ${disabled ? 'text-gray-700 cursor-not-allowed' : 'hover:bg-white/10 cursor-pointer'}
                ${isSelected ? 'bg-[#1AC2FF] text-[#06060c] shadow-[0_0_20px_rgba(26,194,255,0.4)]' : ''}
                ${isToday && !isSelected ? 'border border-[#1AC2FF]/40 text-[#1AC2FF]' : ''}
                ${!isSelected && !isToday && !disabled ? 'text-gray-300' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="text-[10px] text-gray-600 text-center mt-4 uppercase tracking-widest">Weekends unavailable</p>
    </div>
  );
}

// Formats a Date object to YYYY-MM-DD in LOCAL time (avoids UTC offset issues)
const toLocalDateStr = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function SchedulingPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setBookedSlots([]);
    setSlotsLoading(true);
    try {
      const dateStr = toLocalDateStr(date);
      const res = await fetch(`/api/scheduling?date=${dateStr}`);
      if (res.ok) {
        const data = await res.json();
        setBookedSlots(data.bookedSlots || []);
      }
    } catch {
      // silently ignore — just show all slots as available
    } finally {
      setSlotsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    try {
      const dateStr = toLocalDateStr(selectedDate);
      const res = await fetch('/api/scheduling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: dateStr, time: selectedTime }),
      });
      if (res.ok) {
        setStep(3);
      } else {
        const err = await res.json();
        alert(err.error || 'Something went wrong');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3 — Success
  if (step === 3) {
    return (
      <div className="min-h-screen bg-transparent text-[#e2e8f0] subpage-main flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-8 py-24">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white font-['Righteous']">Call Scheduled!</h1>
            <p className="text-gray-400">We've received your booking for</p>
            <div className="bg-[#0e0e1a] rounded-2xl border border-white/10 p-6 space-y-2">
              <p className="text-white font-bold">{formattedDate}</p>
              <p className="text-[#1AC2FF] font-black">{selectedTime}</p>
            </div>
            <p className="text-gray-500 text-sm">We'll confirm your slot within 24 hours via email at <span className="text-white">{formData.email}</span>.</p>
          </div>
          <button
            onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(''); setFormData({ name:'',email:'',phone:'',service:'',message:'' }); }}
            className="bg-[#1AC2FF] text-[#06060c] font-black px-8 py-3 rounded-xl hover:bg-white transition-all"
          >
            Book Another Call
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-[#e2e8f0] subpage-main">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white font-['Righteous']">
            Book a Strategy <span className="text-[#1AC2FF]">Call</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pick a date and time that works for you. Our team will confirm within 24 hours.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[{ n: 1, label: 'Select Date' }, { n: 2, label: 'Your Details' }].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all
                ${step >= n ? 'bg-[#1AC2FF] text-[#06060c]' : 'bg-white/10 text-gray-500'}`}>
                {n}
              </div>
              <span className={`text-xs uppercase tracking-widest font-bold ${step >= n ? 'text-white' : 'text-gray-600'}`}>{label}</span>
              {n < 2 && <div className={`w-12 h-px mx-2 ${step > n ? 'bg-[#1AC2FF]' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 — Calendar */}
        {step === 1 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <MiniCalendar selectedDate={selectedDate} onSelect={handleDateSelect} />
            </div>

            <div className="space-y-4">
              {selectedDate ? (
                <>
                  <div className="bg-[#0e0e1a] rounded-2xl border border-white/10 p-4 flex items-center gap-3">
                    <Calendar size={18} className="text-[#1AC2FF]" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Selected</p>
                      <p className="text-white font-bold text-sm">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF]">Available Time Slots (IST)</p>
                    {slotsLoading && <Loader2 size={14} className="animate-spin text-gray-500" />}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(slot => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          disabled={isBooked || slotsLoading}
                          onClick={() => !isBooked && setSelectedTime(slot)}
                          className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wide transition-all border relative
                            ${isBooked
                              ? 'bg-red-500/5 border-red-500/15 text-red-500/40 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#1AC2FF] text-[#06060c] border-[#1AC2FF] shadow-[0_0_15px_rgba(26,194,255,0.3)]'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#1AC2FF]/40 hover:text-white'
                            }`}
                        >
                          {isBooked
                            ? <span className="flex items-center justify-center gap-1"><span>✕</span> {slot}</span>
                            : <><Clock size={12} className="inline mr-1.5 mb-0.5" />{slot}</>
                          }
                        </button>
                      );
                    })}
                  </div>

                  {selectedTime && (
                    <button
                      onClick={() => setStep(2)}
                      className="w-full mt-4 bg-[#1AC2FF] text-[#06060c] font-black py-4 rounded-xl hover:bg-white transition-all"
                    >
                      Continue → Enter Your Details
                    </button>
                  )}
                </>
              ) : (
                <div className="bg-[#0e0e1a] rounded-2xl border border-dashed border-white/10 p-12 text-center space-y-3">
                  <Calendar size={32} className="text-gray-700 mx-auto" />
                  <p className="text-gray-500 text-sm">Select a date from the calendar to see available time slots</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2 — Details Form */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            {/* Booking summary pill */}
            <div className="bg-[#0e0e1a] rounded-2xl border border-[#1AC2FF]/20 p-4 flex flex-wrap gap-6 items-center mb-8">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Date</p>
                <p className="text-white font-bold text-sm">{formattedDate}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Time</p>
                <p className="text-[#1AC2FF] font-black">{selectedTime}</p>
              </div>
              <button onClick={() => setStep(1)} className="ml-auto text-xs text-gray-500 hover:text-white underline underline-offset-2">
                Change
              </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#0e0e1a] rounded-3xl border border-white/10 p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] flex items-center gap-2">
                    <User size={12} /> Full Name *
                  </label>
                  <input
                    type="text" required placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] flex items-center gap-2">
                    <Mail size={12} /> Email *
                  </label>
                  <input
                    type="email" required placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] flex items-center gap-2">
                    <Phone size={12} /> Phone *
                  </label>
                  <input
                    type="tel" required placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF]">Service</label>
                  <select
                    className="w-full bg-[#0e0e1a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors appearance-none"
                    value={formData.service}
                    onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1AC2FF] flex items-center gap-2">
                  <MessageSquare size={12} /> About Your Project
                </label>
                <textarea
                  rows={4} placeholder="Tell us briefly about your goals..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#1AC2FF] transition-colors resize-none"
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button" onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white font-black text-xs uppercase transition-all"
                >
                  ← Back
                </button>
                <button
                  type="submit" disabled={isSubmitting}
                  className="flex-[2] py-4 rounded-xl bg-[#1AC2FF] text-[#06060c] font-black hover:bg-white transition-all disabled:opacity-50 text-sm uppercase tracking-wider"
                >
                  {isSubmitting ? 'Scheduling...' : 'Confirm Booking'}
                </button>
              </div>
            </form>

            <div className="mt-6 p-6 bg-white/2 rounded-2xl border border-white/5 text-sm text-gray-500 space-y-2">
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1AC2FF] inline-block"/> Confirmation email within 24 hours</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1AC2FF] inline-block"/> A secure meeting link will be shared</p>
              <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1AC2FF] inline-block"/> 30-minute consultation — free of charge</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
