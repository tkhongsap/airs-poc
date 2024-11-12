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

# Create static directory if it doesn't exist
static_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static")
if not os.path.exists(static_dir):
    os.makedirs(static_dir)
    # Create an empty index.html for development
    index_path = os.path.join(static_dir, "index.html")
    if not os.path.exists(index_path):
        with open(index_path, "w") as f:
            f.write("<html><body><h1>Development Mode</h1></body></html>")
    logger.info(f"Created static directory at {static_dir}")

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

# Mount static files
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Root path handler
@app.get("/", response_class=HTMLResponse)
async def root():
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return HTMLResponse("<html><body><h1>Development Mode</h1></body></html>")

# Optional: Catch-all route for SPA routing
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    return FileResponse(os.path.join(static_dir, "index.html"))