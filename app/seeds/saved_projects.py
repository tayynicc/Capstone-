from app.models import db, Saved_Project


def seed_saved_projects():
    saved_1 = Saved_Project(
        user_id = 2, 
        project_id = 1,
    )
    saved_2 = Saved_Project(
        user_id = 2, 
        project_id = 2,
    )
    saved_3 = Saved_Project(
        user_id = 2, 
        project_id = 3,
    )


    db.session.add(saved_1)
    db.session.add(saved_2)
    db.session.add(saved_3)

    db.session.commit()


def undo_saved_projects():
    db.session.execute('TRUNCATE saved_projects RESTART IDENTITY CASCADE;')
    db.session.commit()
    