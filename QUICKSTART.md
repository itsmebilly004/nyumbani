# Nyumbani Backend - Quick Start Guide

Get the backend running in **5 minutes**.

## Prerequisites Check
```powershell
# Check Node.js version (need 18+)
node --version

# Check if PostgreSQL is installed
psql --version
```

## Setup Steps

### 1. Install Dependencies (1 min)
```powershell
cd backend
npm install
```

### 2. Set Up Database (2 min)

**Option A: Local PostgreSQL**
```powershell
# Create database
psql -U postgres
CREATE DATABASE nyumbani;
\q

# Create .env file
copy .env.example .env

# Edit .env with your PostgreSQL credentials
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/nyumbani?schema=public"
```

**Option B: Use Free Cloud Database (Supabase)**
1. Go to [supabase.com](https://supabase.com) → Create account
2. Create new project → Copy connection string
3. Create `.env` file with that connection string

### 3. Initialize Database (1 min)
```powershell
npm run prisma:generate
npm run prisma:migrate
```

### 4. Start Server (1 min)
```powershell
npm run dev
```

You should see:
```
🚀 Nyumbani Backend API running on port 3000
📍 Environment: development
🔗 Health check: http://localhost:3000/
```

## Test It Works

### Test 1: Health Check
Open browser: http://localhost:3000

Should see:
```json
{
  "message": "Nyumbani Backend API",
  "status": "active"
}
```

### Test 2: Submit Application
```powershell
curl -X POST http://localhost:3000/applications `
  -H "Content-Type: application/json" `
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "country": "Kenya",
    "relationship_to_kenya": "Born and raised in Nairobi",
    "interest_area": "Tech entrepreneurship"
  }'
```

Should return:
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "...",
    "created_at": "..."
  }
}
```

## View Data
```powershell
npm run prisma:studio
```

Opens browser at http://localhost:5555 where you can see all applications.

## Troubleshooting

### Error: "Can't reach database server"
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Test connection: `psql $DATABASE_URL`

### Error: "Port 3000 already in use"
- Change PORT in .env to 3001 or another port
- Or stop other process: `netstat -ano | findstr :3000`

### Error: "prisma command not found"
- Delete node_modules: `rm -r node_modules`
- Reinstall: `npm install`

## Next Steps

1. ✅ Backend running locally
2. Share `http://localhost:3000` with frontend team
3. When ready to deploy, see README.md deployment section
4. Update frontend with your deployed URL

## Quick Commands Reference
```powershell
npm run dev              # Start development server
npm run prisma:studio    # View database in browser
npm run prisma:generate  # Regenerate Prisma client
npm run prisma:migrate   # Create/run migrations
```

---

**Need help?** Check the full README.md or contact Billy (Backend Lead)
