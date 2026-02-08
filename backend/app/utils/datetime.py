from datetime import datetime
from typing import Optional

def format_date_for_display(dt: datetime, format_str: str = "%b %d, %Y %H:%M") -> str:
    """
    Formats a datetime object into a human-readable string.
    
    Args:
        dt (datetime): The datetime to format.
        format_str (str): The strftime format string.
        
    Returns:
        str: Formatted date string.
    """
    return dt.strftime(format_str)

def get_current_utc_time() -> datetime:
    """
    Returns the current UTC time.
    
    Returns:
        datetime: Current datetime in UTC.
    """
    return datetime.utcnow()

def parse_iso_format(iso_str: str) -> Optional[datetime]:
    """
    Parses an ISO format string into a datetime object.
    
    Args:
        iso_str (str): The ISO 8601 string.
        
    Returns:
        Optional[datetime]: The parsed datetime or None if parsing fails.
    """
    try:
        return datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None