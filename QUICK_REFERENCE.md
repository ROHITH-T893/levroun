# 📋 Quick Reference - File Locations & Configuration

## 🗂️ Key File Locations

### Configuration
```
.env.local                          - Environment variables (REQUIRED)
.env.local.example                  - Environment template
package.json                        - Dependencies (appwrite, bcryptjs)
```

### Library / Utilities
```
src/lib/appwrite.js                 - Client-side Appwrite config
src/lib/appwrite-server.js         - Server-side Appwrite config  
src/lib/appwrite-utils.js          - Helper functions
src/hooks/useAPI.js                - Data fetching hook
```

### API Routes
```
src/app/api/contact/route.js       - Bookings + emails (MAIN ENDPOINT)
src/app/api/leads/route.js         - Lead listing & creation
src/app/api/leads/[id]/route.js    - Single lead & status update
src/app/api/services/route.js      - Service CRUD
src/app/api/services/[id]/route.js - Service detail
src/app/api/portfolio/route.js     - Portfolio GET
src/app/api/content/route.js       - Content GET
src/app/api/send-email/route.js    - Email sending
src/app/api/admin/auth/login/route.js - Admin login
```

### Admin Pages
```
src/app/admin/page.js              - Dashboard (stats)
src/app/admin/login/page.js        - Login page
src/app/admin/bookings/page.js     - Manage leads
src/app/admin/services/page.js     - Manage services
src/app/admin/content/page.js      - Edit content
src/app/admin/portfolio/page.js    - Manage portfolio
```

### Admin Components
```
src/components/admin/AdminSidebar.js      - Navigation
src/components/admin/BookingsTable.js     - Bookings display
src/components/admin/ServicesForm.js      - Service form
```

### Frontend Components
```
src/components/DynamicServices.js  - Dynamic services section
```

### Styling
```
src/styles/admin.module.css         - Admin dashboard
src/styles/admin-sidebar.module.css - Sidebar navigation
src/styles/admin-table.module.css   - Tables & expandable rows
src/styles/admin-login.module.css   - Login page
src/styles/admin-forms.module.css   - Form styling
```

### Documentation
```
CMS_SETUP.md                        - Complete setup guide (30+ steps)
QUICKSTART.md                       - Quick 5-minute setup
IMPLEMENTATION_GUIDE.md            - Technical deep dive
API_REFERENCE.md                   - All API endpoints
PROJECT_SUMMARY.md                 - Completion summary
QUICK_REFERENCE.md                 - This file
```

---

## 🔑 Environment Variables

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
NEXT_PUBLIC_APPWRITE_DATABASE_ID=levroun_cms

# Collections
NEXT_PUBLIC_PAGES_COLLECTION_ID=pages
NEXT_PUBLIC_SERVICES_COLLECTION_ID=services
NEXT_PUBLIC_PORTFOLIO_COLLECTION_ID=portfolio
NEXT_PUBLIC_LEADS_COLLECTION_ID=leads
NEXT_PUBLIC_USERS_COLLECTION_ID=users
NEXT_PUBLIC_APPWRITE_BUCKET_ID=levroun_storage

# Email
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@levroun.tech

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🌐 Important URLs

### Local Development
```
Home              → http://localhost:3000
Admin Dashboard   → http://localhost:3000/admin
Admin Login       → http://localhost:3000/admin/login
API Contact       → http://localhost:3000/api/contact
API Leads         → http://localhost:3000/api/leads
API Services      → http://localhost:3000/api/services
```

### External Services
```
Appwrite Cloud    → https://cloud.appwrite.io
Appwrite Docs     → https://appwrite.io/docs
Resend            → https://resend.com
Resend Docs       → https://resend.com/docs
```

---

## 🗄️ Database Collections

### Pages Collection (pages)
```
Attributes:
- hero_title (Text)
- hero_subtitle (Text)
- hero_cta (Text)
- about_content (Text)
- contact_info (JSON)
```

### Services Collection (services)
```
Attributes:
- title (Text) - REQUIRED
- description (Text) - REQUIRED
- icon (Text) - Emoji
- order (Integer)
- created_at (DateTime)
```

### Leads Collection (leads)
```
Attributes:
- firstName (Text) - REQUIRED
- lastName (Text)
- email (Email) - REQUIRED
- phone (Text)
- service_requested (Text)
- message (Text) - REQUIRED
- preferred_date (DateTime)
- status (Text) - pending|confirmed|completed
- created_at (DateTime)
- updated_at (DateTime)
```

### Portfolio Collection (portfolio)
```
Attributes:
- project_name (Text) - REQUIRED
- description (Text)
- image (Text) - URL
- tech_stack (Text)
- live_url (Text)
- created_at (DateTime)
```

### Users Collection (users)
```
Attributes:
- email (Email) - REQUIRED
- password_hash (Text) - REQUIRED
- role (Text) - admin
- created_at (DateTime)
```

---

## 🔧 NPM Commands

```bash
# Development
npm run dev                # Start dev server (port 3000)
npm run build             # Build for production
npm start                 # Start production server
npm run lint              # Run ESLint
npm run postbuild         # Generate sitemap

# Dependencies
npm install               # Install all dependencies
npm install appwrite      # Install Appwrite
npm install bcryptjs      # Install bcryptjs
```

---

## 📌 Important Code Patterns

### Using useAPI Hook
```javascript
import { useAPI } from '@/hooks/useAPI';

const { data, loading, error } = useAPI('/api/services');
```

### Fetching Data Server-side
```javascript
import { databases } from '@/lib/appwrite-server';

const response = await databases.listDocuments(DB_ID, COLLECTION_ID);
```

### Creating Database Records
```javascript
import { ID } from 'appwrite';

const doc = await databases.createDocument(
  DB_ID,
  COLLECTION_ID,
  ID.unique(),
  data
);
```

### Password Hashing
```javascript
import bcrypt from 'bcryptjs';

const hash = bcrypt.hashSync(password, 10);
const isValid = bcrypt.compareSync(password, hash);
```

---

## ✅ Setup Checklist

- [ ] npm install
- [ ] Create Appwrite instance
- [ ] Create database (levroun_cms)
- [ ] Create 5 collections
- [ ] Create admin user in users collection
- [ ] Copy .env.local.example to .env.local
- [ ] Fill Appwrite credentials
- [ ] Fill Resend API key
- [ ] npm run dev
- [ ] Test contact form
- [ ] Login to /admin/login
- [ ] Create test service

---

## 🐛 Debugging Tips

### Check Admin Components
```
1. Clear browser cache (Ctrl+Shift+Del)
2. Check localStorage for admin_session
3. Check browser console for errors
4. Test API endpoints directly: /api/leads
```

### Debug API Routes
```
1. Add console.log statements
2. Check .env.local file path
3. Verify collection IDs match
4. Check Appwrite dashboard for data
```

### Email Issues
```
1. Verify RESEND_API_KEY in .env.local
2. Check sender domain in Resend dashboard
3. Check admin email is correct
4. Look for error in server logs
```

---

## 🎯 Common Tasks

### Add a New Service
```
1. Go to /admin/services
2. Fill form (title, description, icon)
3. Click "Save Service"
4. Service appears immediately on homepage
```

### View Bookings
```
1. Go to /admin/bookings
2. Click the "+" button to expand
3. See full message and contact details
4. Update status if needed
```

### Edit Website Content
```
1. Go to /admin/content
2. Click "Edit Content"
3. Modify hero title, subtitle, about text
4. Click "Save"
```

### Create Admin User
```
1. Go to Appwrite dashboard
2. Open users collection
3. Create document with:
   - email: admin@levroun.tech
   - password_hash: bcrypt hash
   - role: admin
```

---

## 📞 Support Resources

| Need | Check |
|------|-------|
| Setup help | CMS_SETUP.md |
| Quick start | QUICKSTART.md |
| Technical details | IMPLEMENTATION_GUIDE.md |
| API details | API_REFERENCE.md |
| Overall summary | PROJECT_SUMMARY.md |

---

## 🚀 Deployment Steps

### To Vercel
```
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy
```

### To Any Server
```
npm run build      # Create optimized build
npm start          # Start production server
```

---

## 🔐 Security Reminders

✅ Never commit .env.local
✅ Use strong admin password
✅ Keep API keys private
✅ Use HTTPS in production
✅ Enable CORS properly
✅ Validate all inputs

---

**This is your quick reference guide. Bookmark it!** 📌
