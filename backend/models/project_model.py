from db.db import db

class ProjectModel:
    collection = db['projects']

    @staticmethod
    def create_project(title, description, created_by):
        project_data = {
            "title": title,
            "description": description,
            "created_by": created_by,
            "tasks": []               
        }
        return ProjectModel.collection.insert_one(project_data)

    @staticmethod
    def get_all_projects():
        return list(ProjectModel.collection.find())