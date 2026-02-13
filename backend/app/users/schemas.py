from pydantic import BaseModel, EmailStr
from uuid import UUID


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = "CLIENT"


class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    role: str | None = None


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: str
    role: str
    # Frontend-compatible alias fields
    totalBookings: int = 0
    totalSpent: float = 0.0
    
    class Config:
        from_attributes = True
    
    def __init__(self, **data):
        # Map backend role to frontend-compatible lowercase role
        if 'role' in data and data['role']:
            data['role'] = data['role'].lower()
        super().__init__(**data)
