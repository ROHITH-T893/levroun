# 🚀 Quick Start - Levroun CMS

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Appwrite
1. Go to https://cloud.appwrite.io
2. Create project
3. Create database: `levroun_cms`
4. Create 5 collections (see below)

### Step 3: Configure Environment
```bash
# Copy template
cp .env.local.example .env.local

# Fill in your values:
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-instance.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_id
APPWRITE_API_KEY=your_key
RESEND_API_KEY=your_resend_key
```

### Step 4: Create Collections

#### Pages
- hero_title (Text)
- hero_subtitle (Text)
- about_content (Text)

#### Services  
- title (Text)
- description (Text)
- icon (Text)
- order (Integer)

#### Leads
- firstName (Text)
- lastName (Text)
- email (Email)
- phone (Text)
- service_requested (Text)
- message (Text)
- status (Text) - "pending"
- created_at (DateTime)

#### Portfolio
- project_name (Text)
- description (Text)
- image (Text)
- tech_stack (Text)
- live_url (Text)

#### Users
- email (Email)
- password_hash (Text)
- role (Text)

### Step 5: Create Admin User

In Users collection, add:
```json
{
  "email": "admin@levroun.tech",
  "password_hash": "[bcrypt-hash-here]",
  "role": "admin"
}
```

Generate hash:
```bash
node
> const bcrypt = require('bcryptjs');
> bcrypt.hashSync('password123', 10)
'$2a$10...' // copy this
```

### Step 6: Start Dev Server
```bash
npm run dev
```

## 🎯 Quick Links

- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3000/admin
- **Admin Login:** http://localhost:3000/admin/login
- **API Docs:** See IMPLEMENTATION_GUIDE.md

## 📋 What Exists

✅ Dynamic services management
✅ Booking/lead collection
✅ Email notifications (Resend)
✅ Admin dashboard
✅ Booking status tracking
✅ Email confirmations

## 🔧 Common Commands

```bash
# Development
npm run dev

#Build
npm run build

# Production
npm start

# Linting
npm run lint
```

## 📧 Email Verification

1. Sign up at https://resend.com
2. Verify sender domain
3. Get API key
4. Add to `.env.local`

## 🧪 Test Everything

1. Go to homepage
2. Fill contact form
3. Check emails (should get 2)
4. Login to admin
5. Check booking in dashboard
6. Update status
7. Done! ✨

## 🆘 Need Help?

- Full setup: Read `CMS_SETUP.md`
- Technical details: Read `IMPLEMENTATION_GUIDE.md`
- Code issues: Check inline comments
- Appwrite docs: https://appwrite.io/docs

---

**That's it! You're ready to manage content dynamically.** 🎉
