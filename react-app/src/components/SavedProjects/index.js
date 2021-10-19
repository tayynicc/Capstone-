import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useEffect } from 'react'

import { getProjects } from '../../store/project'
import { addProject, getSavedProjects, deleteSavedProject } from '../../store/saved_project' 


function SavedProjects(){
    const { id } = useParams()
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user)
    const projects = useSelector((state) => Object.values(state.project)) 
    const saved = useSelector((state) => Object.values(state.savedProject))

    const project = projects?.filter((pro) => pro?.id === +id)

    // console.log(`@@`,projects)
    console.log(`!!`, saved)

    

    const saveProject = async (project) => {
   
        const payload = {
            user_id: +user.id, 
            project_id: id,
         
        }

        await dispatch(addProject(payload))
    }

    const unsaveProject = async (id) => {
        console.log(`!!`, typeof id)
     
        await dispatch(deleteSavedProject(id))
        window.alert('Project unsaved')
    }
 

    const checkSaved = (id) => {
        const res = []
      saved.forEach((pro) => {
           console.log(pro.project_id)
            if(pro.project_id === id){
                res.push('true')
            } else {
                res.push('false')
            }
       })

       if (res.includes('true')){
           return true
       } else {
           return false
       }

     
    }


    useEffect(() => {
        dispatch(getProjects())
        dispatch(getSavedProjects())
        // checkSaved(id)
    }, [dispatch, id]) 


    return(
        <>
            {checkSaved(+id) === false && <div className='save-project-tile'>
            <button id='save-button'  onClick={() => saveProject(+id)} className='save__button' >Save This Project!</button>
                            
            </div> }

            {checkSaved(+id) === true && 
                <>
                    <h1>project already saved</h1>
                    {/* {console.log(`**`, id)} */}
                    <button onClick={() => unsaveProject(+id) }>Unsave project</button>
                </>
            }
        </>
    )
}

export default SavedProjects;
