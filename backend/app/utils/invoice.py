import uuid
from datetime import datetime

def generate_invoice_number() -> str:
    """
    Generates a unique invoice number starting with 'INV-', followed by the current date
    and a short random hex string.
    
    Returns:
        str: A unique invoice identifier.
    """
    return f"INV-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"

def generate_invoice_pdf(invoice_data: dict) -> bytes:
    """
    Placeholder for PDF generation logic.
    In a real implementation, this would use a library like ReportLab or WeasyPrint.
    
    Args:
        invoice_data (dict): Data to be included in the invoice.
        
    Returns:
        bytes: The generated PDF content as bytes.
    """
   
    return b"PDF content placeholder"