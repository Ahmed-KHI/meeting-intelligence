"""
Test script to verify Gemini API connection
Run this first before building the full app!
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_gemini():
    """Test if Gemini API is working"""
    try:
        import google.generativeai as genai
        
        # Get API key
        api_key = os.getenv('GEMINI_API_KEY')
        
        if not api_key:
            print("❌ Error: GEMINI_API_KEY not found in .env file")
            print("📝 Create a .env file with your API key:")
            print("   GEMINI_API_KEY=your_key_here")
            return False
        
        # Configure Gemini
        genai.configure(api_key=api_key)
        
        # Test with a simple request
        print("🔄 Testing Gemini API...")
        
        # Use the stable Gemini 2.0 Flash model
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content("Say 'Hello from Meeting Assistant!'")
        
        print("✅ Success! Gemini API is working!")
        print(f"📨 Response: {response.text}")
        return True
        
    except ImportError:
        print("❌ Error: google-generativeai not installed")
        print("📦 Install it with: pip install google-generativeai")
        return False
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    print("🎙️ Meeting Assistant - Gemini API Test\n")
    test_gemini()
