import random
import time

def generate_invoice_number():
    """Generates a unique invoice number."""
    timestamp = int(time.time() * 1000)
    random_part = random.randint(1000, 9999)
    return f"INV-{timestamp}-{random_part}"
