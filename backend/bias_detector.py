"""
Bias Detection Module
Detects and mitigates bias in resume screening using Gemini AI
"""

import google.generativeai as genai
import json
import re
from typing import Dict, List
from datetime import datetime


class BiasDetector:
    """Detect and mitigate bias in resume evaluation"""
    
    def __init__(self, gemini_api_key: str):
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        
        # Sensitive attributes to mask/detect
        self.sensitive_attributes = [
            'gender', 'age', 'race', 'ethnicity', 'religion',
            'marital status', 'nationality', 'disability',
            'sexual orientation', 'political affiliation'
        ]
    
    def mask_personal_info(self, resume_text: str) -> Dict:
        """Mask personal/demographic information from resume"""
        try:
            masked_text = resume_text
            masked_items = []
            
            # Mask common gender indicators
            gender_patterns = [
                (r'\b(Mr\.?|Mrs\.?|Miss|Ms\.?)\s+', '[TITLE] ', 'gender_title'),
                (r'\b(he|she|his|her|him)\b', '[PRONOUN]', 'gender_pronoun'),
                (r'\b(male|female|man|woman|boy|girl)\b', '[GENDER]', 'gender_explicit')
            ]
            
            for pattern, replacement, category in gender_patterns:
                if re.search(pattern, masked_text, re.IGNORECASE):
                    masked_items.append(category)
                    masked_text = re.sub(pattern, replacement, masked_text, flags=re.IGNORECASE)
            
            # Mask age indicators
            age_patterns = [
                (r'\b(age|born|birth)[\s:]+\d{2,4}\b', '[AGE_INFO]', 'age'),
                (r'\b\d{2}\s+years?\s+old\b', '[AGE]', 'age_years'),
                (r'\b(19|20)\d{2}\b(?=.*born)', '[BIRTH_YEAR]', 'birth_year')
            ]
            
            for pattern, replacement, category in age_patterns:
                if re.search(pattern, masked_text, re.IGNORECASE):
                    masked_items.append(category)
                    masked_text = re.sub(pattern, replacement, masked_text, flags=re.IGNORECASE)
            
            # Mask name (first line or name patterns)
            name_pattern = r'^([A-Z][a-z]+\s+[A-Z][a-z]+.*?)$'
            match = re.match(name_pattern, masked_text, re.MULTILINE)
            if match:
                masked_items.append('candidate_name')
                masked_text = masked_text.replace(match.group(1), '[CANDIDATE_NAME]', 1)
            
            # Mask photos/images
            if re.search(r'\b(photo|picture|image|headshot)\b', masked_text, re.IGNORECASE):
                masked_items.append('photo_reference')
                masked_text = re.sub(r'\b(photo|picture|image|headshot)\b', '[IMAGE]', masked_text, flags=re.IGNORECASE)
            
            return {
                'success': True,
                'masked_text': masked_text,
                'masked_attributes': list(set(masked_items)),
                'original_length': len(resume_text),
                'masked_length': len(masked_text)
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'masked_text': resume_text
            }
    
    def detect_bias_in_evaluation(self, evaluation_text: str, resume_text: str = "") -> Dict:
        """Analyze evaluation for potential bias"""
        try:
            prompt = f"""Analyze this candidate evaluation for potential bias.
Look for bias signals, unfair assumptions, or non-merit-based reasoning.

EVALUATION:
{evaluation_text[:3000]}

{"RESUME CONTEXT:\n" + resume_text[:2000] if resume_text else ""}

Return JSON:
{{
    "bias_detected": true/false,
    "bias_score": 0-100,
    "bias_signals": [
        {{
            "type": "gender/age/name/school/appearance/other",
            "severity": "low/medium/high",
            "evidence": "specific phrase or reasoning",
            "explanation": "why this is potentially biased"
        }}
    ],
    "merit_based_score": 0-100,
    "fairness_concerns": ["list of specific concerns"],
    "recommendations": ["how to make evaluation more fair"],
    "clean_evaluation": "rewritten evaluation focused purely on skills and qualifications"
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
            
            bias_data = json.loads(response_text.strip())
            
            return {
                'success': True,
                'bias_analysis': bias_data,
                'analyzed_at': datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'bias_analysis': None
            }
    
    def fair_evaluation(self, resume_text: str, job_description: str) -> Dict:
        """Perform bias-free evaluation focused only on skills and merit"""
        try:
            # First mask personal info
            masked_result = self.mask_personal_info(resume_text)
            masked_resume = masked_result['masked_text']
            
            prompt = f"""Evaluate this candidate PURELY based on skills, experience, and job fit.
DO NOT consider or mention:
- Name, gender, age, or demographics
- School prestige (focus on skills learned)
- Personal appearance or characteristics
- Any non-merit factors

Focus ONLY on:
- Technical skills and proficiency
- Relevant experience and achievements
- Problem-solving abilities
- Project track record
- Job requirement alignment

JOB DESCRIPTION:
{job_description[:2000]}

CANDIDATE PROFILE (anonymized):
{masked_resume[:4000]}

Return JSON:
{{
    "merit_score": 0-100,
    "skill_evaluation": {{
        "technical_skills": "assessment",
        "experience_quality": "assessment",
        "achievements": "assessment",
        "job_fit": "assessment"
    }},
    "strengths": ["specific skill-based strengths"],
    "growth_areas": ["areas for development"],
    "recommendation": "strong_fit/good_fit/potential_fit/not_fit",
    "reasoning": "purely merit-based explanation",
    "fairness_guarantee": "confirmation that evaluation was unbiased"
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
            
            evaluation_data = json.loads(response_text.strip())
            
            return {
                'success': True,
                'fair_evaluation': evaluation_data,
                'masked_attributes': masked_result['masked_attributes'],
                'evaluated_at': datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'fair_evaluation': None
            }
    
    def compare_evaluations(self, original_eval: str, anonymized_eval: str) -> Dict:
        """Compare original vs anonymized evaluation to detect bias impact"""
        try:
            prompt = f"""Compare these two evaluations of the same candidate:
1. Original evaluation (with personal info)
2. Anonymized evaluation (without personal info)

ORIGINAL EVALUATION:
{original_eval[:2000]}

ANONYMIZED EVALUATION:
{anonymized_eval[:2000]}

Analyze if removing personal information changed the evaluation.

Return JSON:
{{
    "bias_impact_detected": true/false,
    "score_difference": <number>,
    "evaluation_consistency": "high/medium/low",
    "key_differences": ["list of major differences"],
    "potential_bias_factors": ["factors that may have influenced original"],
    "fairness_improvement": 0-100,
    "analysis": "detailed explanation"
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
            
            comparison_data = json.loads(response_text.strip())
            
            return {
                'success': True,
                'comparison': comparison_data,
                'compared_at': datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'comparison': None
            }
    
    def generate_fairness_report(self, evaluations: List[Dict]) -> Dict:
        """Generate overall fairness metrics for multiple evaluations"""
        try:
            total_evaluations = len(evaluations)
            bias_detected_count = sum(1 for e in evaluations if e.get('bias_detected', False))
            
            avg_merit_score = sum(e.get('merit_based_score', 0) for e in evaluations) / total_evaluations if total_evaluations > 0 else 0
            
            return {
                'success': True,
                'report': {
                    'total_evaluations': total_evaluations,
                    'bias_detected_count': bias_detected_count,
                    'bias_free_percentage': round((total_evaluations - bias_detected_count) / total_evaluations * 100, 2) if total_evaluations > 0 else 0,
                    'average_merit_score': round(avg_merit_score, 2),
                    'fairness_grade': self._calculate_fairness_grade(bias_detected_count, total_evaluations),
                    'generated_at': datetime.now().isoformat()
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'report': None
            }
    
    def _calculate_fairness_grade(self, bias_count: int, total: int) -> str:
        """Calculate fairness grade based on bias detection rate"""
        if total == 0:
            return "N/A"
        
        bias_rate = (bias_count / total) * 100
        
        if bias_rate < 5:
            return "A+ Excellent"
        elif bias_rate < 10:
            return "A Good"
        elif bias_rate < 20:
            return "B Fair"
        elif bias_rate < 30:
            return "C Needs Improvement"
        else:
            return "D Poor"
