from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.session import get_db
from app.bookings.schemas import BookingCreate, BookingResponse
from app.bookings.service import (
    create_booking, 
    list_user_bookings,
    update_booking_status,
    cancel_booking,
    delete_booking
)
from app.core.dependencies import get_current_user
from app.core.permissions import require_admin

router = APIRouter()


@router.post(
    "/",
    response_model=BookingResponse
)
def book_space(
    data: BookingCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return create_booking(db, user, data)

@router.get(
    "/me",
    response_model=list[BookingResponse]
)
def my_bookings(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return list_user_bookings(db, user)

@router.put("/{booking_id}")
def update_booking(
    booking_id: UUID,
    status: str,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    return update_booking_status(db, booking_id, status)


@router.post("/{booking_id}/cancel")
def cancel_user_booking(
    booking_id: UUID,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return cancel_booking(db, booking_id)


@router.delete("/{booking_id}")
def delete_user_booking(
    booking_id: UUID,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    return delete_booking(db, booking_id)