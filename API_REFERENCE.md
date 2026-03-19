# 📡 API Reference - Levroun CMS

## Base URL
```
http://localhost:3000/api
https://your-domain.com/api
```

---

## 📝 Leads / Bookings API

### Create Lead (Booking)
```http
POST /api/leads
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "service_requested": "Web Development",
  "message": "I want to build a website",
  "preferred_date": "2024-04-01T10:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "leadId": "doc_id_123"
}
```

---

### Get All Leads
```http
GET /api/leads
```

**Response:**
```json
{
  "success": true,
  "leads": [
    {
      "$id": "doc_id_123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "status": "pending",
      "created_at": "2024-03-19T10:00:00Z"
    }
  ]
}
```

---

### Get Single Lead
```http
GET /api/leads/[id]
```

**Response:**
```json
{
  "success": true,
  "lead": {
    "$id": "doc_id_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91 1234567890",
    "service_requested": "Web Development",
    "message": "I want to build a website",
    "preferred_date": "2024-04-01T10:00:00Z",
    "status": "pending",
    "created_at": "2024-03-19T10:00:00Z",
    "updated_at": "2024-03-19T10:00:00Z"
  }
}
```

---

### Update Lead Status
```http
PATCH /api/leads/[id]
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Status Options:** `pending`, `confirmed`, `completed`

**Response:**
```json
{
  "success": true,
  "lead": {
    "$id": "doc_id_123",
    "status": "confirmed",
    "updated_at": "2024-03-19T10:05:00Z"
  }
}
```

---

## ⚙️ Services API

### Create Service
```http
POST /api/services
Content-Type: application/json

{
  "title": "Web Development",
  "description": "Custom websites built with modern tech",
  "icon": "🌐",
  "order": 1
}
```

**Response:**
```json
{
  "success": true,
  "service": {
    "$id": "service_123",
    "title": "Web Development",
    "description": "Custom websites built with modern tech",
    "icon": "🌐",
    "order": 1
  }
}
```

---

### Get All Services
```http
GET /api/services
```

**Response:**
```json
{
  "success": true,
  "services": [
    {
      "$id": "service_123",
      "title": "Web Development",
      "description": "Custom websites...",
      "icon": "🌐",
      "order": 1
    },
    {
      "$id": "service_124",
      "title": "App Development",
      "description": "Mobile apps...",
      "icon": "📱",
      "order": 2
    }
  ]
}
```

---

### Get Single Service
```http
GET /api/services/[id]
```

**Response:**
```json
{
  "success": true,
  "service": {
    "$id": "service_123",
    "title": "Web Development",
    "description": "Custom websites built with modern tech",
    "icon": "🌐",
    "order": 1
  }
}
```

---

### Update Service
```http
PATCH /api/services/[id]
Content-Type: application/json

{
  "title": "Web Development (Updated)",
  "description": "Updated description...",
  "order": 2
}
```

**Response:**
```json
{
  "success": true,
  "service": {
    "$id": "service_123",
    "title": "Web Development (Updated)",
    "description": "Updated description...",
    "order": 2
  }
}
```

---

### Delete Service
```http
DELETE /api/services/[id]
```

**Response:**
```json
{
  "success": true,
  "message": "Service deleted"
}
```

---

## 📄 Content API

### Get Page Content
```http
GET /api/content
```

**Response:**
```json
{
  "success": true,
  "content": {
    "$id": "content_123",
    "hero_title": "We Build Secure, Scalable Digital Platforms",
    "hero_subtitle": "From websites to custom apps...",
    "about_content": "At Levroun Enterprises..."
  }
}
```

---

## 🎨 Portfolio API

### Get All Portfolio Items
```http
GET /api/portfolio
```

**Response:**
```json
{
  "success": true,
  "portfolio": [
    {
      "$id": "project_123",
      "project_name": "E-Commerce Platform",
      "description": "Built with Next.js...",
      "image": "https://cdn.example.com/image.jpg",
      "tech_stack": "Next.js, React, Node.js",
      "live_url": "https://ecommerce-example.com"
    }
  ]
}
```

---

## 📧 Email API

### Send Email
```http
POST /api/send-email
Content-Type: application/json

{
  "type": "user_confirmation",
  "leadData": {
    "firstName": "John",
    "email": "john@example.com",
    "service_requested": "Web Dev"
  }
}
```

**Email Types:**
- `user_confirmation` - Sent to user
- `admin_notification` - Sent to admin

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "emailId": "email_id_from_resend"
}
```

---

## 🔐 Authentication API

### Admin Login
```http
POST /api/admin/auth/login
Content-Type: application/json

{
  "email": "admin@levroun.tech",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "email": "admin@levroun.tech",
  "userId": "user_123",
  "token": "base64_encoded_token"
}
```

**Error Response:**
```json
{
  "error": "Invalid credentials",
  "status": 401
}
```

---

## 🛠️ Error Responses

All endpoints follow consistent error format:

```json
{
  "error": "Error message",
  "details": "Optional detailed error info"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## 🚀 Integration Examples

### JavaScript / Fetch

```javascript
// Create lead
const response = await fetch('/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    message: 'Hello'
  })
});

const data = await response.json();
console.log(data);
```

### React Hook

```javascript
import { useAPI } from '@/hooks/useAPI';

function MyComponent() {
  const { data, loading, error } = useAPI('/api/services');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return <div>{data?.services.length} services</div>;
}
```

---

## 📊 Rate Limiting

Currently no rate limiting. Consider adding for production:
- Per IP: 100 requests/minute
- Per API key: 1000 requests/hour

---

## 🔒 Security Headers

Add to production:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

---

## 📞 Support

For API issues:
1. Check endpoint URL
2. Verify request body format
3. Check response status code
4. Review error message
5. Check Appwrite dashboard for DB errors

---

**Last Updated:** March 19, 2024
**API Version:** v1.0.0
