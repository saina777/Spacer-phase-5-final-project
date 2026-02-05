from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID

from app.database.session import SessionLocal
from app.spaces.schemas import (
    SpaceCreate,
    SpaceUpdate,
    SpaceResponse
)
from app.spaces.service import (
    create_space,
    list_available_spaces,
    get_space_by_id,
    update_space
)
from app.core.permissions import require_admin

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ADMIN — Create space
@router.post(
    "/",
    response_model=SpaceResponse
)
def admin_create_space(
    data: SpaceCreate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    return create_space(db, data)


# PUBLIC — List available spaces
@router.get(
    "/",
    response_model=list[SpaceResponse]
)
def public_list_spaces(
    db: Session = Depends(get_db)
):
    return list_available_spaces(db)


#  PUBLIC — Space details
@router.get(
    "/{space_id}",
    response_model=SpaceResponse
)
def public_space_detail(
    space_id: UUID,
    db: Session = Depends(get_db)
):
    return get_space_by_id(db, space_id)


#  ADMIN — Update space
@router.put(
    "/{space_id}",
    response_model=SpaceResponse
)
def admin_update_space(
    space_id: UUID,
    data: SpaceUpdate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin)
):
    return update_space(db, space_id, data)