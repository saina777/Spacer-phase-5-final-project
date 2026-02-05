from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import timedelta

from app.database.models import Booking, Space


def create_booking(db: Session, user, data):
    space = db.query(Space).filter(Space.id == data.space_id).first()

    if not space:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Space not found"
        )

    if space.status != "AVAILABLE":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Space is not available"
        )

    duration = data.end_time - data.start_time
    if duration.total_seconds() <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid booking duration"
        )

    hours = duration.total_seconds() / 3600
    total_amount = float(space.price_per_hour) * hours

    booking = Booking(
        user_id=user.id,
        space_id=space.id,
        start_time=data.start_time,
        end_time=data.end_time,
        total_amount=total_amount,
        status="CONFIRMED"
    )

    space.status = "BOOKED"

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking


def list_user_bookings(db: Session, user):
    return db.query(Booking).filter(Booking.user_id == user.id).all()
# 
# 
# 
# 
# 






























































