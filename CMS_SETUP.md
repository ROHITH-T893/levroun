# Levroun CMS - Setup Guide

## 🔧 Initial Setup Steps

### 1. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Setup Appwrite

#### Create Appwrite Instance (Self-hosted or Cloud):
- Visit: https://cloud.appwrite.io or https://appwrite.io (for self-hosted)
- Create an account and new project
- Get your Project ID and API Key

#### Create Database:
1. Go to Databases
2. Click "Create Database"
3. Set Database ID: `levroun_cms`

#### Create Collections:

**A. Pages Collection** (`pages`)
```
Attributes:
- hero_title (Text, Required)
- hero_subtitle (Text, Required)
- hero_cta (Text)
- about_content (Text)
- contact_info (JSON)
```

**B. Services Collection** (`services`)
```
Attributes:
- title (Text, Required)
- description (Text, Required)
- icon (Text)
- order (Integer)
- created_at (DateTime)
```

**C. Portfolio Collection** (`portfolio`)
```
Attributes:
- project_name (Text, Required)
- description (Text)
- image (Text) - Store image URL from storage
- tech_stack (Text)
- live_url (Text)
- created_at (DateTime)
```

**D. Leads/Bookings Collection** (`leads`)
```
Attributes:
- firstName (Text, Required)
- lastName (Text)
- email (Email, Required)
- phone (Text)
- service_requested (Text)
- message (Text, Required)
- preferred_date (DateTime)
- status (Text) - Default: "pending"
- created_at (DateTime)
- updated_at (DateTime)
```

**E. Users Collection** (`users`)
```
Attributes:
- email (Email, Required)
- password_hash (Text, Required)
- role (Text) - Default: "admin"
- created_at (DateTime)
```

### 3. Create Admin User in Appwrite

Use Appwrite console or API to create an admin user in the `users` collection:

```json
{
  "email": "admin@levroun.tech",
  "password_hash": "[encrypted_password_using_bcryptjs]",
  "role": "admin",
  "created_at": "2024-03-19T00:00:00Z"
}
```

Generate password hash using Node.js:
```javascript
const bcrypt = require('bcryptjs');
const password = 'your_secure_password';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

### 4. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-instance.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
NEXT_PUBLIC_APPWRITE_DATABASE_ID=levroun_cms
NEXT_PUBLIC_APPWRITE_BUCKET_ID=levroun_storage

# Collection IDs
NEXT_PUBLIC_PAGES_COLLECTION_ID=pages
NEXT_PUBLIC_SERVICES_COLLECTION_ID=services
NEXT_PUBLIC_PORTFOLIO_COLLECTION_ID=portfolio
NEXT_PUBLIC_LEADS_COLLECTION_ID=leads
NEXT_PUBLIC_USERS_COLLECTION_ID=users

# Resend API
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=admin@levroun.tech

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Initialize Sample Data (Optional)

Create initial services in Appwrite:

```json
{
  "title": "Web Development",
  "description": "Custom websites and web applications built with modern technologies",
  "icon": "🌐",
  "order": 1
}
```

## 📂 Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.js (Dashboard)
│   │   ├── login/page.js (Admin Login)
│   │   ├── bookings/page.js (Manage Leads)
│   │   ├── services/page.js (Manage Services)
│   │   ├── content/page.js (Edit Content)
│   │   └── portfolio/page.js (Manage Portfolio)
│   ├── api/
│   │   ├── contact/route.js
│   │   ├── leads/route.js
│   │   ├── services/route.js
│   │   ├── portfolio/route.js
│   │   ├── content/route.js
│   │   ├── send-email/route.js
│   │   └── admin/auth/login/route.js
│   ├── layout.js
│   ├── page.jsx
│   ├── contact/page.js
│   ├── about/page.js
│   └── service/page.js
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.js
│   │   ├── BookingsTable.js
│   │   └── ServicesForm.js
│   ├── Nav.jsx
│   ├── Footer.js
│   └── ClientLayout.js
├── lib/
│   ├── appwrite.js (Client-side)
│   ├── appwrite-server.js (Server-side)
│   └── appwrite-utils.js (Utilities)
└── styles/
    ├── globals.css
    ├── admin.module.css
    ├── admin-sidebar.module.css
    ├── admin-table.module.css
    ├── admin-login.module.css
    └── admin-forms.module.css
```

## 🚀 Running the Application

### Development
```bash
npm run dev
```

Access:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin
- Admin Login: http://localhost:3000/admin/login

### Production Build
```bash
npm run build
npm start
```

## 🔐 Security Checklist

- [ ] Set secure password for admin user
- [ ] Enable API key restrictions in Appwrite
- [ ] Use environment variables for sensitive data
- [ ] Implement request validation on all endpoints
- [ ] Add rate limiting for API endpoints
- [ ] Use HTTPS in production
- [ ] Enable CORS only for your domain
- [ ] Regularly update dependencies

## 📧 Email Configuration

### Resend Setup:
1. Sign up at https://resend.com
2. Get API key from dashboard
3. Add to `.env.local` as `RESEND_API_KEY`
4. Configure sender domain (business email)

## 🗄️ Appwrite Security Rules

Set collection permissions in Appwrite:
- **Public Reader**: Yes (for reading public content)
- **Public Writer**: No
- **Authenticated Read**: Admin only
- **Authenticated Write**: Admin only

## 🧪 Testing the System

### 1. Test Booking Form
- Go to home page
- Fill contact/booking form
- Verify emails received
- Check lead in admin panel

### 2. Test Admin Dashboard
- Login to `/admin/login`
- View bookings
- Create new service
- Update booking status

### 3. Test Email Notifications
- Submit a booking
- Check confirmation email to user
- Check notification email to admin

## 🐛 Troubleshooting

### Email not sending:
- Verify `RESEND_API_KEY` is correct
- Check sender domain is verified in Resend
- Check admin email address

### Appwrite connection errors:
- Verify endpoint URL is correct
- Check Project ID matches
- Ensure API key has proper permissions
- Check firewall/CORS settings

### Login issues:
- Verify user exists in `users` collection
- Check password hash is correct
- Clear browser cache/localStorage

## 📦 API Endpoints Reference

- `POST /api/contact` → Create booking + send emails
- `POST /api/leads` → Create lead
- `GET /api/leads` → Fetch all leads
- `PATCH /api/leads/[id]` → Update lead status
- `GET /api/services` → Fetch services
- `POST /api/services` → Create service
- `PATCH /api/services/[id]` → Update service
- `DELETE /api/services/[id]` → Delete service
- `GET /api/content` → Fetch page content
- `POST /api/admin/auth/login` → Admin login

## 📝 Next Steps

1. Set up Appwrite instance
2. Create collections and admin user
3. Copy `.env.local` and fill credentials
4. Run `npm install`
5. Start dev server: `npm run dev`
6. Test booking form on home page
7. Login to admin panel at `/admin/login`
8. Create sample services
9. Deploy to production

## 🎯 Key Features Implemented

✅ Dynamic services management
✅ Booking/lead collection system
✅ Email automation (Resend)
✅ Admin dashboard with authentication
✅ Booking status tracking
✅ Responsive design (pixel-perfect)
✅ Error handling & validation
✅ SEO optimization
✅ Production-ready architecture
✅ Security best practices

---

**Questions or issues?** Check the API routes and Appwrite documentation for more details.
