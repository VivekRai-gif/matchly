"""Flask API for AI-Powered Recruitment Platform

Provides endpoints for ATS analysis, skill verification, bias detection,
transparent matching, and more using Google's Gemini AI.
"""

import os
import logging
from datetime import datetime
from typing import Dict, Any

import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

from ats_analyzer import ATSAnalyzer
from skill_verifier import SkillVerifier
from bias_detector import BiasDetector
from transparent_matcher import TransparentMatcher
from privacy_handler import PrivacyHandler
from job_authenticity_verifier import JobAuthenticityVerifier
from email_crafter import EmailCrafter
from validation_agent import InputValidationAgent, ValidationResult

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Gemini API Key - Use environment variable in production
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', "AIzaSyA4YrOd8_4A8j1B6KBRaBy_I8XVAnvmI3Q")

# Initialize all AI-powered services (Candidate-Focused Multi-Agent System)
try:
    ats_analyzer = ATSAnalyzer(gemini_api_key=GEMINI_API_KEY)
    skill_verifier = SkillVerifier(gemini_api_key=GEMINI_API_KEY)
    bias_detector = BiasDetector(gemini_api_key=GEMINI_API_KEY)
    transparent_matcher = TransparentMatcher(gemini_api_key=GEMINI_API_KEY)
    privacy_handler = PrivacyHandler()
    job_verifier = JobAuthenticityVerifier(gemini_api_key=GEMINI_API_KEY)
    email_crafter = EmailCrafter(gemini_api_key=GEMINI_API_KEY)
    validation_agent = InputValidationAgent()
    logger.info("All AI services initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize AI services: {str(e)}")
    raise


# ==================== VALIDATION DECORATORS ====================

from functools import wraps
import tempfile

def validate_file_upload(f):
    """Decorator to validate file uploads using InputValidationAgent"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check if file is present
        if 'resume' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No resume file provided',
                'validation_details': None
            }), 400
        
        resume_file = request.files['resume']
        
        # Check if filename is empty
        if resume_file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected',
                'validation_details': None
            }), 400
        
        # Save file temporarily for validation
        try:
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                resume_file.save(temp_file.name)
                file_size = temp_file.tell()
                
                # Validate file using validation agent
                validation_result = validation_agent.validate_file(
                    file_path=temp_file.name,
                    file_size=file_size,
                    filename=resume_file.filename
                )
                
                # Clean up
                import os
                os.unlink(temp_file.name)
                
                # If validation failed, return error
                if not validation_result.is_valid:
                    logger.warning(f"File validation failed: {validation_result.errors}")
                    return jsonify({
                        'success': False,
                        'error': 'File validation failed',
                        'validation_result': validation_result.to_dict()
                    }), 400
                
                # Log warnings if any
                if validation_result.warnings:
                    logger.warning(f"File validation warnings: {validation_result.warnings}")
                
                # Reset file pointer for endpoint to use
                resume_file.seek(0)
                
                # Store validation result in request context for endpoint to access
                request.validation_result = validation_result
                
        except Exception as e:
            logger.error(f"Error during file validation: {str(e)}")
            return jsonify({
                'success': False,
                'error': f'Validation error: {str(e)}'
            }), 500
        
        return f(*args, **kwargs)
    
    return decorated_function


def validate_text_input(field_name='text'):
    """Decorator to validate text inputs using InputValidationAgent"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Get JSON data
            data = request.get_json()
            
            if not data or field_name not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing {field_name}',
                    'validation_details': None
                }), 400
            
            text = data[field_name]
            
            # Validate text using validation agent
            validation_result = validation_agent.validate_text(text, field_name)
            
            # If validation failed, return error
            if not validation_result.is_valid:
                logger.warning(f"Text validation failed for {field_name}: {validation_result.errors}")
                return jsonify({
                    'success': False,
                    'error': f'{field_name} validation failed',
                    'validation_result': validation_result.to_dict()
                }), 400
            
            # Log warnings if any
            if validation_result.warnings:
                logger.warning(f"Text validation warnings for {field_name}: {validation_result.warnings}")
            
            # Store validation result in request context
            if not hasattr(request, 'validation_results'):
                request.validation_results = {}
            request.validation_results[field_name] = validation_result
            
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator


def validate_job_description(f):
    """Decorator to validate job description content"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Get job description from form or JSON
        job_description = None
        if request.is_json:
            data = request.get_json()
            job_description = data.get('job_description') or data.get('jobDescription')
        else:
            job_description = request.form.get('jobDescription') or request.form.get('job_description')
        
        if not job_description:
            return jsonify({
                'success': False,
                'error': 'Job description is required'
            }), 400
        
        # Validate job description
        validation_result = validation_agent.validate_job_description(job_description)
        
        # If validation has errors, return error
        if not validation_result.is_valid:
            logger.warning(f"Job description validation failed: {validation_result.errors}")
            return jsonify({
                'success': False,
                'error': 'Job description validation failed',
                'validation_result': validation_result.to_dict()
            }), 400
        
        # Log warnings if any
        if validation_result.warnings:
            logger.info(f"Job description validation warnings: {validation_result.warnings}")
        
        # Store validation result
        if not hasattr(request, 'validation_results'):
            request.validation_results = {}
        request.validation_results['job_description'] = validation_result
        
        return f(*args, **kwargs)
    
    return decorated_function

@app.route('/api/health', methods=['GET'])
def health_check() -> Dict[str, Any]:
    """Health check endpoint to verify API status.
    
    Returns:
        JSON response with status and timestamp
    """
    return jsonify({
        'status': 'healthy',
        'message': 'ATS Analyzer API is running',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0',
        'validation_agent': 'enabled'
    })


# ==================== VALIDATION TESTING ENDPOINTS ====================

@app.route('/api/validate/file', methods=['POST'])
def validate_file_endpoint():
    """Test endpoint to validate file uploads
    
    Returns detailed validation results with all checkpoints
    """
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'success': False, 'error': 'No file selected'}), 400
        
        # Save file temporarily for validation
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            file.save(temp_file.name)
            file_size = temp_file.tell()
            
            # Validate file
            validation_result = validation_agent.validate_file(
                file_path=temp_file.name,
                file_size=file_size,
                filename=file.filename
            )
            
            # Clean up
            import os
            os.unlink(temp_file.name)
            
            return jsonify({
                'success': True,
                'validation_result': validation_result.to_dict(),
                'message': 'File validation complete'
            })
    
    except Exception as e:
        logger.error(f"Error in file validation endpoint: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/validate/text', methods=['POST'])
def validate_text_endpoint():
    """Test endpoint to validate text input
    
    Returns detailed validation results with all checkpoints
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'success': False, 'error': 'Missing text field'}), 400
        
        text = data['text']
        field_name = data.get('field_name', 'text')
        
        # Validate text
        validation_result = validation_agent.validate_text(text, field_name)
        
        return jsonify({
            'success': True,
            'validation_result': validation_result.to_dict(),
            'message': 'Text validation complete'
        })
    
    except Exception as e:
        logger.error(f"Error in text validation endpoint: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/validate/resume', methods=['POST'])
def validate_resume_endpoint():
    """Test endpoint to validate resume content
    
    Returns detailed validation with resume-specific checks
    """
    try:
        data = request.get_json()
        
        if not data or 'resume_text' not in data:
            return jsonify({'success': False, 'error': 'Missing resume_text'}), 400
        
        resume_text = data['resume_text']
        
        # Validate resume
        validation_result = validation_agent.validate_resume(resume_text)
        
        return jsonify({
            'success': True,
            'validation_result': validation_result.to_dict(),
            'message': 'Resume validation complete'
        })
    
    except Exception as e:
        logger.error(f"Error in resume validation endpoint: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/validate/job', methods=['POST'])
def validate_job_endpoint():
    """Test endpoint to validate job description
    
    Returns detailed validation with job-specific checks
    """
    try:
        data = request.get_json()
        
        if not data or 'job_description' not in data:
            return jsonify({'success': False, 'error': 'Missing job_description'}), 400
        
        job_description = data['job_description']
        
        # Validate job description
        validation_result = validation_agent.validate_job_description(job_description)
        
        return jsonify({
            'success': True,
            'validation_result': validation_result.to_dict(),
            'message': 'Job description validation complete'
        })
    
    except Exception as e:
        logger.error(f"Error in job validation endpoint: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500


# ==================== END VALIDATION ENDPOINTS ====================

@app.route('/api/analyze-ats', methods=['POST'])
@validate_file_upload
def analyze_ats():
    """Analyze resume for ATS compatibility with input validation"""
    try:
        resume_file = request.files['resume']
        job_description = request.form.get('jobDescription', '')
        
        # Read file content
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Perform analysis
        result = ats_analyzer.analyze(file_content, filename, job_description)
        
        # Add validation info to response
        if hasattr(request, 'validation_result'):
            result['validation_score'] = request.validation_result.overall_score
            result['validation_warnings'] = request.validation_result.warnings
        
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
@validate_file_upload
@validate_job_description
def transparent_match():
    """Perform transparent matching with full explanation and validation"""
    try:
        resume_file = request.files['resume']
        job_description = request.form.get('jobDescription', '')
        
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # Transparent matching
        result = transparent_matcher.match_with_explanation(resume_text, job_description)
        
        # Add validation scores
        if hasattr(request, 'validation_results'):
            result['validation_scores'] = {
                'file_validation': request.validation_result.overall_score if hasattr(request, 'validation_result') else None,
                'job_validation': request.validation_results.get('job_description', {}).overall_score if 'job_description' in request.validation_results else None
            }
        
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


# ==================== CAMPAIGN WEBHOOK PROXY ====================

@app.route('/api/campaign/start', methods=['POST'])
def start_campaign():
    """Proxy endpoint to trigger n8n webhook for email campaigns"""
    try:
        # Get campaign data from request
        campaign_data = request.get_json() or {}
        
        # Build comprehensive payload for n8n workflow
        from datetime import datetime
        payload = {
            'action': 'start_campaign',
            'timestamp': campaign_data.get('timestamp', datetime.utcnow().isoformat()),
            'source': 'scoutify-ai',
            'campaign_type': campaign_data.get('campaign_type', 'email_automation'),
            'campaign_name': campaign_data.get('campaign_name', 'Default Email Campaign'),
            'email_config': {
                'template_id': campaign_data.get('template_id', 'default_template'),
                'subject': campaign_data.get('subject', 'You have a new opportunity!'),
                'sender_name': campaign_data.get('sender_name', 'Scoutify AI'),
                'sender_email': campaign_data.get('sender_email', 'noreply@scoutify.ai'),
                'personalization_enabled': campaign_data.get('personalization_enabled', True)
            },
            'recipients': campaign_data.get('recipients', []),
            'scheduling': {
                'send_immediately': campaign_data.get('send_immediately', True),
                'scheduled_time': campaign_data.get('scheduled_time', None),
                'timezone': campaign_data.get('timezone', 'UTC')
            },
            'tracking': {
                'track_opens': True,
                'track_clicks': True,
                'track_replies': True
            },
            'metadata': {
                'user_id': campaign_data.get('user_id'),
                'job_id': campaign_data.get('job_id'),
                'batch_id': campaign_data.get('batch_id')
            }
        }
        
        # Call n8n webhook
        webhook_url = 'https://zyndhaickathon.app.n8n.cloud/webhook-test/361b5ca0-b557-4197-a6a8-84673a7ff1a1'
        
        print(f"📧 Triggering campaign webhook")
        print(f"🔗 URL: {webhook_url}")
        print(f"📦 Payload: {payload}")
        
        response = requests.post(
            webhook_url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        print(f"✅ Webhook response status: {response.status_code}")
        print(f"📄 Response body: {response.text[:500]}")
        
        if response.status_code in [200, 201, 202]:
            # Try to parse JSON response, fallback to empty dict if not JSON
            try:
                webhook_data = response.json() if response.text else {}
            except ValueError:
                webhook_data = {'raw_response': response.text}
            
            return jsonify({
                'success': True,
                'message': 'Campaign started successfully',
                'webhook_response': webhook_data
            }), 200
        else:
            error_msg = f'Webhook returned status {response.status_code}'
            if response.status_code == 404:
                error_msg = 'Webhook not found (404). Please verify: 1) n8n workflow is active, 2) webhook path is correct, 3) workflow is deployed'
            
            print(f"❌ Error: {error_msg}")
            return jsonify({
                'success': False,
                'error': error_msg,
                'webhook_url': webhook_url,
                'response_body': response.text[:500]
            }), 500
            
    except requests.exceptions.Timeout:
        return jsonify({
            'success': False,
            'error': 'Webhook request timed out'
        }), 504
    except requests.exceptions.RequestException as e:
        return jsonify({
            'success': False,
            'error': f'Failed to reach webhook: {str(e)}'
        }), 502
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        }), 500


# 5️⃣ JOB AUTHENTICITY VERIFICATION
@app.route('/api/job/verify-authenticity', methods=['POST'])
@validate_text_input('job_description')
def verify_job_authenticity():
    """Verify authenticity of a job posting with input validation"""
    try:
        data = request.get_json()
        
        job_description = data['job_description']
        company_name = data.get('company_name', None)
        salary_info = data.get('salary_info', None)
        
        # Verify job authenticity
        result = job_verifier.verify_job_posting(job_description, company_name, salary_info)
        
        # Add validation score
        if hasattr(request, 'validation_results') and 'job_description' in request.validation_results:
            result['input_validation_score'] = request.validation_results['job_description'].overall_score
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/job/quick-safety-check', methods=['POST'])
def quick_job_safety_check():
    """Quick safety check for job posting"""
    try:
        data = request.get_json()
        
        if not data or 'job_description' not in data:
            return jsonify({'success': False, 'error': 'Missing job_description'}), 400
        
        job_description = data['job_description']
        
        # Quick safety check
        result = job_verifier.quick_safety_check(job_description)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/job/industry-comparison', methods=['POST'])
def job_industry_comparison():
    """Compare job posting with industry standards"""
    try:
        data = request.get_json()
        
        if not data or 'job_description' not in data or 'job_role' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        job_description = data['job_description']
        job_role = data['job_role']
        experience_level = data.get('experience_level', 'mid')
        
        # Industry comparison
        result = job_verifier.compare_with_industry_standards(job_description, job_role, experience_level)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


# 6️⃣ EMAIL CRAFTING
@app.route('/api/email/craft-application', methods=['POST'])
def craft_application_email():
    """Generate personalized job application email"""
    try:
        data = request.get_json()
        
        if not data or 'resume_data' not in data or 'job_description' not in data or 'company_name' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        resume_data = data['resume_data']
        job_description = data['job_description']
        company_name = data['company_name']
        hiring_manager_name = data.get('hiring_manager_name', None)
        tone = data.get('tone', 'professional')
        
        # Craft email
        result = email_crafter.craft_application_email(
            resume_data, job_description, company_name, hiring_manager_name, tone
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/email/craft-follow-up', methods=['POST'])
def craft_follow_up_email():
    """Generate follow-up email after application"""
    try:
        data = request.get_json()
        
        if not data or 'original_email' not in data or 'company_name' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        original_email = data['original_email']
        days_since_application = data.get('days_since_application', 7)
        company_name = data['company_name']
        
        # Craft follow-up email
        result = email_crafter.craft_follow_up_email(
            original_email, days_since_application, company_name
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/email/linkedin-message', methods=['POST'])
def create_linkedin_message():
    """Generate LinkedIn message to recruiter"""
    try:
        data = request.get_json()
        
        if not data or 'recruiter_name' not in data or 'company_name' not in data or 'job_title' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        recruiter_name = data['recruiter_name']
        company_name = data['company_name']
        job_title = data['job_title']
        candidate_highlights = data.get('candidate_highlights', '')
        
        # Create LinkedIn message
        result = email_crafter.create_linkedin_message(
            recruiter_name, company_name, job_title, candidate_highlights
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/email/cold-outreach', methods=['POST'])
def generate_cold_email():
    """Generate cold outreach email"""
    try:
        data = request.get_json()
        
        if not data or 'target_role' not in data or 'company_name' not in data:
            return jsonify({'success': False, 'error': 'Missing required fields'}), 400
        
        target_role = data['target_role']
        company_name = data['company_name']
        candidate_summary = data.get('candidate_summary', '')
        value_proposition = data.get('value_proposition', '')
        
        # Generate cold email
        result = email_crafter.generate_cold_email(
            target_role, company_name, candidate_summary, value_proposition
        )
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


@app.route('/api/email/variants', methods=['POST'])
def create_email_variants():
    """Generate email variants for A/B testing"""
    try:
        data = request.get_json()
        
        if not data or 'base_email' not in data:
            return jsonify({'success': False, 'error': 'Missing base_email'}), 400
        
        base_email = data['base_email']
        num_variants = data.get('num_variants', 3)
        
        # Generate variants
        result = email_crafter.create_email_variants(base_email, num_variants)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'success': False, 'error': f'Server error: {str(e)}'}), 500


# 7️⃣ CANDIDATE CAREER INTELLIGENCE (Combined Analysis)
@app.route('/api/candidate/career-intelligence', methods=['POST'])
def candidate_career_intelligence():
    """Complete candidate-focused career intelligence analysis"""
    try:
        if 'resume' not in request.files:
            return jsonify({'success': False, 'error': 'No resume file provided'}), 400
        
        resume_file = request.files['resume']
        job_description = request.form.get('jobDescription', '')
        company_name = request.form.get('companyName', 'the company')
        
        if not job_description:
            return jsonify({'success': False, 'error': 'Job description is required'}), 400
        
        file_content = resume_file.read()
        filename = resume_file.filename
        
        # Extract resume text
        resume_text = ats_analyzer.extract_text(file_content, filename)
        
        # 1. Resume Intelligence: Extract structured data
        skills_data = skill_verifier.extract_skills(resume_text)
        
        # 2. Skill Match & Gap Analysis
        match_analysis = transparent_matcher.match_with_explanation(resume_text, job_description)
        
        # 3. Bias-Reduced Evaluation
        bias_free_eval = bias_detector.fair_evaluation(resume_text, job_description)
        
        # 4. Job Authenticity Check
        job_safety = job_verifier.quick_safety_check(job_description)
        
        # Return comprehensive analysis
        return jsonify({
            'success': True,
            'candidate_intelligence': {
                'resume_intelligence': skills_data,
                'skill_match_analysis': match_analysis,
                'bias_free_evaluation': bias_free_eval,
                'job_safety_check': job_safety,
                'ready_for_email_generation': True,
                'company_name': company_name
            },
            'analyzed_at': datetime.now().isoformat()
        })
    
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
    print("\n   === Email Campaign Automation ===")
    print("   - POST /api/campaign/start")
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
