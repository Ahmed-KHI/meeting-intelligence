# 🚀 Deployment Guide

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
python init_db.py
python run.py
```

Backend will be available at: http://localhost:8000

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: http://localhost:3000

---

## Docker Deployment (Recommended)

### Prerequisites
- Docker
- Docker Compose

### Steps

1. **Configure environment**:
   ```bash
   cp .env.docker .env
   # Edit .env and add your GEMINI_API_KEY
   ```

2. **Build and run**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

4. **Stop the application**:
   ```bash
   docker-compose down
   ```

---

## Cloud Deployment

### Option 1: AWS (EC2 + Docker)

1. **Launch EC2 instance**:
   - Ubuntu 22.04 LTS
   - t2.medium or larger
   - Open ports: 80, 443, 8000, 3000

2. **Install Docker**:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker $USER
   ```

3. **Clone and deploy**:
   ```bash
   git clone <your-repo>
   cd meeting-assistant
   cp .env.docker .env
   # Add your GEMINI_API_KEY to .env
   docker-compose up -d
   ```

4. **Set up reverse proxy (Nginx)**:
   ```bash
   sudo apt install nginx -y
   # Configure nginx to proxy to your app
   ```

### Option 2: Google Cloud Platform (Cloud Run)

1. **Backend deployment**:
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/PROJECT_ID/meeting-assistant-backend
   gcloud run deploy meeting-assistant-backend \
     --image gcr.io/PROJECT_ID/meeting-assistant-backend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY=your_key
   ```

2. **Frontend deployment**:
   ```bash
   cd frontend
   gcloud builds submit --tag gcr.io/PROJECT_ID/meeting-assistant-frontend
   gcloud run deploy meeting-assistant-frontend \
     --image gcr.io/PROJECT_ID/meeting-assistant-frontend \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### Option 3: Azure (App Service)

1. **Create App Service**:
   ```bash
   az group create --name meeting-assistant --location eastus
   az appservice plan create --name meeting-plan --resource-group meeting-assistant
   ```

2. **Deploy backend**:
   ```bash
   az webapp create --name meeting-backend --resource-group meeting-assistant --plan meeting-plan
   az webapp deployment source config-zip --name meeting-backend --resource-group meeting-assistant --src backend.zip
   ```

3. **Deploy frontend**:
   ```bash
   az webapp create --name meeting-frontend --resource-group meeting-assistant --plan meeting-plan
   az webapp deployment source config-zip --name meeting-frontend --resource-group meeting-assistant --src frontend.zip
   ```

---

## Environment Variables

### Required
- `GEMINI_API_KEY` - Your Google Gemini API key

### Optional
- `DATABASE_URL` - Database connection string (default: sqlite:///./meetings.db)
- `UPLOAD_DIR` - Upload directory path (default: ./uploads)
- `MAX_FILE_SIZE` - Maximum file size in bytes (default: 104857600 = 100MB)

---

## Production Checklist

- [ ] Set up HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Set up CI/CD pipeline
- [ ] Enable rate limiting
- [ ] Add authentication
- [ ] Set up error tracking (Sentry)
- [ ] Configure CDN for static files
- [ ] Set up health checks

---

## Scaling Considerations

### Database
- Move from SQLite to PostgreSQL
- Set up database replication
- Implement connection pooling

### File Storage
- Use cloud storage (S3, GCS, Azure Blob)
- Implement CDN for uploads

### Application
- Use multiple backend instances
- Implement load balancer
- Add caching (Redis)
- Use message queue for async processing

---

## Monitoring

### Logs
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Check API health
curl http://localhost:8000/health
```

### Metrics to Monitor
- API response times
- Error rates
- File upload success rate
- Gemini API usage
- Database query performance
- Server resources (CPU, memory, disk)

---

## Troubleshooting

### Backend won't start
- Check GEMINI_API_KEY is set
- Verify port 8000 is available
- Check database permissions

### Frontend can't connect to backend
- Verify backend is running
- Check CORS settings
- Verify API URL in config

### File uploads failing
- Check file size limits
- Verify upload directory exists
- Check disk space

---

## Support

For issues or questions:
1. Check the logs
2. Review API documentation (/docs)
3. Check GitHub issues
4. Contact support

---

**Last Updated**: October 28, 2025
