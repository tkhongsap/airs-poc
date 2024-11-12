import logging
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint must be defined before static file mounting
@app.get("/health", response_class=JSONResponse)
async def health_check():
    return {"status": "healthy"}

# API endpoint must be defined before static file mounting
@app.get("/api", response_class=JSONResponse)
async def api_root():
    try:
        return {
            "message": "Welcome to AIRS-POC API",
            "status": "online",
            "version": settings.VERSION,
            "documentation": "/docs",
            "environment": settings.environment,
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

# Create static directory if it doesn't exist
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)
    logger.info(f"Created static directory at {static_dir}")

# Mount static files
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Serve static files from root
app.mount("/", StaticFiles(directory=static_dir, html=True), name="root")