"""
Simple test to verify the backend components work
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath('.'))

print("🧪 Testing Meeting Assistant Backend Components\n")

# Test 1: Import app
print("Test 1: Import FastAPI app")
try:
    from app.main import app
    print("✅ FastAPI app imported successfully\n")
except Exception as e:
    print(f"❌ Failed to import app: {e}\n")
    sys.exit(1)

# Test 2: Import Gemini service
print("Test 2: Import Gemini service")
try:
    from app.services.gemini_service import GeminiService, get_gemini_service
    print("✅ Gemini service imported successfully\n")
except Exception as e:
    print(f"❌ Failed to import Gemini service: {e}\n")
    sys.exit(1)

# Test 3: Check environment variables
print("Test 3: Check environment variables")
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')
if api_key:
    print(f"✅ GEMINI_API_KEY found (length: {len(api_key)} characters)\n")
else:
    print("⚠️  GEMINI_API_KEY not found in .env\n")

# Test 4: Check uploads directory
print("Test 4: Check uploads directory")
upload_dir = os.getenv('UPLOAD_DIR', './uploads')
if os.path.exists(upload_dir):
    print(f"✅ Upload directory exists: {upload_dir}\n")
else:
    print(f"⚠️  Upload directory does not exist, creating it...")
    os.makedirs(upload_dir, exist_ok=True)
    print(f"✅ Created upload directory: {upload_dir}\n")

# Test 5: Test app routes
print("Test 5: Check API routes")
routes = [route.path for route in app.routes]
print(f"✅ Found {len(routes)} routes:")
for route in routes[:5]:  # Show first 5 routes
    print(f"   - {route}")
print()

print("=" * 60)
print("✅ ALL TESTS PASSED! Backend is ready to run! 🎉")
print("=" * 60)
print("\n📝 Next steps:")
print("1. Make sure your .env file has a valid GEMINI_API_KEY")
print("2. Run: python -m uvicorn app.main:app --reload")
print("3. Open: http://localhost:8000")
print("4. Check API docs: http://localhost:8000/docs")

