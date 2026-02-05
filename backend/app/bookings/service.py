from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from datetime import timedelta

from app.database.models import Booking, Space
