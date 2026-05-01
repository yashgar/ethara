from flask import Blueprint, request, jsonify
import bcrypt
from models.user_model import UserModel
from utils.auth import generate_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    skills = data.get('skills', [])
    role = data.get('role', 'Member')

    if UserModel.find_by_username(username):
        return jsonify({"message": "User already exists!"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    UserModel.create_user(username, hashed_password, role, skills)
    return jsonify({"message": "User registered successfully!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = UserModel.find_by_username(data.get('username'))

    if not user:
        return jsonify({"message": "User not found!"}), 404

    if bcrypt.checkpw(data.get('password').encode('utf-8'), user['password_hash'].encode('utf-8')):
        token = generate_token(user['username'], user['role'])
        return jsonify({"message": "Login successful!", "token": token, "role": user['role']}), 200
    
    return jsonify({"message": "Invalid password!"}), 401