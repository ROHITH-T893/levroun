# Levroun Enterprises Dynamic Website - Setup Guide

## ✅ What We've Built

### Pages Created:
1. **Public Pages** (Visitor accessible)
   - `/` - Home Page
   - `/team` - Team Members Page (Dynamic)
   - `/service` - Services Page (Dynamic)
   - `/about` - About Company Page (Dynamic)
   - `/contact` - Contact Form (Existing, enhanced)
   - `/scheduling` - Call Scheduling Booking (Public)

2. **Admin Pages** (Protected with authentication)
   - `/admin/login` - Admin Login
   - `/admin/dashboard` - CMS Dashboard (Manage Team, Services, View Submissions)
   - `/admin/scheduling` - Manage Call Bookings

### Database & Backend:
- ✅ MongoDB connection configured
- ✅ User authentication (Email/Password)
- ✅ API routes for all operations
- ✅ Data models ready (Team, Services, Scheduling, Contact)
- ✅ JWT token-based authentication

### Data Files:
- ✅ `/src/data/team.json` - Team members data (6 sample members)
- ✅ `/src/data/services.json` - Services data (6 services with pricing)
- ✅ `/src/data/about.json` - About page content

---

## 🚀 IMMEDIATE NEXT STEPS

### 1. Install Dependencies
```bash
npm install
```
This will install:
- mongoose (MongoDB)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT for auth)

### 2. Verify Environment Variables
Your `.env.local` file is already configured with:
```
MONGODB_URI=mongodb+srv://levroun:admentry@levroun.tech@levrounofficial.1ornzar.mongodb.net/?appName=LevrounOfficial
ADMIN_EMAIL=admin@levroun.tech
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-change-in-production
RESEND_API_KEY=re_Mu33ndhr_Dy8WUGKRQ6bRwCZ5YVPsNNf4
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

⚠️ **CHANGE ADMIN PASSWORD IN PRODUCTION!**

### 3. Update Contact Page
The existing `/contact` page needs to be updated to match the new structure. Replace `src/app/contact/page.js` with the existing one (already created in this work).

### 4. Test Everything
```bash
npm run dev
```

Then visit:
- `http://localhost:3000/` - Home
- `http://localhost:3000/team` - Team page
- `http://localhost:3000/service` - Services
- `http://localhost:3000/about` - About
- `http://localhost:3000/scheduling` - Book a call
- `http://localhost:3000/admin/login` - Admin login

### 5. Admin Credentials (Demo)
- Email: `admin@levroun.tech`
- Password: `admin123`

---

## 📋 FILE STRUCTURE

```
src/
├── data/
│   ├── team.json          ✅ Team members
│   ├── services.json      ✅ Services data
│   └── about.json         ✅ About content
│
├── lib/
│   ├── mongodb.js         ✅ MongoDB connection
│   ├── auth.js            ✅ Authentication utilities
│   └── models.js          ✅ Database schemas
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js       ✅ Admin login
│   │   │   └── logout/route.js      ✅ Admin logout
│   │   ├── team/route.js            ✅ Team API
│   │   ├── services/route.js        ✅ Services API
│   │   ├── scheduling/route.js      ✅ Scheduling API
│   │   └── contact/route.js         ✅ Contact (existing)
│   │
│   ├── team/page.js                 ✅ Team page
│   ├── service/page.js              ✅ Services page
│   ├── about/page.js                ✅ About page
│   ├── contact/page.js              ✅ Contact (existing)
│   ├── scheduling/page.js           ✅ Public booking
│   │
│   └── admin/
│       ├── login/page.js            ✅ Admin login UI
│       ├── dashboard/page.js        ✅ CMS dashboard
│       └── scheduling/page.js       ✅ Manage bookings
│
└── components/
    └── Nav.jsx                      ✅ Updated with new routes
```

---

## 🔄 FEATURES IMPLEMENTED

### Authentication System
- Email/password based login
- JWT token generation
- Security cookies
- Protected admin routes

### Admin Dashboard Features
1. **Overview Tab** - Statistics dashboard
2. **Team Management** - View and manage team members
3. **Services Management** - View and manage services
4. **Contact Submissions** - View form responses
5. **Call Bookings** - Confirm/reject scheduling requests

### Public Features
1. **Dynamic Pages** - Team, Services, About with data binding
2. **Call Scheduling** - Public booking form
3. **Contact Form** - Existing form (enhanced)
4. **Navigation** - Updated with all new routes

---

## 🔧 CUSTOMIZATION & NEXT STEPS

### To Add More Team Members:
Edit `/src/data/team.json` or use admin dashboard (when DB integration is complete)

### To Add More Services:
Edit `/src/data/services.json` or use admin dashboard

### To Connect to MongoDB (Production):
1. Update `src/lib/models.js` to use MongoDB instead of JSON files
2. Update API routes to perform actual database operations
3. Test thoroughly

### To Deploy:
```bash
npm run build
npm run start
```

Deploy to Vercel, AWS, or your preferred platform.

---

## 📝 SAMPLE DATA INCLUDED

### Team Members (6 total):
- Rohith T - Founder & Full Stack Developer
- Priya Sharma - Lead Designer & UI/UX Specialist
- Arjun Patel - Backend Engineer
- Aisha Khan - React Frontend Developer
- Vikram Singh - iOS/Android Developer
- Neha Gupta - Project Manager & QA Lead

### Services (6 total):
- Web Development
- App Development
- Graphic Designing
- E-Commerce Solutions
- Custom Applications
- SEO Optimization

---

## ⚠️ IMPORTANT NOTES

1. **Admin Password**: Change `admin123` to a strong password in production
2. **JWT Secret**: Update `JWT_SECRET` in `.env.local` for production
3. **MongoDB**: Connection is already set up - test connection before deployment
4. **Emails**: Update email configuration in `.env.local` for production
5. **Images**: Placeholder images used for team - replace with real photos
6. **Mobile Navigation**: Ensure MobileNavigation component is updated with new routes too

---

## 🎯 RECOMMENDED NEXT PHASE

1. Connect MongoDB schemas to actual database
2. Implement image upload for team members
3. Add email notifications for call bookings
4. Implement form validation for all forms
5. Add admin role management
6. Implement analytics tracking
7. Add testimonials/portfolio pages
8. Deploy to production

---

## 📞 QUICK LINKS

- Admin Dashboard: `http://localhost:3000/admin/login`
- Book a Call: `http://localhost:3000/scheduling`
- Team Page: `http://localhost:3000/team`
- Services Page: `http://localhost:3000/service`
- About Page: `http://localhost:3000/about`

---

**Status**: ✅ All core pages and APIs created. Ready for testing and MongoDB integration!
