# AETHER GRID  
### A premium control surface for production backend systems

AETHER GRID is a Dockerized backend–frontend system designed to validate, observe, and interact with production-ready backend services.

The project emphasizes **operational clarity, deployment confidence, and DevOps discipline** over surface-level features. It reflects how real systems are built, verified, and deployed in professional environments.

---

## 🧠 Design Philosophy

In production environments, trust in a system comes from:
- Predictable deployments
- Consistent runtime behavior
- Clear service reachability

AETHER GRID focuses on **direct operational signals** instead of abstract dashboards.  
The interface exposes service availability and controlled interaction in a calm, intentional way—mirroring how backend systems are validated after deployment.

---

## 🏗️ System Architecture

┌─────────────┐
│   Browser   │
│  (Frontend) │
└──────┬──────┘
│ HTTP
▼
┌──────────────────┐
│  AETHER GRID UI  │
│  (React + Vite)  │
│  Dockerized      │
└──────┬───────────┘
│ API Calls
▼
┌──────────────────┐
│  Flask Backend   │
│  Gunicorn (WSGI) │
│  Non-root User   │
│  Dockerized      │
└──────┬───────────┘
│
▼
┌──────────────────┐
│ Docker Compose   │
│ Service Network  │
└──────┬───────────┘
│
▼
┌──────────────────┐
│  Linux Host / VM │
│  (Local / CI)    │
└──────────────────┘

---

## ⚙️ Technology Stack

**Frontend**
- React (Vite)
- Premium UI with animated transitions
- Service health visibility

**Backend**
- Flask REST API
- Gunicorn WSGI server
- Non-root container execution

**DevOps**
- Docker (separate frontend & backend images)
- Docker Compose (service orchestration)
- GitHub Actions (CI)
- Scripted local CD simulation

---

## 🔁 CI/CD Workflow

### Continuous Integration (CI)
- Triggered on every push to `main`
- Builds backend Docker image
- Builds frontend Docker image
- Validates Docker Compose configuration
- Fails fast if any build or config breaks

### Continuous Deployment (Local Simulation)
- Scripted deployment using `scripts/deploy.sh`
- Stops existing containers
- Rebuilds images
- Deploys full stack using Docker Compose
- Mirrors VM-style deployment flow without cloud dependency

---

## 🚀 Local Deployment

### Deploy the full stack
```bash
./scripts/deploy.sh

Access services
	•	Frontend: http://localhost:5173
	•	Backend health: http://localhost:8080/health

Stop services
docker compose down
🎯 Why This Project Matters

This repository demonstrates how real backend services are:
	•	Containerized securely
	•	Orchestrated predictably
	•	Validated automatically via CI
	•	Deployed consistently via CD

It prioritizes engineering maturity over demos, making it suitable for production-minded DevOps and cloud roles.

⸻

👨‍💻 Author

Engineered & operated by Aniket Palsodkar
Cloud • DevOps • Production Systems
