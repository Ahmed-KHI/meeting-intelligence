"""
Gemini AI Service
Handles all AI operations: transcription, summarization, action item extraction
"""

import os
import google.generativeai as genai
from typing import Dict, List, Optional

class GeminiService:
    """Simple service to interact with Gemini AI"""
    
    def __init__(self):
        """Initialize Gemini with API key"""
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=api_key)
        # Use Gemini 2.0 Flash - fast and cost-effective
        self.model = genai.GenerativeModel('gemini-2.0-flash')
    
    def generate_summary(self, transcription: str) -> Dict:
        """
        Generate a meeting summary from transcription
        
        Args:
            transcription: The full text transcription of the meeting
            
        Returns:
            Dictionary with title, key_points, decisions, and action_items
        """
        
        prompt = f"""
You are a meeting assistant. Analyze this meeting transcription and provide:

1. A short meeting title (5-8 words)
2. Key discussion points (3-5 bullet points)
3. Decisions made (if any)
4. Action items with suggested assignee (if mentioned)

Transcription:
{transcription}

Respond in this exact JSON format (valid JSON only, no markdown):
{{
    "title": "Meeting title here",
    "key_points": ["point 1", "point 2", "point 3"],
    "decisions": ["decision 1", "decision 2"],
    "action_items": [
        {{"task": "description", "assignee": "person name or Unassigned", "priority": "medium"}}
    ]
}}

Keep it simple and clear. If something is not mentioned, use empty arrays.
"""
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Try to parse JSON from response
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text.replace("```json", "").replace("```", "").strip()
            elif response_text.startswith("```"):
                response_text = response_text.replace("```", "").strip()
            
            # Parse JSON
            import json
            summary = json.loads(response_text)
            return summary
            
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            return {
                "title": "Meeting Summary",
                "key_points": [response_text[:200]] if response_text else [],
                "decisions": [],
                "action_items": []
            }
        except Exception as e:
            raise Exception(f"Error generating summary: {str(e)}")
    
    def transcribe_audio(self, audio_path: str) -> str:
        """
        Transcribe audio file to text
        Note: Gemini can handle audio files directly!
        
        Args:
            audio_path: Path to the audio file
            
        Returns:
            Transcription text
        """
        import time
        
        try:
            # Upload the audio file
            print(f"Uploading file: {audio_path}")
            audio_file = genai.upload_file(path=audio_path)
            print(f"File uploaded: {audio_file.name}, State: {audio_file.state.name}")
            
            # Wait for the file to be processed and become ACTIVE
            max_wait = 120  # Maximum 2 minutes
            waited = 0
            while audio_file.state.name != "ACTIVE":
                if waited >= max_wait:
                    raise Exception(f"File processing timeout. State: {audio_file.state.name}")
                
                print(f"Waiting for file to be ACTIVE... Current state: {audio_file.state.name}")
                time.sleep(2)
                waited += 2
                audio_file = genai.get_file(audio_file.name)
            
            print(f"File is ACTIVE! Starting transcription...")
            
            # Create prompt for transcription
            prompt = "Please transcribe this audio file accurately. Provide the full transcription."
            
            # Generate transcription using Gemini 2.0
            model = genai.GenerativeModel('gemini-2.0-flash')
            response = model.generate_content([prompt, audio_file])
            
            print("Transcription completed!")
            return response.text
            
        except Exception as e:
            raise Exception(f"Error transcribing audio: {str(e)}")
    
    def extract_action_items(self, text: str) -> List[Dict]:
        """
        Extract action items from meeting text
        
        Args:
            text: Meeting transcription or notes
            
        Returns:
            List of action items with details
        """
        
        prompt = f"""
Extract all action items from this meeting text.
For each action item, identify:
- The task description
- Who it's assigned to (if mentioned)
- Any deadline mentioned
- Priority level (high/medium/low)

Text:
{text}

Return as a simple list of action items in JSON format:
[
    {{"task": "description", "assignee": "name", "deadline": "date or null", "priority": "medium"}}
]

If no action items found, return an empty array [].
"""
        
        try:
            response = self.model.generate_content(prompt)
            # In production, parse JSON response
            return []
        except Exception as e:
            raise Exception(f"Error extracting action items: {str(e)}")

# Singleton instance
_gemini_service = None

def get_gemini_service() -> GeminiService:
    """Get or create GeminiService instance"""
    global _gemini_service
    if _gemini_service is None:
        _gemini_service = GeminiService()
    return _gemini_service
