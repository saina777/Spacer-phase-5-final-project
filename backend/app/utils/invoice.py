import uuid
from datetime import datetime

def generate_invoice_number() -> str:
    return f"INV-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"

def generate_invoice_pdf(invoice_data: dict) -> bytes:
    return b"PDF content placeholder"