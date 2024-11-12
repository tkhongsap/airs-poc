import logging
import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
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
static_dir = "static"
if not os.path.exists(static_dir):
    os.makedirs(static_dir)
    logger.info(f"Created static directory at {static_dir}")

# Mount static files
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/", response_class=HTMLResponse)
async def serve_spa(request: Request):
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    # If no static files, serve a nice HTML page
    html_content = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>{settings.PROJECT_NAME} API</title>
            <style>
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }}
                .container {{
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 2rem;
                    margin: 2rem;
                    max-width: 800px;
                    width: 90%;
                }}
                h1 {{
                    color: #2c3e50;
                    margin-bottom: 1rem;
                    font-size: 2.5rem;
                }}
                .status {{
                    display: inline-block;
                    background: #4CAF50;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }}
                .links {{
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin-top: 1.5rem;
                }}
                .links h2 {{
                    color: #2c3e50;
                    margin-top: 0;
                }}
                .links ul {{
                    list-style: none;
                    padding: 0;
                }}
                .links li {{
                    margin-bottom: 1rem;
                }}
                .links a {{
                    color: #3498db;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }}
                .links a:hover {{
                    color: #2980b9;
                    text-decoration: underline;
                }}
                .version {{
                    color: #7f8c8d;
                    font-size: 0.9rem;
                    margin-top: 1rem;
                }}
                .environment {{
                    display: inline-block;
                    background: #3498db;
                    color: white;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    margin-left: 1rem;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>{settings.PROJECT_NAME}</h1>
                <div class="status">API Status: Online</div>
                <span class="environment">Environment: {settings.environment}</span>
                
                <div class="links">
                    <h2>API Documentation</h2>
                    <ul>
                        <li>
                            <a href="/docs" target="_blank">Interactive API Documentation (Swagger UI)</a>
                        </li>
                        <li>
                            <a href="/redoc" target="_blank">Alternative API Documentation (ReDoc)</a>
                        </li>
                        <li>
                            <a href="{settings.API_V1_STR}/openapi.json" target="_blank">OpenAPI Specification</a>
                        </li>
                    </ul>
                </div>
                
                <p class="version">Version: {settings.VERSION}</p>
            </div>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/api")
async def root():
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

@app.get("/health")
async def health_check():
    return {"status": "healthy"}