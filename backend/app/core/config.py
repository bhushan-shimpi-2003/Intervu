import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = 'InterVu AI'
    ENV: str = os.getenv('ENV', 'development')
    _default_origins = 'http://localhost:5173,http://127.0.0.1:5173'
    CORS_ORIGINS: list[str] = [
        origin.strip()
        for origin in os.getenv('CORS_ORIGINS', _default_origins).split(',')
        if origin.strip()
    ]
    CORS_ORIGIN_REGEX: str | None = os.getenv('CORS_ORIGIN_REGEX', r"http://(localhost|127\.0\.0\.1):\d+")

settings = Settings()
