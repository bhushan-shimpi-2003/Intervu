from fastapi import FastAPI
from app.api.v1 import health, auth, sessions

app = FastAPI(title='InterVu AI Backend')

app.include_router(health.router, prefix='/api/v1/health')
app.include_router(auth.router, prefix='/api/v1/auth')
app.include_router(sessions.router, prefix='/api/v1/sessions')

@app.get('/')
def root():
    return {'message': 'InterVu AI Backend Running'}
