Ethara
Ethara is a full-stack project and task management platform that leverages intelligent skill matching to assign the best users to specific tasks. Built with a React frontend and a Python/Flask backend, it provides a seamless and secure environment for team collaboration.✨ FeaturesSecure Authentication: User registration and login using bcrypt password hashing and JWT (JSON Web Tokens) for secure session management.Role-Based Access: Support for different user roles (e.g., 'Member') to manage permissions.Intelligent Skill Matching: An algorithmic service (get_best_users_for_task) that analyzes user skills to recommend the best fit for specific tasks.Project & Task Management: Dedicated RESTful API endpoints to create, read, update, and delete projects and tasks.Cloud-Ready: Fully configured for deployment on modern PaaS providers like Railway, with CORS configured for decoupled frontend/backend architecture.🛠️ Tech StackFrontendReactVite (Build tool and development server)Axios (API requests)BackendPython 3Flask (Web framework)Flask-CORS (Cross-Origin Resource Sharing)PyMongo (MongoDB driver)Bcrypt (Password hashing)PyJWT (Token generation/verification)DatabaseMongoDB (NoSQL Database)📁 Project StructureThis project uses a monorepo structure, containing both the frontend and backend in a single repository.ethara/
├── frontend/                 # React frontend
│   ├── src/
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
Local Development SetupPrerequisitesNode.js (v18+)Python (3.9+)MongoDB (Local instance or MongoDB Atlas cluster)1. Backend SetupNavigate to the backend directory and set up a virtual environment:cd backend
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
Create a .env file in the backend folder with the following variables:PORT=5000
MONGO_URL=mongodb://localhost:27017/ethara
JWT_SECRET_KEY=your_super_secret_key_here
Start the Flask server:python app.py
2. Frontend SetupOpen a new terminal, navigate to the frontend directory, and install the dependencies:cd frontend
npm install
Create a .env file in the frontend folder to point to your local backend:VITE_API_URL=http://localhost:5000
Start the Vite development server:npm run dev
 API EndpointsThe backend is structured using Flask Blueprints with the following base URL prefixes:Auth Routes (/api/auth)POST /api/auth/register: Register a new user with skills and roles.POST /api/auth/login: Authenticate and receive a JWT.Task Routes (/api/tasks)Endpoints for task CRUD and skill matching.Project Routes (/api/projects)Endpoints for creating and managing project containers.SystemGET /: Server health check.GET /api/status: API status check.☁️ Deployment (Railway)This project is optimized for deployment on Railway.app.Database: Create a MongoDB database service.Backend: Deploy the backend folder.Set the Root Directory to /backend.Add variables: MONGO_URL (Internal database URL) and JWT_SECRET_KEY.Frontend: Deploy the frontend folder.Set the Root Directory to /frontend.Add variable: VITE_API_URL (The public URL of your deployed backend service).Ensure the Start Command is set to npm run preview -- --host 0.0.0.0 --port $PORT.Ensure vite.config.js has allowedHosts configured to accept the Railway domain.
