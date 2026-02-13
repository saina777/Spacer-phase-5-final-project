from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from pydantic import BaseModel

from app.database.session import get_db
from app.users.schemas import UserCreate, UserUpdate, UserResponse
from app.users.service import create_user, list_users, update_user
from app.core.permissions import require_admin

router = APIRouter()


class RoleUpdate(BaseModel):
    role: str


@router.post("/", response_model=UserResponse)
def admin_create_user(data: UserCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    return create_user(db, data)


@router.get("/", response_model=list[UserResponse])
def admin_list_users(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return list_users(db)


@router.put("/{user_id}", response_model=UserResponse)
def admin_update_user(user_id: UUID, data: UserUpdate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    return update_user(db, user_id, data)


@router.delete("/{user_id}")
def admin_delete_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    from app.users.service import delete_user
    return delete_user(db, user_id)


@router.put("/{user_id}/role")
def admin_update_user_role(
    user_id: UUID,
    data: RoleUpdate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    from app.users.service import update_user_role
    return update_user_role(db, user_id, data.role)

