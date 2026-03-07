"""Input Validation Agent

Comprehensive validation agent that checks input data against multiple checkpoints
before processing. Ensures data integrity, security, and quality.
"""

import os
import re
import logging
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from enum import Enum
import mimetypes

logger = logging.getLogger(__name__)


class CheckpointStatus(Enum):
    """Status of validation checkpoint"""
    PASSED = "passed"
    FAILED = "failed"
    WARNING = "warning"
    SKIPPED = "skipped"


@dataclass
class ValidationCheckpoint:
    """Individual validation checkpoint result"""
    name: str
    status: CheckpointStatus
    message: str
    details: Dict[str, Any] = field(default_factory=dict)


@dataclass
class ValidationResult:
    """Complete validation result with all checkpoints"""
    is_valid: bool
    checkpoints: List[ValidationCheckpoint]
    overall_score: float  # 0-100
    warnings: List[str] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert validation result to dictionary"""
        return {
            "is_valid": self.is_valid,
            "overall_score": self.overall_score,
            "checkpoints": [
                {
                    "name": cp.name,
                    "status": cp.status.value,
                    "message": cp.message,
                    "details": cp.details
                }
                for cp in self.checkpoints
            ],
            "warnings": self.warnings,
            "errors": self.errors
        }


class InputValidationAgent:
    """Comprehensive input validation agent with multi-checkpoint validation"""
    
    # File constraints
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx', 'txt'}
    ALLOWED_MIME_TYPES = {
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    }
    
    # Text constraints
    MIN_TEXT_LENGTH = 10
    MAX_TEXT_LENGTH = 50000
    
    # Malicious patterns
    MALICIOUS_PATTERNS = [
        r'<script[^>]*>.*?</script>',  # XSS
        r'javascript:',  # JavaScript protocol
        r'on\w+\s*=',  # Event handlers
        r'eval\s*\(',  # eval() calls
        r'exec\s*\(',  # exec() calls
        r'system\s*\(',  # system() calls
        r'\$\(.*?\)',  # Command substitution
        r'`.*?`',  # Backticks
        r'<iframe',  # iframes
        r'<embed',  # embed tags
        r'<object',  # object tags
    ]
    
    # SQL injection patterns
    SQL_PATTERNS = [
        r"('\s*OR\s*'1'\s*=\s*'1)",
        r'(--\s*$)',
        r'(;\s*DROP\s+TABLE)',
        r'(UNION\s+SELECT)',
        r'(INSERT\s+INTO)',
        r'(DELETE\s+FROM)',
    ]
    
    def __init__(self):
        """Initialize validation agent"""
        logger.info("Input Validation Agent initialized")
    
    # ==================== FILE VALIDATION ====================
    
    def validate_file(self, file_path: str, file_size: int, filename: str) -> ValidationResult:
        """Comprehensive file validation with 7 checkpoints
        
        Args:
            file_path: Path to the file
            file_size: Size of file in bytes
            filename: Original filename
            
        Returns:
            ValidationResult with all checkpoint results
        """
        checkpoints = []
        errors = []
        warnings = []
        
        # Checkpoint 1: Filename validation
        cp1 = self._check_filename(filename)
        checkpoints.append(cp1)
        if cp1.status == CheckpointStatus.FAILED:
            errors.append(cp1.message)
        
        # Checkpoint 2: Extension validation
        cp2 = self._check_extension(filename)
        checkpoints.append(cp2)
        if cp2.status == CheckpointStatus.FAILED:
            errors.append(cp2.message)
        
        # Checkpoint 3: File size validation
        cp3 = self._check_file_size(file_size)
        checkpoints.append(cp3)
        if cp3.status == CheckpointStatus.FAILED:
            errors.append(cp3.message)
        elif cp3.status == CheckpointStatus.WARNING:
            warnings.append(cp3.message)
        
        # Checkpoint 4: MIME type validation
        cp4 = self._check_mime_type(file_path, filename)
        checkpoints.append(cp4)
        if cp4.status == CheckpointStatus.FAILED:
            errors.append(cp4.message)
        
        # Checkpoint 5: File existence and readability
        cp5 = self._check_file_access(file_path)
        checkpoints.append(cp5)
        if cp5.status == CheckpointStatus.FAILED:
            errors.append(cp5.message)
        
        # Checkpoint 6: Content integrity (basic)
        cp6 = self._check_file_integrity(file_path)
        checkpoints.append(cp6)
        if cp6.status == CheckpointStatus.FAILED:
            errors.append(cp6.message)
        elif cp6.status == CheckpointStatus.WARNING:
            warnings.append(cp6.message)
        
        # Checkpoint 7: Malicious content scan (basic)
        cp7 = self._check_malicious_file(file_path)
        checkpoints.append(cp7)
        if cp7.status == CheckpointStatus.FAILED:
            errors.append(cp7.message)
        
        # Calculate overall score
        passed = sum(1 for cp in checkpoints if cp.status == CheckpointStatus.PASSED)
        total = len(checkpoints)
        score = (passed / total) * 100 if total > 0 else 0
        
        is_valid = len(errors) == 0
        
        return ValidationResult(
            is_valid=is_valid,
            checkpoints=checkpoints,
            overall_score=score,
            warnings=warnings,
            errors=errors
        )
    
    def _check_filename(self, filename: str) -> ValidationCheckpoint:
        """Checkpoint 1: Validate filename"""
        if not filename or len(filename.strip()) == 0:
            return ValidationCheckpoint(
                name="Filename Validation",
                status=CheckpointStatus.FAILED,
                message="Filename is empty or missing",
                details={"filename": filename}
            )
        
        # Check for dangerous characters
        dangerous_chars = ['..', '/', '\\', '<', '>', ':', '"', '|', '?', '*']
        if any(char in filename for char in dangerous_chars):
            return ValidationCheckpoint(
                name="Filename Validation",
                status=CheckpointStatus.FAILED,
                message="Filename contains dangerous characters",
                details={"filename": filename, "dangerous_chars": dangerous_chars}
            )
        
        return ValidationCheckpoint(
            name="Filename Validation",
            status=CheckpointStatus.PASSED,
            message="Filename is valid",
            details={"filename": filename}
        )
    
    def _check_extension(self, filename: str) -> ValidationCheckpoint:
        """Checkpoint 2: Validate file extension"""
        if '.' not in filename:
            return ValidationCheckpoint(
                name="Extension Validation",
                status=CheckpointStatus.FAILED,
                message="File has no extension",
                details={"filename": filename}
            )
        
        extension = filename.rsplit('.', 1)[1].lower()
        if extension not in self.ALLOWED_EXTENSIONS:
            return ValidationCheckpoint(
                name="Extension Validation",
                status=CheckpointStatus.FAILED,
                message=f"Extension '{extension}' not allowed",
                details={
                    "extension": extension,
                    "allowed_extensions": list(self.ALLOWED_EXTENSIONS)
                }
            )
        
        return ValidationCheckpoint(
            name="Extension Validation",
            status=CheckpointStatus.PASSED,
            message=f"Extension '{extension}' is allowed",
            details={"extension": extension}
        )
    
    def _check_file_size(self, file_size: int) -> ValidationCheckpoint:
        """Checkpoint 3: Validate file size"""
        if file_size <= 0:
            return ValidationCheckpoint(
                name="File Size Validation",
                status=CheckpointStatus.FAILED,
                message="File is empty (0 bytes)",
                details={"file_size": file_size}
            )
        
        if file_size > self.MAX_FILE_SIZE:
            return ValidationCheckpoint(
                name="File Size Validation",
                status=CheckpointStatus.FAILED,
                message=f"File too large ({file_size} bytes > {self.MAX_FILE_SIZE} bytes)",
                details={
                    "file_size": file_size,
                    "max_size": self.MAX_FILE_SIZE,
                    "size_mb": round(file_size / (1024 * 1024), 2)
                }
            )
        
        # Warning for large files
        if file_size > self.MAX_FILE_SIZE * 0.8:
            return ValidationCheckpoint(
                name="File Size Validation",
                status=CheckpointStatus.WARNING,
                message=f"File is large ({round(file_size / (1024 * 1024), 2)} MB)",
                details={
                    "file_size": file_size,
                    "size_mb": round(file_size / (1024 * 1024), 2)
                }
            )
        
        return ValidationCheckpoint(
            name="File Size Validation",
            status=CheckpointStatus.PASSED,
            message=f"File size is valid ({round(file_size / 1024, 2)} KB)",
            details={
                "file_size": file_size,
                "size_kb": round(file_size / 1024, 2)
            }
        )
    
    def _check_mime_type(self, file_path: str, filename: str) -> ValidationCheckpoint:
        """Checkpoint 4: Validate MIME type"""
        try:
            # Guess MIME type from filename
            mime_type, _ = mimetypes.guess_type(filename)
            
            if mime_type is None:
                return ValidationCheckpoint(
                    name="MIME Type Validation",
                    status=CheckpointStatus.WARNING,
                    message="Could not determine MIME type",
                    details={"filename": filename}
                )
            
            if mime_type not in self.ALLOWED_MIME_TYPES:
                return ValidationCheckpoint(
                    name="MIME Type Validation",
                    status=CheckpointStatus.FAILED,
                    message=f"MIME type '{mime_type}' not allowed",
                    details={
                        "mime_type": mime_type,
                        "allowed_types": list(self.ALLOWED_MIME_TYPES)
                    }
                )
            
            return ValidationCheckpoint(
                name="MIME Type Validation",
                status=CheckpointStatus.PASSED,
                message=f"MIME type '{mime_type}' is valid",
                details={"mime_type": mime_type}
            )
            
        except Exception as e:
            logger.error(f"Error checking MIME type: {str(e)}")
            return ValidationCheckpoint(
                name="MIME Type Validation",
                status=CheckpointStatus.WARNING,
                message=f"Error checking MIME type: {str(e)}",
                details={"error": str(e)}
            )
    
    def _check_file_access(self, file_path: str) -> ValidationCheckpoint:
        """Checkpoint 5: Check file existence and readability"""
        if not os.path.exists(file_path):
            return ValidationCheckpoint(
                name="File Access Validation",
                status=CheckpointStatus.FAILED,
                message="File does not exist",
                details={"file_path": file_path}
            )
        
        if not os.path.isfile(file_path):
            return ValidationCheckpoint(
                name="File Access Validation",
                status=CheckpointStatus.FAILED,
                message="Path is not a file",
                details={"file_path": file_path}
            )
        
        if not os.access(file_path, os.R_OK):
            return ValidationCheckpoint(
                name="File Access Validation",
                status=CheckpointStatus.FAILED,
                message="File is not readable",
                details={"file_path": file_path}
            )
        
        return ValidationCheckpoint(
            name="File Access Validation",
            status=CheckpointStatus.PASSED,
            message="File is accessible and readable",
            details={"file_path": file_path}
        )
    
    def _check_file_integrity(self, file_path: str) -> ValidationCheckpoint:
        """Checkpoint 6: Basic file integrity check"""
        try:
            with open(file_path, 'rb') as f:
                # Try to read first 1KB
                first_bytes = f.read(1024)
                
                # Check if file is completely empty
                if len(first_bytes) == 0:
                    return ValidationCheckpoint(
                        name="File Integrity Validation",
                        status=CheckpointStatus.FAILED,
                        message="File is empty (0 bytes read)",
                        details={"file_path": file_path}
                    )
                
                # Check for null bytes (potential corruption)
                null_count = first_bytes.count(b'\x00')
                if null_count > len(first_bytes) * 0.5:
                    return ValidationCheckpoint(
                        name="File Integrity Validation",
                        status=CheckpointStatus.WARNING,
                        message="File may be corrupted (high null byte count)",
                        details={
                            "file_path": file_path,
                            "null_percentage": round((null_count / len(first_bytes)) * 100, 2)
                        }
                    )
                
                return ValidationCheckpoint(
                    name="File Integrity Validation",
                    status=CheckpointStatus.PASSED,
                    message="File integrity check passed",
                    details={"file_path": file_path, "first_bytes_read": len(first_bytes)}
                )
                
        except Exception as e:
            logger.error(f"Error checking file integrity: {str(e)}")
            return ValidationCheckpoint(
                name="File Integrity Validation",
                status=CheckpointStatus.FAILED,
                message=f"Error reading file: {str(e)}",
                details={"file_path": file_path, "error": str(e)}
            )
    
    def _check_malicious_file(self, file_path: str) -> ValidationCheckpoint:
        """Checkpoint 7: Basic malicious content scan"""
        try:
            # For text files, scan content
            if file_path.lower().endswith('.txt'):
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read(10000)  # Read first 10KB
                    
                    # Check for malicious patterns
                    for pattern in self.MALICIOUS_PATTERNS:
                        if re.search(pattern, content, re.IGNORECASE):
                            return ValidationCheckpoint(
                                name="Malicious Content Scan",
                                status=CheckpointStatus.FAILED,
                                message="Potentially malicious content detected",
                                details={
                                    "file_path": file_path,
                                    "pattern_matched": pattern
                                }
                            )
            
            # For PDFs and DOCs, just check filename for suspicious patterns
            filename_lower = os.path.basename(file_path).lower()
            suspicious_keywords = ['hack', 'crack', 'malware', 'virus', 'exploit']
            if any(keyword in filename_lower for keyword in suspicious_keywords):
                return ValidationCheckpoint(
                    name="Malicious Content Scan",
                    status=CheckpointStatus.WARNING,
                    message="Filename contains suspicious keywords",
                    details={"file_path": file_path, "filename": os.path.basename(file_path)}
                )
            
            return ValidationCheckpoint(
                name="Malicious Content Scan",
                status=CheckpointStatus.PASSED,
                message="No malicious content detected",
                details={"file_path": file_path}
            )
            
        except Exception as e:
            logger.warning(f"Error scanning file: {str(e)}")
            return ValidationCheckpoint(
                name="Malicious Content Scan",
                status=CheckpointStatus.WARNING,
                message=f"Could not complete scan: {str(e)}",
                details={"file_path": file_path, "error": str(e)}
            )
    
    # ==================== TEXT VALIDATION ====================
    
    def validate_text(self, text: str, field_name: str = "text") -> ValidationResult:
        """Comprehensive text validation with 7 checkpoints
        
        Args:
            text: Text to validate
            field_name: Name of the field being validated
            
        Returns:
            ValidationResult with all checkpoint results
        """
        checkpoints = []
        errors = []
        warnings = []
        
        # Checkpoint 1: Type and presence validation
        cp1 = self._check_text_type(text, field_name)
        checkpoints.append(cp1)
        if cp1.status == CheckpointStatus.FAILED:
            errors.append(cp1.message)
        
        # Checkpoint 2: Length validation
        cp2 = self._check_text_length(text, field_name)
        checkpoints.append(cp2)
        if cp2.status == CheckpointStatus.FAILED:
            errors.append(cp2.message)
        elif cp2.status == CheckpointStatus.WARNING:
            warnings.append(cp2.message)
        
        # Checkpoint 3: Encoding validation
        cp3 = self._check_text_encoding(text, field_name)
        checkpoints.append(cp3)
        if cp3.status == CheckpointStatus.FAILED:
            errors.append(cp3.message)
        
        # Checkpoint 4: Malicious pattern detection
        cp4 = self._check_malicious_text(text, field_name)
        checkpoints.append(cp4)
        if cp4.status == CheckpointStatus.FAILED:
            errors.append(cp4.message)
        
        # Checkpoint 5: XSS detection
        cp5 = self._check_xss(text, field_name)
        checkpoints.append(cp5)
        if cp5.status == CheckpointStatus.FAILED:
            errors.append(cp5.message)
        
        # Checkpoint 6: SQL injection detection
        cp6 = self._check_sql_injection(text, field_name)
        checkpoints.append(cp6)
        if cp6.status == CheckpointStatus.FAILED:
            errors.append(cp6.message)
        
        # Checkpoint 7: Content quality check
        cp7 = self._check_text_quality(text, field_name)
        checkpoints.append(cp7)
        if cp7.status == CheckpointStatus.WARNING:
            warnings.append(cp7.message)
        
        # Calculate overall score
        passed = sum(1 for cp in checkpoints if cp.status == CheckpointStatus.PASSED)
        total = len(checkpoints)
        score = (passed / total) * 100 if total > 0 else 0
        
        is_valid = len(errors) == 0
        
        return ValidationResult(
            is_valid=is_valid,
            checkpoints=checkpoints,
            overall_score=score,
            warnings=warnings,
            errors=errors
        )
    
    def _check_text_type(self, text: Any, field_name: str) -> ValidationCheckpoint:
        """Checkpoint 1: Validate text type and presence"""
        if text is None:
            return ValidationCheckpoint(
                name="Text Type Validation",
                status=CheckpointStatus.FAILED,
                message=f"{field_name} is None",
                details={"field_name": field_name}
            )
        
        if not isinstance(text, str):
            return ValidationCheckpoint(
                name="Text Type Validation",
                status=CheckpointStatus.FAILED,
                message=f"{field_name} is not a string (type: {type(text).__name__})",
                details={"field_name": field_name, "type": type(text).__name__}
            )
        
        if len(text.strip()) == 0:
            return ValidationCheckpoint(
                name="Text Type Validation",
                status=CheckpointStatus.FAILED,
                message=f"{field_name} is empty or contains only whitespace",
                details={"field_name": field_name}
            )
        
        return ValidationCheckpoint(
            name="Text Type Validation",
            status=CheckpointStatus.PASSED,
            message=f"{field_name} type is valid",
            details={"field_name": field_name}
        )
    
    def _check_text_length(self, text: str, field_name: str) -> ValidationCheckpoint:
        """Checkpoint 2: Validate text length"""
        length = len(text.strip())
        
        if length < self.MIN_TEXT_LENGTH:
            return ValidationCheckpoint(
                name="Text Length Validation",
                status=CheckpointStatus.FAILED,
                message=f"{field_name} too short ({length} < {self.MIN_TEXT_LENGTH} chars)",
                details={
                    "field_name": field_name,
                    "length": length,
                    "min_length": self.MIN_TEXT_LENGTH
                }
            )
        
        if length > self.MAX_TEXT_LENGTH:
            return ValidationCheckpoint(
                name="Text Length Validation",
                status=CheckpointStatus.FAILED,
                message=f"{field_name} too long ({length} > {self.MAX_TEXT_LENGTH} chars)",
                details={
                    "field_name": field_name,
                    "length": length,
                    "max_length": self.MAX_TEXT_LENGTH
                }
            )
        
        # Warning for very short text
        if length < 50:
            return ValidationCheckpoint(
                name="Text Length Validation",
                status=CheckpointStatus.WARNING,
                message=f"{field_name} is very short ({length} chars)",
                details={"field_name": field_name, "length": length}
            )
        
        return ValidationCheckpoint(
            name="Text Length Validation",
            status=CheckpointStatus.PASSED,
            message=f"{field_name} length is valid ({length} chars)",
            details={"field_name": field_name, "length": length}
        )
    
    def _check_text_encoding(self, text: str, field_name: str) -> ValidationCheckpoint:
        """Checkpoint 3: Validate text encoding"""
        try:
            # Try to encode as UTF-8
            text.encode('utf-8')
            
            # Check for excessive non-printable characters
            non_printable = sum(1 for c in text if not c.isprintable() and c not in ['\n', '\r', '\t'])
            if non_printable > len(text) * 0.1:
                return ValidationCheckpoint(
                    name="Text Encoding Validation",
                    status=CheckpointStatus.WARNING,
                    message=f"{field_name} contains many non-printable characters",
                    details={
                        "field_name": field_name,
                        "non_printable_count": non_printable,
                        "percentage": round((non_printable / len(text)) * 100, 2)
                    }
                )
            
            return ValidationCheckpoint(
                name="Text Encoding Validation",
                status=CheckpointStatus.PASSED,
                message=f"{field_name} encoding is valid (UTF-8)",
                details={"field_name": field_name}
            )
            
        except UnicodeEncodeError as e:
            return ValidationCheckpoint(
                name="Text Encoding Validation",
                status=CheckpointStatus.FAILED,
                message=f"{field_name} encoding error: {str(e)}",
                details={"field_name": field_name, "error": str(e)}
            )
    
    def _check_malicious_text(self, text: str, field_name: str) -> ValidationCheckpoint:
        """Checkpoint 4: Check for malicious patterns"""
        for pattern in self.MALICIOUS_PATTERNS:
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                return ValidationCheckpoint(
                    name="Malicious Pattern Detection",
                    status=CheckpointStatus.FAILED,
                    message=f"{field_name} contains potentially malicious code",
                    details={
                        "field_name": field_name,
                        "pattern": pattern,
                        "matches": matches[:3]  # Show first 3 matches
                    }
                )
        
        return ValidationCheckpoint(
            name="Malicious Pattern Detection",
            status=CheckpointStatus.PASSED,
            message=f"{field_name} contains no malicious patterns",
            details={"field_name": field_name}
        )
    
    def _check_xss(self, text: str, field_name: str) -> ValidationCheckpoint:
        """Checkpoint 5: Check for XSS attacks"""
        xss_patterns = [
            r'<script[^>]*>.*?</script>',
            r'javascript:',
            r'on\w+\s*=',
            r'<iframe',
            r'<embed',
            r'<object'
        ]
        
        for pattern in xss_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return ValidationCheckpoint(
                    name="XSS Detection",
                    status=CheckpointStatus.FAILED,
                    message=f"{field_name} contains potential XSS attack",
                    details={
                        "field_name": field_name,
                        "pattern": pattern
                    }
                )
        
        return ValidationCheckpoint(
            name="XSS Detection",
            status=CheckpointStatus.PASSED,
            message=f"{field_name} is safe from XSS",
            details={"field_name": field_name}
        )
    
    def _check_sql_injection(self, text: str, field_name: str) -> ValidationCheckpoint:
        """Checkpoint 6: Check for SQL injection"""
        for pattern in self.SQL_PATTERNS:
            if re.search(pattern, text, re.IGNORECASE):
                return ValidationCheckpoint(
                    name="SQL Injection Detection",
                    status=CheckpointStatus.FAILED,
                    message=f"{field_name} contains potential SQL injection",
                    details={
                        "field_name": field_name,
                        "pattern": pattern
                    }
                )
        
        return ValidationCheckpoint(
            name="SQL Injection Detection",
            status=CheckpointStatus.PASSED,
            message=f"{field_name} is safe from SQL injection",
            details={"field_name": field_name}
        )
    
    def _check_text_quality(self, text: str, field_name: str) -> ValidationCheckpoint:
        """Checkpoint 7: Check text quality"""
        # Check word count
        words = text.split()
        word_count = len(words)
        
        if word_count < 5:
            return ValidationCheckpoint(
                name="Text Quality Check",
                status=CheckpointStatus.WARNING,
                message=f"{field_name} has very few words ({word_count})",
                details={"field_name": field_name, "word_count": word_count}
            )
        
        # Check for excessive special characters
        special_chars = sum(1 for c in text if not c.isalnum() and not c.isspace())
        if special_chars > len(text) * 0.3:
            return ValidationCheckpoint(
                name="Text Quality Check",
                status=CheckpointStatus.WARNING,
                message=f"{field_name} has many special characters",
                details={
                    "field_name": field_name,
                    "special_char_percentage": round((special_chars / len(text)) * 100, 2)
                }
            )
        
        return ValidationCheckpoint(
            name="Text Quality Check",
            status=CheckpointStatus.PASSED,
            message=f"{field_name} quality is acceptable",
            details={
                "field_name": field_name,
                "word_count": word_count
            }
        )
    
    # ==================== RESUME VALIDATION ====================
    
    def validate_resume(self, resume_text: str) -> ValidationResult:
        """Validate resume content for completeness
        
        Args:
            resume_text: Extracted resume text
            
        Returns:
            ValidationResult with resume-specific checkpoints
        """
        checkpoints = []
        errors = []
        warnings = []
        
        # First, validate as text
        text_validation = self.validate_text(resume_text, "resume")
        if not text_validation.is_valid:
            return text_validation
        
        # Additional resume-specific checks
        resume_lower = resume_text.lower()
        
        # Check for contact information
        has_email = bool(re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', resume_text))
        has_phone = bool(re.search(r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b', resume_text))
        
        if not has_email and not has_phone:
            warnings.append("Resume missing contact information")
        
        # Check for key sections
        sections = {
            'experience': any(keyword in resume_lower for keyword in ['experience', 'work history', 'employment']),
            'education': any(keyword in resume_lower for keyword in ['education', 'degree', 'university', 'college']),
            'skills': any(keyword in resume_lower for keyword in ['skills', 'technical skills', 'competencies']),
        }
        
        missing_sections = [section for section, present in sections.items() if not present]
        if missing_sections:
            warnings.append(f"Resume possibly missing sections: {', '.join(missing_sections)}")
        
        # Create summary checkpoint
        checkpoint = ValidationCheckpoint(
            name="Resume Completeness Check",
            status=CheckpointStatus.PASSED if len(warnings) == 0 else CheckpointStatus.WARNING,
            message="Resume validation complete" if len(warnings) == 0 else f"Resume has {len(warnings)} warnings",
            details={
                "has_email": has_email,
                "has_phone": has_phone,
                "sections_found": sections,
                "missing_sections": missing_sections
            }
        )
        checkpoints.append(checkpoint)
        
        # Calculate score
        score = 100.0
        if missing_sections:
            score -= len(missing_sections) * 10
        if not has_email:
            score -= 5
        if not has_phone:
            score -= 5
        
        return ValidationResult(
            is_valid=True,
            checkpoints=text_validation.checkpoints + checkpoints,
            overall_score=max(0, score),
            warnings=warnings,
            errors=errors
        )
    
    # ==================== JOB DESCRIPTION VALIDATION ====================
    
    def validate_job_description(self, job_text: str) -> ValidationResult:
        """Validate job description content
        
        Args:
            job_text: Job description text
            
        Returns:
            ValidationResult with job-specific checkpoints
        """
        checkpoints = []
        errors = []
        warnings = []
        
        # First, validate as text
        text_validation = self.validate_text(job_text, "job_description")
        if not text_validation.is_valid:
            return text_validation
        
        # Additional job-specific checks
        job_lower = job_text.lower()
        
        # Check for key components
        components = {
            'company': any(keyword in job_lower for keyword in ['company', 'organization', 'employer']),
            'title': any(keyword in job_lower for keyword in ['title', 'position', 'role']),
            'requirements': any(keyword in job_lower for keyword in ['requirements', 'qualifications', 'must have']),
            'responsibilities': any(keyword in job_lower for keyword in ['responsibilities', 'duties', 'tasks']),
        }
        
        missing_components = [comp for comp, present in components.items() if not present]
        if missing_components:
            warnings.append(f"Job description possibly missing: {', '.join(missing_components)}")
        
        # Create summary checkpoint
        checkpoint = ValidationCheckpoint(
            name="Job Description Completeness",
            status=CheckpointStatus.PASSED if len(warnings) == 0 else CheckpointStatus.WARNING,
            message="Job description validation complete" if len(warnings) == 0 else f"Job has {len(warnings)} warnings",
            details={
                "components_found": components,
                "missing_components": missing_components
            }
        )
        checkpoints.append(checkpoint)
        
        # Calculate score
        score = 100.0
        if missing_components:
            score -= len(missing_components) * 15
        
        return ValidationResult(
            is_valid=True,
            checkpoints=text_validation.checkpoints + checkpoints,
            overall_score=max(0, score),
            warnings=warnings,
            errors=errors
        )


# Convenience function for quick validation
def validate_input(data: Any, validation_type: str = "text", **kwargs) -> ValidationResult:
    """Convenience function for input validation
    
    Args:
        data: Data to validate
        validation_type: Type of validation ('file', 'text', 'resume', 'job')
        **kwargs: Additional arguments for validation
        
    Returns:
        ValidationResult
    """
    agent = InputValidationAgent()
    
    if validation_type == "file":
        return agent.validate_file(
            file_path=kwargs.get('file_path'),
            file_size=kwargs.get('file_size'),
            filename=kwargs.get('filename')
        )
    elif validation_type == "text":
        return agent.validate_text(data, kwargs.get('field_name', 'text'))
    elif validation_type == "resume":
        return agent.validate_resume(data)
    elif validation_type == "job":
        return agent.validate_job_description(data)
    else:
        raise ValueError(f"Unknown validation type: {validation_type}")
