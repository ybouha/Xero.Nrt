#!/usr/bin/env bash
# Starts the Dockerized Postgres DB, waits for it to be ready, then builds
# and starts Xero.WebApi (background) and the Angular dev server (foreground).
#
# Run from the solution root:  ./start.sh
# Stop everything with Ctrl+C (also stops the API in the background).

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$ROOT/Xero.WebApi"
WEB_DIR="$ROOT/Xero.WebApp"

step() { printf "\n==> %s\n" "$1"; }

kill_by_port() {
    local port="$1"
    local pids
    pids=$(lsof -ti tcp:"$port" 2>/dev/null || true)
    if [ -n "$pids" ]; then
        echo "  Killing PID(s) $pids (port $port)"
        kill -9 $pids 2>/dev/null || true
    fi
}

API_PID=""
cleanup() {
    if [ -n "$API_PID" ]; then
        echo ""
        step "Stopping API (PID $API_PID)"
        kill "$API_PID" 2>/dev/null || true
    fi
}
trap cleanup EXIT INT TERM

# ── Step 1 : Start Docker Postgres ─────────────────────────────────────────────

step "Starting Docker Postgres (docker compose up -d)"
(cd "$ROOT" && docker compose up -d)

# ── Step 2 : Wait for Postgres to be ready ────────────────────────────────────

step "Waiting for Postgres to become healthy"

ready=false
for _ in $(seq 1 30); do
    if docker exec xero-postgres pg_isready -U postgres -d Xero >/dev/null 2>&1; then
        ready=true
        break
    fi
    sleep 1
done

if [ "$ready" != true ]; then
    echo "Postgres did not become ready in time - aborting."
    exit 1
fi

echo "  Postgres is ready."

# ── Step 3 : Kill existing app processes ──────────────────────────────────────

step "Stopping existing processes"

kill_by_port 60513   # API  http
kill_by_port 60512   # API  https
kill_by_port 4200    # Angular

sleep 2

# ── Step 4 : Rebuild API ───────────────────────────────────────────────────────

step "Building Xero.WebApi"
dotnet build "$API_DIR/Xero.WebApi.csproj" --configuration Debug

# ── Step 5 : Start API (background) ───────────────────────────────────────────

step "Starting Xero.WebApi  ->  http://localhost:60513"

(cd "$API_DIR" && ASPNETCORE_ENVIRONMENT=Development dotnet run --no-build --configuration Debug) &
API_PID=$!

sleep 2

# ── Step 6 : Start Angular (foreground) ───────────────────────────────────────

step "Starting Angular dev server  ->  http://localhost:4200"
echo "  DB   -> localhost:5433 (container xero-postgres)"
echo "  API  -> http://localhost:60513  (Swagger at root)"
echo "  Web  -> http://localhost:4200"
echo ""

cd "$WEB_DIR" && npm start
