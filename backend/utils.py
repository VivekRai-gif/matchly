"""Utility Functions for Backend Services

Common helper functions used across the application.
"""

import logging
import os
import time
from functools import wraps
from typing import Any, Callable, Dict, Optional
from flask import jsonify, request

logger = logging.getLogger(__name__)


def allowed_file(filename: str, allowed_extensions: set) -> bool:
    """Check if file extension is allowed.
    
    Args:
        filename: Name of the file
        allowed_extensions: Set of allowed file extensions
        
    Returns:
        True if file extension is allowed, False otherwise
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions


def validate_file_size(file_size: int, max_size: int) -> bool:
    """Validate file size against maximum allowed size.
    
    Args:
        file_size: Size of file in bytes
        max_size: Maximum allowed size in bytes
        
    Returns:
        True if file size is within limit, False otherwise
    """
    return 0 < file_size <= max_size


def sanitize_filename(filename: str) -> str:
    """Sanitize filename by removing potentially dangerous characters.
    
    Args:
        filename: Original filename
        
    Returns:
        Sanitized filename
    """
    # Remove path components
    filename = os.path.basename(filename)
    # Remove special characters except dot, underscore, and hyphen
    filename = ''.join(c for c in filename if c.isalnum() or c in '._-')
    return filename


def create_error_response(message: str, status_code: int = 400, **kwargs) -> tuple:
    """Create standardized error response.
    
    Args:
        message: Error message
        status_code: HTTP status code
        **kwargs: Additional fields to include in response
        
    Returns:
        Tuple of (response, status_code)
    """
    response = {
        'success': False,
        'error': message,
        **kwargs
    }
    return jsonify(response), status_code


def create_success_response(data: Any, message: Optional[str] = None, **kwargs) -> tuple:
    """Create standardized success response.
    
    Args:
        data: Response data
        message: Optional success message
        **kwargs: Additional fields to include in response
        
    Returns:
        Tuple of (response, status_code)
    """
    response = {
        'success': True,
        **kwargs
    }
    
    if message:
        response['message'] = message
    
    if isinstance(data, dict):
        response.update(data)
    else:
        response['data'] = data
    
    return jsonify(response), 200


def log_request(func: Callable) -> Callable:
    """Decorator to log API requests.
    
    Args:
        func: Function to decorate
        
    Returns:
        Decorated function
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        
        logger.info(f"Request: {request.method} {request.path}")
        logger.debug(f"Headers: {dict(request.headers)}")
        
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            logger.info(f"Response: {request.path} completed in {duration:.2f}s")
            return result
        except Exception as e:
            duration = time.time() - start_time
            logger.error(f"Error in {request.path} after {duration:.2f}s: {str(e)}")
            raise
    
    return wrapper


def handle_exceptions(func: Callable) -> Callable:
    """Decorator to handle exceptions in API endpoints.
    
    Args:
        func: Function to decorate
        
    Returns:
        Decorated function
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValueError as e:
            return create_error_response(str(e), 400)
        except FileNotFoundError as e:
            return create_error_response(f"File not found: {str(e)}", 404)
        except PermissionError as e:
            return create_error_response(f"Permission denied: {str(e)}", 403)
        except Exception as e:
            logger.exception(f"Unexpected error in {func.__name__}")
            return create_error_response(
                "An unexpected error occurred. Please try again later.",
                500,
                error_type=type(e).__name__
            )
    
    return wrapper


def truncate_text(text: str, max_length: int, suffix: str = "...") -> str:
    """Truncate text to specified maximum length.
    
    Args:
        text: Text to truncate
        max_length: Maximum length
        suffix: Suffix to append when truncated
        
    Returns:
        Truncated text
    """
    if len(text) <= max_length:
        return text
    
    return text[:max_length - len(suffix)] + suffix


def parse_json_safe(text: str, default: Any = None) -> Any:
    """Safely parse JSON string.
    
    Args:
        text: JSON string to parse
        default: Default value if parsing fails
        
    Returns:
        Parsed JSON or default value
    """
    import json
    try:
        return json.loads(text)
    except (json.JSONDecodeError, TypeError) as e:
        logger.warning(f"Failed to parse JSON: {e}")
        return default


def batch_process(items: list, batch_size: int = 10) -> list:
    """Split items into batches for processing.
    
    Args:
        items: List of items to batch
        batch_size: Size of each batch
        
    Returns:
        List of batches
    """
    return [items[i:i + batch_size] for i in range(0, len(items), batch_size)]
