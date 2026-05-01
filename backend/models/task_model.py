from db.db import db
from bson.objectid import ObjectId

class TaskModel:
    collection = db['tasks']

    @staticmethod
    def create_task(title, description, required_skills=None, created_by=None, due_date=None, project_id=None):
        """Creates a new task with required skills."""
        if required_skills is None:
            required_skills = []

        task_data = {
            "title": title,
            "description": description,
            "status": "Open",              
            "required_skills": required_skills, 
            "created_by": created_by,      
            "assigned_users": [],
            "due_date": due_date,
            "project_id": project_id 
        }
        return TaskModel.collection.insert_one(task_data)

    @staticmethod
    def get_all_tasks():
        """Fetches all tasks from the database."""
        return list(TaskModel.collection.find())