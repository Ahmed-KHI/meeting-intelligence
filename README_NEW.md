# 🎙️ AI Meeting Assistant

> **Transform meetings into actionable insights with AI**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.0-orange)](https://ai.google.dev/)

AI-powered meeting transcription, summarization, and task extraction system built with **Gemini AI**, **FastAPI**, and **Next.js**. Developed as part of the **Governor House IT Initiative Programme - Quarter 4**.

---

## 📸 Screenshots

### Upload & Process
![Upload Interface](docs/screenshots/upload.png)

### Dashboard with Statistics
![Dashboard](docs/screenshots/dashboard.png)

### Meeting Details
![Meeting Details](docs/screenshots/meeting-detail.png)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎤 **AI Transcription** | Upload audio/video, get accurate text transcription using Gemini AI 2.0 |
| 📝 **Smart Summarization** | Automatic extraction of key points, decisions, and highlights |
| ✅ **Action Item Detection** | AI identifies tasks, assignees, and priorities automatically |
| 🔍 **Smart Search** | Search meetings by title, content, or keywords |
| 📊 **Analytics Dashboard** | Visual statistics for meetings, tasks, and completion rates |
| 📋 **Task Management** | Track, update, and manage action items with status updates |
| 🔔 **Toast Notifications** | Real-time feedback for all user actions |
| 📈 **Progress Tracking** | Visual progress bar during AI processing (1-2 minutes) |
| 🎨 **Modern UI** | Responsive design with TailwindCSS, works on all devices |
| 🔐 **Ready for Production** | Docker support, cloud deployment guides included |

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Gemini API Key** - [Get Free Key](https://ai.google.dev/)

### Installation (5 minutes)

#### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-meeting-assistant.git
cd ai-meeting-assistant
```

#### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Initialize database
python init_db.py

# Start backend
python run.py
```

**Backend will run at:** http://localhost:8000  
**API Docs:** http://localhost:8000/docs

#### 3. Frontend Setup (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will run at:** http://localhost:3000

#### 4. Access the Application
Open your browser and go to **http://localhost:3000**

---

## 📖 Usage

### 1. Upload a Meeting
- Click "Choose Audio/Video File" on the home page
- Select a recording (MP3, WAV, MP4, WebM, M4A, OGG)
- (Optional) Enter a meeting title
- Click "Upload & Process with AI"
- Wait 1-2 minutes for AI transcription and analysis

### 2. View Meeting Details
- Go to "Meetings" tab
- Click on any meeting to see:
  - Full transcription
  - AI-generated summary
  - Extracted action items
  - Key points and decisions

### 3. Manage Tasks
- Go to "Tasks" tab
- View all action items from all meetings
- Filter by status (Pending/In Progress/Completed)
- Update task status with one click
- Delete completed tasks

### 4. View Dashboard
- Go to "Dashboard" tab
- See statistics:
  - Total meetings processed
  - Total tasks created
  - Task completion rate
  - Recent activity

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                      │
│         Next.js 15 + React + TailwindCSS       │
│              (Port 3000)                        │
└─────────────────┬───────────────────────────────┘
                  │ REST API
                  ▼
┌─────────────────────────────────────────────────┐
│                   Backend                       │
│              FastAPI + Python                   │
│              (Port 8000)                        │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
┌───────────────┐   ┌──────────────┐
│   Database    │   │  Gemini AI   │
│ SQLite/Postgres│   │  API Service │
└───────────────┘   └──────────────┘
```

### Technology Stack

**Backend:**
- FastAPI 0.104+ - Modern Python web framework
- SQLAlchemy 2.0+ - ORM for database
- Google Generative AI 0.8.5 - Gemini API integration
- Uvicorn - ASGI server
- Python 3.11+

**Frontend:**
- Next.js 15 - React framework
- React 18 - UI library
- TailwindCSS 3.4 - Utility-first CSS
- Axios - HTTP client
- TypeScript - Type safety

**AI/ML:**
- Google Gemini 2.0 Flash - Transcription & summarization
- Natural language processing for task extraction

---

## 📂 Project Structure

```
meeting-assistant/
├── backend/
│   ├── app/
│   │   ├── models/           # Database models
│   │   ├── routes/           # API endpoints
│   │   ├── services/         # Gemini AI service
│   │   ├── database.py       # DB configuration
│   │   ├── schemas.py        # Pydantic models
│   │   └── main.py          # FastAPI app
│   ├── uploads/             # Uploaded files
│   ├── requirements.txt     # Python dependencies
│   ├── init_db.py          # Database initialization
│   ├── run.py              # Server startup
│   └── Dockerfile          # Backend container
│
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js pages
│   │   │   ├── page.tsx           # Home/Upload
│   │   │   ├── overview/          # Dashboard
│   │   │   ├── meetings/          # Meetings list & details
│   │   │   └── dashboard/         # Tasks management
│   │   └── components/     # Reusable components
│   ├── package.json        # Node dependencies
│   └── Dockerfile          # Frontend container
│
├── docker-compose.yml      # Multi-container setup
├── .gitignore             # Git ignore rules
├── LICENSE                # MIT License
├── README.md              # This file
└── DEPLOYMENT_FREE.md     # Free deployment guide
```

---

## 🐳 Docker Deployment

### Option 1: Docker Compose (Recommended)
```bash
# Configure environment
cp .env.docker .env
# Edit .env and add your GEMINI_API_KEY

# Start everything
docker compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Individual Containers
```bash
# Backend
cd backend
docker build -t meeting-assistant-backend .
docker run -p 8000:8000 --env-file .env meeting-assistant-backend

# Frontend
cd frontend
docker build -t meeting-assistant-frontend .
docker run -p 3000:3000 meeting-assistant-frontend
```

---

## ☁️ Cloud Deployment (FREE)

Deploy to **Vercel (Frontend)** + **Render (Backend)** for **$0/month**!

### Quick Deploy Guide:

1. **Push to GitHub**
2. **Frontend → Vercel**
   - Import repo → Select `frontend` directory
   - Add environment variable: `NEXT_PUBLIC_API_URL`
   - Deploy (2 minutes)
3. **Backend → Render**
   - Import repo → Select `backend` directory
   - Add environment variable: `GEMINI_API_KEY`
   - Deploy (5 minutes)

**Full guide:** [DEPLOYMENT_FREE.md](DEPLOYMENT_FREE.md)

**Result:** Professional URLs like:
- Frontend: `https://ai-meeting-assistant.vercel.app`
- Backend: `https://meeting-assistant-backend.onrender.com`

---

## 📚 API Documentation

Once backend is running, visit:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/meetings/` | Upload & process meeting |
| `GET` | `/api/meetings/` | List all meetings |
| `GET` | `/api/meetings/{id}` | Get meeting details |
| `GET` | `/api/meetings/{id}/actions` | Get meeting tasks |
| `DELETE` | `/api/meetings/{id}` | Delete meeting |
| `GET` | `/api/tasks/` | List all tasks |
| `PATCH` | `/api/tasks/{id}` | Update task |
| `DELETE` | `/api/tasks/{id}` | Delete task |

**Full API documentation:** [API.md](API.md)

---

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=sqlite:///./meetings.db
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=104857600
```

**Frontend:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Supported File Formats
- Audio: MP3, WAV, M4A, OGG
- Video: MP4, WebM
- Max size: 100MB

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
python test_gemini.py      # Test Gemini API connection
python test_backend.py     # Test backend components
```

### Manual Testing
1. Upload a short audio file (30 seconds - 2 minutes)
2. Wait for AI processing (1-2 minutes)
3. Check transcription accuracy
4. Verify action items extracted
5. Test task updates and deletion

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Developed for Governor House IT Initiative Programme - Quarter 4**

Built with ❤️ using:
- Google Gemini AI 2.0
- FastAPI & Python
- Next.js & React
- TailwindCSS

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful AI transcription and summarization
- **Governor House IT Initiative** - For the learning opportunity
- **Panaversity & spec-kit-plus** - For spec-driven development methodology
- **FastAPI & Next.js** - For excellent frameworks
- **Open Source Community** - For amazing tools and libraries

---

## 📞 Support

- **Documentation:** Check the `docs/` folder for detailed guides
- **Issues:** Use GitHub Issues for bug reports and feature requests
- **Questions:** Open a discussion in GitHub Discussions

---

## 🗺️ Roadmap

### Completed ✅
- [x] AI transcription with Gemini
- [x] Smart summarization
- [x] Action item extraction
- [x] Task management
- [x] Search & filter
- [x] Dashboard with statistics
- [x] Docker support
- [x] Cloud deployment guides

### Planned 🎯
- [ ] User authentication
- [ ] Email notifications
- [ ] Export to PDF
- [ ] Calendar integration
- [ ] Slack/Teams integration
- [ ] Mobile app
- [ ] Real-time collaboration
- [ ] Advanced analytics

---

## 📊 Project Stats

- **Lines of Code:** ~3,500+
- **Components:** 8 pages, 1 reusable component
- **API Endpoints:** 11
- **Database Models:** 2
- **Deployment Options:** 4 (Local, Docker, Vercel, Render)
- **Technologies:** 10+
- **Documentation Files:** 12

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built for Quarter-4 | Governor House IT Initiative Programme**

**© 2025 AI Meeting Assistant. All rights reserved.**
