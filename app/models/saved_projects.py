from sqlalchemy.orm import relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime


class Saved_Project(db.Model):
    __tablename__ = 'saved_projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, ForeignKey('project.id'), nullable=False)


    user = relationship("User", back_populates='saved_projects')
    project = relationship('Project', back_populates='saved_projects')


    def to_dict(self):
        return {
        'id' : self.id,
        'user_id' : self.user_id,
        'project_id' : self.project_id
    }
