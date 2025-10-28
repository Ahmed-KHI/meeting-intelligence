"""
Meeting database model
"""
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from typing import Optional
from app.database import Base

class Meeting(Base):
    """Meeting model - stores meeting information"""
    __tablename__ = "meetings"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    audio_filename = Column(String(255), nullable=True)
    audio_path = Column(String(500), nullable=True)
    transcription = Column(Text, nullable=True)
    summary = Column(JSON, nullable=True)
    duration = Column(Integer, nullable=True)
    participants = Column(String(500), nullable=True)
    status = Column(String(50), default="processing")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert model to dictionary"""
        return {
            "id": self.id,
            "title": self.title,
            "audio_filename": self.audio_filename,
            "transcription": self.transcription,
            "summary": self.summary,
            "duration": self.duration,
            "participants": self.participants,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
