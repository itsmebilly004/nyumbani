# Nyumbani MVP - Team Coordination Guide

## 🎯 Mission
Build a credible MVP in 1 week to accompany the Nyumbani proposal.

**Rule: If it doesn't help the demo, don't build it.**

---

## 👥 Team Roster & Responsibilities

### Billy - Backend & Database Lead
**Your Guides:** `MVP_SETUP.md`, `README.md`, `DEPLOYMENT.md`

**Deliverables:**
- ✅ Backend API (Node.js + Express)
- ✅ PostgreSQL database
- ✅ POST /applications endpoint
- ✅ Live production API URL

**Daily Goals:**
- **Day 1 (Wed)**: Database setup, local testing
- **Day 2-3 (Thu-Fri)**: Deploy to Railway/Render, share production URL
- **Day 4 (Sat)**: Monitor API, support integration
- **Day 5 (Mon)**: Final checks, demo prep

---

### Hana - Frontend Lead (Vite + React)
**Your Guide:** `FRONTEND_GUIDE.md`

**Deliverables:**
- Homepage with CTA
- 3-step Homecoming Journey
- Working application form
- Stories preview page
- Mobile-responsive
- Deployed frontend

**Daily Goals:**
- **Day 1-2 (Wed-Thu)**: Project setup, homepage, journey steps
- **Day 3 (Fri)**: Application form, test with local backend
- **Day 4 (Sat)**: Production integration, CMS data, polish
- **Day 5 (Mon)**: Deploy, QA, demo prep

---

### Mitchelle - CMS & Content Lead
**Your Guide:** `CMS_GUIDE.md`

**Deliverables:**
- Strapi or Contentful CMS
- "Story" content type
- 2 sample stories (published)
- Public API endpoint
- Simple documentation

**Daily Goals:**
- **Day 1 (Wed)**: CMS setup locally, add stories
- **Day 2-3 (Thu-Fri)**: Deploy CMS, configure production
- **Day 4 (Sat)**: Support Hana's integration
- **Day 5 (Mon)**: Demo prep (show how to add stories)

---

### Nestor/Mitchelle - Integration, QA & Demo Lead

**Deliverables:**
- All integrations working
- Bug list (tracked and fixed)
- 5-minute demo script
- QA report

**Daily Goals:**
- **Day 1 (Wed)**: Scope control, initial checks
- **Day 2-3 (Thu-Fri)**: Test each component as it goes live
- **Day 4 (Sat)**: Full integration testing
- **Day 5 (Mon)**: Final QA, demo rehearsal

---

## 📅 Daily Execution Plan

### Day 1 - Wednesday (TODAY)

**Team Sync (Start of Day)**
- Confirm everyone has their guides
- Set up communication channel (Slack/Discord/WhatsApp)
- Agree on end-of-day check-in time

**Billy:**
- [ ] Set up database (Supabase/Neon recommended)
- [ ] Run Prisma migrations
- [ ] Test backend locally (`npm run dev`)
- [ ] Run test suite (`./test-api.ps1`)
- [ ] Confirm POST /applications works

**Hana:**
- [ ] Create Vite + React project
- [ ] Install dependencies (Tailwind, React Router)
- [ ] Build basic homepage
- [ ] Start journey step pages (static content)

**Mitchelle:**
- [ ] Set up Strapi locally
- [ ] Create "Story" content type
- [ ] Add 2 sample stories
- [ ] Configure public API access
- [ ] Test API locally

**Nestor/Mitchelle:**
- [ ] Review all guides
- [ ] Verify repos are set up
- [ ] Test Billy's local backend

**End of Day Check-in:**
- Everyone reports progress
- Blockers identified and resolved
- Confirm Day 2 goals

---

### Day 2-3 - Thursday & Friday

**Billy:**
- [ ] Deploy backend to Railway
- [ ] Set up PostgreSQL on Railway
- [ ] Run production migrations
- [ ] Test production API endpoint
- [ ] **Share production URL in team chat** ⭐

**Hana:**
- [ ] Complete homepage
- [ ] Complete all 3 journey steps
- [ ] Build application form component
- [ ] Test form with Billy's local API
- [ ] Build stories page structure

**Mitchelle:**
- [ ] Push CMS to GitHub
- [ ] Deploy Strapi to Railway
- [ ] Re-create stories in production
- [ ] Test production API
- [ ] **Share CMS API URL with Hana** ⭐
- [ ] Write short API documentation

**Nestor/Mitchelle:**
- [ ] Test Billy's production API
- [ ] Verify backend is stable
- [ ] Review frontend progress
- [ ] Create bug tracking list
- [ ] Plan integration tests for Day 4

**Critical Handoffs by End of Friday:**
- Billy → Hana: Production API URL
- Mitchelle → Hana: CMS API URL
- Everyone has deployed something

---

### Day 4 - Saturday (Integration Day)

**Billy:**
- [ ] Monitor API logs
- [ ] Fix any bugs reported by Nestor
- [ ] Ensure API handles multiple requests
- [ ] Check database for test submissions
- [ ] Support Hana with any API issues

**Hana:**
- [ ] Update API URL to production
- [ ] Integrate CMS data into stories page
- [ ] Test full flow: homepage → journey → form submission
- [ ] Polish styles (mobile + desktop)
- [ ] Fix any bugs found in QA

**Mitchelle:**
- [ ] Support Hana with CMS integration
- [ ] Verify stories are loading correctly
- [ ] Add more stories if time permits
- [ ] Test API accessibility from different sources

**Nestor/Mitchelle:**
- [ ] **Full integration testing** ⭐
  - Test homepage navigation
  - Test all journey steps
  - Submit 5 test applications
  - Verify data in backend database
  - Test stories page loads CMS data
- [ ] Mobile responsiveness check
- [ ] Create bug list, prioritize
- [ ] Share bugs with team immediately
- [ ] Start writing demo script

**End of Day:**
- Full MVP should be connected
- All major bugs identified
- Demo script drafted

---

### Day 5 - Monday (Polish & Demo)

**Billy:**
- [ ] Address any final backend bugs
- [ ] Verify API stability
- [ ] Prepare database view for demo
- [ ] Test demo flow from backend perspective

**Hana:**
- [ ] Fix remaining bugs
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Update environment variables in production
- [ ] Final UI polish
- [ ] Test deployed frontend end-to-end

**Mitchelle:**
- [ ] Final CMS checks
- [ ] Prepare CMS admin demo
- [ ] Practice adding a new story live

**Nestor/Mitchelle:**
- [ ] Final QA on deployed frontend
- [ ] Finalize demo script
- [ ] **Demo rehearsal with whole team** ⭐
- [ ] Time the demo (should be ~5 minutes)
- [ ] Prepare backup plan (what if something breaks)

**Team Demo Rehearsal:**
- Practice full 5-minute demo
- Everyone knows their part
- Test on actual devices (laptop + phone)
- Fix any last-minute issues

---

## 🎬 5-Minute Demo Script

**Introduction (30 seconds)**
- "Nyumbani helps diaspora reconnect with Kenya"
- "This is a working MVP, not a mockup"

**Homepage (30 seconds)**
- Show clean, welcoming homepage
- Click "Begin Your Homecoming Journey"

**Journey Steps (1 minute)**
- Quick walkthrough of 3 steps
- Identity → Belonging → Application CTA
- Click through to application form

**Application Submission (2 minutes)** ⭐ MOST IMPORTANT
- Fill out the form (use test data prepared in advance)
- Hit submit
- Show loading state
- **Show success confirmation** ← Proves it's real!
- (Behind scenes) Show data appeared in database (Billy)

**Stories Preview (1 minute)**
- Navigate to stories page
- Show 2 stories loaded from CMS
- (Optional) Mitchelle can show CMS admin panel

**Conclusion (30 seconds)**
- Recap what was built
- Emphasize: Real backend, real database, real CMS
- Ready to scale

---

## 🔗 Critical Integration Points

### Backend ↔ Frontend

**What Hana Needs from Billy:**
```javascript
// Production API URL
const API_URL = 'https://nyumbani-production.up.railway.app';

// Endpoint
POST /applications

// Request format
{
  full_name: string,
  email: string,
  country: string,
  relationship_to_kenya: string,
  interest_area: string
}

// Success response (201)
{
  success: true,
  message: "Application submitted successfully",
  data: { id: "...", created_at: "..." }
}

// Error response (400)
{
  success: false,
  message: "Validation failed",
  errors: [...]
}
```

**Testing Checklist:**
- [ ] Frontend can reach backend (no CORS errors)
- [ ] Form submission works
- [ ] Success message displays
- [ ] Errors display correctly
- [ ] Data appears in database

---

### CMS ↔ Frontend

**What Hana Needs from Mitchelle:**
```javascript
// CMS API URL
const CMS_URL = 'https://nyumbani-cms.up.railway.app';

// Endpoint
GET /api/stories

// Response format (Strapi)
{
  data: [
    {
      id: 1,
      attributes: {
        title: "Story Title",
        author: "Author Name",
        excerpt: "Short excerpt...",
        body: "Full story...",
        published_date: "2024-01-15"
      }
    }
  ]
}
```

**Testing Checklist:**
- [ ] Frontend can fetch stories (no CORS errors)
- [ ] Stories display correctly
- [ ] No 403 Forbidden errors
- [ ] Data is fresh (not cached old data)

---

## 🚨 Scope Control (CRITICAL)

### ✅ What IS in Scope

- Homepage (1 page)
- Journey steps (3 pages, static content)
- Application form (1 page, 5 fields)
- Stories preview (1 page, 2 stories)
- Backend API (1 endpoint: POST /applications)
- Database (1 table: applications)
- CMS (1 content type: stories)

### ❌ What is NOT in Scope

**Nestor/Mitchelle: STOP anyone who tries to build:**
- User authentication / login
- User profiles or dashboards
- Admin interfaces (except CMS which is separate)
- Password reset flows
- Email notifications
- Payment systems
- Multiple languages
- Perfect animations (simple transitions OK)
- SEO optimization beyond basics
- Analytics integration
- Social media sharing
- Comments or ratings
- Search functionality
- Filters or sorting
- Pagination (only 2 stories!)

**How to Stop Scope Creep:**
1. Politely say: "That's great for v2, but not MVP scope"
2. Refer to this document
3. Redirect focus to what MUST work for the demo

---

## 📊 Progress Tracking

### Quick Status Check (Use in Daily Standups)

**Billy (Backend):**
- [ ] Local backend works
- [ ] Database connected
- [ ] Production deployed
- [ ] URL shared with team

**Hana (Frontend):**
- [ ] Project set up
- [ ] Homepage complete
- [ ] Journey steps complete
- [ ] Form works locally
- [ ] Form connected to production
- [ ] Stories page loads CMS data
- [ ] Deployed

**Mitchelle (CMS):**
- [ ] Local CMS works
- [ ] Stories added
- [ ] Production deployed
- [ ] URL shared with Hana

**Nestor/Mitchelle (QA):**
- [ ] Backend tested
- [ ] Frontend tested
- [ ] Integration tested
- [ ] Mobile tested
- [ ] Demo script ready

---

## 💬 Communication Norms

**Daily Standups (15 minutes max):**
- What did you complete yesterday?
- What are you working on today?
- Any blockers?

**Immediate Escalation:**
- API not working
- Deployment failures
- Integration broken
- Scope creep attempts

**Share Immediately:**
- Production URLs
- API endpoints
- Critical bugs
- Blockers

**Don't Wait to Ask:**
- If you're stuck for >30 minutes, ask for help
- If something seems out of scope, confirm
- If a deadline seems unrealistic, speak up

---

## 🎯 Success Criteria

By end of Week:
- [ ] All components deployed and live
- [ ] Frontend → Backend integration works
- [ ] Frontend → CMS integration works
- [ ] Can do full demo without errors
- [ ] Demo is timed and rehearsed
- [ ] Mobile-responsive
- [ ] Basic error handling works
- [ ] No blockers remaining

**What "Done" Looks Like:**
- A person can visit the frontend URL
- Click through homepage → journey → form
- Submit an application successfully
- See success confirmation
- View stories from CMS
- All on mobile and desktop

---

## 🏆 Team Motivation

**Remember:**
- This is an MVP, not perfection
- Working > Pretty (but we can do both!)
- Done is better than perfect
- Every team member is critical
- We're building something real and meaningful

**By Monday, you'll have:**
- A deployed, working application
- Real experience with full-stack development
- A demo-ready product
- Proven teamwork skills

**Let's build Nyumbani! 🚀🇰🇪**

---

## 📞 Quick Contact Guide

**For Backend Issues:**
→ Contact Billy

**For Frontend Issues:**
→ Contact Hana

**For CMS Issues:**
→ Contact Mitchelle

**For Scope/Priority Questions:**
→ Contact Nestor/Mitchelle

**For Integration Issues:**
→ Contact Nestor/Mitchelle (will coordinate with Billy/Hana)

---

## ✅ Pre-Demo Checklist (Monday Morning)

**Technical:**
- [ ] All URLs work and are accessible
- [ ] No console errors in frontend
- [ ] Backend API responds correctly
- [ ] CMS API returns stories
- [ ] Form submission works
- [ ] Success message displays
- [ ] Mobile view looks good
- [ ] Tested on Chrome and Safari/Edge

**Content:**
- [ ] Homepage text is final
- [ ] Journey steps have content
- [ ] 2 stories are published in CMS
- [ ] Form fields make sense
- [ ] No placeholder text (Lorem ipsum)

**Demo Prep:**
- [ ] Demo script printed/available
- [ ] Test data prepared for form
- [ ] Everyone knows their speaking part
- [ ] Backup plan if internet fails
- [ ] Devices charged

**You're ready! Break a leg! 🎭**
