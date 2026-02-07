# Base image: python:3.11-slim for a smaller footprint
FROM python:3.11-slim

# Set environment variables to prevent Python from writing pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory to /app
WORKDIR /app

# Create a non-root user to run the application (security best practice)
RUN adduser --disabled-password --gecos '' appuser

# Copy requirements file first to leverage Docker cache for dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Change ownership of the application files to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Expose port 8080 for the application
EXPOSE 8080

# Run the application using Gunicorn binding to all interfaces on port 8080
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--workers", "2", "--threads", "4", "run:app"]
