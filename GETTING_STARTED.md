# Getting Started with Meeting Assistant

## 🎯 Goal
Build a simple AI meeting assistant that takes an audio file and outputs:
1. Text transcription
2. Meeting summary
3. Action items

---

## 📋 Step-by-Step Setup

### Step 1: Set Up Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key (it looks like: `AIzaSy...`)

### Step 2: Create Project Structure

```bash
cd meeting-assistant

# Create backend folder
mkdir backend
cd backend
mkdir app
cd app
mkdir routes services models
```

### Step 3: Create Environment File

Create `backend/.env`:
```env
GEMINI_API_KEY=your_actual_api_key_here
DATABASE_URL=sqlite:///./meetings.db
```

⚠️ **Important**: Add `.env` to `.gitignore` to keep your API key secret!

---

## 🧪 Test Gemini API First

Let's make sure your API key works before building the full app.

Create `backend/test_gemini.py`:

```python
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Test the API
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("Say hello!")

print("✅ Gemini API is working!")
print(f"Response: {response.text}")
```

Run it:
```bash
pip install google-generativeai python-dotenv
python test_gemini.py
```

If you see "✅ Gemini API is working!" - you're ready to build! 🎉

---

## 📦 Required Dependencies

Create `backend/requirements.txt`:
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
google-generativeai==0.3.2
sqlalchemy==2.0.23
pydantic==2.5.0
python-multipart==0.0.6
aiofiles==23.2.1
```

Install:
```bash
pip install -r requirements.txt
```

---

## 🏗️ Build Order (Keep It Simple!)

### Day 1: Backend Foundation
1. ✅ Set up FastAPI app
2. ✅ Test Gemini connection
3. ✅ Create database models
4. ✅ Build upload endpoint

### Day 2: AI Integration
1. ✅ Transcription service
2. ✅ Summary generation
3. ✅ Action item extraction
4. ✅ Test with sample audio

### Day 3: Frontend Basics
1. ✅ Next.js setup
2. ✅ Upload component
3. ✅ Display results
4. ✅ Connect to backend

### Day 4: Make It Work
1. ✅ End-to-end testing
2. ✅ Fix bugs
3. ✅ Add loading states
4. ✅ Error handling

### Day 5: Polish & Deploy
1. ✅ UI improvements
2. ✅ Docker setup
3. ✅ Deploy to cloud
4. ✅ Documentation

---

## 🎯 Minimum Viable Product (MVP)

**Goal**: Upload an audio file → Get AI analysis

### Must Have:
- ✅ File upload
- ✅ Transcription
- ✅ Summary display
- ✅ Action items list

### Nice to Have (Phase 2):
- Task management
- User accounts
- Search
- Email notifications

---

## 💡 Development Tips

### 1. Start Small
Don't try to build everything at once. Get the core working first.

### 2. Test Often
After each feature, test it manually. Fix issues immediately.

### 3. Use Sample Data
Create a test audio file (record yourself talking for 2 minutes about a fake meeting).

### 4. Keep UI Simple
Don't get stuck on design. Use basic HTML/CSS first, make it pretty later.

### 5. Read Errors Carefully
When something breaks, read the error message. It usually tells you exactly what's wrong.

---

## 🆘 Common Issues & Solutions

### Issue: "API Key Invalid"
**Solution**: Check your `.env` file, make sure the key has no spaces or quotes.

### Issue: "Module not found"
**Solution**: Make sure you activated your virtual environment and ran `pip install -r requirements.txt`

### Issue: "CORS Error"
**Solution**: Add CORS middleware to FastAPI (we'll cover this in the code)

### Issue: "File too large"
**Solution**: Compress your audio file or increase the upload limit

---

## 📚 Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Tutorial](https://nextjs.org/learn)
- [Gemini API Guide](https://ai.google.dev/tutorials/python_quickstart)
- [SQLAlchemy Basics](https://docs.sqlalchemy.org/en/20/tutorial/)

---

## 🎉 Ready to Build?

Let's start with the backend in the next step!

**Remember**: 
- ✅ Keep it simple
- ✅ Test frequently
- ✅ Don't over-engineer
- ✅ Focus on getting it working first, optimize later

You've got this! 💪
