#!/usr/bin/env bash
# Stops Xero.WebApi, the Angular dev server, and the Dockerized Postgres DB.
#
# Run from the solution root:  ./stop-all.sh

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

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

# ── Step 1 : Stop API and Angular ──────────────────────────────────────────────

step "Stopping Xero.WebApi and Angular dev server"

kill_by_port 60513   # API  http
kill_by_port 60512   # API  https
kill_by_port 4200    # Angular

# ── Step 2 : Stop Docker Postgres ──────────────────────────────────────────────

step "Stopping Docker Postgres (docker compose stop)"

(cd "$ROOT" && docker compose stop)

echo -e "\nDone. Postgres, API, and Angular are all stopped."
