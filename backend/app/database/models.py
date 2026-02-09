from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey, TypeDecorator, CHAR
from sqlalchemy.dialects.postgresql import UUID as pgUUID
from datetime import datetime
import uuid

from app.database.base import Base

class GUID(TypeDecorator):
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(pgUUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value).int
            else:
                return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                value = uuid.UUID(value)
            return value

class User(Base):
    __tablename__ = "users"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="CLIENT")
    created_at = Column(DateTime, default=datetime.utcnow)


class Space(Base):
    __tablename__ = "spaces"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String)
    location = Column(String)
    price_per_hour = Column(Numeric, nullable=False)
    price_per_day = Column(Numeric, nullable=False)
    status = Column(String, default="AVAILABLE")
    created_at = Column(DateTime, default=datetime.utcnow)


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    user_id = Column(GUID(), ForeignKey("users.id"))
    space_id = Column(GUID(), ForeignKey("spaces.id"))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    total_amount = Column(Numeric)
    status = Column(String, default="PENDING")
    created_at = Column(DateTime, default=datetime.utcnow)