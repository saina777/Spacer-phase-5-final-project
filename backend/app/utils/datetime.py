from datetime import datetime
from typing import Optional

def format_date_for_display(dt: datetime, format_str: str = "%b %d, %Y %H:%M") -> str:
    return dt.strftime(format_str)

def get_current_utc_time() -> datetime:
    return datetime.utcnow()

def parse_iso_format(iso_str: str) -> Optional[datetime]:
    try:
        return datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None