const LOAD_PROJECTS = 'projects/LOAD'
const ADD_PROJECTS = 'projects/ADD'
const EDIT_PROJECT = 'projects/EDIT'
const REMOVE_PROJECTS = 'projects/REMOVE'


const loadProjects = (projects) => ({
    type: LOAD_PROJECTS,
    projects
})


const addOneProject = (projects) => ({
    type: ADD_PROJECTS,
    projects
})

const remove = (project) => ({
    type: REMOVE_PROJECTS,
    project
})

const update = (project) => ({
    type: EDIT_PROJECT,
    project
})

// get all projects 
export const getProjects = () => async(dispatch) => {
    const res = await fetch(`/api/projects`);
    const projects = await res.json()
    dispatch(loadProjects(projects))
}


// add a new project 
export const createOneProject = (payload) => async dispatch => {
    const {
        user_id, 
        title, 
        instruction, 
        supplies,
        cost,
        duration,
        action,
        type,
        image_url,
        live_links,
        created_at,
        updated_at
    } = payload

    const res = await fetch(`/api/projects`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, title, instruction, supplies,cost, duration, action, type, image_url, live_links, created_at, updated_at})
    });

    let newProject;
    if(res.ok) {
        newProject = await res.json();
        dispatch(addOneProject(newProject))
    }

    return newProject
}


// update a project 
export const editProject = project => async dispatch => {
    const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    })

    if (res.ok) {
        const project = await res.json()
        dispatch(update(project))
    }
}


// delete a project 
export const deleteProject = projectId => async dispatch => {
    const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
    })

    if (res.ok) { 
        dispatch(remove(projectId))
    }
}



export default function projectReducer(state={}, action){
    switch (action.type) {
        case LOAD_PROJECTS:
            const newProjects = {}
            action['projects'].projects.forEach(project => {
                newProjects[project.id] = project;
            })
            return {
                ...state,
                ...newProjects
            }
        case ADD_PROJECTS:
            if(!state[action.project.id]) {
                return {
                    ...state,
                    [action.project.id] : action.project
                }
            }
            return {
                ...state,
                [action.project.id] : {
                    ...state[action.project.id]
                }
            }
            case REMOVE_PROJECTS:
                let newState = { ...state }
                delete newState[action.project]
                return newState

            case EDIT_PROJECT:
                return {
                    ...state,
                    [action.project.id] : action.project
                }
        default:
            return state
    }
}
