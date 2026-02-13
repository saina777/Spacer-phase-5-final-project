from pydantic import BaseModel
from uuid import UUID
from decimal import Decimal


class SpaceCreate(BaseModel):
    title: str
    description: str
    location: str
    price_per_hour: Decimal
    price_per_day: Decimal


class SpaceUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    location: str | None = None
    price_per_hour: Decimal | None = None
    price_per_day: Decimal | None = None
    status: str | None = None


class SpaceResponse(BaseModel):
    id: UUID
    title: str
    description: str
    location: str
    price_per_hour: Decimal
    price_per_day: Decimal
    status: str
    # Frontend-compatible alias fields
    name: str = None
    price: float = None
    priceUnit: str = "hour"
    category: str = "coworking"
    capacity: int = None
    featured: bool = False
    rating: float = 0.0
    reviews: int = 0

    class Config:
        from_attributes = True
    
    def __init__(self, **data):
        # Map backend fields to frontend-compatible fields
        if 'title' in data and data['title']:
            data['name'] = data['title']
        if 'price_per_hour' in data and data['price_per_hour']:
            data['price'] = float(data['price_per_hour'])
        if 'price_per_day' in data and data['price_per_day']:
            data['priceUnit'] = "day"
        super().__init__(**data)
