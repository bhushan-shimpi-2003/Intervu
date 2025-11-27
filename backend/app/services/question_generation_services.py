"""Utilities for synthesizing interview questions."""

from itertools import cycle, islice
from typing import Dict, List

ROLE_SPECIFIC_TEMPLATES: Dict[str, List[str]] = {
	"Backend Engineer": [
		"Design a {difficulty} level API in the {domain} domain that can scale to millions of users.",
		"How would you model a data store to support {role} workloads in the {domain} space?",
		"Walk me through debugging a production issue in a distributed {domain} service you own.",
	],
	"Frontend Engineer": [
		"How do you ensure accessibility for a {domain} dashboard aimed at {role}s?",
		"Describe your approach to state management for an interactive {domain} application.",
		"What patterns keep a design system maintainable as {difficulty} requirements grow?",
	],
	"DevOps Engineer": [
		"Outline a CI/CD pipeline for deploying {domain} microservices with {difficulty} compliance needs.",
		"How would you monitor and alert on critical {domain} workloads?",
		"Describe an incident where automation improved a {role} process in the {domain} domain.",
	],
	"FullStack Developer": [
		"Propose an end-to-end architecture for a {domain} feature, highlighting {role} trade-offs.",
		"How do you keep API contracts resilient when both frontend and backend evolve?",
		"What testing strategy ensures {difficulty} coverage across the stack?",
	],
}

DEFAULT_TEMPLATES = [
	"Explain a challenging project from the {domain} space and what made it {difficulty}.",
	"How would you mentor a new {role} joining the team?",
	"What metrics tell you an initiative in {domain} is succeeding?",
]

DIFFICULTY_LABELS = {
	"Easy": "Foundational",
	"Medium": "Core",
	"Hard": "Advanced",
}


def generate_questions(
	domain: str,
	role: str,
	difficulty: str,
	num_questions: int,
) -> List[Dict[str, str]]:
	"""Return a deterministic set of questions for the requested interview."""

	templates = ROLE_SPECIFIC_TEMPLATES.get(role, DEFAULT_TEMPLATES)
	difficulty_label = DIFFICULTY_LABELS.get(difficulty, difficulty.title())

	selected_templates = list(islice(cycle(templates), num_questions))

	questions: List[Dict[str, str]] = []
	for idx, template in enumerate(selected_templates, start=1):
		text = template.format(
			domain=domain,
			role=role,
			difficulty=difficulty_label,
		)
		questions.append({"id": f"q-{idx}", "text": f"[{difficulty_label}] {text}"})

	return questions
