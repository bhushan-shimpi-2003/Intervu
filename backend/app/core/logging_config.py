"""Central logging configuration for the backend service."""

from __future__ import annotations

import logging
from logging.config import dictConfig
from pathlib import Path

LOG_DIR_NAME = "logs"


def configure_logging(log_dir: str | None = None) -> Path:
    """Configure both console and file logging, returning the file directory."""

    target_dir = Path(log_dir) if log_dir else Path(__file__).resolve().parents[2] / LOG_DIR_NAME
    target_dir.mkdir(parents=True, exist_ok=True)

    log_file = target_dir / "backend.log"

    dictConfig(
        {
            "version": 1,
            "disable_existing_loggers": False,
            "formatters": {
                "standard": {
                    "format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s",
                }
            },
            "handlers": {
                "console": {
                    "class": "logging.StreamHandler",
                    "formatter": "standard",
                    "level": "INFO",
                },
                "file": {
                    "class": "logging.handlers.RotatingFileHandler",
                    "formatter": "standard",
                    "level": "INFO",
                    "filename": str(log_file),
                    "maxBytes": 1_000_000,
                    "backupCount": 5,
                    "encoding": "utf-8",
                },
            },
            "root": {
                "level": "INFO",
                "handlers": ["console", "file"],
            },
        }
    )

    logging.getLogger(__name__).info("Logging initialized. Writing to %s", log_file)
    return target_dir
