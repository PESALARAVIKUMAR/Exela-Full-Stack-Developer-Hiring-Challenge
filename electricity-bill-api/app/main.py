from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware

from app_router import app_router

# Initialize FastAPI application
app = FastAPI()

# Attach the application router
app.include_router(app_router, prefix="/api")

# Attach all configured middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "*"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "DELETE", "UPDATE"],
    allow_headers=["*"],
)