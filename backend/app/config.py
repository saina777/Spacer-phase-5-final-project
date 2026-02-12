from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    # DATABASE
    database_url: str = Field(..., env="DATABASE_URL")

    # JWT
    secret_key: str = Field(..., env="SECRET_KEY")
    algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=60)

    class Config:
        env_file = ".env"


settings = Settings()
