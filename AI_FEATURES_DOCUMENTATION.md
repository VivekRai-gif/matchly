# 🚀 Scoutify AI - Advanced Features Documentation

## Overview
Scoutify AI now includes 4 powerful AI-powered features built with **Google Gemini API** and Python backend:

1. ✅ **Verifiable Skill Credentials**
2. 🛡️ **Bias Detection Algorithms**
3. 👁️ **Transparent Matching Process**
4. 🔒 **Privacy-Preserving Verification**

---

## 🎯 Features

### 1️⃣ Verifiable Skill Credentials

**What it does:**
- Extracts all technical and soft skills from resumes using AI
- Verifies if skill claims have actual evidence in resume/projects
- Cross-verifies candidate skills against job requirements
- Generates blockchain-style hash verification for validated skills

**Technology:**
- Python backend with Gemini AI
- Skill extraction with context understanding
- Evidence-based verification
- Hash-based credential generation

**API Endpoints:**
```
POST /api/skills/extract          - Extract skills from resume
POST /api/skills/verify           - Verify skill claims
POST /api/skills/cross-verify     - Match skills with job requirements
POST /api/skills/credential       - Generate verifiable credential
```

**Example Response:**
```json
{
  "success": true,
  "skills": {
    "technical_skills": [
      {
        "skill": "Python",
        "category": "programming",
        "proficiency_level": "advanced",
        "evidence_found": true
      }
    ],
    "certifications": ["AWS Certified"],
    "total_skills_count": 25
  }
}
```

---

### 2️⃣ Bias Detection Algorithms

**What it does:**
- Masks sensitive attributes (name, gender, age, location)
- Evaluates candidates purely on skills and merit
- Detects potential bias in evaluation text
- Compares biased vs unbiased evaluations

**Technology:**
- LLM-powered bias detection
- Personal information masking
- Fairness metrics calculation
- Comparative analysis

**API Endpoints:**
```
POST /api/bias/mask-personal-info - Mask PII from resume
POST /api/bias/detect             - Detect bias in evaluation
POST /api/bias/fair-evaluation    - Perform unbiased evaluation
```

**Example Response:**
```json
{
  "success": true,
  "fair_evaluation": {
    "merit_score": 87,
    "skill_evaluation": {...},
    "strengths": ["Strong Python skills", "ML project experience"],
    "recommendation": "strong_fit",
    "fairness_guarantee": "Evaluated based purely on skills"
  },
  "masked_attributes": ["gender_title", "candidate_name", "age"]
}
```

---

### 3️⃣ Transparent Matching Process

**What it does:**
- Provides detailed matching analysis with full transparency
- Explains EVERY decision and score component
- Shows reasoning behind recommendations
- Generates human-readable explanation reports

**Technology:**
- Explainable AI with Gemini
- Multi-factor scoring (skills, experience, education, projects)
- Detailed reasoning for each component
- JSON-structured transparency

**API Endpoints:**
```
POST /api/match/transparent           - Full transparent matching
POST /api/match/score-breakdown       - Detailed score breakdown
POST /api/match/explanation-report    - Human-readable report
```

**Example Response:**
```json
{
  "success": true,
  "transparent_match": {
    "overall_match_score": 87,
    "recommendation": "strong_match",
    "skill_alignment": {
      "score": 92,
      "matched_skills": [...],
      "explanation": "Candidate demonstrates strong alignment..."
    },
    "strengths": [
      {
        "strength": "Advanced Python",
        "evidence": "5 years experience + ML projects",
        "value_to_role": "Critical for backend development"
      }
    ],
    "transparency_statement": "Complete explanation of scoring...",
    "fairness_check": {
      "bias_free": true,
      "merit_based": true
    }
  }
}
```

---

### 4️⃣ Privacy-Preserving Verification

**What it does:**
- Masks all personally identifiable information (PII)
- Creates anonymous candidate profiles
- Generates privacy analysis reports
- Extracts only minimal required data
- Hash-based verification without storing raw data

**Technology:**
- PII detection and masking
- Anonymous ID generation
- SHA-256 hashing
- Data minimization
- Privacy risk assessment

**API Endpoints:**
```
POST /api/privacy/mask-pii           - Mask PII from text
POST /api/privacy/anonymous-profile  - Create anonymous profile
POST /api/privacy/report             - Generate privacy report
POST /api/privacy/minimal-data       - Extract minimal data
```

**Example Response:**
```json
{
  "success": true,
  "privacy_report": {
    "pii_detected": true,
    "pii_types_found": ["email", "phone", "address"],
    "privacy_risk_level": "medium",
    "total_pii_instances": 8,
    "recommendations": [
      "Mask email addresses except domain",
      "Remove phone numbers from automated processing",
      "Use anonymous candidate IDs"
    ]
  }
}
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API Key

### Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Update API Key** (if needed):
Edit `backend/app.py` and update:
```python
GEMINI_API_KEY = "your-gemini-api-key-here"
```

5. **Run backend server:**
```bash
python app.py
```

Server will start on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

---

## 📱 Using the Features

### Web Interface

1. **Navigate to AI Features:**
   - Click "AI Features" button in the navbar
   - Or visit: `http://localhost:5173/features/ai-features`

2. **Select a Feature:**
   - Click on one of the 4 feature tabs
   - Each tab shows a different AI capability

3. **Upload Resume:**
   - Drag & drop or click to upload (PDF, DOCX, TXT)

4. **Add Job Description** (for matching/bias features):
   - Paste job description in the text area

5. **Analyze:**
   - Click the analysis button
   - Results will appear below with detailed insights

---

## 🧪 API Testing

### Using cURL

**Extract Skills:**
```bash
curl -X POST http://localhost:5000/api/skills/extract \
  -F "resume=@resume.pdf"
```

**Fair Evaluation:**
```bash
curl -X POST http://localhost:5000/api/bias/fair-evaluation \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Python Developer with ML experience..."
```

**Transparent Match:**
```bash
curl -X POST http://localhost:5000/api/match/transparent \
  -F "resume=@resume.pdf" \
  -F "jobDescription=Senior Backend Engineer..."
```

**Privacy Report:**
```bash
curl -X POST http://localhost:5000/api/privacy/report \
  -F "resume=@resume.pdf"
```

---

## 📊 Tech Stack

### Backend
- **Flask** - Web framework
- **Google Generative AI (Gemini)** - LLM for analysis
- **PyPDF2** - PDF parsing
- **python-docx** - DOCX parsing
- **hashlib** - Cryptographic hashing
- **scikit-learn** - ML utilities

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Router** - Navigation

---

## 🔐 Security & Privacy

1. **API Key Protection:**
   - Never commit API keys to git
   - Use environment variables in production

2. **Data Privacy:**
   - All PII can be masked
   - Anonymous processing available
   - No data stored permanently

3. **Bias Mitigation:**
   - Automatic masking of demographic info
   - Merit-based evaluation only
   - Fairness verification built-in

---

## 🎓 Use Cases

### For Recruiters:
- Verify candidate skills objectively
- Remove unconscious bias from screening
- Get transparent explanations for decisions
- Protect candidate privacy

### For Candidates:
- Get verifiable skill credentials
- Fair evaluation based on merit
- Privacy-preserving application process
- Transparent feedback

### For Organizations:
- Improve hiring fairness
- Reduce bias in recruitment
- Ensure GDPR/privacy compliance
- Make data-driven decisions

---

## 🚀 Next Steps

1. **Test all features** with sample resumes
2. **Customize** prompts in backend modules for your use case
3. **Add database** to store credentials and analysis results
4. **Implement authentication** for production use
5. **Deploy** to cloud (AWS, Azure, GCP)

---

## 📝 Notes

- All features use the same Gemini API key
- Processing time varies based on resume length
- Larger files may take 10-30 seconds to analyze
- Mobile responsive UI included
- All responses are JSON formatted

---

## 🆘 Troubleshooting

**Backend won't start:**
- Check Python version (3.8+)
- Verify all dependencies installed
- Check Gemini API key is valid

**Frontend errors:**
- Run `npm install` again
- Clear browser cache
- Check backend is running on port 5000

**API errors:**
- Verify file format (PDF, DOCX, TXT only)
- Check file size (under 10MB recommended)
- Ensure Gemini API has quota available

---

## 📄 License
MIT License - See LICENSE file for details

---

**Built with ❤️ using Google Gemini AI**
