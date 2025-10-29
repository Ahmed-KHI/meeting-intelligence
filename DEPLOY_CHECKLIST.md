# 🚀 QUICK DEPLOYMENT CHECKLIST

## Before You Deploy

- [x] Code pushed to GitHub: https://github.com/Ahmed-KHI/meeting-intelligence
- [ ] Google Gemini API Key ready
- [ ] Render.com account created
- [ ] Vercel account created

---

## Deployment Steps (15 minutes)

### 1️⃣ Deploy Backend (Render.com)
- [ ] Create Render account with GitHub
- [ ] New Web Service → Connect repository
- [ ] Configure as Python service
- [ ] Add environment variables (GEMINI_API_KEY)
- [ ] Deploy and copy backend URL

### 2️⃣ Deploy Frontend (Vercel)
- [ ] Create Vercel account with GitHub
- [ ] Import repository
- [ ] Set root directory to `frontend`
- [ ] Add NEXT_PUBLIC_API_URL environment variable
- [ ] Deploy

### 3️⃣ Update CORS
- [ ] Update `backend/app/main.py` with your Vercel URL
- [ ] Push changes to GitHub
- [ ] Wait for auto-redeploy

### 4️⃣ Test
- [ ] Visit your Vercel URL
- [ ] Upload test audio file
- [ ] Verify transcription works
- [ ] Check action items extraction

---

## Your URLs (Fill in after deployment)

**Frontend**: https://________________________.vercel.app

**Backend**: https://________________________.onrender.com

**API Docs**: https://________________________.onrender.com/docs

---

## Need Help?

See detailed instructions in: `DEPLOYMENT_INSTRUCTIONS.md`
