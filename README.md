# Matchly - AI Career Intelligence Platform

**🧠 Job Seeker-Focused AI Career Intelligence System**

Matchly is a comprehensive job seeker-focused AI career intelligence platform built using a multi-agent architecture to help job seekers understand their job readiness, identify skill gaps, and apply to opportunities more effectively.

---

## 🎯 Overview

The system analyzes a candidate's resume and compares it with a job description to provide a **skill-based evaluation** instead of traditional keyword filtering. Using a **multi-agent AI architecture**, Matchly delivers deep insights, bias-free analysis, job safety verification, and personalized application emails.

---

## 🤖 Multi-Agent Architecture

### 1. **Resume Intelligence Agent**
Extracts structured data from resumes including:
- Technical and soft skills
- Experience level and projects  
- Certifications and education
- Tools and technologies

### 2. **Skill Match & Gap Agent**
Compares candidate skills with job requirements to generate:
- **Match percentage** (0-100%)
- **Matched skills** with evidence
- **Missing skills** and gaps
- **Improvement suggestions** for candidates

### 3. **Bias Detection Agent**
Removes sensitive attributes for fair evaluation:
- Masks name, gender, age, location
- Removes demographic information
- Provides **skill-first assessment**
- Ensures unbiased candidate evaluation

### 4. **Job Authenticity Verification Agent** 🆕
Analyzes job postings for legitimacy:
- Detects suspicious patterns and scam indicators
- Verifies company information
- Flags red flags (payment requests, unrealistic offers)
- Provides **safety ratings** (safe/caution/suspicious/scam)

### 5. **Email Crafting Agent** 🆕
Generates personalized job application emails:
- Tailored to job description and candidate profile
- Professional and compelling content
- Multiple subject line options
- Follow-up email generation
- LinkedIn message templates

---

## ⭐ Key Features

✅ **AI resume skill extraction**  
✅ **Skill match percentage** with job descriptions  
✅ **Skill gap identification** and improvement suggestions  
✅ **Bias-reduced evaluation** for fair assessment  
✅ **Job authenticity verification** to detect fake listings  
✅ **AI-generated personalized** job application emails  
✅ **Structured insights** displayed on clean UI  
✅ **Multi-agent orchestration** with automation support  

---

## 🚀 Unique Selling Proposition (USP)

Matchly combines **multi-agent AI**, **skill-first career analysis**, **bias-reduced evaluation**, and **job authenticity detection** in a single job seeker-focused platform.

Instead of waiting for recruiters to filter you out, Matchly:
- **Analyzes** your qualifications with AI precision
- **Explains** exactly where you match and what's missing
- **Verifies** job posting authenticity to protect you
- **Assists** in crafting professional application emails
- Acts as your intelligent **AI career assistant**

---

## 🛠️ Tech Stack

### Backend
- **Python** (Flask)
- **Google Gemini AI** (Multi-agent orchestration)
- **CORS** enabled for frontend communication

### Frontend
- **React** + **TypeScript**
- **TailwindCSS** (Styling)
- **Framer Motion** (Animations)
- **React Router** (Navigation)
- **Lucide Icons**

### AI Agents
- Gemini Pro model for intelligent analysis
- Natural language processing
- Semantic understanding
- Explainable AI outputs

---

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 🔗 API Endpoints

### Core Intelligence Endpoint
- `POST /api/candidate/career-intelligence` - Complete candidate analysis

### Resume Intelligence
- `POST /api/skills/extract` - Extract skills from resume
- `POST /api/skills/verify` - Verify skill claims
- `POST /api/skills/cross-verify` - Cross-verify with job requirements

### Skill Matching
- `POST /api/match/transparent` - Transparent matching with explanation
- `POST /api/match/score-breakdown` - Detailed score breakdown

### Bias Detection
- `POST /api/bias/mask-personal-info` - Mask demographic data
- `POST /api/bias/fair-evaluation` - Bias-free evaluation

### Job Authenticity 🆕
- `POST /api/job/verify-authenticity` - Full job verification
- `POST /api/job/quick-safety-check` - Quick safety check
- `POST /api/job/industry-comparison` - Compare with standards

### Email Crafting 🆕
- `POST /api/email/craft-application` - Generate application email
- `POST /api/email/craft-follow-up` - Generate follow-up email
- `POST /api/email/linkedin-message` - LinkedIn message templates
- `POST /api/email/cold-outreach` - Cold outreach emails

---

## 📊 How It Works

1. **Upload** your resume and paste the job description
2. **AI agents** work together to:
   - Extract your skills and experience (Resume Intelligence Agent)
   - Match against job requirements (Skill Match Agent)
   - Remove bias from evaluation (Bias Detection Agent)
   - Check job posting safety (Authenticity Agent)
3. **View Results**:
   - Match score percentage
   - Matched vs missing skills
   - Job safety rating
   - Improvement recommendations
4. **Generate Email**:
   - AI crafts personalized application email
   - Copy and send to employer

---

## 🎨 UI Features

- **Clean, modern interface** with dark theme
- **Real-time analysis** with loading states
- **Tabbed interface** (Analysis / Email)
- **Color-coded results** (match scores, safety ratings)
- **Copy-to-clipboard** functionality for emails
- **Responsive design** for all devices

---

## 🔐 Privacy & Ethics

- **Bias-free evaluation** - demographic data removed for fair assessment
- **Transparent AI** - all decisions explained in plain language
- **Job seeker-first** - designed exclusively to empower job seekers
- **No data storage** - privacy-preserving analysis
- **Fair assessment** - skill-based matching only

---

## 🌟 Vision

To become the **essential intelligence layer** empowering the future of job seeking by:
- Empowering job seekers with AI-powered career insights
- Leveling the playing field against biased hiring systems
- Protecting job seekers from scams and fake opportunities
- Making job applications more targeted and effective
- Democratizing access to career intelligence for everyone

---

## 👥 Built By

**Team Zygo** - Creating the future of ethical AI-powered recruitment

---

## 📄 License

MIT License - feel free to use and contribute!

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

---

**Made with ❤️ and AI**
