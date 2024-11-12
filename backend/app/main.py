import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://*.railway.app",   # Railway domains
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up application...")
    logger.info(f"Environment: {settings.environment}")
    logger.info(f"Debug mode: {settings.debug}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
async def root():
    try:
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
    except Exception as e:
        logger.error(f"Error in root endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Import and include routers
# from app.api.v1.api import api_router
# app.include_router(api_router, prefix=settings.API_V1_STR)