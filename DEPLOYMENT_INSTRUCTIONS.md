# 🚀 DEPLOYMENT GUIDE - Meeting Intelligence

## **FREE Deployment Solution**

Your app will be deployed on:
- **Frontend**: Vercel (Free Forever Plan)
- **Backend**: Render.com (Free Tier)
- **Total Cost**: $0/month

---

## 📋 **Prerequisites**

1. GitHub account (already done ✅)
2. Google Gemini API key
3. Vercel account (free)
4. Render.com account (free)

---

## 🎯 **STEP 1: Deploy Backend to Render.com**

### 1.1 Create Render Account

1. Go to https://render.com/
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account**
4. Verify your email

### 1.2 Deploy Backend

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Ahmed-KHI/meeting-intelligence`
3. Configure the service:

```
Name: meeting-intelligence-backend
Region: Oregon (US West)
Branch: master
Root Directory: backend
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Instance Type: Free
```

4. **Add Environment Variables**:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add these:
   
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   DATABASE_URL=sqlite:///./meetings.db
   UPLOAD_DIR=./uploads
   PYTHON_VERSION=3.11.0
   ```

5. Click **"Create Web Service"**

⏱️ **Wait 5-10 minutes** for the build to complete...

6. Once deployed, copy your backend URL:
   - Example: `https://meeting-intelligence-backend.onrender.com`

✅ **Backend is live!**

---

## 🎨 **STEP 2: Deploy Frontend to Vercel**

### 2.1 Create Vercel Account

1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your repositories

### 2.2 Deploy Frontend

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Import your repository: `Ahmed-KHI/meeting-intelligence`
3. Configure the project:

```
Framework Preset: Next.js (auto-detected)
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

4. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Add:
   
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://meeting-intelligence-backend.onrender.com
   ```
   
   ⚠️ **Important**: Use YOUR backend URL from Step 1.6

5. Click **"Deploy"**

⏱️ **Wait 2-3 minutes** for the build to complete...

6. Once deployed, you'll get your frontend URL:
   - Example: `https://meeting-intelligence.vercel.app`

✅ **Frontend is live!**

---

## 🔧 **STEP 3: Configure CORS (Important!)**

Your backend needs to allow requests from your Vercel frontend.

### 3.1 Update Backend CORS Settings

Update `backend/app/main.py`:

```python
# Add your Vercel URL to allowed origins
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://meeting-intelligence.vercel.app",  # Add your Vercel URL
    "https://*.vercel.app",  # Allow all Vercel preview deployments
]
```

### 3.2 Push Changes

```powershell
cd "i:\New folder\new-project\meeting-intelligence"
git add backend/app/main.py
git commit -m "Update CORS for production deployment"
git push origin master
```

⚠️ **Render will auto-redeploy** your backend in ~5 minutes.

---

## ✅ **STEP 4: Test Your Deployment**

1. Visit your Vercel URL: `https://meeting-intelligence.vercel.app`
2. Test the features:
   - ✅ Upload an audio file
   - ✅ Check transcription
   - ✅ View AI summary
   - ✅ See action items

---

## 📊 **Free Tier Limitations**

### Render.com Free Tier:
- ⏰ Sleeps after 15 minutes of inactivity
- 🔄 Takes ~30 seconds to wake up on first request
- 💾 750 hours/month (enough for demos)
- 💿 512 MB RAM

### Vercel Free Tier:
- ⚡ No sleep time (always instant)
- 🚀 100 GB bandwidth/month
- 📦 Unlimited deployments

### Solutions for "Cold Starts":
1. Use a free uptime monitor (e.g., UptimeRobot) to ping your backend every 14 minutes
2. Or upgrade to Render's $7/month plan for 24/7 uptime

---

## 🔗 **Custom Domain (Optional)**

### For Frontend (Vercel):
1. Go to your project → **Settings** → **Domains**
2. Add your domain (e.g., `meeting-ai.yourdomain.com`)
3. Update DNS records as instructed

### For Backend (Render):
1. Go to your service → **Settings** → **Custom Domains**
2. Add your domain (e.g., `api.yourdomain.com`)
3. Update DNS records as instructed

---

## 🔄 **Auto-Deployment Setup**

Both platforms are now connected to your GitHub repo!

**Every time you push to GitHub:**
- Vercel auto-deploys frontend (2-3 min)
- Render auto-deploys backend (5-10 min)

```powershell
# Make changes, then:
git add .
git commit -m "Your update message"
git push origin master

# 🎉 Both services auto-deploy!
```

---

## 🐛 **Troubleshooting**

### Backend Issues:

1. **Build fails**:
   - Check build logs in Render dashboard
   - Verify `requirements.txt` has all dependencies
   - Check Python version (3.11.0)

2. **Database errors**:
   - Render free tier doesn't persist SQLite well
   - Consider PostgreSQL (free on Render) for production

3. **API not responding**:
   - Check if service is sleeping (free tier)
   - Verify environment variables are set
   - Check backend logs

### Frontend Issues:

1. **API calls fail**:
   - Check CORS settings in backend
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check browser console for errors

2. **Build fails**:
   - Check Vercel build logs
   - Verify `package.json` dependencies
   - Check Node.js version

3. **Environment variable not working**:
   - Must start with `NEXT_PUBLIC_` for client-side access
   - Redeploy after adding new env vars

---

## 📞 **Support**

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Issues**: https://github.com/Ahmed-KHI/meeting-intelligence/issues

---

## 🎉 **Your Live URLs**

After deployment, update your README with:

```markdown
## 🌐 Live Demo

- **Frontend**: https://meeting-intelligence.vercel.app
- **Backend API**: https://meeting-intelligence-backend.onrender.com
- **API Docs**: https://meeting-intelligence-backend.onrender.com/docs
```

---

## 💡 **Next Steps**

1. Add uptime monitoring (UptimeRobot)
2. Set up error tracking (Sentry - free tier)
3. Add analytics (Vercel Analytics - free)
4. Configure custom domain
5. Set up staging environment

---

**Happy Deploying! 🚀**
