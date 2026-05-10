# Idea Dump

Idea Dump is a simple app to quickly capture, organize, and revisit your ideas.

**Live app:** https://idea-dump-pro.vercel.app

---

## Why Idea Dump?

Most ideas are lost because capturing them feels slow.
Idea Dump keeps the flow lightweight:

- write fast,
- edit later,
- keep everything in one place,
- and access only your own ideas securely.

---

## What you can do

- Create an account
- Log in securely
- Add new ideas
- Edit and delete old ideas
- Open a single idea view
- Keep sessions alive with token refresh

---

## Quick start (local)

### 1) Install dependencies

```bash
cd Backend && npm install
cd ../Frontend && npm install
```

### 2) Configure env files

Create:

- `Backend/.env`
- `Frontend/.env`

Backend example:

```env
PORT=5000
MONGO_DB_URI=<your_mongodb_connection_string>
JWT_ACCESS_SECRET=<long_random_secret>
JWT_REFRESH_SECRET=<another_long_random_secret>
OPENAI_API_KEY=<optional_for_audio_experiments>
```

Frontend example:

```env
VITE_API_URL=http://localhost:5000
```

### 3) Run backend

```bash
cd Backend
npm run dev
```

### 4) Run frontend

```bash
cd Frontend
npm run dev
```

Open the Vite URL shown in terminal (usually `http://localhost:5173`).

---

## Product + system snapshot

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JWT access + refresh token flow
- Validation: celebrate/Joi

Your idea records are tied to your user ID, so users can only operate on their own data.

---

## API (high-level)

Base local API URL: `http://localhost:5000`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

### Ideas (protected)
- `GET /ideas`
- `GET /ideas/:id`
- `POST /ideas`
- `POST /ideas/bulk`
- `PUT /ideas/:id`
- `DELETE /ideas/:id`

### Utility / extra
- `GET /health`
- `POST /audio` (currently scaffolded)

---

## Scripts

### Backend
- `npm run dev` — nodemon
- `npm run start` — node

### Frontend
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — lint checks

---

## Current status

This project is actively evolving.

Near-term improvements:

1. Add automated tests (API + frontend).
2. Standardize error responses and logging.
3. Add auth hardening (rate limiting, security headers).
4. Complete audio transcription pipeline.
5. Add CI checks for lint/test/build.

---

Built as a learning-first full-stack project, with product simplicity as the top priority.
