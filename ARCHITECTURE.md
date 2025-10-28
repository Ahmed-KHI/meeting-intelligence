# 🏗️ System Architecture

Simple, clean architecture for the AI Meeting Assistant

---

## 🎯 Design Principles

1. **Keep It Simple** - No over-engineering
2. **Separation of Concerns** - Backend, Frontend, AI separated
3. **API-First** - Backend exposes REST API
4. **Stateless** - No sessions, JWT for auth (Phase 2)
5. **Cloud-Ready** - Easy to containerize and deploy

---

## 📊 High-Level Architecture

```
┌─────────────────┐
│                 │
│  User Browser   │
│  (Next.js UI)   │
│                 │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│                 │
│  FastAPI        │
│  Backend        │
│                 │
└────┬───────┬────┘
     │       │
     │       │
     │       └──────────────┐
     │                      │
┌────▼─────┐          ┌─────▼──────┐
│          │          │            │
│ SQLite/  │          │  Gemini    │
│ Postgres │          │  AI API    │
│          │          │            │
└──────────┘          └────────────┘
```

---

## 🔧 Component Breakdown

### 1. Frontend (Next.js)

**Purpose**: User interface

**Pages**:
- `/` - Home + Upload
- `/meetings` - List all meetings
- `/meetings/[id]` - Meeting details
- `/dashboard` - Tasks overview

**Key Components**:
- `UploadButton` - Drag & drop file upload
- `MeetingCard` - Display meeting summary
- `TaskList` - Show action items
- `Loader` - Loading states

**Technology**:
- Next.js 15 (App Router)
- React 18
- TailwindCSS
- Axios (API calls)

---

### 2. Backend (FastAPI)

**Purpose**: API server + business logic

**Structure**:
```
backend/
├── app/
│   ├── main.py              # FastAPI app
│   ├── routes/
│   │   ├── meetings.py      # Meeting endpoints
│   │   └── tasks.py         # Task endpoints
│   ├── services/
│   │   ├── gemini_service.py    # AI integration
│   │   └── storage_service.py   # File handling
│   └── models/
│       ├── meeting.py       # Database models
│       └── action_item.py
```

**API Endpoints**:
```
POST   /api/meetings          Upload & process meeting
GET    /api/meetings          List all meetings
GET    /api/meetings/{id}     Get meeting details
DELETE /api/meetings/{id}     Delete meeting

GET    /api/tasks             Get all tasks
PATCH  /api/tasks/{id}        Update task
DELETE /api/tasks/{id}        Delete task
```

**Technology**:
- FastAPI
- SQLAlchemy (ORM)
- Pydantic (validation)
- Python-multipart (file uploads)

---

### 3. AI Service (Gemini)

**Purpose**: Transcription and analysis

**Functions**:

1. **Transcribe Audio**
   ```python
   transcribe_audio(audio_file)
   → Returns: Full text transcription
   ```

2. **Generate Summary**
   ```python
   generate_summary(transcription)
   → Returns: {title, key_points, decisions}
   ```

3. **Extract Action Items**
   ```python
   extract_action_items(transcription)
   → Returns: [{task, assignee, priority}]
   ```

**Models Used**:
- `gemini-1.5-flash` - For audio transcription
- `gemini-pro` - For text analysis

---

### 4. Database

**Purpose**: Store meetings and tasks

**Schema**:

```sql
-- Meetings Table
CREATE TABLE meetings (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    audio_url TEXT,
    transcription TEXT,
    summary JSON,
    duration INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Action Items Table
CREATE TABLE action_items (
    id INTEGER PRIMARY KEY,
    meeting_id INTEGER,
    description TEXT NOT NULL,
    assignee TEXT,
    due_date DATE,
    priority TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP,
    FOREIGN KEY (meeting_id) REFERENCES meetings(id)
);
```

**Technology**:
- SQLite (development)
- PostgreSQL (production)

---

## 🔄 Data Flow

### Upload Meeting Flow:

```
1. User uploads audio file
   ↓
2. Frontend sends to /api/meetings
   ↓
3. Backend saves file to disk
   ↓
4. Backend calls Gemini API (transcription)
   ↓
5. Backend calls Gemini API (summary)
   ↓
6. Backend saves to database
   ↓
7. Backend returns meeting ID
   ↓
8. Frontend redirects to /meetings/{id}
   ↓
9. User sees results
```

### View Meeting Flow:

```
1. User opens /meetings/{id}
   ↓
2. Frontend calls GET /api/meetings/{id}
   ↓
3. Backend fetches from database
   ↓
4. Backend returns JSON
   ↓
5. Frontend displays:
   - Transcription
   - Summary
   - Action items
```

### Update Task Flow:

```
1. User checks off task
   ↓
2. Frontend calls PATCH /api/tasks/{id}
   ↓
3. Backend updates status in database
   ↓
4. Backend returns success
   ↓
5. Frontend updates UI
```

---

## 🐳 Deployment Architecture

```
┌───────────────────────────────────┐
│         Cloud Provider            │
│     (AWS / GCP / Azure)           │
│                                   │
│  ┌─────────────────────────────┐ │
│  │   Load Balancer             │ │
│  └────────────┬────────────────┘ │
│               │                   │
│  ┌────────────▼─────────────┐    │
│  │  Docker Container         │    │
│  │  ┌──────────────────┐    │    │
│  │  │  Next.js (3000)  │    │    │
│  │  └──────────────────┘    │    │
│  │  ┌──────────────────┐    │    │
│  │  │  FastAPI (8000)  │    │    │
│  │  └──────────────────┘    │    │
│  │  ┌──────────────────┐    │    │
│  │  │  PostgreSQL      │    │    │
│  │  └──────────────────┘    │    │
│  └──────────────────────────┘    │
│                                   │
└───────────────────────────────────┘
```

**Files**:
- `Dockerfile` (backend)
- `Dockerfile` (frontend)
- `docker-compose.yml` (orchestration)
- `kubernetes.yaml` (optional, K8s)

---

## 🔐 Security Considerations

1. **API Keys**
   - Never commit `.env` files
   - Use environment variables
   - Rotate keys regularly

2. **File Uploads**
   - Validate file types
   - Limit file size (100MB)
   - Scan for malware (production)

3. **API Security**
   - Rate limiting
   - CORS configuration
   - Input validation
   - SQL injection prevention (use ORM)

4. **Authentication** (Phase 2)
   - JWT tokens
   - Secure password hashing
   - Session management

---

## 📈 Scalability Considerations

**Current (MVP)**:
- Single server
- SQLite database
- File storage on disk

**Future (Production)**:
- Multiple servers (horizontal scaling)
- PostgreSQL with replicas
- Cloud storage (S3/GCS)
- Redis cache
- Message queue (for async processing)
- CDN for static files

---

## 🧪 Testing Strategy

1. **Unit Tests**
   - Test individual functions
   - Mock Gemini API calls
   - Test database operations

2. **Integration Tests**
   - Test API endpoints
   - Test complete flows
   - Test error scenarios

3. **Manual Testing**
   - Test UI on different browsers
   - Test with various audio formats
   - Test edge cases

---

## 📊 Monitoring & Logging

**Development**:
- Console logs
- FastAPI debug mode

**Production**:
- Application logs (structured JSON)
- Error tracking (Sentry)
- Performance monitoring (APM)
- Usage analytics

---

## 🚀 Deployment Steps

1. **Local Development**
   ```bash
   # Backend
   uvicorn app.main:app --reload
   
   # Frontend
   npm run dev
   ```

2. **Docker (Local Testing)**
   ```bash
   docker-compose up
   ```

3. **Cloud Deployment**
   ```bash
   # Build images
   docker build -t meeting-assistant-backend ./backend
   docker build -t meeting-assistant-frontend ./frontend
   
   # Push to registry
   docker push your-registry/meeting-assistant-backend
   docker push your-registry/meeting-assistant-frontend
   
   # Deploy to cloud
   # (specific to your cloud provider)
   ```

---

## 📚 Technology Choices - Why?

| Technology | Why? |
|------------|------|
| **FastAPI** | Fast, modern, automatic API docs, async support |
| **Next.js** | SEO-friendly, great developer experience, React |
| **Gemini** | Free tier, handles audio + text, easy to use |
| **SQLite** | Zero setup, perfect for development |
| **Docker** | Consistent environments, easy deployment |
| **TailwindCSS** | Fast styling, responsive by default |

---

## 🎯 Success Metrics

- ⚡ Page load time < 2 seconds
- 🎯 API response time < 500ms
- 📊 Transcription accuracy > 90%
- 💪 Handle files up to 100MB
- 📱 Mobile responsive (score > 90)

---

**Architecture Review Date**: October 28, 2025
**Last Updated**: Initial Version
**Status**: Ready for Development

---

This architecture is designed to be **simple to build**, **easy to understand**, and **ready to scale** when needed. Start simple, add complexity only when necessary! 🚀
