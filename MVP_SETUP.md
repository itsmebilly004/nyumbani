# Nyumbani MVP - Complete Setup Guide

## 🎯 Current Status

✅ **Backend code is ready** (Node.js + Express + Prisma)
✅ **MVP scope aligned** (No auth, no dashboards, just application endpoint)
✅ **Dependencies installed**

## 📋 Day 1 Tasks (TODAY - Wednesday)

### Billy (Backend Lead) - YOU ARE HERE

#### Step 1: Set Up Database (Choose ONE option)

**Option A: Local PostgreSQL (If you have it installed)**
```powershell
# Update .env with your local connection
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/nyumbani?schema=public"
```

**Option B: Supabase (Recommended - Free & Fast)**
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project: "nyumbani-mvp"
4. Copy connection string (Settings → Database → Connection String → URI)
5. Update `.env`:
   ```
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
   ```

**Option C: Neon (Also Free & Fast)**
1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create project
4. Copy connection string
5. Update `.env`

#### Step 2: Generate Prisma Client & Create Database
```powershell
npm run prisma:generate
npm run prisma:migrate
```

When prompted for migration name, type: `init`

#### Step 3: Test Backend Locally
```powershell
npm run dev
```

Expected output:
```
🚀 Nyumbani Backend API running on port 3000
📍 Environment: development
🔗 Health check: http://localhost:3000/
```

#### Step 4: Test the API
Open another PowerShell window and run:
```powershell
./test-api.ps1
```

Or manually test:
```powershell
# Health check
curl http://localhost:3000

# Submit test application
curl -X POST http://localhost:3000/applications `
  -H "Content-Type: application/json" `
  -d '{\"full_name\":\"Test User\",\"email\":\"test@example.com\",\"country\":\"Kenya\",\"relationship_to_kenya\":\"Testing the system\",\"interest_area\":\"Software development\"}'
```

#### Step 5: View Data in Database
```powershell
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` where you can see submitted applications.

---

## 📋 Day 2-3 Tasks (Thursday-Friday)

### Billy: Deploy Backend to Production

#### Recommended: Railway Deployment

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your `nyumbani` repository

3. **Add PostgreSQL Database**
   - In your project, click "New"
   - Select "Database" → "PostgreSQL"
   - Railway auto-generates `DATABASE_URL`

4. **Configure Environment Variables**
   - Click on your service → "Variables"
   - Add:
     ```
     NODE_ENV=production
     PORT=3000
     ```

5. **Deploy**
   - Railway auto-deploys on push
   - Get your production URL (e.g., `nyumbani-production.up.railway.app`)

6. **Run Database Migration**
   - In Railway dashboard → Service → "Deployments" → Latest deployment
   - Open "Logs"
   - Or run manually via Railway CLI

7. **Share with Team**
   - Production API URL: `https://[your-app].up.railway.app`
   - Share in team chat/docs
   - Update README.md with live URL

#### Alternative: Render Deployment

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Configure:
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
5. Add PostgreSQL database (New → PostgreSQL)
6. Set environment: `NODE_ENV=production`

---

## 👥 Team Integration Points

### For Hana (Frontend Lead)

**Day 1-3: Use Local Backend**
```javascript
const API_URL = 'http://localhost:3000';

// Example: Submit application
const response = await fetch(`${API_URL}/applications`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    full_name: formData.fullName,
    email: formData.email,
    country: formData.country,
    relationship_to_kenya: formData.relationship,
    interest_area: formData.interest
  })
});

const result = await response.json();
if (result.success) {
  // Show success message
} else {
  // Show errors: result.errors or result.message
}
```

**Day 4+: Switch to Production**
```javascript
const API_URL = 'https://[billy-provides-this].railway.app';
```

### For Mitchelle (CMS Lead)

CMS will be separate from backend. Focus on:
- Strapi or Contentful setup
- Create "Story" content type
- Add 1-2 sample stories
- Provide read-only API endpoint to Hana

### For Nestor/Mitchelle (QA Lead)

**Daily Checks:**
```powershell
# Test backend health
curl https://[production-url]

# Test application submission
curl -X POST https://[production-url]/applications `
  -H "Content-Type: application/json" `
  -d '{\"full_name\":\"QA Test\",\"email\":\"qa@test.com\",\"country\":\"USA\",\"relationship_to_kenya\":\"Testing\",\"interest_area\":\"QA\"}'
```

---

## 🎯 MVP Checklist

### Backend (Billy)
- [x] Code complete (simplified to MVP scope)
- [ ] Local testing complete
- [ ] Database connected
- [ ] POST /applications working
- [ ] Deployed to Railway/Render
- [ ] Production URL shared with team
- [ ] Documentation updated with live URL

### Frontend (Hana)
- [ ] Vite + React project setup
- [ ] Tailwind CSS configured
- [ ] Homepage designed
- [ ] 3-step Journey pages created
- [ ] Application form built
- [ ] Form connected to backend API
- [ ] Story preview page with CMS data
- [ ] Deployed (Vercel/Netlify)

### CMS (Mitchelle)
- [ ] Strapi/Contentful setup
- [ ] Story content type created
- [ ] 2 sample stories added
- [ ] API endpoint configured
- [ ] Read access enabled
- [ ] Endpoint shared with Hana

### Integration (Nestor/Mitchelle)
- [ ] Backend API tested
- [ ] Frontend → Backend connection verified
- [ ] CMS → Frontend connection verified
- [ ] Mobile responsiveness checked
- [ ] Demo flow documented
- [ ] Bug list maintained

---

## 🚨 Common Issues & Solutions

### Issue: "Prisma Client not generated"
**Solution:**
```powershell
npm run prisma:generate
```

### Issue: "Can't connect to database"
**Solution:**
- Check `.env` file has correct `DATABASE_URL`
- Verify database is running (local) or credentials are correct (cloud)
- For Supabase/Neon: check you're using pooled connection string

### Issue: "npm run dev" fails
**Solution:**
```powershell
# Reinstall dependencies
rm -r node_modules
rm package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
**Solution:**
```powershell
# Change port in .env
PORT=3001
```

---

## 📞 Need Help?

- **Backend issues**: Check `README.md` and `QUICKSTART.md`
- **Deployment issues**: Check `DEPLOYMENT.md`
- **Database issues**: Check Prisma docs or cloud provider docs

---

## 🎬 Demo Preparation (Day 5)

Billy should prepare:
1. Production API is stable
2. Database has some test data
3. Can demonstrate:
   - Application submission works
   - Data is stored correctly
   - Error handling works

**5-Minute Demo Script:**
1. Show homepage (Hana's work)
2. Walk through 3 journey steps (Hana's work)
3. Fill out application form
4. Submit → Show success message
5. Show stories from CMS (Mitchelle's work)
6. (Behind scenes) Show data in database

---

## ✅ What's Already Done

- ✅ Express.js server configured
- ✅ Prisma schema defined (applications table)
- ✅ POST /applications endpoint with validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Test scripts included
- ✅ Deployment configs (Railway & Render)
- ✅ Complete documentation

## 🎯 What You Need to Do NOW

1. Set up database (Supabase recommended - 5 minutes)
2. Run migrations (1 minute)
3. Test locally (2 minutes)
4. Deploy to Railway (10 minutes)
5. Share production URL with team

**Total time: ~20 minutes to production!**
