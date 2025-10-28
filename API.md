# 📚 API Documentation

## Base URL
```
Local: http://localhost:8000
```

---

## Authentication
Currently no authentication required (add in production!)

---

## Endpoints

### Health Check

#### `GET /`
Root endpoint - check if API is running

**Response**:
```json
{
  "message": "AI Meeting Assistant API is running! 🎙️",
  "status": "healthy",
  "version": "1.0.0"
}
```

#### `GET /health`
Detailed health check

**Response**:
```json
{
  "status": "healthy",
  "gemini_configured": true,
  "upload_dir": "./uploads",
  "upload_dir_exists": true
}
```

---

### Meetings

#### `POST /api/meetings/`
Upload and process a meeting recording

**Request**:
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file` (required): Audio/video file
  - `title` (optional): Meeting title

**Response** (200):
```json
{
  "id": 1,
  "title": "Team Meeting 2025-10-28",
  "audio_filename": "meeting.mp3",
  "transcription": "Full meeting transcription...",
  "summary": {
    "title": "Q4 Planning Meeting",
    "key_points": [
      "Discussed Q4 goals",
      "Reviewed budget"
    ],
    "decisions": [
      "Approved new project"
    ],
    "action_items": [
      {
        "task": "Prepare budget report",
        "assignee": "John",
        "priority": "high"
      }
    ]
  },
  "duration": null,
  "participants": null,
  "status": "completed",
  "created_at": "2025-10-28T10:00:00",
  "updated_at": "2025-10-28T10:05:00"
}
```

**Errors**:
- `400`: Invalid file type or missing file
- `500`: Processing failed

---

#### `GET /api/meetings/`
Get all meetings

**Query Parameters**:
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum records to return (default: 10)

**Response** (200):
```json
[
  {
    "id": 1,
    "title": "Team Meeting",
    "status": "completed",
    ...
  },
  {
    "id": 2,
    "title": "Client Call",
    "status": "processing",
    ...
  }
]
```

---

#### `GET /api/meetings/{meeting_id}`
Get a specific meeting

**Parameters**:
- `meeting_id`: Meeting ID (integer)

**Response** (200):
```json
{
  "id": 1,
  "title": "Team Meeting",
  "transcription": "...",
  "summary": {...},
  "status": "completed",
  ...
}
```

**Errors**:
- `404`: Meeting not found

---

#### `DELETE /api/meetings/{meeting_id}`
Delete a meeting

**Parameters**:
- `meeting_id`: Meeting ID (integer)

**Response** (200):
```json
{
  "message": "Meeting deleted successfully"
}
```

**Errors**:
- `404`: Meeting not found

---

#### `GET /api/meetings/{meeting_id}/actions`
Get all action items for a meeting

**Parameters**:
- `meeting_id`: Meeting ID (integer)

**Response** (200):
```json
[
  {
    "id": 1,
    "meeting_id": 1,
    "description": "Prepare budget report",
    "assignee": "John",
    "due_date": null,
    "priority": "high",
    "status": "pending",
    "created_at": "2025-10-28T10:05:00",
    "updated_at": "2025-10-28T10:05:00"
  }
]
```

---

### Tasks / Action Items

#### `GET /api/tasks/`
Get all action items

**Query Parameters**:
- `status` (optional): Filter by status (pending, in_progress, completed)
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum records to return (default: 50)

**Response** (200):
```json
[
  {
    "id": 1,
    "meeting_id": 1,
    "description": "Task description",
    "assignee": "John",
    "due_date": "2025-11-01",
    "priority": "medium",
    "status": "pending",
    ...
  }
]
```

---

#### `GET /api/tasks/{task_id}`
Get a specific task

**Parameters**:
- `task_id`: Task ID (integer)

**Response** (200):
```json
{
  "id": 1,
  "meeting_id": 1,
  "description": "Task description",
  "assignee": "John",
  "status": "pending",
  ...
}
```

**Errors**:
- `404`: Task not found

---

#### `PATCH /api/tasks/{task_id}`
Update a task

**Parameters**:
- `task_id`: Task ID (integer)

**Request Body** (partial update):
```json
{
  "status": "completed",
  "assignee": "Jane",
  "priority": "high"
}
```

**Response** (200):
```json
{
  "id": 1,
  "status": "completed",
  "assignee": "Jane",
  ...
}
```

---

#### `DELETE /api/tasks/{task_id}`
Delete a task

**Parameters**:
- `task_id`: Task ID (integer)

**Response** (200):
```json
{
  "message": "Task deleted successfully"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 400  | Bad Request (invalid input) |
| 404  | Not Found |
| 500  | Server Error |

---

## File Upload Specifications

### Supported Formats
- Audio: MP3, WAV, M4A, OGG
- Video: MP4, WebM

### Limits
- Max file size: 100MB
- Processing time: 1-5 minutes depending on file size

---

## Interactive Documentation

Visit `/docs` on your API server for interactive Swagger UI documentation where you can test endpoints directly!

Example: http://localhost:8000/docs

---

## Code Examples

### Python
```python
import requests

# Upload meeting
with open('meeting.mp3', 'rb') as f:
    files = {'file': f}
    response = requests.post('http://localhost:8000/api/meetings/', files=files)
    meeting = response.json()

# Get all meetings
meetings = requests.get('http://localhost:8000/api/meetings/').json()

# Update task
task_update = {'status': 'completed'}
requests.patch(f'http://localhost:8000/api/tasks/1', json=task_update)
```

### JavaScript
```javascript
// Upload meeting
const formData = new FormData();
formData.append('file', file);

const response = await fetch('http://localhost:8000/api/meetings/', {
  method: 'POST',
  body: formData
});
const meeting = await response.json();

// Get all meetings
const meetings = await fetch('http://localhost:8000/api/meetings/').then(r => r.json());

// Update task
await fetch('http://localhost:8000/api/tasks/1', {
  method: 'PATCH',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({status: 'completed'})
});
```

### cURL
```bash
# Upload meeting
curl -X POST "http://localhost:8000/api/meetings/" \
  -F "file=@meeting.mp3"

# Get all meetings
curl "http://localhost:8000/api/meetings/"

# Update task
curl -X PATCH "http://localhost:8000/api/tasks/1" \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

---

**Last Updated**: October 28, 2025
