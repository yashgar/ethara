from flask import Flask, jsonify
from flask_cors import CORS
from db.db import db
from services.skill_match import get_best_users_for_task
from routes.auth_routes import auth_bp
from routes.task_routes import task_bp
from routes.project_routes import project_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(task_bp, url_prefix='/api/tasks')
app.register_blueprint(project_bp, url_prefix='/api/projects')

@app.route('/api/status', methods=['GET'])
def server_status():
    return jsonify({"status": "success", "message": "Ethara Backend is running!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)