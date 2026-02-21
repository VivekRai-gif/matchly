"""
Transparent Matching Module
Provides explainable AI matching with detailed reasoning
"""

import google.generativeai as genai
import json
from typing import Dict, List
from datetime import datetime


class TransparentMatcher:
    """Transparent and explainable candidate-job matching"""
    
    def __init__(self, gemini_api_key: str):
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def match_with_explanation(self, resume_text: str, job_description: str) -> Dict:
        """Match candidate to job with full transparency and reasoning"""
        try:
            prompt = f"""Perform a transparent and explainable matching between this candidate and job.
Provide detailed reasoning for EVERY decision and score.

JOB DESCRIPTION:
{job_description[:2500]}

CANDIDATE RESUME:
{resume_text[:4000]}

Return a detailed JSON with complete transparency:
{{
    "overall_match_score": 0-100,
    "recommendation": "strong_match/good_match/potential_match/weak_match/no_match",
    
    "skill_alignment": {{
        "score": 0-100,
        "matched_skills": [
            {{
                "skill": "skill name",
                "required_level": "proficiency needed",
                "candidate_level": "proficiency candidate has",
                "match_quality": "excellent/good/partial/none",
                "evidence": "specific example from resume",
                "reasoning": "why this is a match/mismatch"
            }}
        ],
        "missing_critical_skills": [
            {{
                "skill": "skill name",
                "importance": "critical/high/medium",
                "impact_on_match": "explanation",
                "can_be_learned": true/false
            }}
        ],
        "bonus_skills": ["additional valuable skills candidate brings"],
        "explanation": "overall skill alignment reasoning"
    }},
    
    "experience_alignment": {{
        "score": 0-100,
        "years_required": <number or "not specified">,
        "years_candidate_has": <number>,
        "relevance_score": 0-100,
        "relevant_experiences": [
            {{
                "experience": "brief description",
                "relevance": "how it relates to job",
                "weight": "high/medium/low"
            }}
        ],
        "explanation": "experience alignment reasoning"
    }},
    
    "education_alignment": {{
        "score": 0-100,
        "requirement_met": true/false,
        "details": "explanation",
        "reasoning": "how education aligns or doesn't"
    }},
    
    "project_alignment": {{
        "score": 0-100,
        "relevant_projects": [
            {{
                "project": "project name/description",
                "relevance": "how it relates to job",
                "technologies_overlap": ["tech used that matches job"],
                "impact": "why this project matters"
            }}
        ],
        "explanation": "project alignment reasoning"
    }},
    
    "cultural_fit_indicators": {{
        "score": 0-100,
        "indicators": ["list of positive indicators from resume"],
        "concerns": ["list of potential concerns"],
        "explanation": "reasoning behind cultural fit assessment"
    }},
    
    "growth_potential": {{
        "score": 0-100,
        "learning_ability": "assessment based on resume",
        "adaptability": "assessment",
        "reasoning": "why candidate shows growth potential or not"
    }},
    
    "strengths": [
        {{
            "strength": "specific strength",
            "evidence": "proof from resume",
            "value_to_role": "how this helps in job"
        }}
    ],
    
    "concerns": [
        {{
            "concern": "specific concern",
            "severity": "critical/high/medium/low",
            "evidence": "what led to this concern",
            "mitigation": "possible ways to address"
        }}
    ],
    
    "decision_factors": {{
        "positive_factors": [
            {{
                "factor": "what helped candidate",
                "weight": "how much it influenced score",
                "explanation": "detailed reasoning"
            }}
        ],
        "negative_factors": [
            {{
                "factor": "what hurt candidate",
                "weight": "how much it influenced score",
                "explanation": "detailed reasoning"
            }}
        ]
    }},
    
    "transparency_statement": "Complete explanation of how this match score was calculated, what factors were considered, and why this recommendation was made",
    
    "next_steps": {{
        "recommendation": "hire/interview/test/reject",
        "reasoning": "why this next step",
        "interview_focus_areas": ["areas to explore in interview if applicable"]
    }},
    
    "fairness_check": {{
        "bias_free": true/false,
        "merit_based": true/false,
        "explanation": "confirmation that evaluation was fair and unbiased"
    }}
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
            
            match_data = json.loads(response_text.strip())
            
            return {
                'success': True,
                'transparent_match': match_data,
                'matched_at': datetime.now().isoformat(),
                'transparency_level': 'full'
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'transparent_match': None
            }
    
    def explain_score_breakdown(self, match_result: Dict) -> Dict:
        """Break down the match score into understandable components"""
        try:
            if not match_result.get('success'):
                return {'success': False, 'error': 'Invalid match result'}
            
            match_data = match_result.get('transparent_match', {})
            
            # Extract component scores
            components = {
                'Skill Alignment': match_data.get('skill_alignment', {}).get('score', 0),
                'Experience Alignment': match_data.get('experience_alignment', {}).get('score', 0),
                'Education Alignment': match_data.get('education_alignment', {}).get('score', 0),
                'Project Alignment': match_data.get('project_alignment', {}).get('score', 0),
                'Cultural Fit': match_data.get('cultural_fit_indicators', {}).get('score', 0),
                'Growth Potential': match_data.get('growth_potential', {}).get('score', 0)
            }
            
            # Calculate weights (you can customize these)
            weights = {
                'Skill Alignment': 0.35,
                'Experience Alignment': 0.25,
                'Education Alignment': 0.10,
                'Project Alignment': 0.15,
                'Cultural Fit': 0.10,
                'Growth Potential': 0.05
            }
            
            # Calculate weighted score
            weighted_score = sum(components[k] * weights[k] for k in components)
            
            breakdown = []
            for component, score in components.items():
                breakdown.append({
                    'component': component,
                    'score': score,
                    'weight': weights[component] * 100,
                    'weighted_contribution': score * weights[component],
                    'impact': self._get_impact_level(score)
                })
            
            return {
                'success': True,
                'score_breakdown': {
                    'overall_score': round(weighted_score, 2),
                    'components': breakdown,
                    'calculation_method': 'weighted_average',
                    'transparency_note': 'Each component is weighted based on importance to role'
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def generate_explanation_report(self, match_result: Dict) -> Dict:
        """Generate a human-readable explanation report"""
        try:
            if not match_result.get('success'):
                return {'success': False, 'error': 'Invalid match result'}
            
            match_data = match_result.get('transparent_match', {})
            
            # Build narrative explanation
            narrative = f"""
CANDIDATE MATCHING REPORT
========================

Overall Match Score: {match_data.get('overall_match_score', 'N/A')}/100
Recommendation: {match_data.get('recommendation', 'N/A').replace('_', ' ').title()}

TRANSPARENCY STATEMENT:
{match_data.get('transparency_statement', 'No statement provided')}

KEY STRENGTHS:
"""
            
            strengths = match_data.get('strengths', [])
            for i, strength in enumerate(strengths[:5], 1):
                narrative += f"\n{i}. {strength.get('strength', 'N/A')}"
                narrative += f"\n   Evidence: {strength.get('evidence', 'N/A')}"
                narrative += f"\n   Value: {strength.get('value_to_role', 'N/A')}\n"
            
            narrative += "\nAREAS OF CONCERN:"
            concerns = match_data.get('concerns', [])
            if concerns:
                for i, concern in enumerate(concerns[:5], 1):
                    narrative += f"\n{i}. {concern.get('concern', 'N/A')}"
                    narrative += f"\n   Severity: {concern.get('severity', 'N/A')}"
                    narrative += f"\n   Mitigation: {concern.get('mitigation', 'N/A')}\n"
            else:
                narrative += "\nNo major concerns identified."
            
            narrative += f"\n\nNEXT STEPS:"
            next_steps = match_data.get('next_steps', {})
            narrative += f"\nRecommendation: {next_steps.get('recommendation', 'N/A').replace('_', ' ').title()}"
            narrative += f"\nReasoning: {next_steps.get('reasoning', 'N/A')}"
            
            narrative += f"\n\nFAIRNESS VERIFICATION:"
            fairness = match_data.get('fairness_check', {})
            narrative += f"\nBias-Free: {fairness.get('bias_free', 'Unknown')}"
            narrative += f"\nMerit-Based: {fairness.get('merit_based', 'Unknown')}"
            narrative += f"\nExplanation: {fairness.get('explanation', 'N/A')}"
            
            return {
                'success': True,
                'explanation_report': {
                    'narrative': narrative,
                    'format': 'human_readable',
                    'generated_at': datetime.now().isoformat()
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def compare_candidates(self, candidate_matches: List[Dict]) -> Dict:
        """Compare multiple candidates transparently"""
        try:
            candidates_data = []
            
            for i, match in enumerate(candidate_matches):
                if match.get('success'):
                    match_data = match.get('transparent_match', {})
                    candidates_data.append({
                        'candidate_id': i + 1,
                        'overall_score': match_data.get('overall_match_score', 0),
                        'recommendation': match_data.get('recommendation', 'unknown'),
                        'key_strengths': [s.get('strength', '') for s in match_data.get('strengths', [])[:3]],
                        'key_concerns': [c.get('concern', '') for c in match_data.get('concerns', [])[:3]]
                    })
            
            # Sort by score
            candidates_data.sort(key=lambda x: x['overall_score'], reverse=True)
            
            return {
                'success': True,
                'comparison': {
                    'total_candidates': len(candidates_data),
                    'ranked_candidates': candidates_data,
                    'top_candidate': candidates_data[0] if candidates_data else None,
                    'comparison_method': 'score_based_ranking',
                    'transparency_note': 'All candidates evaluated with same criteria'
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def _get_impact_level(self, score: float) -> str:
        """Get impact level description for a score"""
        if score >= 80:
            return "Strong Positive Impact"
        elif score >= 60:
            return "Positive Impact"
        elif score >= 40:
            return "Moderate Impact"
        elif score >= 20:
            return "Low Impact"
        else:
            return "Negative Impact"
