About The Project

Ethara is a collaborative platform designed to streamline project and task management. It goes beyond standard task boards by leveraging an algorithmic skill-matching service that analyzes user profiles to assign the best-suited team members to specific tasks, ensuring optimal productivity.

Features

Secure Authentication: User registration and login utilizing bcrypt password hashing and JWT (JSON Web Tokens) for secure, stateless session management.

Role-Based Access Control (RBAC): Built-in support for different user roles (e.g., 'Admin', 'Member') to safely manage permissions and platform access.

Intelligent Skill Matching: A custom algorithmic service (get_best_users_for_task) that analyzes user skills to recommend the absolute best fit for specific project tasks.

Project & Task Management: Dedicated RESTful API endpoints to seamlessly create, read, update, and delete (CRUD) projects and their nested tasks.

Cloud-Ready Infrastructure: Fully configured for deployment on modern PaaS providers (like Railway), with CORS configured for decoupled frontend/backend architecture.

Tech Stack

Frontend

React - UI framework

Vite - Build tool and development server

Axios - Promise-based HTTP client

Backend

Python 3 - Primary backend language

Flask - Lightweight WSGI web application framework

Flask-CORS - Handling Cross-Origin Resource Sharing

Bcrypt & PyJWT - Security and authentication

Database

MongoDB & PyMongo - NoSQL Database and Python driver

Project Structure

This project uses a monorepo structure, maintaining both the frontend client and backend API in a single repository for easy version control.

ethara/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── services/         # Axios API configurations
│   │   └── ...
│   ├── package.json
│   └── vite.config.js        # Vite & Host configuration
│
└── backend/                  # Flask backend
    ├── app.py                # Main application entry point
    ├── requirements.txt      # Python dependencies
    ├── db/                   # Database connection logic
    ├── models/               # MongoDB data models (e.g., UserModel)
    ├── routes/               # API Blueprints (auth, tasks, projects)
    ├── services/             # Core business logic (skill matching)
    └── utils/                # Helper functions (JWT generation)


Getting Started

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js (v18 or higher)

Python (3.9 or higher)

MongoDB (A local instance or a free MongoDB Atlas cloud cluster)

1. Backend Setup

Navigate to the backend directory and set up an isolated virtual environment:

cd backend
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate

# Install required packages
pip install -r requirements.txt


Create a .env file in the backend folder and add the following variables:

PORT=5000
MONGO_URL=mongodb://localhost:27017/ethara  # Replace with your Atlas URI if using cloud
JWT_SECRET_KEY=your_super_secret_key_here


Start the Flask development server:

python app.py


2. Frontend Setup

Open a new terminal window, navigate to the frontend directory, and install dependencies:

cd frontend
npm install


Create a .env file in the frontend folder to point to your local backend API:

VITE_API_URL=http://localhost:5000


Start the Vite development server:

npm run dev


API Reference

The backend uses Flask Blueprints with the following base URL prefixes.

Auth Routes (/api/auth)

POST /api/auth/register: Register a new user with skills and roles.

POST /api/auth/login: Authenticate and receive a JWT.

Task Routes (/api/tasks)

Endpoints for task CRUD operations and skill-matching triggers.

Project Routes (/api/projects)

Endpoints for creating and managing high-level project containers.

System Health

GET /: Basic server health check.

GET /api/status: Detailed API status check.

Deployment

This project is optimized for deployment on platforms like Railway or Render.

Railway Deployment Guide

Database: Provision a MongoDB database service.

Backend Engine: Deploy the backend directory.

Go to Settings -> Build -> Set Root Directory to /backend.

Add Variables: MONGO_URL (Internal database URL) and JWT_SECRET_KEY.

Frontend Engine: Deploy the frontend directory.

Go to Settings -> Build -> Set Root Directory to /frontend.

Add Variable: VITE_API_URL (The public domain URL of your deployed backend).

Update the Start Command: npm run preview -- --host 0.0.0.0 --port $PORT.

Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
