# Database initialization
from .database import Database

# Models registration for tables creation
from ..schemas.models import ChatInteraction

# Create a global database instance
db = Database()
