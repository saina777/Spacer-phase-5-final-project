# Spacer — Book Unique Spaces for Meetings, Creation & Celebrations

Spacer is a platform that brings people together to **meet**, **create**, and **celebrate** by making it easy to find and book unique spaces by the hour or day. Space owners can list spaces, and clients can browse, authenticate (local/social), book, and receive simulated billing/invoicing.

---

## Table of Contents
- [Problem](#problem)
- [Solution](#solution)
- [MVP Features](#mvp-features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Docs](#api-docs)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

---

## Problem
Communities and teams often struggle to find welcoming, flexible spaces to gather around shared passions—whether for collaboration, events, workshops, or milestone celebrations.

## Solution
Spacer provides:
- An online marketplace to **discover and book spaces**
- Tools for owners/admins to **list and manage spaces**
- Booking flows for clients with **duration-based pricing**
- Booking status updates to prevent double-booking
- An agreement/incubator workflow and **simulated payments** (billing + invoicing)

---

## MVP Features

### Admin Module
- Add spaces
- View and edit spaces (with full space details)
- Add users by roles and permissions
- View all users

### Client Module
- View available spaces
- View space details
- Authentication
  - Local auth
  - Social auth (optional / configurable)
- Book a space
  - Specify duration
  - Total amount auto-calculated based on duration
  - Booking status changes to unavailable until released/updated
- Agreement incubator
- Simulated payment flow (billing and invoicing)

---

## Tech Stack
**Backend**
- Python (Flask or FastAPI)
- JWT Authentication
- PostgreSQL

**Frontend**
- ReactJS
- Redux Toolkit (state management)

**Testing**
- Frontend: Jest
- Backend: Python unit tests (e.g., `pytest` or `unittest`)

**Design**
- Figma wireframes (mobile-friendly)

---

## Repository Structure

spacer/
backend/
app/
core/
database/
auth/
payments/
utils/
tests/
requirements.txt
.env.example
frontend/
src/
public/
package.json
.env.example
README.md


---

## Getting Started

### Prerequisites
Make sure you have installed:
- **Python 3.10+**
- **Node.js 18+** and npm
- **PostgreSQL 14+**
- (Optional) **Git** + **pipenv/venv**

---

## Environment Variables

### Backend `.env`
Create a file at `backend/.env` (you can copy from `backend/.env.example`):

```bash
# Backend
APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/spacer_db
# or split config:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=spacer_db
DB_USER=postgres
DB_PASSWORD=postgres

# Auth
JWT_SECRET=change_me
JWT_ALGORITHM=HS256
JWT_EXPIRES_IN_MINUTES=60

# Social Auth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OAUTH_REDIRECT_URL=http://localhost:3000/auth/callback

# Payments (simulation)
PAYMENT_MODE=simulation
INVOICE_CURRENCY=KES


Backend Setup

From the repository root:

cd backend
python -m venv .venv
# activate venv
# Mac/Linux:
source .venv/bin/activate
# Windows:
# .venv\Scripts\activate

pip install -r requirements.txt

Database Setup (PostgreSQL)

Create the database:

CREATE DATABASE spacer_db;


Run migrations (choose the command your project uses):

If using Alembic (common with FastAPI):

alembic upgrade head


If using Flask-Migrate:

flask db upgrade


If migrations are not yet configured, create tables from your ORM models or follow your project’s migration instructions.

Start Backend Server

Run one of the following depending on framework:

FastAPI (uvicorn)

uvicorn app.main:app --reload --host 127.0.0.1 --port 8000


Flask

flask --app app run --debug --host 127.0.0.1 --port 8000


Backend will be available at:

http://127.0.0.1:8000

Frontend Setup

From the repository root:

cd frontend
npm install
npm run dev


Frontend will be available at:

http://localhost:3000 (or the port shown in your terminal)

Running the Application (Recommended Order)

Start PostgreSQL

Start backend:

cd backend
source .venv/bin/activate
# then start server (FastAPI or Flask command)


Start frontend:

cd frontend
npm run dev

Testing
Backend Tests

From backend/:

# If using pytest:
pytest -q
# Or Python unittest:
python -m unittest discover -s tests

Frontend Tests

From frontend/:

npm test

API Docs

If using FastAPI, interactive docs are typically available at:

Swagger UI: http://127.0.0.1:8000/docs

ReDoc: http://127.0.0.1:8000/redoc

(If using Flask, link to your Postman collection or any docs route you provide.)

Contributing

Fork the repo

Create a feature branch:

git checkout -b feature/my-feature


Commit changes:

git commit -m "Add: my feature"


Push and open a Pull Request

Team

Backend — payments/utils/tests: Derrick Wilson

Backend — create users/spaces/bookings: Charles Mwangi

Backend — app/core/database/auth: Elvin Mwarangu

Frontend — app: Jacklyne Owuor

Frontend — app: Morris Thiongo
