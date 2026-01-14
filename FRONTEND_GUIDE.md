# Nyumbani Frontend Setup Guide (Hana)

## 🎯 Your Mission
Build the visual experience for the Nyumbani homecoming journey demo.

## 📦 Tech Stack (Confirmed)
- **Framework**: Vite + React
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **API Calls**: Fetch API
- **Optional**: Framer Motion for animations

## 🚀 Quick Start (Day 1)

### Step 1: Create Vite + React Project

```powershell
# In a NEW directory (not in backend folder)
# Recommended: C:\Users\ADMIN\Projects\nyumbani-frontend

cd C:\Users\ADMIN\Projects
npm create vite@latest nyumbani-frontend -- --template react
cd nyumbani-frontend
npm install
```

### Step 2: Install Dependencies

```powershell
# Core dependencies
npm install react-router-dom

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Optional: Framer Motion (for smooth animations)
npm install framer-motion
```

### Step 3: Configure Tailwind CSS

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nyumbani-green': '#2D5F2E',
        'nyumbani-gold': '#D4AF37',
        'nyumbani-earth': '#8B4513',
      },
    },
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
body {
  @apply bg-gray-50 text-gray-900;
}
```

### Step 4: Create Project Structure

```
nyumbani-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ApplicationForm.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── Journey/
│   │   │   ├── Step1Identity.jsx
│   │   │   ├── Step2Belonging.jsx
│   │   │   └── Step3Application.jsx
│   │   ├── ApplicationPage.jsx
│   │   └── StoriesPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── cms.js
│   ├── App.jsx
│   └── main.jsx
```

## 📄 Pages to Build (MVP Scope)

### 1. Homepage (`/`)
**Content:**
- Hero section with headline: "Welcome Home: The Nyumbani Journey"
- Supporting text (2-3 sentences about reconnecting with Kenyan heritage)
- CTA button: "Begin Your Homecoming Journey" → links to Step 1

**Design Notes:**
- Clean, warm, welcoming
- Use earthy tones (greens, golds, browns)
- Mobile-first responsive

### 2. Journey Step 1 - Identity (`/journey/identity`)
**Content:**
- Title: "Step 1: Identity"
- Static content about discovering roots
- Next button → Step 2

### 3. Journey Step 2 - Belonging (`/journey/belonging`)
**Content:**
- Title: "Step 2: Belonging"
- Static content about community connection
- Next button → Step 3

### 4. Journey Step 3 - Application CTA (`/journey/application`)
**Content:**
- Title: "Step 3: Begin Your Journey"
- Explanation of application
- CTA button → Application Form

### 5. Application Form (`/application`)
**Form Fields:**
```javascript
{
  full_name: string,      // Text input
  email: string,          // Email input
  country: string,        // Text input or dropdown
  relationship_to_kenya: string,  // Textarea (2-500 chars)
  interest_area: string   // Textarea (2-500 chars)
}
```

**States to Handle:**
- Idle (ready to submit)
- Loading (submitting...)
- Success (show confirmation message)
- Error (show validation errors)

### 6. Stories Page (`/stories`)
**Content:**
- Display 1-2 stories from CMS
- Each story shows:
  - Title
  - Author
  - Short excerpt
  - (Optional) "Read more" if time permits

## 🔌 Backend Integration

### API Service (`src/services/api.js`)

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const submitApplication = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: formData.fullName,
        email: formData.email,
        country: formData.country,
        relationship_to_kenya: formData.relationshipToKenya,
        interest_area: formData.interestArea,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Submission failed');
    }

    return data;
  } catch (error) {
    console.error('Application submission error:', error);
    throw error;
  }
};
```

### Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:3000
VITE_CMS_URL=https://[mitchelle-provides-this]
```

For production, update to:
```
VITE_API_URL=https://[billy-provides-production-url]
VITE_CMS_URL=https://[mitchelle-cms-url]
```

## 🎨 Sample Application Form Component

```jsx
// src/components/ApplicationForm.jsx
import { useState } from 'react';
import { submitApplication } from '../services/api';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    relationshipToKenya: '',
    interestArea: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      const result = await submitApplication(formData);
      setStatus('success');
      console.log('Application submitted:', result);
      // Reset form or show success message
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Application Submitted Successfully!
        </h2>
        <p className="text-green-700">
          Thank you for your interest in the Nyumbani homecoming journey. 
          We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-6">Application Form</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Country *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Your Relationship to Kenya *
          </label>
          <textarea
            name="relationshipToKenya"
            value={formData.relationshipToKenya}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Share your connection to Kenya..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Areas of Interest *
          </label>
          <textarea
            name="interestArea"
            value={formData.interestArea}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="What aspects of reconnecting interest you most?"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
```

## 🛣️ React Router Setup

```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Step1Identity from './pages/Journey/Step1Identity';
import Step2Belonging from './pages/Journey/Step2Belonging';
import Step3Application from './pages/Journey/Step3Application';
import ApplicationPage from './pages/ApplicationPage';
import StoriesPage from './pages/StoriesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journey/identity" element={<Step1Identity />} />
          <Route path="/journey/belonging" element={<Step2Belonging />} />
          <Route path="/journey/application" element={<Step3Application />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/stories" element={<StoriesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## 🧪 Testing Locally

```powershell
# Start backend (in backend terminal)
cd C:\Users\ADMIN\Projects\nyumbani
npm run dev

# Start frontend (in frontend terminal)
cd C:\Users\ADMIN\Projects\nyumbani-frontend
npm run dev
```

Frontend will run on `http://localhost:5173` (Vite default)

## 🚀 Deployment (Day 5)

### Recommended: Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
cd nyumbani-frontend
vercel

# Set environment variables in Vercel dashboard:
# VITE_API_URL = https://[billy-production-url]
# VITE_CMS_URL = https://[mitchelle-cms-url]
```

### Alternative: Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "New site from Git"
4. Select repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables

## ✅ MVP Scope Checklist (What to Build)

- [x] Setup: Vite + React + Tailwind ✅
- [ ] Homepage with CTA
- [ ] 3 Journey steps (static content)
- [ ] Application form (5 fields)
- [ ] Form submission to backend API
- [ ] Loading + success states
- [ ] Error handling
- [ ] Stories page with CMS data
- [ ] Mobile responsive
- [ ] Deployed to Vercel/Netlify

## ❌ What NOT to Build (Out of Scope)

- ❌ User authentication / login
- ❌ User dashboards
- ❌ Profile pages
- ❌ Complex animations (simple transitions OK)
- ❌ Multiple language support
- ❌ Payment systems
- ❌ Admin interfaces

## 🎯 Daily Timeline

**Day 1-2 (Wed-Thu):**
- Set up project
- Build homepage
- Build 3 journey steps
- Basic styling

**Day 3 (Fri):**
- Build application form
- Test with local backend API
- Build stories page structure

**Day 4 (Sat):**
- Connect to production backend
- Integrate CMS data
- Polish styles
- Mobile testing

**Day 5 (Mon):**
- Final QA
- Deploy to Vercel
- Demo preparation

## 📞 Integration Points

### With Billy (Backend):
- **Day 1-3**: Use `http://localhost:3000` for API
- **Day 4+**: Switch to production URL Billy provides

### With Mitchelle (CMS):
- **Day 3-4**: Get CMS endpoint for stories
- Create `src/services/cms.js` to fetch stories
- Display on Stories page

### With Nestor (QA):
- **Day 4**: Be ready for integration testing
- Have localhost running for testing
- Fix bugs found during QA

## 💡 Tips

1. **Mobile-first**: Design for mobile, then scale up
2. **Keep it simple**: Focus on functionality over fancy animations
3. **Test early**: Connect to backend early (Day 2-3)
4. **Commit often**: Push to GitHub regularly
5. **Ask for help**: If backend/CMS endpoints aren't working, ping Billy/Mitchelle

## 🎬 Demo Preparation

Be ready to show:
1. Clean, professional homepage
2. Smooth navigation through journey steps
3. Working application form with real submission
4. Success confirmation
5. Stories page with live CMS content
6. Mobile responsiveness

**You've got this! 🚀**
