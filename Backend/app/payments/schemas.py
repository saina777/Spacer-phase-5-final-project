from pydantic import BaseModel
from uuid import UUID


class PaymentRequest(BaseModel):
    booking_id: UUID
    payment_method: str  # e.g. "CARD", "MPESA"


class PaymentResponse(BaseModel):
    booking_id: UUID
    amount: float
    status: str
    invoice_number: str