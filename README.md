# Cupcake App (Open-source example)
This repository is a **minimal, runnable** open-source example for the Cupcake Gourmet mobile/web app used in the PIT assignment.
It includes a React frontend (Vite) and a Node.js Express backend with a small JSON "database" to run locally.

**Structure**
- frontend/    -> React + Vite frontend (minimal)
- backend/     -> Node.js + Express backend (mock API)
- README.md

## Requirements
- Node.js 18+ and npm
- (Optional) pnpm or yarn

## How to run locally

### Backend
```bash
cd backend
npm install
npm run dev
```
This starts the API on http://localhost:4000

### Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
This starts the frontend on http://localhost:5173

## Notes
- This is a minimal starter repo. Replace mock data and local JSON with real DB (Firebase, Postgres, etc.) before production.
- Add environment variables and authentication for security.

