# Nyumbani Backend - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Local Testing Complete
- [ ] Backend runs locally without errors (`npm run dev`)
- [ ] Can submit applications via API
- [ ] Data appears in Prisma Studio
- [ ] Test script passes (`./test-api.ps1`)
- [ ] Frontend can connect to local API

### ✅ Code Ready
- [ ] `.env` file is in `.gitignore` (already done)
- [ ] All secrets are in environment variables
- [ ] No hardcoded credentials in code
- [ ] CORS configured appropriately

## Railway Deployment (Recommended)

### Step 1: Create Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway to access your repository

### Step 2: Create Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your Nyumbani repository
4. Select the `backend` folder (if monorepo)

### Step 3: Add Database
1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway automatically creates `DATABASE_URL` variable

### Step 4: Configure Environment Variables
In Railway dashboard → Variables:
```
NODE_ENV=production
PORT=3000
```

Note: `DATABASE_URL` is automatically set by Railway

### Step 5: Deploy
1. Railway auto-detects Node.js
2. Runs: `npm install` → `npx prisma generate` → `npm start`
3. First deploy takes 2-3 minutes

### Step 6: Run Migrations
In Railway → your service → Settings → Deploy:
```bash
npm run prisma:deploy
```

### Step 7: Get Your URL
1. Railway generates a URL: `https://your-app.railway.app`
2. Copy this URL
3. Share with frontend team (Hana)
4. Update README.md with production URL

## Render Deployment (Alternative)

### Step 1: Create Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create PostgreSQL Database
1. Dashboard → New → PostgreSQL
2. Name: `nyumbani-db`
3. Free tier is sufficient
4. Copy the "Internal Database URL"

### Step 3: Create Web Service
1. Dashboard → New → Web Service
2. Connect GitHub repository
3. Configuration:
   - **Name**: `nyumbani-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main` or `master`
   - **Root Directory**: `backend` (if monorepo)
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 4: Environment Variables
Add in Render → Environment:
```
DATABASE_URL=[paste Internal Database URL from step 2]
NODE_ENV=production
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 3-5 minutes for build
3. Render provides URL: `https://nyumbani-backend.onrender.com`

## Post-Deployment Verification

### Test Production API
```powershell
# Replace with your actual URL
$PROD_URL = "https://your-app.railway.app"

# Health check
curl $PROD_URL

# Submit test application
curl -X POST "$PROD_URL/applications" `
  -H "Content-Type: application/json" `
  -d '{
    "full_name": "Test Production User",
    "email": "test@production.com",
    "country": "Kenya",
    "relationship_to_kenya": "Testing production deployment",
    "interest_area": "Ensuring everything works"
  }'
```

### Verify Database
```powershell
# Connect to production database (Railway/Render provides connection strings)
# Run in your terminal:
npm run prisma:studio

# Or connect via Railway/Render dashboard
```

## Update Team

### Share with Frontend (Hana)
Send message:
```
✅ Backend Deployed!

Production API URL: [YOUR_URL]
Status: Active

Endpoints:
- Health: GET [YOUR_URL]/
- Submit Application: POST [YOUR_URL]/applications

Request format same as local (see README.md)

Test with:
curl [YOUR_URL]
```

### Update README
Update line 285 in README.md:
```markdown
**Live API URL**: `https://your-actual-url.railway.app`
```

## Monitoring

### Railway
- Dashboard → Metrics shows requests, errors, response times
- Logs available in real-time
- Auto-deploys on git push

### Render
- Dashboard → Logs for debugging
- Metrics show uptime and performance
- Manual deploy or auto-deploy on push

## Common Issues & Solutions

### Issue: "Can't reach database"
**Solution:**
- Check `DATABASE_URL` is set correctly
- Verify database service is running
- Check firewall/security groups

### Issue: "Module not found"
**Solution:**
- Ensure `npm install` ran in build
- Check `package.json` has all dependencies
- Redeploy to trigger fresh build

### Issue: "Prisma Client not generated"
**Solution:**
- Add to build command: `npx prisma generate`
- Check build logs for errors
- Verify `@prisma/client` in dependencies

### Issue: "Port already in use"
**Solution:**
- Railway/Render auto-assign ports
- Use `process.env.PORT` (already configured)
- Don't hardcode port 3000 in production

## Cost Expectations

### Railway Free Tier
- ✅ Perfect for MVP
- $5 free credit per month
- Should cover demo period
- Upgrade if traffic grows

### Render Free Tier
- ✅ Free forever for hobby projects
- Spins down after 15 min inactivity
- First request after spin-down takes 30-60 seconds
- Upgrade for always-on

## Security Notes

### Before Launch
- [ ] CORS configured for your frontend domain only
- [ ] Rate limiting considered (add if needed)
- [ ] HTTPS enabled (Railway/Render do this automatically)
- [ ] Environment variables never in code
- [ ] Database backups enabled (check provider settings)

### Production CORS (Optional)
Edit `src/index.js` line 18:
```javascript
// Development (allow all)
app.use(cors());

// Production (restrict to frontend)
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

## Rollback Plan

### If Something Goes Wrong
1. **Railway**: Dashboard → Deployments → Rollback to previous
2. **Render**: Dashboard → Manual Deploy → Select previous commit
3. **Database**: Restore from backup (if you made schema changes)

## Next Steps After Deployment

1. ✅ Backend deployed and tested
2. Share URL with Hana (Frontend)
3. Test integration with real frontend
4. Monitor for errors in first 24 hours
5. Be ready for Day 4 integration (per project plan)

## Support

### Railway Support
- [Railway Discord](https://discord.gg/railway)
- [Railway Docs](https://docs.railway.app)

### Render Support
- [Render Community](https://community.render.com)
- [Render Docs](https://render.com/docs)

---

**Deployment Lead**: Billy (Backend) + Nestor/Mitchelle (Integration)

**Target**: Day 2-3 of MVP build plan
