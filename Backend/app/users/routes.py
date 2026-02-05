from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.session import SessionLocal
from app.users.schemas import UserCreate, UserUpdate, UserResponse
from app.users.service import create_user, list_users, update_user
from app.core.permissions import require_admin

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=UserResponse)
def admin_create_user(data: UserCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    return create_user(db, data)


@router.get("/", response_model=list[UserResponse])
def admin_list_users(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return list_users(db)


@router.put("/{user_id}", response_model=UserResponse)
def admin_update_user(user_id: UUID, data: UserUpdate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    return update_user(db, user_id, data)