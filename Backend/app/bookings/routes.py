from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.bookings.schemas import BookingCreate, BookingResponse
from app.bookings.service import create_booking, list_user_bookings
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
     response_model=BookingResponse
    )
def book_space(
    data: BookingCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
 ):
     return create_booking(db, user, data)###


@router.get(
     "/me",
     response_model=list[BookingResponse]
 )
def my_bookings(
     db: Session = Depends(get_db),
     user=Depends(get_current_user)
 ):
     return list_user_bookings(db, user)