from app.models import project, saved_project
from flask import Blueprint, request
from ..models import Saved_Project, db
from datetime import datetime



saved_routes = Blueprint('saved_projects', __name__)

# get all saved projects 
@saved_routes.route('')
def saved_projects():
    saved_projects = Saved_Project.query.all()

    return {'saved_projects' : [{
        'id' : saved.id,
        'user_id' : saved.user_id,
        'project_id' : saved.project_id 
    } for saved in saved_projects]}

    
# save another project
@saved_routes.route('', methods=['POST'])
def new_saved_project():
    saved_project = Saved_Project (
        user_id = int(request.json['user_id']),
        project_id = int(request.json['project_id'])
    )

    db.session.add(saved_project)
    db.session.commit()

    return saved_project.to_dict()


# Delete a project 
@saved_routes.route('/<int:id>', methods=['DELETE'])
def delete_project(id):
    saved_projects = Saved_Project.query.get(id)

    db.session.delete(saved_projects)
    db.session.commit()

    return {}
