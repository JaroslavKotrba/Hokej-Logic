from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Float, Text
from typing import List, Optional
from pydantic import BaseModel

from ..database.database import Base


class ChatInteraction(Base):
    """
    Model for storing chat interactions
    """

    __tablename__ = "chat_interactions"

    id = Column(Integer, primary_key=True)
    session_id = Column(String(36), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_message = Column(Text, nullable=False)
    bot_response = Column(Text, nullable=False)
    response_time = Column(Float)
    category = Column(String(50))
    tokens_used = Column(Integer)
    error_occurred = Column(Integer, default=0)
    rating = Column(
        Integer, nullable=True
    )  # +1 for thumbs up, -1 for thumbs down, 0 not rated


# Chat Related Models (pydantic models for request/response validation)
class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str
    session_id: str = ""


class ChatResponse(BaseModel):
    response: str
    conversation_history: List[Message]
    message_id: Optional[int] = None


class ClearResponse(BaseModel):
    message: str
    status: bool


class RatingRequest(BaseModel):
    message_id: int
    rating: int  # +1 for thumbs up, -1 for thumbs down, 0 for neutral


class RatingResponse(BaseModel):
    response_message: str
    message_id: int
    rating: int
