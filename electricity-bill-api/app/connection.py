from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

# Create a sqlite engine instance
engine = create_engine("sqlite:///electricitybills.db")

# Create a DeclarativeMeta instance
Base = declarative_base()

# Create the database
Base.metadata.create_all(engine)

# create a new database session
session = Session(bind=engine, expire_on_commit=False)