from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SessionCreate(BaseModel):
    domain: str
    role: str
    difficulty: str
    num_questions: int

@router.post('/')
def create_session(data: SessionCreate):
    return {
        'message': 'Session created',
        'data': data
    }
