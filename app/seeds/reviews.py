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
    comment_4 = Review (
        project_id = 1,
        user_id = 2,
        body = 'How useful!! I can\'t believe I\'ve never thought of this!',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)
    )
    comment_5 = Review (
        project_id = 1,
        user_id = 2,
        body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)
    )
    comment_6 = Review (
        project_id = 1,
        user_id = 2,
        body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)


    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
