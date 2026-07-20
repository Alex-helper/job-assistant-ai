FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PUBLIC_MODE=1 \
    ENABLE_RUN_CODE=0

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p static data
COPY server.py .
COPY static ./static
COPY data/.gitkeep ./data/.gitkeep

# Render 注入 PORT；本地可 docker run -e PORT=8765
EXPOSE 10000
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port ${PORT:-10000}"]
