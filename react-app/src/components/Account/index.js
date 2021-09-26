import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProjects, deleteProject } from '../../store/project';
import { getSavedProjects } from '../../store/saved_project'

import Header from '../Header'

import './Account.css'


function Account(){
    const dispatch = useDispatch();

    const user =  useSelector((state) => state.session.user)

    const projects = useSelector((state) => Object.values(state.project))

    const savedProjects = useSelector((state) => Object.values(state.savedProject))
    const usersProjects = projects?.filter((project) => project.user_id === user.id)

   console.log(user.username)

    // console.log(`user state`, user.id)

    // const populatedSavedProjects = (userId) => {
    //     console.log(`id`, userId)

    //     let res = []
        
    //     const projectId = savedProjects.map((project) => project.project_id)
    //     const userIds = savedProjects.map((project) => project.user_id)
        
    //     console.log(`res`,res)
    //     return res
    // }

    // populatedSavedProjects(user.id)


    const handleDelete = (id) => {
        dispatch(deleteProject(id))
    }

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSavedProjects())
    }, [dispatch])

    return (
        <>
            <Header /> 

            <div className='UI__container-outter'>
                <div className='UI__default-pfp'></div>
                <div className='user__information-container'>
                    <div className='user__information-content'>
                        
                        <div className='info__field-username '>
                           <h2>{user.username}</h2> 
                        </div>

                        <div className='info__field-username '>
                            <h3>{`${user.first_name} ${user.last_name}`}</h3>
                        </div>

                        
                        
                       
                    </div>
                </div>

            
            </div>
            

            <div className='users__projects-container'>
            {usersProjects?.map((project) => (
                        <div className='tile__containers'>
                            <div>
                                <img className='tile-image' src={project.image_url}></img>
                            </div>
                            <div className='tile-title-account'>
                                <p>{project.title}</p>
                                {/* <UpdateFormModal /> */}
                                <a href={`/update/${project.id}`}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></a>
                                <button className='project__delete-btn' onClick={() => handleDelete(project.id)}><img src="https://img.icons8.com/fluency/48/000000/delete-sign.png"/></button>

                                
                            </div>
                        </div>

                    ))}

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
