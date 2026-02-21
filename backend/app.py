from flask import Flask, request, jsonify
from flask_cors import CORS
from ats_analyzer import ATSAnalyzer
from skill_verifier import SkillVerifier
from bias_detector import BiasDetector
from transparent_matcher import TransparentMatcher
from privacy_handler import PrivacyHandler
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Gemini API Key
GEMINI_API_KEY = "AIzaSyB8u60EAnrB_xk789GyE3XEQ4lrzlXs_Ks"

# Initialize all services with Gemini AI
ats_analyzer = ATSAnalyzer(gemini_api_key=GEMINI_API_KEY)
skill_verifier = SkillVerifier(gemini_api_key=GEMINI_API_KEY)
bias_detector = BiasDetector(gemini_api_key=GEMINI_API_KEY)
transparent_matcher = TransparentMatcher(gemini_api_key=GEMINI_API_KEY)
privacy_handler = PrivacyHandler()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'ATS Analyzer API is running'})

@app.route('/api/analyze-ats', methods=['POST'])
def analyze_ats():
    """Analyze resume for ATS compatibility"""
    try:
        # Check if file is present
        if 'resume' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No resume file provided'
            }), 400
        
        resume_file = request.files['resume']
        
        # Check if filename is empty
        if resume_file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        # Get job description (optional)
        job_description = request.form.get('jobDescription', '')
        
        # Read file content
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Perform analysis
        result = ats_analyzer.analyze(file_content, filename, job_description)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500

@app.route('/api/supported-formats', methods=['GET'])
def get_supported_formats():
    """Get list of supported file formats"""
    return jsonify({
        'formats': ats_analyzer.supported_formats,
        'message': 'Supported resume formats'
    })


# ==================== NEW ENDPOINTS ====================

# 1️⃣ VERIFIABLE SKILL CREDENTIALS
@app.route('/api/skills/extract', methods=['POST'])
def extract_skills():
    """Extract skills from resume"""
    try:
        if 'resume' not in request.files:
            return jsonify({'success': False, 'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # Extract skills using Gemini AI
        result = skill_verifier.extract_skills(resume_text)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/skills/verify', methods=['POST'])
def verify_skills():
    """Verify skill claims against resume evidence"""
    try:
        data = request.get_json()
        
        if not data or 'resume_text' not in data or 'claimed_skills' not in data:
            return jsonify({'success': False, 'error': 'Missing resume_text or claimed_skills'}), 400
        
        resume_text = data['resume_text']
        claimed_skills = data['claimed_skills']
        
        # Verify skills
        result = skill_verifier.verify_skill_claims(resume_text, claimed_skills)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/skills/cross-verify', methods=['POST'])
def cross_verify_skills():
    """Cross-verify candidate skills with job requirements"""
    try:
        if 'resume' not in request.files:
            return jsonify({'success': False, 'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        job_description = request.form.get('jobDescription', '')
        
        if not job_description:
            return jsonify({'success': False, 'error': 'Job description is required'}), 400
        
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # Cross-verify
        result = skill_verifier.cross_verify_with_job(resume_text, job_description)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/skills/credential', methods=['POST'])
def generate_credential():
    """Generate verifiable skill credential"""
    try:
        data = request.get_json()
        
        if not data or 'email' not in data or 'skills' not in data:
            return jsonify({'success': False, 'error': 'Missing email or skills'}), 400
        
        candidate_email = data['email']
        skills = data['skills']
        
        # Generate credential
        result = skill_verifier.generate_skill_credential(candidate_email, skills)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


# 2️⃣ BIAS DETECTION
@app.route('/api/bias/mask-personal-info', methods=['POST'])
def mask_personal_info():
    """Mask personal/demographic information from resume"""
    try:
        data = request.get_json()
        
        if not data or 'resume_text' not in data:
            return jsonify({'success': False, 'error': 'Missing resume_text'}), 400
        
        resume_text = data['resume_text']
        
        # Mask personal info
        result = bias_detector.mask_personal_info(resume_text)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/bias/detect', methods=['POST'])
def detect_bias():
    """Detect bias in evaluation text"""
    try:
        data = request.get_json()
        
        if not data or 'evaluation_text' not in data:
            return jsonify({'success': False, 'error': 'Missing evaluation_text'}), 400
        
        evaluation_text = data['evaluation_text']
        resume_text = data.get('resume_text', '')
        
        # Detect bias
        result = bias_detector.detect_bias_in_evaluation(evaluation_text, resume_text)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/bias/fair-evaluation', methods=['POST'])
def fair_evaluation():
    """Perform bias-free evaluation"""
    try:
        if 'resume' not in request.files:
            return jsonify({'success': False, 'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        job_description = request.form.get('jobDescription', '')
        
        if not job_description:
            return jsonify({'success': False, 'error': 'Job description is required'}), 400
        
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # Fair evaluation
        result = bias_detector.fair_evaluation(resume_text, job_description)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


# 3️⃣ TRANSPARENT MATCHING
@app.route('/api/match/transparent', methods=['POST'])
def transparent_match():
    """Perform transparent matching with full explanation"""
    try:
        if 'resume' not in request.files:
            return jsonify({'success': False, 'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        job_description = request.form.get('jobDescription', '')
        
        if not job_description:
            return jsonify({'success': False, 'error': 'Job description is required'}), 400
        
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # Transparent matching
        result = transparent_matcher.match_with_explanation(resume_text, job_description)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/match/score-breakdown', methods=['POST'])
def score_breakdown():
    """Get detailed score breakdown"""
    try:
        data = request.get_json()
        
        if not data or 'match_result' not in data:
            return jsonify({'success': False, 'error': 'Missing match_result'}), 400
        
        match_result = data['match_result']
        
        # Generate breakdown
        result = transparent_matcher.explain_score_breakdown(match_result)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/match/explanation-report', methods=['POST'])
def explanation_report():
    """Generate human-readable explanation report"""
    try:
        data = request.get_json()
        
        if not data or 'match_result' not in data:
            return jsonify({'success': False, 'error': 'Missing match_result'}), 400
        
        match_result = data['match_result']
        
        # Generate report
        result = transparent_matcher.generate_explanation_report(match_result)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


# 4️⃣ PRIVACY-PRESERVING
@app.route('/api/privacy/mask-pii', methods=['POST'])
def mask_pii():
    """Mask PII from resume"""
    try:
        data = request.get_json()
        
        if not data or 'resume_text' not in data:
            return jsonify({'success': False, 'error': 'Missing resume_text'}), 400
        
        resume_text = data['resume_text']
        keep_professional = data.get('keep_professional', True)
        
        # Mask PII
        result = privacy_handler.mask_pii(resume_text, keep_professional)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/privacy/anonymous-profile', methods=['POST'])
def create_anonymous_profile():
    """Create anonymous candidate profile"""
    try:
        if 'resume' not in request.files:
            return jsonify({'success': False, 'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # Create anonymous profile
        result = privacy_handler.create_anonymous_profile(resume_text)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/privacy/report', methods=['POST'])
def privacy_report():
    """Generate privacy analysis report"""
    try:
        if 'resume' not in request.files:
            return jsonify({'success': False, 'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # Generate privacy report
        result = privacy_handler.generate_privacy_report(resume_text)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/privacy/minimal-data', methods=['POST'])
def minimal_data_extraction():
    """Extract minimal required data"""
    try:
        data = request.get_json()
        
        if not data or 'resume_text' not in data or 'required_fields' not in data:
            return jsonify({'success': False, 'error': 'Missing resume_text or required_fields'}), 400
        
        resume_text = data['resume_text']
        required_fields = data['required_fields']
        
        # Extract minimal data
        result = privacy_handler.minimal_data_extraction(resume_text, required_fields)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


# ==================== END NEW ENDPOINTS ====================

if __name__ == '__main__':
    print("🚀 Starting Scoutify AI API...")
    print("📍 Server running on http://localhost:5000")
    print("\n📊 Available Endpoints:")
    print("\n   === Original ATS Features ===")
    print("   - GET  /api/health")
    print("   - POST /api/analyze-ats")
    print("   - GET  /api/supported-formats")
    print("\n   === 1️⃣ Verifiable Skill Credentials ===")
    print("   - POST /api/skills/extract")
    print("   - POST /api/skills/verify")
    print("   - POST /api/skills/cross-verify")
    print("   - POST /api/skills/credential")
    print("\n   === 2️⃣ Bias Detection ===")
    print("   - POST /api/bias/mask-personal-info")
    print("   - POST /api/bias/detect")
    print("   - POST /api/bias/fair-evaluation")
    print("\n   === 3️⃣ Transparent Matching ===")
    print("   - POST /api/match/transparent")
    print("   - POST /api/match/score-breakdown")
    print("   - POST /api/match/explanation-report")
    print("\n   === 4️⃣ Privacy-Preserving ===")
    print("   - POST /api/privacy/mask-pii")
    print("   - POST /api/privacy/anonymous-profile")
    print("   - POST /api/privacy/report")
    print("   - POST /api/privacy/minimal-data")
    print("\n✅ All AI features powered by Gemini API")
    app.run(debug=True, port=5000, host='0.0.0.0')
