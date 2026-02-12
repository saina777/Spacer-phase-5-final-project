from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from app.config import settings

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# bcrypt allows max 72 bytes
def hash_password(password: str) -> str:
    safe_password = password[:72]
    return pwd_context.hash(safe_password)

def verify_password(password: str, hashed: str) -> bool:
    safe_password = password[:72]
    return pwd_context.verify(safe_password, hashed)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        settings.secret_key,
        algorithm=settings.algorithm
    )
