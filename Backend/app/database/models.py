from app.database import db
import uuid
from sqlalchemy.dialects.postgresql import UUID

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = db.Column(db.String, unique=True, nullable=False)
    # Add other fields as necessary

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String, default="PENDING")
    total_amount = db.Column(db.Float, nullable=False)
    
    # Relationship
    user = db.relationship("User", backref=db.backref("bookings", lazy=True))
