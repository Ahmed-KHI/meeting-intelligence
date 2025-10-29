"""
FastAPI Meeting Assistant - Main Application
Simple, clean, and easy to understand.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="AI Meeting Assistant",
    description="Simple meeting transcription and action tracking",
    version="1.0.0"
)

# CORS - Allow frontend to talk to backend
# Production and development origins
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://meeting-intelligence.vercel.app",
    "https://*.vercel.app",  # All Vercel preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Initialize database
from app.database import Base, engine
Base.metadata.create_all(bind=engine)

# Health check endpoint
@app.get("/")
async def root():
    """Check if the API is running"""
    return {
        "message": "AI Meeting Assistant API is running! 🎙️",
        "status": "healthy",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    gemini_key = os.getenv("GEMINI_API_KEY")
    return {
        "status": "healthy",
        "gemini_configured": bool(gemini_key),
        "upload_dir": UPLOAD_DIR,
        "upload_dir_exists": os.path.exists(UPLOAD_DIR)
    }

# Import and include routers
from app.routes import meetings, tasks

app.include_router(meetings.router, prefix="/api/meetings", tags=["meetings"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
