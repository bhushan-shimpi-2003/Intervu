from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import health, auth, sessions
from app.core.config import settings
from app.core.logging_config import configure_logging

configure_logging()

app = FastAPI(title='InterVu AI Backend')

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=settings.CORS_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(health.router, prefix='/api/v1/health')
app.include_router(auth.router, prefix='/api/v1/auth')
app.include_router(sessions.router, prefix='/api/v1/sessions')

@app.get('/')
def root():
    return {'message': 'InterVu AI Backend Running'}
