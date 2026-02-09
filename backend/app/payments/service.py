import logging
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Dict, Any

from app.database.models import Booking
from app.utils.invoice import generate_invoice_number

logger = logging.getLogger(__name__)

def process_payment(db: Session, user: Any, booking_id: int) -> Dict[str, Any]:
    logger.info(f"Processing payment for booking_id: {booking_id} by user_id: {user.id}")

    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == user.id
    ).first()

    if not booking:
        logger.warning(f"Booking {booking_id} not found for user {user.id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found or you don't have permission to pay for it"
        )

    if booking.status == "PAID":
        logger.info(f"Booking {booking_id} is already marked as PAID")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already paid"
        )
    
    if booking.status == "CANCELLED":
        logger.warning(f"Attempted to pay for cancelled booking {booking_id}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot pay for a cancelled booking"
        )

    try:
        invoice_number = generate_invoice_number()
        booking.status = "PAID"
        
        db.commit()
        db.refresh(booking)
        
        logger.info(f"Payment successful for booking {booking_id}. Invoice: {invoice_number}")

        return {
            "booking_id": booking.id,
            "amount": float(booking.total_amount),
            "status": "PAID",
            "invoice_number": invoice_number
        }
    except Exception as e:
        db.rollback()
        logger.error(f"Error occurred while processing payment for booking {booking_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your payment"
        )
