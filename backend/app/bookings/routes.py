from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.bookings.schemas import BookingCreate, BookingResponse
from app.bookings.service import create_booking, list_user_bookings
from app.core.dependencies import get_current_user

router = APIRouter()