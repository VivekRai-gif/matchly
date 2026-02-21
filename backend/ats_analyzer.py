import re
from typing import Dict, List, Tuple
import PyPDF2
from docx import Document
import io
import google.generativeai as genai

class ATSAnalyzer:
    """Analyze resume ATS compatibility using Gemini AI"""
    
    def __init__(self, gemini_api_key: str = None):
        # Common ATS-friendly sections
        self.standard_sections = [
            'contact', 'summary', 'experience', 'education', 
            'skills', 'certifications', 'projects'
        ]
        
        # ATS-friendly file formats
        self.supported_formats = ['.pdf', '.docx', '.txt']
        
        # Configure Gemini AI
        if gemini_api_key:
            genai.configure(api_key=gemini_api_key)
            self.model = genai.GenerativeModel('gemini-pro')
        else:
            self.model = None
        
    def extract_text_from_pdf(self, file_content: bytes) -> str:
        """Extract text from PDF file"""
        try:
            pdf_file = io.BytesIO(file_content)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text
        except Exception as e:
            return f"Error extracting PDF: {str(e)}"
    
    def extract_text_from_docx(self, file_content: bytes) -> str:
        """Extract text from DOCX file"""
        try:
            doc_file = io.BytesIO(file_content)
            doc = Document(doc_file)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return text
        except Exception as e:
            return f"Error extracting DOCX: {str(e)}"
    
    def extract_text(self, file_content: bytes, filename: str) -> str:
        """Extract text based on file type"""
        if filename.lower().endswith('.pdf'):
            return self.extract_text_from_pdf(file_content)
        elif filename.lower().endswith('.docx'):
            return self.extract_text_from_docx(file_content)
        elif filename.lower().endswith('.txt'):
            return file_content.decode('utf-8')
        else:
            return "Unsupported file format"
    
    def check_format_compatibility(self, filename: str) -> Dict:
        """Check if file format is ATS-compatible"""
        ext = '.' + filename.lower().split('.')[-1] if '.' in filename else ''
        is_compatible = ext in self.supported_formats
        
        return {
            'is_compatible': is_compatible,
            'file_type': ext,
            'message': 'ATS-compatible format' if is_compatible else f'Format {ext} may not be ATS-compatible. Use PDF or DOCX.',
            'score': 100 if is_compatible else 30
        }
    
    def detect_sections(self, text: str) -> Dict:
        """Detect standard resume sections"""
        text_lower = text.lower()
        detected_sections = []
        missing_sections = []
        
        section_patterns = {
            'contact': r'(email|phone|address|linkedin)',
            'summary': r'(summary|objective|profile)',
            'experience': r'(experience|work history|employment)',
            'education': r'(education|degree|university|college)',
            'skills': r'(skills|technical skills|competencies)',
            'certifications': r'(certification|certificate|licensed)',
            'projects': r'(projects|portfolio)'
        }
        
        for section, pattern in section_patterns.items():
            if re.search(pattern, text_lower):
                detected_sections.append(section.title())
            else:
                missing_sections.append(section.title())
        
        score = (len(detected_sections) / len(section_patterns)) * 100
        
        return {
            'detected': detected_sections,
            'missing': missing_sections,
            'score': round(score, 1),
            'message': f'Found {len(detected_sections)}/{len(section_patterns)} standard sections'
        }
    
    def check_keyword_match(self, resume_text: str, job_description: str) -> Dict:
        """Check keyword matching between resume and job description"""
        # Extract keywords from job description (simple word extraction)
        job_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', job_description.lower()))
        resume_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', resume_text.lower()))
        
        # Remove common words
        common_words = {'the', 'and', 'for', 'with', 'this', 'that', 'from', 'have', 'will', 'are', 'was', 'were'}
        job_keywords = job_words - common_words
        resume_keywords = resume_words - common_words
        
        # Find matched keywords
        matched_keywords = job_keywords.intersection(resume_keywords)
        missing_keywords = job_keywords - resume_keywords
        
        match_percentage = (len(matched_keywords) / len(job_keywords) * 100) if job_keywords else 0
        
        return {
            'match_percentage': round(match_percentage, 1),
            'matched_keywords': sorted(list(matched_keywords))[:20],  # Top 20
            'missing_keywords': sorted(list(missing_keywords))[:20],  # Top 20
            'total_job_keywords': len(job_keywords),
            'total_matched': len(matched_keywords),
            'score': round(match_percentage, 1)
        }
    
    def check_formatting_issues(self, text: str) -> Dict:
        """Check for common formatting issues"""
        issues = []
        warnings = []
        
        # Check for special characters
        special_chars = re.findall(r'[^\w\s\-.,()@:/]', text)
        if len(special_chars) > 10:
            issues.append('Contains many special characters that may confuse ATS')
        
        # Check for tables (common ATS issue)
        if '\t' in text or '|' in text:
            warnings.append('May contain tables - consider using simple bullet points')
        
        # Check for images/graphics indicators
        if any(indicator in text.lower() for indicator in ['image', 'picture', 'graphic', 'chart']):
            issues.append('May contain embedded images - ATS cannot read images')
        
        # Check for headers/footers
        if text.count('\n') < 5:
            warnings.append('Very few line breaks - formatting may be complex')
        
        # Check length
        word_count = len(text.split())
        if word_count < 100:
            issues.append('Resume seems too short')
        elif word_count > 1000:
            warnings.append('Resume is quite long - consider condensing')
        
        score = max(0, 100 - (len(issues) * 20) - (len(warnings) * 10))
        
        return {
            'issues': issues,
            'warnings': warnings,
            'score': score,
            'word_count': word_count,
            'message': 'Good formatting' if score > 70 else 'Formatting needs improvement'
        }
    
    def analyze_with_gemini(self, resume_text: str, job_description: str = "") -> Dict:
        """Use Gemini AI to provide intelligent analysis with detailed reasoning"""
        if not self.model:
            return {
                'success': False,
                'analysis': None,
                'reasoning': 'Gemini AI not configured'
            }
        
        try:
            # Prepare prompt for Gemini
            if job_description.strip():
                prompt = f"""Analyze this resume for ATS (Applicant Tracking System) compatibility and job matching:

RESUME:
{resume_text[:3000]}

JOB DESCRIPTION:
{job_description[:1500]}

Provide a detailed analysis in the following JSON format:
{{
    "ats_score": <number 0-100>,
    "match_score": <number 0-100>,
    "strengths": [<list of 3-5 strengths with specific examples>],
    "weaknesses": [<list of 3-5 weaknesses with specific examples>],
    "keyword_analysis": {{
        "matched_keywords": [<list of important matched keywords>],
        "missing_keywords": [<list of important missing keywords>]
    }},
    "formatting_issues": [<list of specific formatting problems>],
    "recommendations": [<list of 5-7 actionable recommendations>],
    "sections_found": [<list of detected resume sections>],
    "sections_missing": [<list of recommended missing sections>],
    "overall_assessment": "<detailed paragraph explaining the analysis>",
    "reasoning": {{
        "ats_compatibility": "<why this ATS score>",
        "job_match": "<why this match score>",
        "key_concerns": "<main issues to address>"
    }}
}}

Be specific and provide actionable insights."""
            else:
                prompt = f"""Analyze this resume for ATS (Applicant Tracking System) compatibility:

RESUME:
{resume_text[:3000]}

Provide a detailed analysis in the following JSON format:
{{
    "ats_score": <number 0-100>,
    "strengths": [<list of 3-5 strengths with specific examples>],
    "weaknesses": [<list of 3-5 weaknesses with specific examples>],
    "formatting_issues": [<list of specific formatting problems>],
    "recommendations": [<list of 5-7 actionable recommendations>],
    "sections_found": [<list of detected resume sections>],
    "sections_missing": [<list of recommended missing sections>],
    "overall_assessment": "<detailed paragraph explaining the analysis>",
    "reasoning": {{
        "ats_compatibility": "<why this ATS score>",
        "key_concerns": "<main issues to address>"
    }}
}}

Be specific and provide actionable insights."""
            
            # Get response from Gemini
            response = self.model.generate_content(prompt)
            
            # Extract JSON from response
            response_text = response.text.strip()
            
            # Remove markdown code blocks if present
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            # Try to parse as JSON
            import json
            try:
                analysis_data = json.loads(response_text)
            except:
                # If JSON parsing fails, return raw text
                analysis_data = {
                    'ats_score': 75,
                    'overall_assessment': response_text,
                    'recommendations': ['Review Gemini analysis above'],
                    'reasoning': {'ats_compatibility': 'See detailed analysis'}
                }
            
            return {
                'success': True,
                'analysis': analysis_data,
                'raw_response': response_text
            }
            
        except Exception as e:
            return {
                'success': False,
                'analysis': None,
                'error': f'Gemini analysis failed: {str(e)}'
            }
    
    def analyze(self, file_content: bytes, filename: str, job_description: str = "") -> Dict:
        """Complete ATS compatibility analysis with Gemini AI insights"""
        # Extract text
        resume_text = self.extract_text(file_content, filename)
        
        if resume_text.startswith('Error') or resume_text == "Unsupported file format":
            return {
                'success': False,
                'error': resume_text,
                'ats_score': 0
            }
        
        # Get Gemini AI analysis
        gemini_result = self.analyze_with_gemini(resume_text, job_description)
        
        # Run traditional checks
        format_check = self.check_format_compatibility(filename)
        section_check = self.detect_sections(resume_text)
        formatting_check = self.check_formatting_issues(resume_text)
        
        # Keyword check only if job description provided
        keyword_check = None
        if job_description.strip():
            keyword_check = self.check_keyword_match(resume_text, job_description)
        
        # Use Gemini score if available, otherwise calculate traditional score
        if gemini_result['success'] and gemini_result['analysis']:
            gemini_analysis = gemini_result['analysis']
            ats_score = gemini_analysis.get('ats_score', 75)
            
            return {
                'success': True,
                'ats_score': round(ats_score, 1),
                'gemini_analysis': gemini_analysis,
                'format_check': format_check,
                'section_check': section_check,
                'formatting_check': formatting_check,
                'keyword_analysis': keyword_check,
                'resume_preview': resume_text[:500],
                'suggestions': gemini_analysis.get('recommendations', []),
                'issues': gemini_analysis.get('formatting_issues', []),
                'strengths': gemini_analysis.get('strengths', []),
                'weaknesses': gemini_analysis.get('weaknesses', []),
                'reasoning': gemini_analysis.get('reasoning', {}),
                'overall_assessment': gemini_analysis.get('overall_assessment', '')
            }
        else:
            # Fallback to traditional analysis
            scores = [
                format_check['score'],
                section_check['score'],
                formatting_check['score']
            ]
            
            if keyword_check:
                scores.append(keyword_check['score'])
            
            overall_score = sum(scores) / len(scores)
            
            return {
                'success': True,
                'ats_score': round(overall_score, 1),
                'format_check': format_check,
                'section_check': section_check,
                'formatting_check': formatting_check,
                'keyword_analysis': keyword_check,
                'resume_preview': resume_text[:500],
                'suggestions': self._generate_suggestions(
                    format_check, section_check, formatting_check, keyword_check
                ),
                'issues': formatting_check['issues'],
                'gemini_error': gemini_result.get('error', 'Gemini analysis not available')
            }
    
    def _generate_suggestions(self, format_check, section_check, 
                            formatting_check, keyword_check) -> List[str]:
        """Generate improvement suggestions"""
        suggestions = []
        
        if format_check['score'] < 100:
            suggestions.append('Convert resume to PDF or DOCX format for better ATS compatibility')
        
        if section_check['missing']:
            suggestions.append(f"Add missing sections: {', '.join(section_check['missing'][:3])}")
        
        if formatting_check['issues']:
            suggestions.extend(formatting_check['issues'])
        
        if keyword_check and keyword_check['score'] < 60:
            suggestions.append('Incorporate more keywords from the job description')
            if keyword_check['missing_keywords']:
                top_missing = keyword_check['missing_keywords'][:5]
                suggestions.append(f"Consider adding keywords: {', '.join(top_missing)}")
        
        if not suggestions:
            suggestions.append('Your resume looks great! It\'s ATS-friendly.')
        
        return suggestions
