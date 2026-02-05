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
    email: EmailStr
    role: str

    class Config:
        from_attributes = True #