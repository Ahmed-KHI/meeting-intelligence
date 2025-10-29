#!/bin/bash
# Render.com startup script

echo "🚀 Starting Meeting Intelligence Backend..."

# Navigate to backend directory
cd backend

# Create necessary directories
mkdir -p uploads

# Initialize database if it doesn't exist
if [ ! -f meetings.db ]; then
    echo "📦 Initializing database..."
    python init_db.py
fi

# Start the FastAPI server
echo "✅ Starting FastAPI server on port $PORT..."
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
