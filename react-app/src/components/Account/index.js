import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProjects, deleteProject } from '../../store/project';
import { getSavedProjects } from '../../store/saved_project'

import SlideMenu from '../SlideMenu';
import Footer from '../Footer';
import EditMenu from '../EditMenu';

import './Account.css'


function Account(){
    const dispatch = useDispatch();

    const user =  useSelector((state) => state.session.user)

    const projects = useSelector((state) => Object.values(state.project))

    const savedProjects = useSelector((state) => Object.values(state.savedProject))


    
    const usersProjects = projects?.filter((project) => project.user_id === user.id)


    console.log(`user proj`, savedProjects)

    // const populatedSavedProjects = (userId) => {
    //     console.log(`id`, userId)

    //     let res = []
        
    //     const projectId = savedProjects.map((project) => project.project_id)
    //     const userIds = savedProjects.map((project) => project.user_id)
        
    //     console.log(`res`,res)
    //     return res
    // }


    // populatedSavedProjects(user.id)

    const getProject = (id) => {
        const project = projects.filter((project) => project.id === id)

        console.log(`!!`,project)

        const [ proj ] = project
        return proj
    }

    





    const handleDelete = (id) => {
        console.log(`id`, id)
        dispatch(deleteProject(+id))
    }

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getSavedProjects())
    }, [dispatch])

    return (
        <div className='bkg__container'>
            <SlideMenu />

            <div className='top__logo-div'>
                <h1 className='logo'>ReNew Me</h1>
           </div>

            {/* <div className='UI__container-outter'> */}
                <div className='UI__default-pfp'></div>
                <div className='user__information-container'>
                    <div className='user__information-content'>
                        <div className='smallscreen__userinfo-container'>
                            <div className='smallerscreen__pfp'>

                            </div>

                            <div className='info__field-username name'>
                                <h3>Welcome {`${user.first_name} ${user.last_name} !`}</h3>
                            </div>

                            <div className='info__field-username '>
                            <h3>{user.username}</h3> 
                            </div>

                            





                        </div>




                        
                        
                       
                    </div>
                </div>

            
            {/* </div> */}
            
            <div className='container__labels'>
                <h2 className='rotated__label'>My Projects</h2>
                <h2 className='rotated__label'>My Saved Projects</h2>
            </div>

            <div className='users__projects-container-account'>
            
            <h1>My Projects</h1>
            {usersProjects?.map((project) => (
                        <div className='tile__containers-account'>
                            <div>
                                <img alt='project image' className='tile-image-account' src={project.image_url}></img>
                            </div>
                            <div className='tile-title-account'>
                                <p>{project.title}</p>





                            <div className='project__buttons'>
                                {/* <div id="container">
                                    <nav>
                                        <ul>
                                            <li><a href="#"><img src="https://img.icons8.com/material-outlined/24/000000/more.png"/></a>
                                                <ul className='optionsContainer'>
                                                    <li><a className='editOpt Opt' href={`/update/${project.id}`}>Edit</a></li>
                                                    <li ><a className='deleteOpt Opt' href="#"><button className='project__delete-btn' onClick={() => handleDelete(project.id)}>Delete</button></a></li>
                                                  
                                                </ul>        
                                            </li>
                                        
                                        </ul>
                                    </nav>
                                </div> */}

                                {/* <a href={`/update/${project.id}`}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></a>
                                <button className='project__delete-btn' onClick={() => handleDelete(project.id)}>Delete</button> */}
                            </div>
                                
                            </div>
                            {/* <button type='submit' onClick={() => click()}>Click me </button> */}
                        </div>

                    )).reverse()}

            </div>

            <div className='users__savedProjects-container'>
                {savedProjects.map((project) => (
                   
                    <a className='anchor' href={`/projects/${project.project_id}`}>
                    <div className='tile__containers-account'>
                        <div>
                            <img className='tile-image-account' src={getProject(project.project_id)?.image_url}></img>
                        </div>
                        <div className='tile-title-account'>
                            <p>{getProject(project.project_id)?.title}</p>
                        </div>
                    </div></a>
                )).reverse()}

            </div>
            {/* <Footer /> */}
        </div>
        
    )
}


export default Account 
