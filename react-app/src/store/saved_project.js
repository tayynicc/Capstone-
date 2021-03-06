const LOAD_PROJECTS = 'saved_projects/LOAD'
const ADD_PROJECTS = 'saved_projects/ADD'
const REMOVE_PROJECTS = 'saved_projects/REMOVE'


const loadSavedProjects = (saved_projects) => ({
    type: LOAD_PROJECTS,
    saved_projects
})


const addSavedProject = (saved_projects) => ({
    type: ADD_PROJECTS,
    saved_projects
})

const remove = (projectId) => ({
    type: REMOVE_PROJECTS,
    projectId
})


// get all saved projects 
export const getSavedProjects = () => async(dispatch) => {
    const res = await fetch(`/api/saved`);
    const projects = await res.json()
    dispatch(loadSavedProjects(projects))
}


export const addProject = (payload) => async dispatch => {
    const {
        user_id, 
        project_id,

    } = payload

    const res = await fetch(`/api/saved`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, project_id})
    });

    let newSavedProject;
    if(res.ok) {
        newSavedProject = await res.json();
        dispatch(addSavedProject(newSavedProject))
    }

    return newSavedProject
}


// delete a project 
export const deleteSavedProject = projectId => async dispatch => {
    console.log(`store route`,typeof projectId)
    const res = await fetch(`/api/saved/${projectId}`, {
        method: 'DELETE'
    })

    if (res.ok) { 
        dispatch(remove(projectId))
        // dispatch(loadSavedProjects(projects))
    }
}



export default function savedProjectReducer(state={}, action){
    switch (action.type) {
        case LOAD_PROJECTS:
            const newSavedProjects = {}
            action['saved_projects'].saved_projects.forEach(project => {
                newSavedProjects[project.id] = project;
            })
            return {
                ...state,
                ...newSavedProjects
            }
        case ADD_PROJECTS:
            if(!state[action.saved_projects.id]) {
                return {
                    ...state,
                    [action.saved_projects.id] : action.saved_projects
                }
            }
            return {
                ...state,
                [action.saved_projects.id] : {
                    ...state[action.saved_projects.id]
                }
            }
        case REMOVE_PROJECTS:
            let newState = { ...state }
            delete newState[action.projectId]
            return newState
        default:
            return state
    }
}
