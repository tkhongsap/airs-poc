# Use Python 3.11
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy only the poetry files first
COPY backend/pyproject.toml backend/poetry.lock* ./

# Install dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Copy the rest of the backend application
COPY backend/ .

# Expose port
EXPOSE 8000

# Create start script
RUN echo '#!/bin/bash\n\
PORT="${PORT:-8000}"\n\
poetry run uvicorn app.main:app --host 0.0.0.0 --port $PORT\n'\
> ./start.sh && chmod +x ./start.sh

# Start the application
CMD ["./start.sh"] 