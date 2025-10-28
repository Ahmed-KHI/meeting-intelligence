# Project Specification: AI-Powered Meeting Assistant

## 🎯 Vision

Create a **dead-simple** meeting assistant that anyone can use without training. Record a meeting, get a summary, and see what needs to be done next.

---

## 🧑‍💼 Target Users

1. **Small Business Owners** - Need to track client meetings without hiring an assistant
2. **Project Managers** - Want automatic action item tracking
3. **Remote Teams** - Need clear meeting documentation
4. **Solopreneurs** - Want to stay organized without complexity

---

## ✨ Core Features (MVP - Keep It Simple!)

### 1. Meeting Recording (Phase 1)
- **User uploads audio/video file** (no live recording in MVP)
- Supports: MP3, WAV, MP4, WebM
- Max file size: 100MB
- Simple drag-and-drop interface

### 2. AI Transcription (Phase 1)
- Send audio to Gemini API
- Get text transcription
- Show processing status ("Transcribing... 45% done")

### 3. Smart Summary (Phase 1)
- AI generates:
  - Meeting title (auto-suggested)
  - Key discussion points (3-5 bullets)
  - Decisions made
  - Action items with suggested assignees

### 4. Action Item Management (Phase 2)
- User can:
  - Edit AI-suggested action items
  - Assign to team members
  - Set due dates
  - Mark as complete
- Dashboard shows:
  - Pending tasks
  - Overdue items
  - Completed tasks

### 5. Meeting History (Phase 2)
- List all past meetings
- Search by date, title, or participant
- View previous summaries

---

## 🚫 What We're NOT Building (Keep Scope Small)

❌ Live meeting recording (too complex)
❌ Video conferencing integration
❌ Calendar sync (maybe later)
❌ Email notifications (maybe later)
❌ Mobile app (web-first)
❌ Real-time collaboration
❌ Advanced analytics

---

## 🎨 User Interface Principles

### **Simple = Better**

1. **Home Page**: 
   - Big "Upload Meeting Recording" button
   - List of recent meetings below

2. **Upload Page**:
   - Drag & drop area
   - "Upload" button
   - Progress bar

3. **Meeting Detail Page**:
   - Meeting info (date, duration, participants)
   - Transcription (collapsible)
   - Summary (key points)
   - Action items (checkboxes)

4. **Dashboard**:
   - "My Tasks" section
   - "All Meetings" section
   - Simple filters (date range, status)

### Design Guidelines
- Use **large, clear buttons**
- **Minimal clicks** to complete tasks
- **Visual feedback** for all actions
- **Mobile-responsive** (works on phone)
- **No jargon** - use plain English

---

## 🔧 Technical Architecture (Simple & Scalable)

### Backend (FastAPI)
```
/api/meetings          POST   - Upload & process meeting
/api/meetings          GET    - List all meetings
/api/meetings/{id}     GET    - Get meeting details
/api/tasks             GET    - Get all action items
/api/tasks/{id}        PATCH  - Update task status
```

### Frontend (Next.js)
```
/                     - Home (upload + recent meetings)
/meetings/{id}        - Meeting detail page
/dashboard            - Tasks overview
```

### Database Schema (SQLite → PostgreSQL)
```sql
meetings:
  - id, title, audio_url, transcription, 
    summary, created_at, duration, participants

action_items:
  - id, meeting_id, description, assignee, 
    due_date, status, created_at
```

---

## 🤖 Gemini AI Integration

### Use Cases:

1. **Transcription**
```python
# Upload audio → Get text
gemini.transcribe(audio_file)
```

2. **Summary Generation**
```python
# Analyze transcription → Get structured summary
gemini.analyze(transcription_text)
# Returns: {title, key_points, decisions, action_items}
```

3. **Smart Extraction**
- Detect meeting participants from conversation
- Identify deadlines mentioned in text
- Suggest task priorities

---

## 📊 Success Metrics

- ✅ User can upload and process a meeting in **under 2 minutes**
- ✅ AI accuracy > 80% for action item extraction
- ✅ App loads in **under 2 seconds**
- ✅ Works on mobile without issues
- ✅ User can find any past meeting in **under 10 seconds**

---

## 🚀 Development Phases

### Phase 1: MVP (Week 1-2)
- [ ] Backend API setup
- [ ] Gemini integration (transcription + summary)
- [ ] Basic frontend (upload + view results)
- [ ] SQLite database
- [ ] Docker setup

### Phase 2: Enhancement (Week 3-4)
- [ ] Action item management
- [ ] Dashboard with tasks
- [ ] Search functionality
- [ ] PostgreSQL migration
- [ ] Cloud deployment

### Phase 3: Polish (Week 5-6)
- [ ] UI improvements
- [ ] Error handling
- [ ] Loading states
- [ ] User feedback
- [ ] Testing & bug fixes

---

## 🔐 Security Considerations

- API keys stored in environment variables
- File upload validation (type, size)
- Rate limiting on API endpoints
- User authentication (Phase 2)

---

## 💡 Future Enhancements (After MVP)

- 🎤 Live recording support
- 📧 Email summaries
- 📅 Calendar integration
- 👥 Team collaboration
- 📱 Mobile app
- 🌍 Multi-language support

---

## ✅ Definition of Done

**A meeting assistant is successful when:**
1. My grandmother can use it without asking for help
2. It saves users at least 30 minutes per week
3. Users prefer it over taking manual notes
4. It works reliably 99% of the time

---

**Remember: Simple is better than feature-rich. Focus on doing ONE thing really well!** 🎯
