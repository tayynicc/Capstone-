const LOAD_PROJECTS = 'projects/LOAD'
const ADD_PROJECTS = 'projects/ADD'
const EDIT_PROJECT = 'projects/EDIT'
const REMOVE_PROJECTS = 'projects/REMOVE'
// const SHOW_ONE = 'projects/SHOW'


const loadProjects = (projects) => ({
    type: LOAD_PROJECTS,
    projects
})


const addOneProject = (projects) => ({
    type: ADD_PROJECTS,
    projects
})

const remove = (projectId) => ({
    type: REMOVE_PROJECTS,
    projectId
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
    console.log(`route payload`,payload)
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

//get one project
// export const getOneProject = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/projects/${id}`);

// 	if (response.ok) {
// 		const project= await response.json();
// 		dispatch(oneProject(project));
// 	}
// };

// update a project 
export const editProject = project => async dispatch => {
    const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    })

    let project
    if (res.ok) {
        project = await res.json()
        dispatch(update(project))
    }

    return project
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
        // case SHOW_ONE:
        //     const newState = {
        //         ...state,
        //         [action.projects.id]: action.projects,
        //     }
        //     return newState;
        case ADD_PROJECTS:
            if(!state[action.projects.id]) {
                return {
                    ...state,
                    [action.projects.id] : action.projects
                }
            }
            return {
                ...state,
                [action.projects.id] : {
                    ...state[action.projects.id]
                }
            }
            case REMOVE_PROJECTS:
                let newState = { ...state }
                delete newState[action.projectId]
                return newState

            case EDIT_PROJECT:
                return {
                    ...state,
                    [action.projects.id] : action.projects
                }
        default:
            return state
    }
}
