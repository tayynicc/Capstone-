import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProjects } from '../../store/project';
import { getSavedProjects } from '../../store/saved_project'


import './Account.css'


function Account(){
    const dispatch = useDispatch();

    const user =  useSelector((state) => state.session).user

    const projects = useSelector((state) => Object.values(state.project))

    const savedProjects = useSelector((state) => Object.values(state.savedProject))

    console.log(`user state`, user.id)

    const populatedSavedProjects = (userId) => {
        console.log(`id`, userId)

        let res = []
        
        const projectId = savedProjects.map((project) => project.project_id)
        const userIds = savedProjects.map((project) => project.user_id)
        
        console.log(`res`,res)
        return res
    }

    populatedSavedProjects(user.id)
    

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSavedProjects())
    }, [dispatch])

    return (
        <>
            <h1>Account page</h1>

            <div className='users__projects-container'>

            </div>

            <div className='users__savedProjects-container'>
                {/* {populatedSavedProjects(user.id).map((project) => (
                    <a className='anchor' href={`/project/${project.id}`}>
                    <div className='tile__containers'>
                        <div>
                            <img className='tile-image' src={project.image_url}></img>
                        </div>
                        <div className='tile-title'>
                            <p>{project.title}</p>
                        </div>
                    </div></a>
                ))} */}

            </div>
        </>
        
    )
}


export default Account 
