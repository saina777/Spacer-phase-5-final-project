from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from uuid import UUID

from app.database.models import Space


def create_space(db: Session, data):
    space = Space(**data.dict())
    db.add(space)
    db.commit()
    db.refresh(space)
    return space


def list_available_spaces(db: Session):
    return db.query(Space).filter(Space.status == "AVAILABLE").all()


def get_space_by_id(db: Session, space_id: UUID):
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Space not found"
        )
    return space


def update_space(db: Session, space_id: UUID, data):
    space = get_space_by_id(db, space_id)

    for key, value in data.dict(exclude_unset=True).items():
        setattr(space, key, value)

    db.commit()
    db.refresh(space)
    return space