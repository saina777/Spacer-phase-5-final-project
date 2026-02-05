from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.payments.schemas import PaymentRequest, PaymentResponse
from app.payments.service import process_payment
from app.core.dependencies import get_current_user

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=PaymentResponse
)
def pay_for_booking(
    data: PaymentRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return process_payment(
        db=db,
        user=user,
        booking_id=data.booking_id
    )