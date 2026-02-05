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

    class Config:
        from_attributes = True