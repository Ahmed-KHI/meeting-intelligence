# 🎙️ AI-Powered Meeting Assistant & Action Tracker

> **Simple. Smart. Productive.**

Transform your meetings into actionable insights with AI. Record, transcribe, summarize, and track action items automatically.

---

## ✨ Features

- 🎤 **Easy Recording**: One-click meeting recording
- 📝 **Auto Transcription**: Convert speech to text using Google Gemini AI
- 📋 **Smart Summaries**: Get key points and decisions automatically
- ✅ **Action Items**: AI extracts tasks and assigns them automatically
- 👥 **Team Tracking**: See who's responsible for what
- 🔔 **Reminders**: Never miss a follow-up
- 📊 **Dashboard**: View all meetings and pending tasks at a glance

---

## 🎯 Why This Project?

**Problem**: Teams waste hours in meetings without clear outcomes or follow-up

**Solution**: Automate meeting documentation and action tracking to save 5-10 hours per employee monthly

**Target Users**: 
- Small to medium businesses
- Remote teams
- Project managers
- Startups

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Google Gemini API Key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd meeting-assistant

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment variables
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# Run the application
npm run dev
```

---

## 📁 Project Structure

```
meeting-assistant/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py      # API entry point
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   └── models/      # Data models
│   └── requirements.txt
├── frontend/            # Next.js frontend
│   ├── src/
│   │   ├── app/        # Pages
│   │   ├── components/ # UI components
│   │   └── lib/        # Utilities
│   └── package.json
├── docker-compose.yml   # Easy deployment
└── README.md
```

---

## 🎨 User Flow (Keep It Simple!)

1. **Record Meeting** → Click "Start Recording"
2. **AI Processing** → Gemini transcribes & analyzes
3. **Review Summary** → See key points & action items
4. **Assign Tasks** → Confirm or edit assignments
5. **Track Progress** → Dashboard shows all pending tasks

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TailwindCSS
- **Backend**: FastAPI (Python)
- **AI**: Google Gemini API
- **Database**: SQLite (simple) → PostgreSQL (production)
- **Deployment**: Docker + Cloud (AWS/GCP/Azure)

---

## 📝 Development Status

- [x] Project setup ✅
- [x] Documentation complete ✅
- [x] Architecture defined ✅
- [x] Backend structure ready ✅
- [x] Gemini service template ✅
- [x] Database models ✅
- [x] API endpoints ✅
- [x] Frontend setup ✅
- [x] Upload interface ✅
- [x] Docker deployment ✅
- [ ] Cloud deployment (Guide ready!)
- [ ] Testing & refinement

## 📚 Project Documentation

| File | Description |
|------|-------------|
| [QUICK_START.md](./QUICK_START.md) | 🚀 Start here! Quick setup guide |
| [PROJECT_SPEC.md](./PROJECT_SPEC.md) | 📋 Complete project specifications |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 🏗️ System architecture & design |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | 📖 Step-by-step tutorial |
| [CHECKLIST.md](./CHECKLIST.md) | ✅ Development progress tracker |
| [API.md](./API.md) | 📡 Complete API documentation |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 🚀 Deployment guide (Local, Docker, Cloud) |
| [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) | ✅ Setup completion summary |

---

## 🤝 Contributing

This is a learning project for Governor House IT Initiative Programme Q4. Contributions and suggestions are welcome!

---

## 📄 License

MIT License - feel free to use for learning and commercial projects

---

**Built with ❤️ using Spec-Driven Development**
