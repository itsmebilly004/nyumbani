# Nyumbani CMS Setup Guide (Mitchelle)

## 🎯 Your Mission
Set up a headless CMS to power the Stories section, proving Nyumbani content can scale without developers.

## 📦 Tech Stack (Choose ONE)

### Option A: Strapi (Recommended - Self-hosted, Free)
- More control
- Free hosting on Railway/Render
- Perfect for MVP

### Option B: Contentful (Managed, Free Tier)
- Faster setup
- No hosting needed
- Good free tier

**Recommendation: Start with Strapi for full control**

---

## 🚀 Strapi Setup (Step-by-Step)

### Day 1: Local Setup

#### Step 1: Create Strapi Project

```powershell
# In Projects directory (separate from backend)
cd C:\Users\ADMIN\Projects
npx create-strapi-app@latest nyumbani-cms --quickstart

# This will:
# - Create a new Strapi project
# - Install dependencies
# - Start the server
# - Open admin panel in browser
```

#### Step 2: Create Admin Account

When browser opens (http://localhost:1337/admin):
1. Fill in your details:
   - First name: Your name
   - Email: your email
   - Password: secure password
2. Click "Let's start"

#### Step 3: Create "Story" Content Type

1. In Strapi admin, go to **Content-Type Builder** (left sidebar)
2. Click **"Create new collection type"**
3. Display name: `Story`
4. Click **Continue**

5. Add fields:

**Field 1: Title**
- Type: Text
- Name: `title`
- Short text
- Required: ✅

**Field 2: Author**
- Type: Text
- Name: `author`
- Short text
- Required: ✅

**Field 3: Excerpt**
- Type: Text
- Name: `excerpt`
- Long text
- Required: ✅

**Field 4: Body**
- Type: Rich Text
- Name: `body`
- Required: ✅

**Field 5: Published Date**
- Type: Date
- Name: `published_date`
- Date only
- Required: ❌ (optional)

6. Click **Save**
7. Strapi will restart automatically

#### Step 4: Add Sample Stories

1. Go to **Content Manager** → **Story** (left sidebar)
2. Click **"Create new entry"**

**Story 1:**
```
Title: Finding Home in Nairobi's Tech Scene
Author: Sarah Mwangi
Excerpt: After 15 years in Silicon Valley, I returned to Kenya and found a thriving tech ecosystem that felt like coming home.
Body: 
Growing up in the diaspora, I always heard stories about Kenya but never truly felt connected. In 2022, I took a leap of faith and moved to Nairobi. What I found was beyond my expectations—a vibrant tech community, opportunities to contribute meaningfully, and a sense of belonging I'd never experienced before. The Nyumbani program helped me navigate this transition, connecting me with mentors and a community of returners who understood the journey.

Published Date: 2024-01-15
```

**Story 2:**
```
Title: Reconnecting with My Roots Through Cultural Exchange
Author: James Omondi
Excerpt: A journey from London to Kisumu taught me that home isn't just a place—it's a feeling, a community, and a shared story.
Body:
I was born in London to Kenyan parents, and Kenya was always a vacation destination. Through Nyumbani, I spent six months living in Kisumu, learning Luo traditions, and working with local NGOs. The experience transformed how I see myself. I'm no longer just "Kenyan-British"—I'm fully Kenyan, fully British, and fully myself. The bonds I formed and the culture I absorbed have given me roots I'll carry forever.

Published Date: 2024-02-10
```

3. Click **Save** for each story
4. Click **Publish** (important!)

#### Step 5: Configure API Permissions (Make Stories Public)

1. Go to **Settings** (left sidebar, bottom)
2. Under "Users & Permissions Plugin", click **Roles**
3. Click **Public** role
4. Scroll to **Story** permissions
5. Check these boxes:
   - ✅ `find` (get all stories)
   - ✅ `findOne` (get single story)
6. Click **Save**

#### Step 6: Test API Locally

Open PowerShell and test:
```powershell
# Get all stories
curl http://localhost:1337/api/stories

# Expected response (JSON with your stories)
```

If you see JSON data with your stories, you're done with local setup! ✅

---

### Day 2-3: Deploy to Production

#### Recommended: Railway Deployment

**Step 1: Prepare for Deployment**

Update `package.json` in your Strapi project:
```json
{
  "engines": {
    "node": ">=18.0.0 <=20.x.x",
    "npm": ">=6.0.0"
  }
}
```

**Step 2: Push to GitHub**
```powershell
cd C:\Users\ADMIN\Projects\nyumbani-cms
git init
git add .
git commit -m "Initial Strapi setup"
git branch -M main
# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/nyumbani-cms.git
git push -u origin main
```

**Step 3: Deploy on Railway**

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose `nyumbani-cms` repository
5. Railway will auto-detect Strapi

**Step 4: Add PostgreSQL Database**

1. In Railway project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway automatically links `DATABASE_URL`

**Step 5: Configure Environment Variables**

In Railway → Your Strapi Service → Variables, add:

```
NODE_ENV=production
DATABASE_CLIENT=postgres
APP_KEYS=[generate random string]
API_TOKEN_SALT=[generate random string]
ADMIN_JWT_SECRET=[generate random string]
JWT_SECRET=[generate random string]
```

To generate random strings, run in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run this 4 times and use each output for the variables above.

**Step 6: Get Your Production URL**

Railway will give you a URL like:
```
https://nyumbani-cms-production.up.railway.app
```

**Step 7: Create Admin Account in Production**

1. Go to your production URL + `/admin`
2. Create admin account again (production is separate from local)
3. Re-create your Story content type (or Strapi might have migrated it)
4. Add your 2 sample stories again
5. Re-configure Public permissions for Story (find + findOne)

**Step 8: Test Production API**

```powershell
curl https://your-production-url.up.railway.app/api/stories
```

You should see your stories!

---

## 📡 API Endpoints to Share

Once deployed, share these with **Hana (Frontend Lead)**:

```
Base URL: https://your-production-url.up.railway.app

Get all stories:
GET /api/stories

Response format:
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Finding Home in Nairobi's Tech Scene",
        "author": "Sarah Mwangi",
        "excerpt": "After 15 years...",
        "body": "Growing up in the diaspora...",
        "published_date": "2024-01-15",
        "createdAt": "...",
        "updatedAt": "..."
      }
    }
  ]
}
```

---

## 🎯 Alternative: Contentful (Faster Setup)

If Strapi deployment is taking too long, use Contentful:

### Quick Contentful Setup

1. **Sign up** at [contentful.com](https://contentful.com)
2. Create new space: "Nyumbani Stories"
3. **Create Content Model**:
   - Content type name: "Story"
   - Fields:
     - Title (Short text, required)
     - Author (Short text, required)
     - Excerpt (Long text, required)
     - Body (Rich text, required)
     - Published Date (Date & time, optional)

4. **Add Content**:
   - Add the 2 sample stories from above

5. **Get API Keys**:
   - Settings → API keys
   - Add API key
   - Copy:
     - Space ID
     - Content Delivery API access token

6. **Share with Hana**:
```
Space ID: [your-space-id]
Access Token: [your-access-token]

API Endpoint:
https://cdn.contentful.com/spaces/[SPACE-ID]/environments/master/entries?content_type=story&access_token=[ACCESS-TOKEN]
```

---

## 📝 Your Deliverables Checklist

- [ ] CMS set up (Strapi or Contentful)
- [ ] "Story" content type created
- [ ] 2 sample stories added
- [ ] Stories published
- [ ] API access configured (public read)
- [ ] Production URL obtained
- [ ] API tested (can fetch stories)
- [ ] Endpoint shared with Hana
- [ ] Short documentation written

---

## 📄 Documentation to Create

Create a simple file: `CMS_README.md`

```markdown
# Nyumbani CMS - Stories API

## Production URL
https://[your-strapi-url].up.railway.app

## API Endpoint
GET /api/stories

## Response Format
See above example

## How to Add More Stories
1. Go to https://[your-url]/admin
2. Log in with admin credentials
3. Content Manager → Story → Create new entry
4. Fill in all fields
5. Save and Publish

## Admin Credentials
[Store securely, share with team lead only]
```

---

## 🧪 Testing Checklist

**Before sharing with team:**

1. ✅ Can access Strapi admin panel
2. ✅ Stories are created and published
3. ✅ API endpoint returns JSON with stories
4. ✅ Public role has find + findOne permissions
5. ✅ Production URL is stable
6. ✅ No authentication required to fetch stories

**Test commands:**
```powershell
# Health check
curl https://your-url.up.railway.app

# Get stories
curl https://your-url.up.railway.app/api/stories

# Should return JSON, not 403 Forbidden
```

---

## 🎯 Timeline

**Day 1 (Wednesday):**
- Set up Strapi locally
- Create Story content type
- Add 2 sample stories
- Configure permissions
- Test locally

**Day 2 (Thursday):**
- Push to GitHub
- Deploy to Railway
- Set up production database
- Re-configure in production

**Day 3 (Friday):**
- Test production API
- Share endpoint with Hana
- Write documentation

**Day 4 (Saturday):**
- Monitor API
- Add more stories if needed
- Support Hana with integration

**Day 5 (Monday):**
- Final checks
- Demo preparation

---

## 📞 Integration with Team

### With Hana (Frontend):
- Share production API URL by Day 3
- Provide sample API response
- Help debug any CORS or API issues

### With Nestor (QA):
- Ensure API is accessible
- Stories load correctly
- No broken data

---

## 💡 Tips

1. **Keep stories short**: MVP only needs 2 stories, keep them concise
2. **Test early**: Make sure API is public before sharing
3. **Documentation**: Simple docs help Hana integrate faster
4. **CORS**: Strapi handles CORS automatically, but verify it works
5. **Commit often**: Push CMS config to GitHub regularly

---

## 🎬 Demo Preparation

Be ready to show:
1. Strapi admin panel
2. How to add/edit stories (live demo)
3. Stories appearing on frontend
4. How non-developers can update content

**Quick demo script:**
- "Here's our CMS where we manage stories"
- "I can add a new story in under 2 minutes"
- "No code required—just fill in the form"
- "It automatically appears on the website"

---

## 🚨 Troubleshooting

### Issue: "Cannot fetch stories - 403 Forbidden"
**Solution:** Check Public role permissions (Settings → Roles → Public → Story → find + findOne)

### Issue: "CORS error when fetching from frontend"
**Solution:** In Strapi, go to Settings → Security → CORS. Make sure origins are allowed.

### Issue: "Railway deployment failed"
**Solution:** Check Node version in package.json, should be 18-20

### Issue: "Stories not showing in API response"
**Solution:** Make sure stories are Published (not just Saved as draft)

---

## ✅ Success Criteria

Your CMS is ready when:
- ✅ 2 stories are created and published
- ✅ API endpoint returns JSON with stories
- ✅ Frontend team can fetch stories without authentication
- ✅ You can add/edit stories through admin panel
- ✅ Production URL is stable and shared with team

---

**You've got this! The CMS is a crucial part of proving Nyumbani can scale. 🚀**
