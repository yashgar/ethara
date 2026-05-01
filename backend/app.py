from flask import Flask, jsonify
from flask_cors import CORS
from db.db import db
from services.skill_match import get_best_users_for_task
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp
from routes.project_routes import project_bp
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(task_bp, url_prefix='/api/tasks')
app.register_blueprint(project_bp, url_prefix='/api/projects')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return {"error": "Missing JSON data"}, 400
    username = data.get('username')
    password = data.get('password')

@app.route('/')
def home():
    return {"status": "Backend is running"}, 200
    
@app.route('/api/status', methods=['GET'])
def server_status():
    return jsonify({"status": "success", "message": "Ethara Backend is running!"}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
