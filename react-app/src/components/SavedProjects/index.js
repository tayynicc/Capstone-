import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useEffect } from 'react'

import { getProjects } from '../../store/project'
import { addProject, getSavedProjects, deleteSavedProject } from '../../store/saved_project' 

import './SavedProjects.css'

function SavedProjects(){
    const { id } = useParams()
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user)
    const projects = useSelector((state) => Object.values(state.project)) 
    const saved = useSelector((state) => Object.values(state.savedProject))

    const project = projects?.filter((pro) => pro?.id === +id)

    console.log(`$$$`,saved)

    const currentSaved = saved?.filter((proj) => proj.project_id === +id)
    const [ current ] = currentSaved

    console.log("~~~~~~",current?.id)


    

    const saveProject = async (project) => {
   
        const payload = {
            user_id: +user.id, 
            project_id: id,
         
        }

        await dispatch(addProject(payload))
        window.alert('Project Saved')
    }

    const unsaveProject = async (id) => {
        console.log(`handle delete`, id)
     
        await dispatch(deleteSavedProject(id))
        dispatch(getSavedProjects())
        window.alert('Project Unsaved')
    }
 

    const checkSaved = (id) => {
        const res = []
      saved.forEach((pro) => {
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
    }, [dispatch, id]) 


    return(
        <>
            {checkSaved(+id) === false && 
                <button id='save-button'  onClick={() => saveProject(+id)} className='save__button' >Save This Project!</button>            
            }

            {checkSaved(+id) === true && 
                <>
                    <button className='savedBTN' onClick={() => unsaveProject(current?.id) }>Unsave project</button>
                </>
            }
        </>
    )
}

export default SavedProjects;
