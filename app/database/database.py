import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Base initialization
Base = declarative_base()


class Database:
    """
    Connect to the database
    """

    def __init__(self):
        # Get JAWSDB_URL from Heroku
        database_url = os.getenv("JAWSDB_URL")

        if database_url:
            # We're on Heroku, use JawsDB MySQL
            self.engine = create_engine(
                database_url,
                pool_size=3,  # Small pool (3 out of 10 connections)
                max_overflow=0,  # No overflow - strict limit
                pool_recycle=300,  # Recycle connections every 5 minutes
                pool_pre_ping=True,  # Test connections before use
                pool_timeout=10,  # Wait max 10 seconds for connection
            )
        else:
            # We're local, use SQLite
            self.engine = create_engine("sqlite:///app/database/chatbot.db")

        Base.metadata.create_all(self.engine)
        self.SessionLocal = sessionmaker(bind=self.engine)

    def get_session(self):
        session = self.SessionLocal()
        try:
            yield session
        finally:
            session.close()
