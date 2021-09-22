from sqlalchemy.orm import relationship
from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Numeric, DateTime
from .user import User
# from .comment import Comment

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    instruction = db.Column(db.String, nullable=False)
    supplies = db.Column(db.String, nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    action = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    live_links = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # owners = relationship("User", back_populates='projects')

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id':self.user_id,
            'title': self.title, 
            'instruction' : self.instruction,
            'supplies': self.supplies, 
            'cost': self.cost, 
            'duration': self.duration, 
            'action' : self.action,
            'type': self.type,
            'image_url' : self.image_url,
            'live_links' : self.live_links,
            'created_at' : self.created_at,
            'updated_at' : self.updated_at
        }
