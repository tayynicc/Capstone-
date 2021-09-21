from sqlalchemy.orm import relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime
from .project import Project
from .user import User 


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, ForeignKey('projects.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)


    owners = relationship('User', back_populates='reviews')
    projects = relationship('Project', back_populates='reviews')



    def to_dict(self):
        return {
            'id' : self.id,
            'project_id' : self.project_id,
            'user_id' : self.user_id,
            'body' : self.body,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at 
        }
