"""
Email Crafting Module

Generates personalized job application emails using AI.
Supports multiple tones, follow-ups, and outreach strategies.
"""

import json
import logging
from datetime import datetime
from typing import Dict, List, Optional

import google.generativeai as genai

# Configure logging
logger = logging.getLogger(__name__)


class EmailCrafter:
    """Generate personalized job application emails.
    
    Creates compelling, tailored emails for job applications,
    follow-ups, LinkedIn messages, and cold outreach.
    """
    
    def __init__(self, gemini_api_key: str):
        """Initialize EmailCrafter with Gemini AI.
        
        Args:
            gemini_api_key: Google Gemini API key for AI operations
        """
        try:
            genai.configure(api_key=gemini_api_key)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
            logger.info("EmailCrafter initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize EmailCrafter: {e}")
            raise
    
    def craft_application_email(self, 
                                resume_data: str, 
                                job_description: str, 
                                company_name: str,
                                hiring_manager_name: Optional[str] = None,
                                tone: str = 'professional') -> Dict:
        """Generate a personalized application email.
        
        Args:
            resume_data: Candidate's resume information
            job_description: Target job posting details
            company_name: Name of the hiring company
            hiring_manager_name: Optional hiring manager name
            tone: Email tone (professional, friendly, formal)
            
        Returns:
            Dictionary with generated email content and metadata
        """
        try:
            salutation = f"Dear {hiring_manager_name}" if hiring_manager_name else "Dear Hiring Manager"
            
            prompt = f"""Generate a compelling, personalized job application email.

CANDIDATE RESUME SUMMARY:
{resume_data[:2000]}

JOB DESCRIPTION:
{job_description[:2000]}

COMPANY: {company_name}
TONE: {tone} (professional/enthusiastic/formal/conversational)

Create an email that:
1. Opens with a strong hook that shows genuine interest
2. Highlights 2-3 specific skills/experiences that match the job requirements
3. Demonstrates knowledge of the company
4. Shows personality while remaining professional
5. Includes a clear call to action
6. Is concise (200-250 words)

Return JSON with:
{{
    "subject_line": "compelling subject line",
    "email_body": "full email content with proper formatting",
    "alternative_subject_lines": ["2-3 alternative subject lines"],
    "key_highlights_used": ["list of skills/experiences emphasized"],
    "personalization_elements": ["what makes this email tailored"],
    "tone_analysis": "description of the tone used",
    "email_structure": {{
        "opening": "the opening paragraph",
        "body": "the main body",
        "closing": "the closing paragraph",
        "call_to_action": "the specific CTA used"
    }},
    "sending_tips": ["3-5 tips for sending this email"]
}}

Make it authentic and compelling. Avoid generic templates."""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip().replace('```json', '').replace('```', '').strip()
            result = json.loads(result_text)
            
            # Add metadata
            result['generated_at'] = datetime.now().isoformat()
            result['company_name'] = company_name
            result = {}
            result['salutation'] = salutation
            
            return {
                'success': True,
                'email': result
            }
            
        except json.JSONDecodeError as e:
            return {
                'success': False,
                'error': f'Failed to parse AI response: {str(e)}',
                'raw_response': result_text if 'result_text' in locals() else None
            }
        except Exception as e:
            return {
                'success': False,
                'error': f'Email generation failed: {str(e)}'
            }
    
    def craft_follow_up_email(self, 
                             original_email: str, 
                             days_since_application: int,
                             company_name: str) -> Dict:
        """Generate a follow-up email after application"""
        try:
            prompt = f"""Generate a professional follow-up email for a job application.

ORIGINAL APPLICATION (for context):
{original_email[:1000]}

COMPANY: {company_name}
DAYS SINCE APPLICATION: {days_since_application}

Create a polite, professional follow-up email that:
1. References the original application
2. Reiterates interest in the position
3. Adds value (new information or reaffirms fit)
4. Requests an update politely
5. Is brief (100-150 words)

Return JSON with:
{{
    "subject_line": "follow-up subject line",
    "email_body": "full email content",
    "timing_appropriate": true/false,
    "timing_advice": "advice about when to send",
    "tone_notes": "notes about the tone"
}}"""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip().replace('```json', '').replace('```', '').strip()
            result = json.loads(result_text)
            
            return {
                'success': True,
                'follow_up_email': result,
                'generated_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'Follow-up email generation failed: {str(e)}'
            }
    
    def create_linkedin_message(self, 
                               recruiter_name: str,
                               company_name: str,
                               job_title: str,
                               candidate_highlights: str) -> Dict:
        """Generate a LinkedIn connection/message request"""
        try:
            prompt = f"""Generate a professional LinkedIn message to a recruiter.

RECRUITER: {recruiter_name}
COMPANY: {company_name}
JOB TITLE: {job_title}

CANDIDATE HIGHLIGHTS:
{candidate_highlights[:500]}

Create a concise LinkedIn message (under 300 characters if connection request, under 500 if direct message):
1. Professional and personable
2. Mentions the specific role
3. Briefly highlights fit
4. Requests a conversation

Return JSON with:
{{
    "connection_request_message": "message for connection request (under 300 chars)",
    "direct_message": "message if already connected",
    "message_strategy": "explanation of approach",
    "do_and_donts": ["tips for LinkedIn outreach"]
}}"""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip().replace('```json', '').replace('```', '').strip()
            result = json.loads(result_text)
            
            return {
                'success': True,
                'linkedin_message': result
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'LinkedIn message generation failed: {str(e)}'
            }
    
    def generate_cold_email(self,
                           target_role: str,
                           company_name: str,
                           candidate_summary: str,
                           value_proposition: str) -> Dict:
        """Generate a cold outreach email for hidden job market"""
        try:
            prompt = f"""Generate a compelling cold outreach email for the hidden job market.

TARGET ROLE: {target_role}
COMPANY: {company_name}

CANDIDATE SUMMARY:
{candidate_summary[:1000]}

VALUE PROPOSITION:
{value_proposition[:500]}

Create a cold email that:
1. Grabs attention immediately
2. Demonstrates research about the company
3. Shows clear value proposition
4. Doesn't directly ask for a job, but opens a conversation
5. Is concise (150-200 words)

Return JSON with:
{{
    "subject_line": "attention-grabbing subject",
    "email_body": "full email content",
    "alternative_approaches": ["2-3 different angle options"],
    "research_hooks": ["company-specific hooks to personalize"],
    "success_tips": ["tips for cold outreach success"]
}}"""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip().replace('```json', '').replace('```', '').strip()
            result = json.loads(result_text)
            
            return {
                'success': True,
                'cold_email': result
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'Cold email generation failed: {str(e)}'
            }
    
    def create_email_variants(self, base_email: str, num_variants: int = 3) -> Dict:
        """Generate multiple variants of an email for A/B testing"""
        try:
            prompt = f"""Generate {num_variants} variants of this email with different approaches.

BASE EMAIL:
{base_email}

Create {num_variants} distinct variants that:
- Use different openings
- Emphasize different strengths
- Vary the tone slightly
- Keep same core message

Return JSON with:
{{
    "variants": [
        {{
            "version": "A/B/C",
            "subject_line": "subject",
            "email_body": "full email",
            "key_difference": "what makes this variant unique",
            "best_for": "when to use this variant"
        }}
    ]
}}"""

            response = self.model.generate_content(prompt)
            result_text = response.text.strip().replace('```json', '').replace('```', '').strip()
            result = json.loads(result_text)
            
            return {
                'success': True,
                'email_variants': result
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f'Variant generation failed: {str(e)}'
            }
