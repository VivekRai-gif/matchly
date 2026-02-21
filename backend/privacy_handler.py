"""
Privacy-Preserving Module
Handles data privacy, masking, and secure processing
"""

import hashlib
import json
import re
from typing import Dict, List
from datetime import datetime


class PrivacyHandler:
    """Handle privacy-preserving operations for candidate data"""
    
    def __init__(self):
        self.pii_patterns = {
            'email': r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            'phone': r'(\+\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}',
            'ssn': r'\b\d{3}-\d{2}-\d{4}\b',
            'address': r'\d+\s+[\w\s]+,\s*[\w\s]+,\s*[A-Z]{2}\s+\d{5}',
            'url': r'https?://[^\s]+',
            'linkedin': r'linkedin\.com/in/[\w-]+',
            'github': r'github\.com/[\w-]+'
        }
    
    def mask_pii(self, text: str, keep_professional: bool = True) -> Dict:
        """Mask Personally Identifiable Information (PII)"""
        try:
            masked_text = text
            masked_items = {}
            
            # Mask email
            emails = re.findall(self.pii_patterns['email'], text)
            for email in emails:
                if keep_professional:
                    # Keep domain for professional context
                    domain = email.split('@')[1]
                    masked_email = f"[EMAIL]@{domain}"
                else:
                    masked_email = "[EMAIL_REDACTED]"
                masked_text = masked_text.replace(email, masked_email)
                masked_items['email'] = masked_items.get('email', []) + [email]
            
            # Mask phone numbers
            phones = re.findall(self.pii_patterns['phone'], text)
            for phone in phones:
                masked_text = masked_text.replace(phone, "[PHONE_REDACTED]")
                masked_items['phone'] = masked_items.get('phone', []) + [phone]
            
            # Mask SSN
            ssns = re.findall(self.pii_patterns['ssn'], text)
            for ssn in ssns:
                masked_text = masked_text.replace(ssn, "[SSN_REDACTED]")
                masked_items['ssn'] = masked_items.get('ssn', []) + [ssn]
            
            # Keep LinkedIn/GitHub but mask username if needed
            if keep_professional:
                linkedin_urls = re.findall(self.pii_patterns['linkedin'], text)
                for url in linkedin_urls:
                    masked_items['linkedin'] = masked_items.get('linkedin', []) + [url]
                
                github_urls = re.findall(self.pii_patterns['github'], text)
                for url in github_urls:
                    masked_items['github'] = masked_items.get('github', []) + [url]
            else:
                masked_text = re.sub(self.pii_patterns['linkedin'], '[LINKEDIN_PROFILE]', masked_text)
                masked_text = re.sub(self.pii_patterns['github'], '[GITHUB_PROFILE]', masked_text)
            
            return {
                'success': True,
                'masked_text': masked_text,
                'masked_items': masked_items,
                'pii_found': len(masked_items) > 0,
                'privacy_level': 'high' if not keep_professional else 'medium'
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'masked_text': text
            }
    
    def extract_skill_only_resume(self, resume_text: str) -> Dict:
        """Extract only skill-related information, removing all personal data"""
        try:
            # First mask PII
            pii_result = self.mask_pii(resume_text, keep_professional=False)
            masked_text = pii_result['masked_text']
            
            # Remove name (usually first line)
            lines = masked_text.split('\n')
            if lines:
                lines[0] = "[CANDIDATE_NAME]"
            
            # Remove location/address patterns
            masked_text = '\n'.join(lines)
            masked_text = re.sub(r'\b\d+\s+[\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b', '[ADDRESS]', masked_text, flags=re.IGNORECASE)
            masked_text = re.sub(r'\b[A-Z][a-z]+,\s*[A-Z]{2}\b', '[LOCATION]', masked_text)
            
            # Remove age/birth date
            masked_text = re.sub(r'\b(19|20)\d{2}\b(?=.{0,20}(born|birth|age))', '[YEAR]', masked_text, flags=re.IGNORECASE)
            masked_text = re.sub(r'\b\d{2}\s+years?\s+old\b', '[AGE]', masked_text, flags=re.IGNORECASE)
            
            # Remove gender indicators
            masked_text = re.sub(r'\b(Mr\.?|Mrs\.?|Miss|Ms\.)\s+', '', masked_text, flags=re.IGNORECASE)
            
            # Remove photos/images
            masked_text = re.sub(r'\[?(photo|picture|image)\]?', '', masked_text, flags=re.IGNORECASE)
            
            return {
                'success': True,
                'skill_only_resume': masked_text,
                'privacy_preserved': True,
                'data_minimization': True,
                'explanation': 'Only skill, experience, and qualification data retained. All PII removed.'
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'skill_only_resume': None
            }
    
    def create_anonymous_profile(self, resume_text: str) -> Dict:
        """Create an anonymous candidate profile with only relevant professional info"""
        try:
            skill_only = self.extract_skill_only_resume(resume_text)
            
            if not skill_only['success']:
                return skill_only
            
            # Generate anonymous ID
            profile_hash = hashlib.sha256(resume_text.encode()).hexdigest()
            anonymous_id = f"CANDIDATE_{profile_hash[:12].upper()}"
            
            return {
                'success': True,
                'anonymous_profile': {
                    'candidate_id': anonymous_id,
                    'profile_data': skill_only['skill_only_resume'],
                    'created_at': datetime.now().isoformat(),
                    'privacy_level': 'maximum',
                    'pii_removed': True,
                    'reversible': False
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'anonymous_profile': None
            }
    
    def hash_sensitive_data(self, data: str) -> Dict:
        """Create one-way hash of sensitive data for verification without storage"""
        try:
            # Create SHA-256 hash
            data_hash = hashlib.sha256(data.encode()).hexdigest()
            
            # Create shorter verification code
            verification_code = data_hash[:16].upper()
            
            return {
                'success': True,
                'hash': data_hash,
                'verification_code': verification_code,
                'algorithm': 'SHA-256',
                'reversible': False
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def verify_data_hash(self, data: str, expected_hash: str) -> Dict:
        """Verify data against hash without revealing original data"""
        try:
            # Hash the provided data
            data_hash = hashlib.sha256(data.encode()).hexdigest()
            
            # Compare hashes
            matches = data_hash == expected_hash
            
            return {
                'success': True,
                'verified': matches,
                'verification_time': datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'verified': False
            }
    
    def generate_privacy_report(self, resume_text: str) -> Dict:
        """Generate a privacy analysis report"""
        try:
            # Detect PII
            pii_result = self.mask_pii(resume_text, keep_professional=True)
            
            # Count PII types
            pii_types = list(pii_result.get('masked_items', {}).keys())
            pii_count = sum(len(v) for v in pii_result.get('masked_items', {}).values())
            
            # Privacy risk assessment
            risk_level = 'low'
            if pii_count > 10:
                risk_level = 'high'
            elif pii_count > 5:
                risk_level = 'medium'
            
            return {
                'success': True,
                'privacy_report': {
                    'pii_detected': pii_result.get('pii_found', False),
                    'pii_types_found': pii_types,
                    'total_pii_instances': pii_count,
                    'privacy_risk_level': risk_level,
                    'recommendations': self._get_privacy_recommendations(risk_level, pii_types),
                    'data_minimization_possible': True,
                    'anonymization_available': True,
                    'generated_at': datetime.now().isoformat()
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'privacy_report': None
            }
    
    def minimal_data_extraction(self, resume_text: str, required_fields: List[str]) -> Dict:
        """Extract only the minimal required data fields"""
        try:
            extracted_data = {}
            
            for field in required_fields:
                if field.lower() == 'skills':
                    # Extract skills section only
                    skills_match = re.search(r'(?i)(skills?|technical skills?|competencies)[\s:]+(.+?)(?=\n\n|\n[A-Z]|\Z)', resume_text, re.DOTALL)
                    if skills_match:
                        extracted_data['skills'] = skills_match.group(2).strip()
                
                elif field.lower() == 'experience':
                    # Extract experience section only
                    exp_match = re.search(r'(?i)(experience|work history|employment)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)', resume_text, re.DOTALL)
                    if exp_match:
                        # Mask company names if needed
                        exp_text = exp_match.group(2).strip()
                        extracted_data['experience'] = exp_text[:500]  # Limit length
                
                elif field.lower() == 'education':
                    # Extract education section only
                    edu_match = re.search(r'(?i)(education|degree)[\s:]+(.+?)(?=\n\n[A-Z]|\Z)', resume_text, re.DOTALL)
                    if edu_match:
                        extracted_data['education'] = edu_match.group(2).strip()[:300]
            
            return {
                'success': True,
                'minimal_data': extracted_data,
                'fields_extracted': list(extracted_data.keys()),
                'data_minimization': True,
                'privacy_preserved': True
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'minimal_data': None
            }
    
    def _get_privacy_recommendations(self, risk_level: str, pii_types: List[str]) -> List[str]:
        """Get privacy recommendations based on risk assessment"""
        recommendations = []
        
        if risk_level == 'high':
            recommendations.append("High amount of PII detected - consider anonymization before sharing")
            recommendations.append("Use privacy-preserving mode for all evaluations")
        
        if 'email' in pii_types:
            recommendations.append("Mask email addresses except domain for professional context")
        
        if 'phone' in pii_types:
            recommendations.append("Remove phone numbers from automated processing")
        
        if 'ssn' in pii_types:
            recommendations.append("CRITICAL: SSN detected - remove immediately")
        
        if 'address' in pii_types:
            recommendations.append("Remove physical addresses - not needed for skill evaluation")
        
        recommendations.append("Store only hashed credentials, never raw PII")
        recommendations.append("Use anonymous candidate IDs for all internal processing")
        
        return recommendations
