import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useEffect, useState} from 'react'

import { getProjects } from '../../store/project'
import { addProject, getSavedProjects, deleteSavedProject } from '../../store/saved_project' 

import './SavedProjects.css'


function SavedProjects(){
    const { id } = useParams()
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user)
    const projects = useSelector((state) => Object.values(state.project)) 
    const saved = useSelector((state) => Object.values(state?.savedProject))

    const project = projects?.filter((pro) => pro?.id === +id)

    const [ save, setSave ] = useState(false)
    

    const saveProject = async (project) => {
   
        const payload = {
            user_id: +user.id, 
            project_id: id,
         
        }

        await dispatch(addProject(payload))
        window.alert('Project Saved!')
        setSave(true)
    }

    const unsaveProject = async (id) => {
        
        setSave(false)
        // console.log(`!!`, save)
        await dispatch(deleteSavedProject(id))
        window.alert('Project unsaved')
        // console.log('unsaving funct', save)
        
       
    }
 

    const checkSaved = (id) => {
        // const res = []
        console.log(`!!!`, "checking if saved")
        console.log(saved)

      saved?.forEach((pro) => {
            if(pro?.project_id === id){
                setSave(true)
                console.log(`!!!!!`, save)
                // res.push('true')
            }      
       })
    //    setSave(false)
    //    console.log('res', res)

    //    if (res.includes('false')){
    //         // setSave(true)
    //     //    return true
    //         res.pop('false')
    //         console.log(`###`, res)
        
    //    } else {
    //     //    setSave(false)
    //        return false
    //    }

     
    }

        // setTimeout(() => {
        //     console.log(`timeout`)
        // //    dispatch(getSavedProjects()) 
        // }, 10000)
    
    useEffect(() => {
        dispatch(getProjects())
        dispatch(getSavedProjects())
        checkSaved(+id)
        
    }, [dispatch, id]) 

    console.log(`saved state`, save)
    console.log(saved)
    // console.log('check save', )

    return(
        <>
            {save === false && <div className='save-project-tile'>
            <button id='save-button'  onClick={() => saveProject(+id)} className='save__button' >Save For Later</button>
                            
            </div> }

            {save === true && 
                <div className='save-project-tile'>
                    {/* {console.log('unsaving')} */}
                    <button className='save__button unsave' onClick={() => unsaveProject(+id) }>Unsave project</button>
                </div>
            }
        </>
    )
}

export default SavedProjects;
