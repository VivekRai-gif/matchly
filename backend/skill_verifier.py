"""
Verifiable Skill Credentials Module

Uses Gemini AI to extract, verify, and score candidate skills.
Provides blockchain-ready skill verification and credential generation.
"""

import hashlib
import json
import logging
from datetime import datetime
from typing import Dict, List, Optional

import google.generativeai as genai

# Configure logging
logger = logging.getLogger(__name__)


class SkillVerifier:
    """Verify and validate candidate skills using Gemini AI.
    
    Provides methods for skill extraction, verification, cross-validation,
    and credential generation with cryptographic hashing.
    """
    
    def __init__(self, gemini_api_key: str):
        """Initialize SkillVerifier with Gemini AI.
        
        Args:
            gemini_api_key: Google Gemini API key for AI operations
        """
        try:
            genai.configure(api_key=gemini_api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
            logger.info("SkillVerifier initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize SkillVerifier: {e}")
            raise
    
    def extract_skills(self, resume_text: str) -> Dict:
        """Extract skills from resume using Gemini AI.
        
        Args:
            resume_text: Raw text content of resume
            
        Returns:
            Dictionary containing categorized skills and metadata
            
        Raises:
            Exception: If skill extraction fails
        """
        try:
            # Limit resume text to prevent token overflow
            max_chars = 4000
            truncated_text = resume_text[:max_chars]
            
            prompt = f"""Extract all technical and professional skills from this resume.
            Categorize them and provide details.

RESUME:
{truncated_text}

Return a JSON response with this exact structure:
{{
    "technical_skills": [
        {{
            "skill": "skill name",
            "category": "programming/framework/tool/database/cloud/other",
            "proficiency_level": "beginner/intermediate/advanced/expert",
            "evidence_found": true/false
        }}
    ],
    "soft_skills": [
        {{
            "skill": "skill name",
            "evidence": "brief example from resume"
        }}
    ],
    "certifications": ["list of certifications mentioned"],
    "languages": ["programming/spoken languages"],
    "total_skills_count": <number>
}}"""

            response = self.model.generate_content(prompt)
            
            # Parse JSON from response
            response_text = response.text.strip()
            # Remove markdown code blocks if present
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            skills_data = json.loads(response_text.strip())
            
            return {
                'success': True,
                'skills': skills_data,
                'extracted_at': datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'skills': None
            }
    
    def verify_skill_claims(self, resume_text: str, claimed_skills: List[str]) -> Dict:
        """Verify if claimed skills have evidence in resume/projects"""
        try:
            skills_str = ", ".join(claimed_skills)
            
            prompt = f"""Analyze this resume and verify if the following skills have actual evidence/proof:

SKILLS TO VERIFY: {skills_str}

RESUME:
{resume_text[:4000]}

For each skill, check if there are:
- Projects that used this skill
- Work experience mentioning this skill
- Specific achievements with this skill
- Certifications for this skill

Return JSON:
{{
    "verified_skills": [
        {{
            "skill": "skill name",
            "verified": true/false,
            "confidence_score": 0-100,
            "evidence": ["list of evidence found"],
            "reasoning": "why verified or not verified"
        }}
    ],
    "overall_verification_score": 0-100,
    "red_flags": ["list of skills that seem exaggerated or lack evidence"]
}}"""

            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean JSON
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            verification_data = json.loads(response_text.strip())
            
            return {
                'success': True,
                'verification': verification_data,
                'verified_at': datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'verification': None
            }
    
    def cross_verify_with_job(self, resume_text: str, job_description: str) -> Dict:
        """Cross-verify candidate skills against job requirements"""
        try:
            prompt = f"""Compare candidate's skills with job requirements and provide detailed skill alignment.

JOB DESCRIPTION:
{job_description[:2000]}

RESUME:
{resume_text[:4000]}

Analyze and return JSON:
{{
    "skill_alignment": [
        {{
            "required_skill": "skill from job",
            "candidate_has": true/false,
            "proficiency_match": "excellent/good/partial/none",
            "evidence": "specific example from resume",
            "gap_analysis": "what's missing if not fully aligned"
        }}
    ],
    "alignment_score": 0-100,
    "strong_matches": ["skills that perfectly match"],
    "partial_matches": ["skills with some experience"],
    "missing_critical": ["critical skills candidate lacks"],
    "bonus_skills": ["additional skills candidate has"],
    "recommendation": "hire/interview/reject with reasoning"
}}"""

            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean JSON
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            alignment_data = json.loads(response_text.strip())
            
            return {
                'success': True,
                'alignment': alignment_data,
                'analyzed_at': datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'alignment': None
            }
    
    def generate_skill_credential(self, candidate_email: str, skills: List[str]) -> Dict:
        """Generate a verifiable credential hash for validated skills"""
        try:
            # Create credential data
            credential_data = {
                'candidate': candidate_email,
                'skills': sorted(skills),
                'verified_at': datetime.now().isoformat(),
                'issuer': 'Scoutify AI'
            }
            
            # Generate hash for verification
            credential_string = json.dumps(credential_data, sort_keys=True)
            credential_hash = hashlib.sha256(credential_string.encode()).hexdigest()
            
            return {
                'success': True,
                'credential': {
                    **credential_data,
                    'credential_id': credential_hash[:16],
                    'verification_hash': credential_hash
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
