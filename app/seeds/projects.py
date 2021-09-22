from app.models import db, Project
from datetime import datetime

def seed_projects():
    cleaning = Project(
        user_id = 1, 
        title = 'Toilet Cleaning Fizzies', 
        instruction = '1)  Add 1 cup baking soda, 1/2 cup citric acid, and 40 drops lemon essential oil to a mixing bowl.  Mix well, breaking up any clumps with the back of your spoon. 2)  Add 1/2 teaspoon white vinegar and 1 tablespoon hydrogen peroxide (3% kind) to a small spray bottle.  Slowly spray vinegar/hydrogen peroxide onto dry mixture.  You may not need to use all the vinegar/hydrogen peroxide.  You’ve added enough when it feels like slightly damp (not wet) sand.  It should clump together when you squeeze it into a ball, but it should also break apart easily when you drop it into the bowl. (see step 5 above for more details).3)  Scoop fizzy mixture into silicone ice cube tray and press firmly into each opening.  One batch should yield about 10-12 toilet cleaning fizzies.  Let dry overnight (or up to 2-3 days, depending on the humidity in your home).  Make sure completely dry before attempting to remove them from mold. 4)  Store in an airtight plastic container (PET plastic #1 or HDPE plastic #2).  Click here for a printable of this recipe and free printable of the jar label.',
        supplies = 'baking soda, citric acid, lemon essential oil, vinegar, hydrogen peroxide, silicone ice cube tray, small spray bottle, airtight storage container',
        cost = 20,
        duration = 30,
        action = 'DIY',
        type = 'Cleaning',
        image_url = 'https://capstone-renewme.s3.us-west-1.amazonaws.com/cleaningFizzies.png',
        live_links = 'https://oneessentialcommunity.com/toilet-cleaning-fizzies/',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)
    )
    orginization = Project (
        user_id = 1, 
        title = 'UNDER THE KITCHEN SINK ORGANIZATION', 
        instruction = '1) measure wooden dowel to fit the size of your trash bags and mark the curtain rod hangers on the inside of the cabinet. 2) screw curtain rods into the wall of the cabinet under the sink, make sure it will not damage anything on the other side of the wall. 3) Put dowel throught trashbags and hang.',
        supplies = 'Your favorite trashbags, wooden dowel, curtain rod bracket, screws', 
        cost = 10,
        duration = 20,
        action = 'DIY',
        type = 'Orginization',
        image_url = 'https://capstone-renewme.s3.us-west-1.amazonaws.com/org1.png',
        live_links = 'https://www.mymommystyle.com/under-the-kitchen-sink-organization-ideas//',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)

    )
    decor = Project (
        user_id = 1, 
        title = 'Modern Fall Decor', 
        instruction = '1) Pick up a few bags of mini pumpkins or goards. 2) Gather your favorite colors of spray paint, for an ombre effect get colors that are similar just with diffrent hues. 3) Wash pumpkin skin to enzure no dust or dirt get into the paint. 4) Spray pumpkins in a well ventelated area. 5) let dry for a few hours or over night. for a littel extra flare you can paint the stems golden to give then an extra pop',
        supplies = 'mini pumnpkins and/or goards, spray paint ', 
        cost = 30,
        duration = 30,
        action = 'DIY',
        type = 'Decor',
        image_url = 'https://capstone-renewme.s3.us-west-1.amazonaws.com/decor1.png',
        live_links = 'https://sailormadeusa.com/blogs/news/thanksgiving-makes-me-mantel?utm_source=pinterest&utm_medium=social',
        created_at = datetime(2021, 9, 1, 1, 1, 1),
        updated_at = datetime(2021, 9, 1, 1, 1, 1)

    )


    db.session.add(cleaning)
    db.session.add(orginization)
    db.session.add(decor)

    db.session.commit()


def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
