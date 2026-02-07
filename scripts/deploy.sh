
#!/bin/bash

set -e

echo "🚀 Deploying AETHER GRID (Local Simulation)"
echo "------------------------------------------"

echo "🧹 Stopping existing containers (if any)..."
docker compose down || true

echo "🔨 Building and starting containers..."
docker compose up -d --build

echo "✅ Deployment complete."
echo ""
echo "🔗 Frontend: http://localhost:5173"
echo "🔗 Backend : http://localhost:8080/health"
