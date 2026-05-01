from flask import Blueprint, request, jsonify
from models.task_model import TaskModel
from models.user_model import UserModel
from services.skill_match import get_best_users_for_task
from utils.auth import token_required
from bson.objectid import ObjectId

task_bp = Blueprint('tasks', __name__)

@task_bp.route('/', methods=['POST'])
@token_required
def create_new_task(current_user):
    """Creates a new task. (In a real app, you might restrict this to Admins only)"""
    data = request.get_json()
    
    TaskModel.create_task(
        title=data.get('title'),
        description=data.get('description'),
        required_skills=data.get('required_skills', []),
        created_by=current_user,
        due_date=data.get('due_date'),
        project_id=data.get('project_id')
    )
    return jsonify({"message": "Task created successfully!"}), 201

@task_bp.route('/', methods=['GET'])
def get_all():
    """Fetches all tasks."""
    tasks = TaskModel.get_all_tasks()
    for task in tasks:
        task['_id'] = str(task['_id'])
    return jsonify(tasks), 200

@task_bp.route('/<task_id>/recommendations', methods=['GET'])
def get_recommendations(task_id):
    """The magic endpoint! Evaluates users for a specific task."""
    from bson.objectid import ObjectId
    
    task = TaskModel.collection.find_one({"_id": ObjectId(task_id)})
    if not task:
        return jsonify({"message": "Task not found"}), 404

    all_users = UserModel.get_all_users()

    recommendations = get_best_users_for_task(task['required_skills'], all_users)

    return jsonify({
        "task": task['title'],
        "required_skills": task['required_skills'],
        "recommendations": recommendations
    }), 200
@task_bp.route('/<task_id>', methods=['PUT'])
@token_required
def update_task(current_user, task_id):
    from bson.objectid import ObjectId

    user = UserModel.find_by_username(current_user)
    db_role = user.get('role') if user else 'Unknown'
    task = TaskModel.collection.find_one({"_id": ObjectId(task_id)})

    if not task:
        return jsonify({"message": "Task not found"}), 404

    data = request.get_json()
    
    update_query = {}
    set_fields = {}

    if db_role == 'Admin':
        if 'status' in data:
            set_fields['status'] = data['status']
            
        if 'assign_user' in data:
            update_query["$addToSet"] = {"assigned_users": data['assign_user']}

    elif db_role == 'Member':
        if 'assign_user' in data:
            return jsonify({"message": "Unauthorized: Members cannot assign tasks"}), 403
            
        assigned_users = task.get('assigned_users', [])
        if current_user not in assigned_users:
            return jsonify({"message": "Unauthorized: You can only update tasks assigned to you!"}), 403
        
        if data.get('status') == 'Completed':
            set_fields['status'] = 'Completed'
        else:
            return jsonify({"message": "Unauthorized: You can only mark tasks as completed."}), 403

    if set_fields:
        update_query["$set"] = set_fields

    if not update_query:
        return jsonify({"message": "No valid fields to update"}), 400

    result = TaskModel.collection.update_one(
        {"_id": ObjectId(task_id)},
        update_query
    )

    return jsonify({"message": "Task updated successfully!"}), 200
@task_bp.route('/<task_id>', methods=['DELETE'])
@token_required
def delete_task(current_user, task_id):
    from bson.objectid import ObjectId

    user = UserModel.find_by_username(current_user)
    if not user or user.get('role') != 'Admin':
        return jsonify({"message": "Unauthorized: Only Admins can delete tasks!"}), 403

    result = TaskModel.collection.delete_one({"_id": ObjectId(task_id)})

    if result.deleted_count == 1:
        return jsonify({"message": "Task deleted successfully!"}), 200
    else:
        return jsonify({"message": "Task not found."}), 404