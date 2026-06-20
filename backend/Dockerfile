FROM python:3.12-slim AS runtime

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_DEFAULT_TIMEOUT=300

COPY backend/requirements.txt /app/requirements.txt

# Install the lightweight packages first (fast, cached separately)
RUN pip install --no-cache-dir --default-timeout=300 fastapi==0.115.12 uvicorn[standard]==0.34.2 pydantic-settings==2.9.1 sqlalchemy==2.0.41 asyncpg==0.30.0 geoalchemy2==0.17.1 redis==6.1.0 python-multipart==0.0.20

# Install the heavy ML packages separately, with a longer timeout
RUN pip install --no-cache-dir --default-timeout=300 numpy==2.1.3 pandas==2.2.3 scikit-learn==1.6.1 tensorflow==2.19.0

COPY backend/app /app/app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
