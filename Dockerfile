# Frontend build stage
FROM node:16 AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend build stage
FROM python:3.11-slim
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy backend files
COPY backend/pyproject.toml backend/poetry.lock* ./
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy backend code
COPY backend/ .

# Copy built frontend files to backend static directory
COPY --from=frontend-build /frontend/build ./static

# Create start script
RUN echo '#!/bin/bash\n\
PORT="${PORT:-8000}"\n\
poetry run uvicorn app.main:app --host 0.0.0.0 --port $PORT\n'\
> ./start.sh && chmod +x ./start.sh

# Expose port
EXPOSE 8000

# Start the application
CMD ["./start.sh"] 