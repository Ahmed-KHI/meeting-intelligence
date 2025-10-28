"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import date, datetime

# Meeting schemas
class MeetingCreate(BaseModel):
    title: Optional[str] = None

class MeetingResponse(BaseModel):
    id: int
    title: str
    audio_filename: Optional[str]
    transcription: Optional[str]
    summary: Optional[Dict[str, Any]]
    duration: Optional[int]
    participants: Optional[str]
    status: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

# Action Item schemas
class ActionItemCreate(BaseModel):
    description: str
    assignee: Optional[str] = None
    due_date: Optional[date] = None
    priority: str = "medium"

class ActionItemUpdate(BaseModel):
    description: Optional[str] = None
    assignee: Optional[str] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    status: Optional[str] = None

class ActionItemResponse(BaseModel):
    id: int
    meeting_id: int
    description: str
    assignee: Optional[str]
    due_date: Optional[date]
    priority: str
    status: str
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
