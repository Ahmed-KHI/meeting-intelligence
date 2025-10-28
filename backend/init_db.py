"""
Initialize database - create tables
"""
from app.database import engine, Base
from app.models import Meeting, ActionItem

def init_db():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

if __name__ == "__main__":
    init_db()
