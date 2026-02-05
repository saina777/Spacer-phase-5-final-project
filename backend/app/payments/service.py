from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.database.models import Booking
from app.utils.invoice import generate_invoice_number


def process_payment(db: Session, user, booking_id):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == user.id
    ).first()

    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )

    if booking.status == "PAID":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already paid"
        )

    invoice_number = generate_invoice_number()

    booking.status = "PAID"

    db.commit()

    return {
        "booking_id": booking.id,
        "amount": float(booking.total_amount),
        "status": "PAID",
        "invoice_number": invoice_number
    }