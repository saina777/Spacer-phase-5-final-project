from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.database.models import User
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)
def register_user(db: Session, name: str, email: str, password: str):
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    user = User(
        name=name,
        email=email,
        password_hash=hash_password(password),
        role="CLIENT"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User registered successfully"}