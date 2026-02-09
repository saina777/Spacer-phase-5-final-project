# Spacer

Spacer is a marketplace platform connecting space owners with people looking for unique venues to meet, create, and celebrate. Book spaces by the hour or day with flexible pricing, streamlined booking management, and simulated payment processing.

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Environment Configuration](#environment-configuration)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

---

## 🎯 Problem Statement

Communities and teams struggle to find welcoming, flexible spaces for collaboration, events, workshops, and celebrations. Traditional venue booking is often rigid, expensive, and lacks the personal touch needed for meaningful gatherings around shared passions.

## 💡 Our Solution

Spacer provides an intuitive online marketplace that:

- **Connects** space seekers with unique, bookable venues
- **Empowers** space owners to list and manage their properties
- **Simplifies** booking with duration-based pricing and real-time availability
- **Streamlines** payments through simulated billing and invoicing workflows
- **Prevents** double-bookings with intelligent status management

---

## ✨ Key Features

### For Space Owners (Admin Module)
- ➕ **Add & Manage Spaces** — Create listings with detailed descriptions, pricing, and availability
- 📊 **Dashboard View** — Monitor all your spaces and bookings in one place
- 👥 **User Management** — Add team members with role-based permissions
- ✏️ **Edit Capabilities** — Update space details, pricing, and availability anytime

### For Clients
- 🔍 **Browse Spaces** — Discover available venues with detailed information
- 🔐 **Flexible Authentication** — Sign in using local credentials or social providers
- 📅 **Smart Booking** — Select duration with auto-calculated pricing
- 📄 **Agreement Workflow** — Review and accept terms before booking
- 💳 **Simulated Payments** — Complete bookings with mock billing and invoicing
- 🚫 **Real-time Availability** — Spaces automatically marked unavailable when booked

---

## 🛠 Tech Stack

### Backend
- **Framework:** Python with Flask/FastAPI
- **Authentication:** JWT-based auth with optional social login
- **Database:** PostgreSQL 14+
- **Testing:** pytest/unittest

### Frontend
- **Framework:** React 18+
- **State Management:** Redux Toolkit
- **Testing:** Jest
- **Design:** Mobile-first responsive design (Figma prototypes)

### DevOps & Tools
- **Version Control:** Git & GitHub
- **API Documentation:** Swagger UI / ReDoc (FastAPI) or Postman (Flask)
- **Environment Management:** dotenv

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Python | 3.10+ | [python.org](https://www.python.org/downloads/) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| PostgreSQL | 14+ | [postgresql.org](https://www.postgresql.org/download/) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/spacer.git
cd spacer
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

### Database Setup

#### Create the Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE spacer_db;

# Exit psql
\q
```

#### Run Migrations

**For FastAPI with Alembic:**
```bash
cd backend
alembic upgrade head
```

**For Flask with Flask-Migrate:**
```bash
cd backend
flask db upgrade
```

### Environment Configuration

#### Backend Configuration

Create `backend/.env` from the example file:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:

```env
# Application
APP_ENV=development
APP_HOST=127.0.0.1
APP_PORT=8000

# Database
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/spacer_db

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_ALGORITHM=HS256
JWT_EXPIRES_IN_MINUTES=60

# Social Auth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OAUTH_REDIRECT_URL=http://localhost:3000/auth/callback

# Payments (Simulation)
PAYMENT_MODE=simulation
INVOICE_CURRENCY=KES
```

#### Frontend Configuration

Create `frontend/.env` from the example file:

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🎬 Running the Application

### 1. Start PostgreSQL

Ensure your PostgreSQL service is running:

```bash
# macOS (using Homebrew)
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# PostgreSQL runs as a service automatically
```

### 2. Start the Backend

**FastAPI:**
```bash
cd backend
source .venv/bin/activate  # Windows: .venv\Scripts\activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

**Flask:**
```bash
cd backend
source .venv/bin/activate  # Windows: .venv\Scripts\activate
flask --app app run --debug --host 127.0.0.1 --port 8000
```

Backend will be available at: **http://127.0.0.1:8000**

### 3. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at: **http://localhost:3000**

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
source .venv/bin/activate

# Using pytest
pytest -v

# Using unittest
python -m unittest discover -s tests -v
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

---

## 📚 API Documentation

### Interactive API Docs

**If using FastAPI:**
- **Swagger UI:** http://127.0.0.1:8000/docs
- **ReDoc:** http://127.0.0.1:8000/redoc

**If using Flask:**
- API documentation available via Postman collection (link to be added)

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| GET | `/spaces` | List all available spaces |
| GET | `/spaces/:id` | Get space details |
| POST | `/bookings` | Create new booking |
| GET | `/bookings/:id` | Get booking details |

---

## 📁 Project Structure

```
spacer/
├── backend/
│   ├── app/
│   │   ├── core/           # Core configurations
│   │   ├── database/       # Database models & connections
│   │   ├── auth/           # Authentication logic
│   │   ├── payments/       # Payment simulation
│   │   └── utils/          # Utility functions
│   ├── tests/              # Backend tests
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment template
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store & slices
│   │   ├── services/       # API services
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies
│   └── .env.example        # Environment template
│
└── README.md               # This file
```

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

### 1. Fork the Repository
Click the "Fork" button at the top right of this page.

### 2. Create a Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes
- Write clean, documented code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 4. Commit Your Changes
```bash
git commit -m "Add: amazing new feature"
```

Use conventional commit messages:
- `Add:` new features
- `Fix:` bug fixes
- `Update:` changes to existing features
- `Docs:` documentation changes
- `Test:` test additions or changes

### 5. Push and Create Pull Request
```bash
git push origin feature/amazing-feature
```

Then open a Pull Request on GitHub with a clear description of your changes.

### Code Review Process
- All PRs require at least one review
- Ensure all tests pass
- Maintain code coverage above 80%

---

## 👥 Team

| Name | Role | Responsibilities |
|------|------|------------------|
| **Derrick Wilson** | Backend Developer | Payments, utils, testing |
| **Charles Mwangi** | Backend Developer | User/space/booking creation |
| **Elvin Mwarangu** | Backend Developer | App core, database, authentication |
| **Jacklyne Owuor** | Frontend Developer | React application |
| **Morris Thiongo** | Frontend Developer | React application |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Spacer
- Built with ❤️ for communities seeking meaningful gathering spaces

**Made with ❤️ by the Spacer Team**