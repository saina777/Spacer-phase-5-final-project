from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class BookingCreate(BaseModel):
    space_id: UUID
    start_time: datetime
    end_time: datetime


class BookingResponse(BaseModel):
    id: UUID
    space_id: UUID
    user_id: UUID
    start_time: datetime
    end_time: datetime
    total_amount: float
    status: str

    class Config:
        from_attributes = True




# 



