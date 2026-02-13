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
    # Frontend-compatible alias fields
    spaceId: UUID = None
    userId: UUID = None
    startTime: datetime = None
    endTime: datetime = None
    totalPrice: float = None
    date: str = None
    
    class Config:
        from_attributes = True
    
    def __init__(self, **data):
        # Map backend fields to frontend-compatible fields
        if 'space_id' in data and data['space_id']:
            data['spaceId'] = data['space_id']
        if 'user_id' in data and data['user_id']:
            data['userId'] = data['user_id']
        if 'start_time' in data and data['start_time']:
            data['startTime'] = data['start_time']
            # Extract date from start_time for frontend
            data['date'] = data['start_time'].strftime('%Y-%m-%d') if hasattr(data['start_time'], 'strftime') else str(data['start_time'])
        if 'end_time' in data and data['end_time']:
            data['endTime'] = data['end_time']
        if 'total_amount' in data and data['total_amount']:
            data['totalPrice'] = float(data['total_amount'])
        super().__init__(**data)

