from app.models import review
from flask import Blueprint, request
from ..models import Review, db
from datetime import datetime


review_routes = Blueprint('reviews', __name__)


# get all reviews
@review_routes.route('')
def review():
    reviews = Review.query.all()

    return {'reviews': [ {
        'id' : review.id,
        'user_id': review.user_id,
        'project_id' : review.project.id,
        'body' : review.body,
        'created_at' : review.created_at,
        'updated_at' : review.updated_at,
    } for review in reviews]}



# post a review 
@review_routes.route('', methods=['POST'])
def new_review():
    review = Review ( 
        project_id = int(request.json['project_id']),
        user_id = request.json['user_id'],
        body = request.json['body'],
        created_at = request.json['created_at'],
        updated_at = request.json['updated_at']
        )

    db.session.add(review)
    db.session.commit()

    return review.to_dict()

# update a review
@review_routes.route('/<int:id>', methods=['PUT'])
def edit_review(id):
    review = Review.query.get(id)

    review.project_id = int(request.json['project_id'])
    review.user_id = int(request.json['user_id'])
    review.body = request.json['body']
    review.created_at = request.json['created_at']
    review.updated_at = request.json['updated_at']
    

    db.session.add(review)
    db.session.commit()
    
    return review.to_dict()



# Delete a review
@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {}
