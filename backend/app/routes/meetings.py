"""
Meeting routes - handle meeting-related operations
"""
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from datetime import datetime
import json
import traceback

from app.database import get_db
from app.models.meeting import Meeting
from app.models.action_item import ActionItem
from app.schemas import MeetingResponse, ActionItemResponse
from app.services.gemini_service import get_gemini_service

router = APIRouter()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".mp3", ".wav", ".mp4", ".webm", ".m4a", ".ogg"}
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 104857600))  # 100MB

@router.post("/", response_model=MeetingResponse)
async def upload_meeting(
    file: UploadFile = File(...),
    title: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Upload and process a meeting audio file
    
    - Accepts audio files (mp3, wav, mp4, webm, m4a, ogg)
    - Max size: 100MB
    - Transcribes using Gemini AI
    - Generates summary and action items
    """
    
    # Validate file extension
    filename = file.filename or ""
    file_ext = os.path.splitext(filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Create meeting record
    meeting = Meeting(
        title=title or f"Meeting {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        audio_filename=file.filename,
        status="processing"
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    
    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, f"meeting_{meeting.id}{file_ext}")
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        meeting.audio_path = file_path
        db.commit()
        
        # Process with Gemini AI (in background in production)
        try:
            gemini = get_gemini_service()
            
            # Transcribe audio
            transcription = gemini.transcribe_audio(file_path)
            meeting.transcription = transcription
            
            # Generate summary
            summary = gemini.generate_summary(transcription)
            meeting.summary = summary
            
            # Extract and save action items
            if summary and "action_items" in summary:
                for item_data in summary["action_items"]:
                    action_item = ActionItem(
                        meeting_id=meeting.id,
                        description=item_data.get("task", ""),
                        assignee=item_data.get("assignee", "Unassigned"),
                        priority=item_data.get("priority", "medium"),
                        status="pending"
                    )
                    db.add(action_item)
            
            meeting.status = "completed"
            
        except Exception as e:
            print(f"ERROR in processing: {str(e)}")
            print(traceback.format_exc())
            meeting.status = "failed"
            meeting.summary = {"error": str(e)}
            db.commit()
            raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")
        
        db.commit()
        db.refresh(meeting)
        
        return meeting
        
    except Exception as e:
        print(f"ERROR in upload: {str(e)}")
        print(traceback.format_exc())
        meeting.status = "failed"
        db.commit()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[MeetingResponse])
def get_meetings(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get all meetings"""
    meetings = db.query(Meeting).order_by(Meeting.created_at.desc()).offset(skip).limit(limit).all()
    return meetings

@router.get("/{meeting_id}", response_model=MeetingResponse)
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    """Get a specific meeting by ID"""
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting

@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: int, db: Session = Depends(get_db)):
    """Delete a meeting"""
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    # Delete associated action items
    db.query(ActionItem).filter(ActionItem.meeting_id == meeting_id).delete()
    
    # Delete audio file if exists
    if meeting.audio_path and os.path.exists(meeting.audio_path):
        os.remove(meeting.audio_path)
    
    db.delete(meeting)
    db.commit()
    
    return {"message": "Meeting deleted successfully"}

@router.get("/{meeting_id}/actions", response_model=List[ActionItemResponse])
def get_meeting_actions(meeting_id: int, db: Session = Depends(get_db)):
    """Get all action items for a specific meeting"""
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    
    actions = db.query(ActionItem).filter(ActionItem.meeting_id == meeting_id).all()
    return actions
