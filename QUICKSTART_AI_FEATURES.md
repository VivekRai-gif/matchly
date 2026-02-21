# 🚀 Quick Start Guide - Scoutify AI Features

## ⚡ Fast Setup (5 minutes)

### Step 1: Backend Setup
```bash
# Navigate to backend
cd backend

# Activate virtual environment (if not already active)
.\venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Mac/Linux

# Install new dependencies
pip install -r requirements.txt

# Start backend server
python app.py
```

**Expected Output:**
```
🚀 Starting Scoutify AI API...
📍 Server running on http://localhost:5000

📊 Available Endpoints:
   === Original ATS Features ===
   - GET  /api/health
   - POST /api/analyze-ats
   - GET  /api/supported-formats

   === 1️⃣ Verifiable Skill Credentials ===
   - POST /api/skills/extract
   - POST /api/skills/verify
   - POST /api/skills/cross-verify
   - POST /api/skills/credential

   === 2️⃣ Bias Detection ===
   - POST /api/bias/mask-personal-info
   - POST /api/bias/detect
   - POST /api/bias/fair-evaluation

   === 3️⃣ Transparent Matching ===
   - POST /api/match/transparent
   - POST /api/match/score-breakdown
   - POST /api/match/explanation-report

   === 4️⃣ Privacy-Preserving ===
   - POST /api/privacy/mask-pii
   - POST /api/privacy/anonymous-profile
   - POST /api/privacy/report
   - POST /api/privacy/minimal-data

✅ All AI features powered by Gemini API
```

### Step 2: Frontend Setup
```bash
# In a new terminal, from project root
npm install

# Start frontend
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 3: Access AI Features

1. Open browser: `http://localhost:5173`
2. Click **"AI Features"** button in navbar (purple gradient button)
3. Or go directly to: `http://localhost:5173/features/ai-features`

---

## 🎯 Testing Each Feature

### 1. Skill Verification
1. Click "Skill Verification" tab
2. Upload a resume (PDF/DOCX/TXT)
3. Click "Verify Skills"
4. See extracted skills with proficiency levels

### 2. Bias Detection
1. Click "Bias Detection" tab
2. Upload a resume
3. Paste job description
4. Click "Check for Bias"
5. See fair evaluation without personal bias

### 3. Transparent Matching
1. Click "Transparent Match" tab
2. Upload a resume
3. Paste job description
4. Click "Transparent Match"
5. See detailed match score with full reasoning

### 4. Privacy Check
1. Click "Privacy Check" tab
2. Upload a resume
3. Click "Privacy Analysis"
4. See PII detected and privacy recommendations

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can access AI Features page
- [ ] Can upload resume
- [ ] All 4 features work
- [ ] Results display correctly

---

## 🐛 Common Issues

**"Import could not be resolved" in backend files:**
- **Solution:** These are just IDE warnings. Run `pip install -r requirements.txt` and the app will work fine.

**Backend won't start:**
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

**Frontend build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**"Failed to fetch" errors:**
- Make sure backend is running on port 5000
- Check console for CORS errors
- Verify Gemini API key is valid

---

## 📊 What's New

### Backend Files Created:
- `skill_verifier.py` - Skill extraction and verification
- `bias_detector.py` - Bias detection and fair evaluation
- `transparent_matcher.py` - Explainable matching
- `privacy_handler.py` - Privacy-preserving features

### Frontend Files Created:
- `src/pages/AIFeatures.tsx` - Main UI for all 4 features

### Files Updated:
- `backend/app.py` - Added 13 new API endpoints
- `backend/requirements.txt` - Added new dependencies
- `src/main.tsx` - Added route for AI Features
- `src/components/Navbar.tsx` - Added AI Features button

---

## 🎨 UI Features

- ✅ Responsive design (mobile + desktop)
- ✅ Tab-based navigation between features
- ✅ Real-time loading states
- ✅ Beautiful gradient buttons
- ✅ Detailed result displays
- ✅ Color-coded scores and badges
- ✅ Info cards explaining each feature

---

## 🔑 Key Technologies

**Backend:**
- Google Gemini Pro API for AI analysis
- Flask for REST API
- PyPDF2 & python-docx for file parsing
- SHA-256 for credential hashing

**Frontend:**
- React + TypeScript
- Tailwind CSS for styling
- Lucide icons
- React Router for navigation

---

## 🚀 Next Steps

1. **Test with real resumes** to see AI in action
2. **Customize prompts** in backend modules for your needs
3. **Add database** to persist credentials and results
4. **Deploy to production** (Vercel + AWS/Heroku)

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review AI_FEATURES_DOCUMENTATION.md for details
3. Check browser console for errors
4. Verify backend logs for API errors

---

**🎉 You're all set! Enjoy using Scoutify AI's advanced features!**
