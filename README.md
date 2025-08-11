# DevOps MegaShop - Starter Project
A minimal, hands-on starter project to learn Docker, Jenkins, GitHub, and Kubernetes.

## Contents
- `backend/` - Node.js + Express API (products)
- `frontend/` - Simple static frontend (HTML + JS) served by nginx
- `docker-compose.yml` - Run locally with Docker Compose (backend, frontend, mongo)
- `Jenkinsfile` - Simple declarative pipeline (example)
- `k8s/` - Kubernetes manifests for Deployments, Services, and Ingress
- `README.md` - this file

## Quick start (local, Docker Compose)
1. Install Docker & Docker Compose.
2. From the repo root run:
   ```
   docker-compose up --build
   ```
3. Backend API: http://localhost:5000/api/products
   Frontend: http://localhost:8080

## Notes
- The Jenkinsfile contains placeholders for Docker Hub and Kubernetes credentials.
- For Kubernetes, you can use Minikube or Docker Desktop Kubernetes.
- This project is intentionally minimal so you can expand each piece while learning.
