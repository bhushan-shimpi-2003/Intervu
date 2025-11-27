"""Session orchestration helpers."""

from typing import Dict, List, Tuple
from uuid import uuid4

from app.services.question_generation_services import generate_questions


class SessionNotFoundError(Exception):
	"""Raised when a session identifier cannot be located."""


class QuestionIndexError(Exception):
	"""Raised when a requested question index is outside the session bounds."""


_SESSION_STORE: Dict[str, List[Dict[str, str]]] = {}


def create_session(
	domain: str,
	role: str,
	difficulty: str,
	num_questions: int,
) -> Tuple[str, List[Dict[str, str]]]:
	"""Create a session, persist its questions, and return its data."""

	session_id = str(uuid4())
	questions = generate_questions(domain, role, difficulty, num_questions)
	_SESSION_STORE[session_id] = questions
	return session_id, questions


def get_question(session_id: str, position: int) -> Dict[str, str]:
	"""Return a single question for the given session."""

	questions = _SESSION_STORE.get(session_id)
	if questions is None:
		raise SessionNotFoundError(session_id)

	if position < 0 or position >= len(questions):
		raise QuestionIndexError(position)

	return questions[position]


def count_questions(session_id: str) -> int:
	"""Expose the number of questions stored for a session."""

	questions = _SESSION_STORE.get(session_id)
	if questions is None:
		raise SessionNotFoundError(session_id)

	return len(questions)
