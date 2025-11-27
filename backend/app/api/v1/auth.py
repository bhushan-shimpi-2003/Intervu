from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post('/login')
def login(payload: LoginRequest):
    return {
        'message': 'Login API working',
        'email': payload.email
    }
