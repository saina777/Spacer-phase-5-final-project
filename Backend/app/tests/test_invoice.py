import re
from app.utils.invoice import generate_invoice_number

def test_generate_invoice_number_format():
    invoice_num = generate_invoice_number()
    assert invoice_num.startswith("INV-")
    # Pattern: INV-<digits>-<4 digits>
    pattern = r"INV-\d+-\d{4}"
    assert re.match(pattern, invoice_num)

def test_generate_invoice_number_uniqueness():
    invoice1 = generate_invoice_number()
    invoice2 = generate_invoice_number()
    assert invoice1 != invoice2
