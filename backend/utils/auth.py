import jwt
import os
import datetime
from functools import wraps
from flask import request, jsonify

SECRET_KEY = os.getenv("SECRET_KEY", "super_secret_jwt_key_change_this_later")

def generate_token(username, role):
    """Generates a JWT token for a logged-in user."""
    payload = {
        'username': username,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def token_required(f):
    """A decorator to protect routes that require login."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            token = token.split(" ")[1] 
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = data['username']
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated