"""
Task/Action Item routes
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.action_item import ActionItem
from app.schemas import ActionItemResponse, ActionItemUpdate

router = APIRouter()

@router.get("/", response_model=List[ActionItemResponse])
def get_all_tasks(
    status: str | None = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Get all action items, optionally filtered by status"""
    query = db.query(ActionItem)
    
    if status:
        query = query.filter(ActionItem.status == status)
    
    tasks = query.order_by(ActionItem.created_at.desc()).offset(skip).limit(limit).all()
    return tasks

@router.get("/{task_id}", response_model=ActionItemResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """Get a specific task by ID"""
    task = db.query(ActionItem).filter(ActionItem.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.patch("/{task_id}", response_model=ActionItemResponse)
def update_task(
    task_id: int,
    task_update: ActionItemUpdate,
    db: Session = Depends(get_db)
):
    """Update a task"""
    task = db.query(ActionItem).filter(ActionItem.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update only provided fields
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Delete a task"""
    task = db.query(ActionItem).filter(ActionItem.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    
    return {"message": "Task deleted successfully"}
