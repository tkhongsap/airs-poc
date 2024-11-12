from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to AIRS-POC API",
        "status": "online",
        "version": settings.VERSION,
        "documentation": "/docs",
        "environment": "development",
        "api_routes": {
            "api_v1": settings.API_V1_STR,
            "docs": "/docs",
            "redoc": "/redoc",
            "openapi": f"{settings.API_V1_STR}/openapi.json"
        }
    }

# Import and include routers
# from app.api.v1.api import api_router
# app.include_router(api_router, prefix=settings.API_V1_STR) 