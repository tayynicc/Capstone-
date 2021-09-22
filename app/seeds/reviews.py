from app.models import db, Review
from datetime import datetime

def seed_reviews():
    comment_1 = Review (
        project_id = 1,
        user_id = 2,
        body = 'So useful!! I love having these on hand and they smell great!! ive tried a few with different essential oils and thye have all cvome out marvlous',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)
    )
    comment_2 = Review (
        project_id = 2,
        user_id = 2,
        body = 'How useful!! I can\'t believe I\'ve never thought of this!',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)
    )
    comment_3 = Review (
        project_id = 3,
        user_id = 2,
        body = 'Cute, Cute, Cute modern and chic such a fresh take on traditional fall decor',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)


    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
