import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = 'InterVu AI'
    ENV: str = os.getenv('ENV', 'development')

settings = Settings()
