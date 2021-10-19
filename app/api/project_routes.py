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

# get one project 
@project_routes.route('/<int:id>')
def one_project(id):
    one_project = Project.query.get(id)

    return{
        'id' : one_project.id,
        'user_id' : one_project.user_id ,
        'title' : one_project.title,
        'instruction' : one_project.instruction,
        'supplies' : one_project.supplies,
        'cost' : one_project.cost, 
        'duration' : one_project.duration,
        'action' : one_project.action,
        'type' : one_project.type,
        'image_url' : one_project.image_url,
        'live_links' : one_project.live_links,
        'created_at' : one_project.created_at,
        'updated_at' : one_project.updated_at
    }





# post a project
@project_routes.route('', methods=['POST'])
def new_project():
    project = Project ( 
        user_id = int(request.json['user_id']),
        title = request.json['title'],
        instruction = request.json['instruction'],
        supplies = request.json['supplies'],
        cost = request.json['cost'],
        duration = request.json['duration'],
        action = request.json['action'],
        type = request.json['type'],
        image_url = request.json['image_url'],
        live_links = request.json['live_links'],
        created_at = request.json['created_at'],
        updated_at = request.json['updated_at']
        )

    db.session.add(project)
    db.session.commit()

    return project.to_dict()


#  update a project 
@project_routes.route('/<int:id>', methods=['PUT'])
def edit_project(id):
    project = Project.query.get(id)

    project.user_id = request.json['user_id']
    project.title = request.json['title']
    project.instruction = request.json['instruction']
    project.supplies = request.json['supplies']
    project.cost = request.json['cost']
    project.duration = request.json['duration']
    project.action = request.json['action']
    project.type = request.json['type']
    project.image_url = request.json['image_url']
    project.live_links = request.json['live_links']
    project.created_at = request.json['created_at']
    project.updates_at = request.json['updated_at']


    db.session.add(project)
    db.session.commit()
    
    return project.to_dict()


# Delete a project 
@project_routes.route('/<int:id>', methods=['DELETE'])
def delete_projects(id):
    project = Project.query.get(id)

    # print("hereeeeee", project)

    db.session.delete(project)
    db.session.commit()

    return {}
