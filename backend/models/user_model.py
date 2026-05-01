from db.db import db

class UserModel:
    collection = db.users

    @staticmethod
    def create_user(username, password_hash, role="Member", skills=None):
        """Creates a new user in the database."""
        if skills is None:
            skills = []
            
        user_data = {
            "username": username,
            "password_hash": password_hash,
            "role": role,
            "skills": skills
        }
        return UserModel.collection.insert_one(user_data)

    @staticmethod
    def find_by_username(username):
        """Finds a user by their username."""
        return UserModel.collection.find_one({"username": username})
    
    @staticmethod
    def get_all_users():
        """Returns all users (useful for the matching algorithm)."""
        return list(UserModel.collection.find({}, {"password_hash": 0}))
