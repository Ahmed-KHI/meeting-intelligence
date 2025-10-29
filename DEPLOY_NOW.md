# 🎯 DEPLOYMENT - QUICK START GUIDE

## Your Free Deployment Stack

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  👤 Users Access Your App                          │
│                                                     │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  🎨 Frontend (Next.js)                              │
│  Hosted on: Vercel.com                              │
│  URL: https://meeting-intelligence.vercel.app       │
│  Cost: FREE Forever                                 │
│  Features: ⚡ Instant, 🌍 Global CDN                │
└─────────────────────┬───────────────────────────────┘
                      │
                      │ API Calls
                      ▼
┌─────────────────────────────────────────────────────┐
│  ⚙️ Backend (FastAPI)                               │
│  Hosted on: Render.com                              │
│  URL: https://meeting-intelligence-backend...       │
│  Cost: FREE (with sleep mode)                       │
│  Features: 🐍 Python, 🤖 Gemini AI, 💾 SQLite      │
└─────────────────────────────────────────────────────┘
```

---

## 📝 STEP-BY-STEP DEPLOYMENT

### Prerequisites (5 minutes)
1. ✅ GitHub repo created: https://github.com/Ahmed-KHI/meeting-intelligence
2. 🔑 Get Google Gemini API Key: https://makersuite.google.com/app/apikey
3. 📧 Sign up for free accounts:
   - Render.com: https://render.com/
   - Vercel: https://vercel.com/

---

### PART 1: Deploy Backend (10 minutes)

#### Step 1: Go to Render
```
Open: https://dashboard.render.com/
Click: "New +" → "Web Service"
```

#### Step 2: Connect Repository
```
Connect GitHub account
Select: Ahmed-KHI/meeting-intelligence
Click: "Connect"
```

#### Step 3: Configure Service
```
Name:           meeting-intelligence-backend
Region:         Oregon (US West)
Branch:         master
Root Directory: backend
Runtime:        Python 3
Build Command:  pip install -r requirements.txt
Start Command:  uvicorn app.main:app --host 0.0.0.0 --port $PORT
Instance Type:  Free
```

#### Step 4: Add Environment Variables
Click "Advanced" → Add these variables:

```env
GEMINI_API_KEY=<YOUR_ACTUAL_GEMINI_API_KEY>
DATABASE_URL=sqlite:///./meetings.db
UPLOAD_DIR=./uploads
PYTHON_VERSION=3.11.0
```

#### Step 5: Deploy
```
Click: "Create Web Service"
Wait: 5-10 minutes for build
Copy: Your backend URL (e.g., https://meeting-intelligence-backend-xxxx.onrender.com)
```

✅ **Backend is LIVE!**

---

### PART 2: Deploy Frontend (5 minutes)

#### Step 1: Go to Vercel
```
Open: https://vercel.com/new
Login: With GitHub
```

#### Step 2: Import Repository
```
Import: Ahmed-KHI/meeting-intelligence
Click: "Import"
```

#### Step 3: Configure Project
```
Framework Preset:   Next.js (auto-detected)
Root Directory:     frontend
Build Command:      npm run build (auto)
Output Directory:   .next (auto)
Install Command:    npm install (auto)
```

#### Step 4: Add Environment Variable
```
Name:  NEXT_PUBLIC_API_URL
Value: https://meeting-intelligence-backend-xxxx.onrender.com
```
⚠️ **Use YOUR Render backend URL from Part 1, Step 5**

#### Step 5: Deploy
```
Click: "Deploy"
Wait: 2-3 minutes
Copy: Your frontend URL (e.g., https://meeting-intelligence.vercel.app)
```

✅ **Frontend is LIVE!**

---

### PART 3: Update CORS (2 minutes)

Your backend needs to allow requests from your Vercel frontend.

#### Update the CORS settings:

The CORS has already been configured in your code! Just update line 26 in `backend/app/main.py`:

```python
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://meeting-intelligence.vercel.app",  # ← Add YOUR Vercel URL here
    "https://*.vercel.app",
]
```

#### Push the change:
```powershell
cd "i:\New folder\new-project\meeting-intelligence"
git add backend/app/main.py
git commit -m "Update CORS with production Vercel URL"
git push origin master
```

Render will auto-deploy in ~5 minutes!

---

## 🎉 YOUR APP IS LIVE!

### Test Your Deployment:

1. **Visit your app**: `https://meeting-intelligence.vercel.app`
2. **Upload audio file**: Click "Upload Meeting"
3. **Check transcription**: Should appear automatically
4. **View AI summary**: Generated by Gemini
5. **See action items**: Extracted tasks

---

## 📊 What You Get (FREE Tier)

### ✅ Render.com Free Tier:
- 750 hours/month runtime
- 512 MB RAM
- Auto-sleep after 15 min inactivity
- 30 sec wake-up time (first request)
- Free SSL certificate
- Persistent disk (1 GB)

### ✅ Vercel Free Tier:
- Unlimited deployments
- 100 GB bandwidth/month
- Global CDN (fast worldwide)
- Auto-scaling
- Free SSL certificate
- Instant deployment (no sleep)

---

## 🔗 Important URLs

After deployment, you'll have:

| Service | URL | Purpose |
|---------|-----|---------|
| **Your App** | https://meeting-intelligence.vercel.app | Main user interface |
| **API** | https://meeting-intelligence-backend.onrender.com | Backend API |
| **API Docs** | https://meeting-intelligence-backend.onrender.com/docs | Interactive API documentation |
| **GitHub** | https://github.com/Ahmed-KHI/meeting-intelligence | Source code |

---

## 🐛 Troubleshooting

### Backend not responding?
- Free tier sleeps after 15 min → First request takes 30 sec to wake up
- Check Render logs for errors
- Verify GEMINI_API_KEY is set correctly

### Frontend API errors?
- Check browser console (F12)
- Verify NEXT_PUBLIC_API_URL is correct
- Update CORS in backend if you see CORS errors

### Database not persisting?
- Render free tier has limitations with SQLite
- Consider using Render's free PostgreSQL for production

---

## 🚀 Pro Tips

### Keep Backend Awake:
Use UptimeRobot (free) to ping your backend every 14 minutes:
```
URL to monitor: https://meeting-intelligence-backend.onrender.com/health
Interval: Every 5 minutes
```

### Auto-Deploy on Git Push:
Both services auto-deploy when you push to GitHub!
```powershell
git add .
git commit -m "Your changes"
git push origin master
# Both Vercel and Render auto-deploy!
```

### Add Custom Domain:
- **Vercel**: Settings → Domains → Add Domain
- **Render**: Settings → Custom Domains → Add Domain

---

## 📱 Share Your Project

Update your GitHub README with live links:

```markdown
## 🌐 Live Demo

🚀 **Try it now**: https://meeting-intelligence.vercel.app

📚 **API Documentation**: https://meeting-intelligence-backend.onrender.com/docs
```

---

## 🎓 Next Steps

1. ✅ Deploy your app (done!)
2. 📱 Share with users
3. 🔍 Monitor with UptimeRobot
4. 📊 Add analytics (Vercel Analytics)
5. 🐛 Set up error tracking (Sentry)
6. 🌐 Add custom domain
7. 💼 Add to your portfolio!

---

**Need Help?**
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/Ahmed-KHI/meeting-intelligence/issues

**Happy Deploying! 🎉**
