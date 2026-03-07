# Backend API Documentation

## Overview
Flask-based REST API for AI-powered recruitment platform using Google's Gemini AI.

## Recent Improvements

### Code Quality Enhancements
✅ **Added comprehensive docstrings** to all modules and functions  
✅ **Improved type hints** throughout the codebase  
✅ **Added logging** for better debugging and monitoring  
✅ **Enhanced error handling** with try-except blocks  
✅ **Optimized imports** and code organization  

### New Features
✅ **Configuration management** (`config.py`) with environment-specific settings  
✅ **Utility functions** (`utils.py`) for common operations  
✅ **Environment variables** support via `.env` file  
✅ **Better error responses** with standardized format  

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your actual API keys
```

### 3. Run Application
```bash
# Development
python app.py

# Production (with gunicorn)
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## API Endpoints

### Health Check
```
GET /api/health
```
Returns API status and version information.

### ATS Analysis
```
POST /api/analyze-ats
Content-Type: multipart/form-data

Parameters:
- resume: File (PDF, DOCX, TXT)
- jobDescription: String (optional)
```

### Skill Verification
```
POST /api/skills/extract
Content-Type: multipart/form-data

Parameters:
- resume: File
```

### Bias Detection
```
POST /api/bias/mask-personal-info
Content-Type: application/json

Body:
{
  "resume_text": "string"
}
```

### Transparent Matching
```
POST /api/match/transparent
Content-Type: multipart/form-data

Parameters:
- resume: File
- jobDescription: String
```

### Job Authenticity Verification
```
POST /api/job/verify-authenticity
Content-Type: application/json

Body:
{
  "job_description": "string",
  "company_name": "string",
  "salary_info": "string"
}
```

### Email Crafting
```
POST /api/email/craft-application
Content-Type: application/json

Body:
{
  "resume_data": "string",
  "job_description": "string",
  "company_name": "string",
  "hiring_manager_name": "string" (optional),
  "tone": "professional" (default)
}
```

## Error Handling

All errors return a standardized format:
```json
{
  "success": false,
  "error": "Error message here",
  "error_type": "ValueError"
}
```

## Logging

Logs are written to:
- Console (stdout)
- File (app.log) - configurable via .env

Log levels:
- DEBUG: Detailed information
- INFO: General information
- WARNING: Warning messages
- ERROR: Error messages
- CRITICAL: Critical errors

## Performance Optimizations

1. **Text Truncation**: Large documents truncated to prevent token overflow
2. **Batch Processing**: Support for processing multiple items efficiently
3. **Caching**: Response caching for repeated requests
4. **Connection Pooling**: Efficient HTTP connection management

## Security

- Input validation on all endpoints
- File type verification
- File size limits (10MB default)
- Sanitized filenames
- Environment-based API key management

## Testing

```bash
# Run tests (when implemented)
pytest tests/

# Check code style
flake8 .

# Type checking
mypy .
```

## Contributing

1. Follow PEP 8 style guide
2. Add docstrings to all functions
3. Include type hints
4. Write tests for new features
5. Update this README with changes

## License

MIT License - see LICENSE file for details
