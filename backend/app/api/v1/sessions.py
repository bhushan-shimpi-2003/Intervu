import logging

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.services.session_services import (
    QuestionIndexError,
    SessionNotFoundError,
    count_questions,
    create_session as create_session_service,
    get_question,
)

logger = logging.getLogger(__name__)
router = APIRouter()


class SessionCreate(BaseModel):
    domain: str
    role: str
    difficulty: str
    num_questions: int = Field(default=5, ge=1, le=20, alias="numQuestions")

    class Config:
        allow_population_by_field_name = True


class Question(BaseModel):
    id: str
    text: str


class SessionResponse(BaseModel):
    sessionId: str
    questions: list[Question]


@router.post("/", response_model=SessionResponse, status_code=status.HTTP_201_CREATED)
def create_session(data: SessionCreate) -> SessionResponse:
    logger.info(
        "Session create requested domain=%s role=%s difficulty=%s num_questions=%s",
        data.domain,
        data.role,
        data.difficulty,
        data.num_questions,
    )

    try:
        session_id, questions = create_session_service(
            data.domain,
            data.role,
            data.difficulty,
            data.num_questions,
        )
    except Exception:
        logger.exception("Session creation failed")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to create session. Check backend logs for details.",
        )

    logger.info("Session %s created with %s questions", session_id, len(questions))
    return SessionResponse(sessionId=session_id, questions=questions)


@router.get("/{session_id}/questions/{sequence}", response_model=Question)
def read_question(session_id: str, sequence: int) -> Question:
    if sequence < 1:
        logger.warning("Rejecting question request for session %s with invalid sequence %s", session_id, sequence)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question sequence must be 1 or greater.",
        )

    try:
        question = get_question(session_id, sequence - 1)
        logger.info("Returning question %s for session %s", question.get("id"), session_id)
        return question
    except SessionNotFoundError:
        logger.warning("Question lookup failed because session %s was not found", session_id)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found.")
    except QuestionIndexError:
        logger.warning(
            "Question lookup failed because sequence %s is outside the bounds for session %s",
            sequence,
            session_id,
        )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Question not available for that sequence.",
        )


@router.get("/{session_id}")
def session_summary(session_id: str):
    try:
        total_questions = count_questions(session_id)
        logger.info("Session %s summary requested: %s questions", session_id, total_questions)
        return {"sessionId": session_id, "totalQuestions": total_questions}
    except SessionNotFoundError:
        logger.warning("Summary lookup failed because session %s was not found", session_id)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found.")
