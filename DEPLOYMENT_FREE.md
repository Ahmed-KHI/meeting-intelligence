# 🚀 FREE DEPLOYMENT GUIDE

## Perfect for: Client Testing, Demo, Portfolio

This guide shows you how to deploy your Meeting Assistant **for FREE** using GitHub, Vercel, and Render.

---

## 📊 **Deployment Overview**

```
GitHub Repo
    ├── Frontend → Vercel (Free)
    └── Backend → Render (Free)
```

**Total Cost:** $0/month  
**Setup Time:** 15 minutes  
**Updates:** Automatic on git push

---

## 🔧 **PART 1: Push to GitHub**

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-meeting-assistant`
3. Description: "AI-powered meeting transcription and task extraction using Gemini AI"
4. **Important:** Keep it **Public** (required for free tier)
5. **DON'T** add README, .gitignore, or license (we already have them)
6. Click "Create repository"

### Step 2: Push Your Code

```powershell
# Navigate to your project
cd "i:\New folder\new-project\meeting-assistant"

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Meeting Assistant with Gemini"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-meeting-assistant.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Done!** Your code is now on GitHub.

---

## 🎨 **PART 2: Deploy Frontend to Vercel**

### Step 1: Prepare Frontend

Create `vercel.json` in frontend folder:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR_BACKEND_URL/api/:path*"
    }
  ]
}
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/signup (Sign up with GitHub)
2. Click **"New Project"**
3. Import your `ai-meeting-assistant` repo
4. **Root Directory:** Select `frontend`
5. **Framework Preset:** Next.js (auto-detected)
6. **Environment Variables:** 
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: (We'll add this after deploying backend)
7. Click **"Deploy"**

**⏱️ Wait 2-3 minutes...**

**✅ Done!** You'll get a URL like: `https://ai-meeting-assistant.vercel.app`

---

## 🔧 **PART 3: Deploy Backend to Render**

### Step 1: Prepare Backend

Create `render.yaml` in project root:

```yaml
services:
  - type: web
    name: meeting-assistant-backend
    runtime: python
    buildCommand: "cd backend && pip install -r requirements.txt"
    startCommand: "cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: GEMINI_API_KEY
        sync: false
      - key: DATABASE_URL
        value: sqlite:///./meetings.db
      - key: UPLOAD_DIR
        value: ./uploads
```

### Step 2: Deploy to Render

1. Go to https://render.com/signup (Sign up with GitHub)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. **Settings:**
   - Name: `meeting-assistant-backend`
   - Root Directory: `backend`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables:**
   - `GEMINI_API_KEY` = `your_actual_gemini_api_key`
   - `DATABASE_URL` = `sqlite:///./meetings.db`
   - `UPLOAD_DIR` = `./uploads`
6. **Instance Type:** Free
7. Click **"Create Web Service"**

**⏱️ Wait 5-10 minutes for first build...**

**✅ Done!** You'll get a URL like: `https://meeting-assistant-backend.onrender.com`

---

## 🔗 **PART 4: Connect Frontend to Backend**

### Update Frontend Environment

1. Go back to Vercel Dashboard
2. Select your project → **Settings** → **Environment Variables**
3. Add:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://meeting-assistant-backend.onrender.com`
4. Click **"Save"**
5. Go to **Deployments** → Click "..." → **"Redeploy"**

**OR** Update your frontend code:

In `frontend/src/app/page.tsx` and other pages, replace:
```typescript
// FROM:
axios.get('http://localhost:8000/api/meetings/')

// TO:
axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/meetings/`)
```

---

## 🔒 **PART 5: Enable CORS on Backend**

Update `backend/app/main.py`:

```python
# Add your Vercel URL to allowed origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ai-meeting-assistant.vercel.app",  # Your actual Vercel URL
        "https://*.vercel.app",  # All preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push:
```powershell
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy! ✅

---

## 🎉 **DEPLOYMENT COMPLETE!**

Your app is now live at:
- 🌐 **Frontend:** https://ai-meeting-assistant.vercel.app
- 🔧 **Backend:** https://meeting-assistant-backend.onrender.com
- 📚 **API Docs:** https://meeting-assistant-backend.onrender.com/docs

---

## 🔄 **Auto-Deploy on Updates**

Every time you push to GitHub:
1. `git add .`
2. `git commit -m "Your changes"`
3. `git push`

**Vercel** and **Render** will automatically:
- Pull latest code
- Build
- Deploy
- Go live in 2-3 minutes

No manual deployment needed! 🎉

---

## 💰 **Free Tier Limits**

### Vercel (Frontend):
- ✅ Unlimited bandwidth
- ✅ 100 GB-hours/month
- ✅ SSL included
- ✅ No credit card required

### Render (Backend):
- ✅ 750 hours/month (enough for 31 days)
- ⚠️ Sleeps after 15 min inactivity (wakes in ~30 sec)
- ✅ 100 GB bandwidth/month
- ✅ Free PostgreSQL database (optional)
- ✅ No credit card required

**Solution for "sleeping":** Use a free service like UptimeRobot to ping your backend every 5 minutes to keep it awake.

---

## 🐛 **Troubleshooting**

### Backend sleeps on Render:
- **Free tier sleeps** after 15 min inactivity
- First request takes ~30 seconds to wake
- **Solution:** Upgrade to paid ($7/month) or use cron-job.org to ping every 10 min

### CORS errors:
- Make sure backend CORS includes your Vercel URL
- Check browser console for exact error

### File uploads not persisting on Render:
- **Free tier has ephemeral storage** (files deleted on restart)
- **Solution:** Use Cloudinary or AWS S3 for file storage (both have free tiers)

### Database resets on Render:
- SQLite doesn't persist on free tier
- **Solution:** Use Render's PostgreSQL (free, persistent) or MongoDB Atlas (free)

---

## 🚀 **Upgrade Path (When Needed)**

### For Production Use:
1. **Backend:** Render Standard ($7/month)
   - No sleeping
   - Persistent storage
   - Better performance

2. **Database:** Render PostgreSQL or MongoDB Atlas (Free → $9/month)
   - Persistent data
   - Backups

3. **File Storage:** Cloudinary or AWS S3
   - Free tier: ~5GB
   - CDN for fast delivery

---

## 📝 **Quick Commands**

```powershell
# Local development
cd backend && python run.py          # Backend
cd frontend && npm run dev           # Frontend

# Deploy updates
git add .
git commit -m "Update description"
git push                             # Auto-deploys to Vercel + Render

# View logs
# Vercel: Dashboard → Project → Logs
# Render: Dashboard → Service → Logs
```

---

## ✅ **Checklist**

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables set (GEMINI_API_KEY)
- [ ] CORS updated with production URLs
- [ ] Frontend connected to backend API
- [ ] Test upload feature
- [ ] Test meetings page
- [ ] Test tasks page
- [ ] Share URL with client 🎉

---

## 🎯 **Summary**

**Total Cost:** $0/month  
**Total Time:** 15 minutes  
**Auto-Deploy:** Yes  
**Client-Ready:** Yes  
**Portfolio-Ready:** Yes  

**No Docker needed for deployment!**

Docker is great for local development and self-hosted servers, but for free cloud hosting, separate deployment is the way to go! 🚀
