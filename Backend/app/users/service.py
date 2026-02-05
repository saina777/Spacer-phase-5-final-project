from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from uuid import UUID

from app.database.models import User
from app.core.security import hash_password
from app.users.schemas import UserCreate, UserUpdate  # <--- THIS WAS MISSING


def create_user(db: Session, data: UserCreate):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    user = User(
        name=data.name,
        email=data.email,
        role=data.role,
        password_hash=hash_password(data.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def list_users(db: Session):
    return db.query(User).all()


def update_user(db: Session, user_id: UUID, data: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user