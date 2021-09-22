from app.models import project
from flask import Blueprint, request
from ..models import Project, db
from datetime import datetime


project_routes = Blueprint('projects', __name__)


# get all projects 
@project_routes.route('')
def projects():
    projects = Project.query.all()

    return {'projects': [ {
        'id' : project.id,
        'user_id' : project.user_id ,
        'title' : project.title,
        'instruction' : project.instruction,
        'supplies' : project.supplies,
        'cost' : project.cost, 
        'duration' : project.duration,
        'action' : project.action,
        'type' : project.type,
        'image_url' : project.image_url,
        'live_links' : project.live_links,
        'created_at' : project.created_at,
        'updated_at' : project.updated_at
    } for project in projects]}


# post a project
# @project_routes.route('', methods=['POST'])
# def new_project():

#     project = Project ( 
#         user_id = int(request.json['user_id']),
#         title = request.json['title'],
#         instruction = request.json['instruction'],
#         supplies = request.json['supplies'],
#         cost = request.json['cost'],
#         duration = request.json['duration'],
#         action = request.jon['action'],
#         type = request.json['type'],
#         image_url = request.json['image_url'],
#         live_links = request.json['live_links'],
#         created_at = request.json['created_at'],
#         updated_at = request.json['updated_at']
#         )

#     db.session.add(project)
#     db.session.commit()

#     return project.to_dict()
