from flask import Blueprint, request, jsonify
from models.project_model import ProjectModel
from utils.auth import token_required
from models.task_model import TaskModel
from models.user_model import UserModel

project_bp = Blueprint('projects', __name__)

@project_bp.route('/', methods=['POST'])
@token_required
def create_project(current_user):
    user = UserModel.find_by_username(current_user)
    if not user or user.get('role') != 'Admin':
        return jsonify({"message": "Unauthorized: Only Admins can create projects"}), 403
    data = request.get_json()
    
    if not data.get('title') or not data.get('description'):
        return jsonify({"message": "Title and description are required"}), 400

    ProjectModel.create_project(
        title=data.get('title'),
        description=data.get('description'),
        created_by=current_user
    )
    return jsonify({"message": "Project created successfully!"}), 201

@project_bp.route('/', methods=['GET'])
def get_projects():
    projects = ProjectModel.get_all_projects()
    for proj in projects:
        proj['_id'] = str(proj['_id'])
        
        task_count = TaskModel.collection.count_documents({"project_id": proj['_id']})
        proj['task_count'] = task_count
        
    return jsonify(projects), 200