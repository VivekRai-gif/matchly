"""Test Script for Input Validation Agent

This script demonstrates all validation capabilities of the InputValidationAgent.
"""

import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.dirname(__file__))

from validation_agent import InputValidationAgent, CheckpointStatus


def print_section(title):
    """Print a section header"""
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70 + "\n")


def print_validation_result(result, test_name):
    """Pretty print validation result"""
    print(f"\n📋 Test: {test_name}")
    print(f"✓ Valid: {result.is_valid}")
    print(f"⭐ Score: {result.overall_score:.1f}/100")
    
    if result.errors:
        print(f"❌ Errors ({len(result.errors)}):")
        for error in result.errors:
            print(f"   - {error}")
    
    if result.warnings:
        print(f"⚠️  Warnings ({len(result.warnings)}):")
        for warning in result.warnings:
            print(f"   - {warning}")
    
    print(f"\n📊 Checkpoints ({len(result.checkpoints)}):")
    for checkpoint in result.checkpoints:
        status_icon = {
            CheckpointStatus.PASSED: "✅",
            CheckpointStatus.FAILED: "❌",
            CheckpointStatus.WARNING: "⚠️",
            CheckpointStatus.SKIPPED: "⏭️"
        }.get(checkpoint.status, "❓")
        
        print(f"   {status_icon} {checkpoint.name}: {checkpoint.message}")


def test_file_validation():
    """Test file validation with various scenarios"""
    print_section("FILE VALIDATION TESTS")
    
    agent = InputValidationAgent()
    
    # Test 1: Valid filename and extension
    print("\n🧪 Test 1: Valid PDF file")
    result = agent.validate_file(
        file_path="test_resume.pdf",
        file_size=5000,  # 5KB
        filename="john_doe_resume.pdf"
    )
    print_validation_result(result, "Valid PDF file (5KB)")
    
    # Test 2: Invalid extension
    print("\n🧪 Test 2: Invalid extension")
    result = agent.validate_file(
        file_path="test.exe",
        file_size=5000,
        filename="malicious.exe"
    )
    print_validation_result(result, "Invalid extension (.exe)")
    
    # Test 3: File too large
    print("\n🧪 Test 3: File too large")
    result = agent.validate_file(
        file_path="large_file.pdf",
        file_size=15 * 1024 * 1024,  # 15MB
        filename="large_resume.pdf"
    )
    print_validation_result(result, "File too large (15MB)")
    
    # Test 4: Empty file
    print("\n🧪 Test 4: Empty file")
    result = agent.validate_file(
        file_path="empty.pdf",
        file_size=0,
        filename="empty_resume.pdf"
    )
    print_validation_result(result, "Empty file (0 bytes)")
    
    # Test 5: Dangerous filename
    print("\n🧪 Test 5: Dangerous filename")
    result = agent.validate_file(
        file_path="test.pdf",
        file_size=5000,
        filename="../../../etc/passwd.pdf"
    )
    print_validation_result(result, "Dangerous filename with path traversal")


def test_text_validation():
    """Test text validation with various scenarios"""
    print_section("TEXT VALIDATION TESTS")
    
    agent = InputValidationAgent()
    
    # Test 1: Valid text
    print("\n🧪 Test 1: Valid text")
    result = agent.validate_text(
        "This is a valid text with sufficient length and no malicious content. " * 5,
        "sample_text"
    )
    print_validation_result(result, "Valid text (safe and proper length)")
    
    # Test 2: XSS attempt
    print("\n🧪 Test 2: XSS attack attempt")
    result = agent.validate_text(
        "<script>alert('XSS')</script>Hello world",
        "malicious_text"
    )
    print_validation_result(result, "Text with XSS attack")
    
    # Test 3: SQL injection attempt
    print("\n🧪 Test 3: SQL injection attempt")
    result = agent.validate_text(
        "'; DROP TABLE users; --",
        "malicious_sql"
    )
    print_validation_result(result, "Text with SQL injection")
    
    # Test 4: Text too short
    print("\n🧪 Test 4: Text too short")
    result = agent.validate_text(
        "Hi",
        "short_text"
    )
    print_validation_result(result, "Text too short (2 chars)")
    
    # Test 5: Empty text
    print("\n🧪 Test 5: Empty text")
    result = agent.validate_text(
        "   ",
        "empty_text"
    )
    print_validation_result(result, "Empty text (whitespace only)")
    
    # Test 6: Very short text (warning)
    print("\n🧪 Test 6: Very short text")
    result = agent.validate_text(
        "This is short but valid",
        "short_but_valid"
    )
    print_validation_result(result, "Short but valid text (23 chars)")


def test_resume_validation():
    """Test resume validation"""
    print_section("RESUME VALIDATION TESTS")
    
    agent = InputValidationAgent()
    
    # Test 1: Complete resume
    print("\n🧪 Test 1: Complete resume")
    complete_resume = """
    John Doe
    Email: john.doe@email.com
    Phone: 123-456-7890
    
    EXPERIENCE
    Senior Software Engineer at Tech Corp (2020-2023)
    - Developed scalable applications
    - Led team of 5 engineers
    
    EDUCATION
    Bachelor of Science in Computer Science
    University of Technology, 2016-2020
    
    SKILLS
    Python, JavaScript, React, Node.js, AWS, Docker
    """
    result = agent.validate_resume(complete_resume)
    print_validation_result(result, "Complete resume with all sections")
    
    # Test 2: Resume missing contact info
    print("\n🧪 Test 2: Resume missing contact info")
    incomplete_resume = """
    John Doe
    
    EXPERIENCE
    Software Engineer at Company
    
    SKILLS
    Python, JavaScript
    """
    result = agent.validate_resume(incomplete_resume)
    print_validation_result(result, "Resume missing contact information")
    
    # Test 3: Resume with XSS
    print("\n🧪 Test 3: Resume with malicious content")
    malicious_resume = """
    <script>alert('hack')</script>
    John Doe
    Email: john@email.com
    """
    result = agent.validate_resume(malicious_resume)
    print_validation_result(result, "Resume with XSS attempt")


def test_job_validation():
    """Test job description validation"""
    print_section("JOB DESCRIPTION VALIDATION TESTS")
    
    agent = InputValidationAgent()
    
    # Test 1: Complete job description
    print("\n🧪 Test 1: Complete job description")
    complete_job = """
    Company: Tech Solutions Inc.
    Position: Senior Software Engineer
    
    Requirements:
    - 5+ years of experience in software development
    - Proficiency in Python, JavaScript
    - Bachelor's degree in Computer Science
    
    Responsibilities:
    - Design and develop scalable applications
    - Lead technical projects
    - Mentor junior developers
    
    Compensation:
    - Competitive salary based on experience
    - Health insurance
    - 401(k) matching
    """
    result = agent.validate_job_description(complete_job)
    print_validation_result(result, "Complete job description")
    
    # Test 2: Incomplete job description
    print("\n🧪 Test 2: Incomplete job description")
    incomplete_job = """
    Looking for a developer.
    Must know programming.
    """
    result = agent.validate_job_description(incomplete_job)
    print_validation_result(result, "Incomplete job description")
    
    # Test 3: Job with malicious content
    print("\n🧪 Test 3: Job with XSS attempt")
    malicious_job = """
    <script>steal_data()</script>
    Great opportunity at company!
    """
    result = agent.validate_job_description(malicious_job)
    print_validation_result(result, "Job description with XSS")


def test_combined_scenarios():
    """Test realistic combined scenarios"""
    print_section("COMBINED REALISTIC SCENARIOS")
    
    agent = InputValidationAgent()
    
    # Scenario 1: Job application workflow
    print("\n🧪 Scenario 1: Complete job application workflow")
    print("\n  Step 1: Validate resume file")
    file_result = agent.validate_file(
        file_path="resume.pdf",
        file_size=150000,  # 150KB
        filename="john_doe_resume_2024.pdf"
    )
    print(f"  ✓ File validation: {'PASSED' if file_result.is_valid else 'FAILED'} ({file_result.overall_score:.0f}%)")
    
    print("\n  Step 2: Validate resume content")
    resume_text = """
    John Doe - Software Engineer
    john.doe@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/johndoe
    
    PROFESSIONAL EXPERIENCE
    Senior Software Engineer | Tech Corp | 2020-Present
    - Led development of microservices architecture serving 1M+ users
    - Mentored team of 5 junior developers
    
    EDUCATION
    BS Computer Science | MIT | 2016-2020
    
    TECHNICAL SKILLS
    Python, JavaScript, React, AWS, Docker, Kubernetes
    """
    resume_result = agent.validate_resume(resume_text)
    print(f"  ✓ Resume content: {'PASSED' if resume_result.is_valid else 'FAILED'} ({resume_result.overall_score:.0f}%)")
    
    print("\n  Step 3: Validate job description")
    job_text = """
    Senior Software Engineer at Tech Solutions
    
    Company: Tech Solutions Inc. - A leading innovator in cloud technology
    
    Position: Senior Software Engineer
    Location: San Francisco, CA (Hybrid)
    
    Requirements:
    - 5+ years software development experience
    - Strong proficiency in Python, JavaScript, and cloud platforms
    - Bachelor's degree in Computer Science or related field
    
    Responsibilities:
    - Architect and build scalable microservices
    - Collaborate with product teams
    - Drive technical innovation
    
    Compensation: $150k-$200k + equity + benefits
    """
    job_result = agent.validate_job_description(job_text)
    print(f"  ✓ Job description: {'PASSED' if job_result.is_valid else 'FAILED'} ({job_result.overall_score:.0f}%)")
    
    print("\n  📊 Overall Application Validation:")
    all_valid = file_result.is_valid and resume_result.is_valid and job_result.is_valid
    avg_score = (file_result.overall_score + resume_result.overall_score + job_result.overall_score) / 3
    print(f"  {'✅ READY TO PROCEED' if all_valid else '❌ VALIDATION FAILED'}")
    print(f"  Overall Score: {avg_score:.1f}/100")


def main():
    """Run all tests"""
    print("\n" + "=" * 70)
    print("  INPUT VALIDATION AGENT - COMPREHENSIVE TEST SUITE")
    print("=" * 70)
    
    try:
        test_file_validation()
        test_text_validation()
        test_resume_validation()
        test_job_validation()
        test_combined_scenarios()
        
        print("\n" + "=" * 70)
        print("  ✅ ALL TESTS COMPLETED")
        print("=" * 70 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error during testing: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
