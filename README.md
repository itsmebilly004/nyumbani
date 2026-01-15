# Nyumbani MVP - 1-Week Build

**Backend API for the Nyumbani homecoming journey platform.**

## 🚀 Quick Start for Team

### 📋 Team Guides (READ THESE FIRST!)

- **Everyone**: Start with `TEAM_COORDINATION.md` - Master plan for the week
- **Billy (Backend)**: `MVP_SETUP.md` - Your step-by-step guide
- **Hana (Frontend)**: `FRONTEND_GUIDE.md` - Vite + React setup
- **Mitchelle (CMS)**: `CMS_GUIDE.md` - Strapi/Contentful setup
- **Nestor (QA)**: `TEAM_COORDINATION.md` - Integration & demo prep

---

## 📦 What's Been Built (Backend)

✅ Node.js + Express server
✅ PostgreSQL database (Prisma ORM)
✅ POST /applications endpoint
✅ Input validation & error handling
✅ Deployment configs (Railway & Render)
✅ Authentication + admin endpoints for internal use

---

## Backend API Documentation

## 🎯 Purpose

This backend handles application submissions from diaspora members interested in the Nyumbani homecoming journey. It stores submissions in a PostgreSQL database and provides a REST API for the frontend.

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: express-validator

## 📋 API Endpoints

### Base URL
- **Local**: `http://localhost:3000`
- **Production**: `[YOUR_DEPLOYMENT_URL]`

---

### Auth Endpoints (JWT)
All auth endpoints are prefixed with `/api/auth` and return JSON with `{ success, message, data }`.

- `POST /api/auth/register` — Register a new user (email, password, name).
- `POST /api/auth/login` — Login and receive `accessToken` + `refreshToken`.
- `POST /api/auth/refresh` — Exchange a refresh token for a new access token.
- `GET /api/auth/profile` — Get current user profile (requires `Authorization: Bearer <accessToken>`).
- `PUT /api/auth/profile` — Update basic profile info (e.g. name).
- `PUT /api/auth/change-password` — Change password for logged-in user.

---

### Admin Endpoints
These are protected by JWT + admin role and are prefixed with `/api/admin`.

- `GET /api/admin/stats` — High-level dashboard stats (total users, applications, etc.).
- `GET /api/admin/applications` — Paginated list of applications with optional `page`, `limit`, `search`.
- `GET /api/admin/applications/:id` — Single application detail.
- `DELETE /api/admin/applications/:id` — Delete an application.
- `GET /api/admin/users` — Paginated user list with optional `page`, `limit`, `role`, `search`.
- `GET /api/admin/users/:id` — Single user with their applications.
- `PATCH /api/admin/users/:id/role` — Update a user role (`user` or `admin`).
- `DELETE /api/admin/users/:id` — Delete a user (with self-delete protection).

---

### 1. Health Check
```
GET /
```

**Response:**
```json
{
  "message": "Nyumbani Backend API",
  "status": "active",
  "version": "1.0.0",
  "endpoints": {
    "health": "GET /",
    "submitApplication": "POST /applications"
  }
}
```

### 2. Submit Application
```
POST /applications
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "full_name": "Jane Wanjiru Doe",
  "email": "jane.doe@example.com",
  "country": "United States",
  "relationship_to_kenya": "My parents emigrated from Nairobi in 1995. I grew up hearing stories about home but have never visited.",
  "interest_area": "I'm interested in reconnecting with my roots, learning Swahili, and exploring opportunities in tech entrepreneurship in Kenya."
}
```

**Validation Rules:**
- `full_name`: Required, 2-100 characters
- `email`: Required, valid email format
- `country`: Required, 2-100 characters
- `relationship_to_kenya`: Required, 2-500 characters
- `interest_area`: Required, 2-500 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400 - Validation Failed):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "An error occurred while processing your application"
}
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18 or higher
- PostgreSQL database
- npm or yarn

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3000
NODE_ENV=development
```

### 3. Set Up Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view data
npm run prisma:studio
```

### 4. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:3000`

## 📊 Database Schema

### `applications` Table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| full_name | String | Applicant's full name |
| email | String | Applicant's email address |
| country | String | Current country of residence |
| relationship_to_kenya | String | Description of connection to Kenya |
| interest_area | String | Areas of interest in the homecoming journey |
| created_at | DateTime | Timestamp of submission (auto-generated) |

## 🌐 Deployment

### Railway Deployment

1. **Install Railway CLI** (optional):
   ```bash
   npm install -g @railway/cli
   ```

2. **Create a new Railway project**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository

3. **Add PostgreSQL**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set `DATABASE_URL`

4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3000
   ```

5. **Deploy**:
   - Railway will automatically detect Node.js and deploy
   - Run migrations: `npm run prisma:deploy`

### Render Deployment

1. **Create New Web Service**:
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your repository

2. **Configure Service**:
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
   - **Environment**: Node

3. **Add PostgreSQL**:
   - Click "New" → "PostgreSQL"
   - Link to your web service

4. **Environment Variables**:
   ```
   DATABASE_URL=[Auto-filled by Render]
   NODE_ENV=production
   ```

5. **Deploy**: Render will automatically build and deploy

## 🧪 Testing the API

### Using curl
```bash
# Health check
curl http://localhost:3000

# Submit application
curl -X POST http://localhost:3000/applications \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Jane Doe",
    "email": "jane@example.com",
    "country": "USA",
    "relationship_to_kenya": "Second-generation diaspora",
    "interest_area": "Cultural reconnection"
  }'
```

### Using Postman
1. Create a new POST request to `http://localhost:3000/applications`
2. Set header: `Content-Type: application/json`
3. Add JSON body with required fields
4. Send request

## 📦 Project Structure
```
nyumbani/
├── src/
│   ├── index.js              # Main Express server
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints (/api/auth/*)
│   │   └── adminRoutes.js    # Admin endpoints (/api/admin/*)
│   ├── controllers/
│   │   └── authController.js # Auth controller logic
│   ├── middleware/
│   │   └── auth.js           # JWT auth + role guards
│   └── utils/
│       ├── jwt.js            # Token generation/verification
│       └── password.js       # Password hashing helpers
├── prisma/
│   └── schema.prisma         # Database schema (User, Application)
├── scripts/
│   └── seedAdmin.js          # Seed initial admin user
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🔒 Security Notes
- CORS is enabled for all origins (configure for production)
- Input validation on all fields
- Environment variables for sensitive data
- No authentication required for MVP (add for production)

## 📝 MVP Scope
**What's Included:**
- ✅ POST endpoint for application submissions
- ✅ PostgreSQL database with Prisma ORM
- ✅ Input validation
- ✅ Error handling
- ✅ JWT-based authentication APIs (`/api/auth/*`)
- ✅ Admin management APIs (`/api/admin/*`) for applications, users, and stats

**What's NOT Included (By Design):**
- ❌ Payments
- ❌ File uploads
- ❌ Complex multi-tenant permissions

## 👥 Team
**Backend Lead**: Billy

### Backend & Database Lead – Billy

**Your Mission**  
Build the real backend that proves Nyumbani is not a mockup.

**You Will Build**

- **Backend server**  
  - Node.js + Express  
  - Basic project structure
- **Database**  
  - PostgreSQL  
  - Prisma ORM
- **Application storage**  
  - One table: `applications` with fields:
    - `id`
    - `full_name`
    - `email`
    - `country`
    - `relationship_to_kenya`
    - `interest_area`
    - `created_at`
- **API endpoint**  
  - `POST /applications`  
  - Validate required fields  
  - Save to DB  
  - Return success / error response
- **Deployment**  
  - Deploy backend (Railway / Render / AWS)  
  - Share live API URL with frontend

**What You Must NOT Build (original MVP constraint)**

- User authentication  
- Admin dashboards  
- Update/delete endpoints  
- Complex schemas

**Your Final Deliverables**

- Live API endpoint  
- Database storing submissions  
- `README` with:
  - API endpoint  
  - Expected request body

## 📞 Support
For issues or questions, contact the development team or check the project documentation.

---

**Live API URL**: `[TO BE UPDATED AFTER DEPLOYMENT]`

**Last Updated**: January 2026
