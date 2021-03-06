import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProjects, deleteProject } from '../../store/project';
import { deleteSavedProject, getSavedProjects } from '../../store/saved_project'

import SlideMenu from '../SlideMenu';
import Footer from '../Footer';

import './Account.css'


function Account(){
    const dispatch = useDispatch();

    const user =  useSelector((state) => state.session.user)

    const projects = useSelector((state) => Object.values(state.project))

    const saved = useSelector((state) => Object.values(state.savedProject))


    
    const usersProjects = projects?.filter((project) => project.user_id === user.id)


    // console.log(`user proj`, savedProjects)

    // const populatedSavedProjects = (userId) => {
    //     console.log(`id`, userId)

    //     let res = []
        
    //     const projectId = savedProjects.map((project) => project.project_id)
    //     const userIds = savedProjects.map((project) => project.user_id)
        
    //     console.log(`res`,res)
    //     return res
    // }


    // populatedSavedProjects(user.id)

    // const getProject = (id) => {
    //     const project = projects.filter((project) => project.id === id)


    //     const [ proj ] = project
    //     return proj
    // }

    function savedProjContent(){

        // saved id is not being passed in the final project obj so delete is not working
       let arr = []
       saved.forEach((save) =>{ 
           let ids = {}
        //    console.log(`$$$$$`, save)
           ids.project_id = save.project_id
           ids.saved_id = save.id
           arr.push(ids)
            // id.push(save.project_id)
       })

    //    console.log(`******`, arr)

    //    arr contains objects if projects id and saved id


       let project = []
       projects?.forEach((pro) => {
           for(let i = 0; i < arr.length; i++){

               let curr = arr[i]
            //    console.log(`!!!!!!!`, curr.project_id)
               if(curr.project_id === pro.id){
                   pro.saved_id = curr.saved_id
                //    console.log(`&&&`,pro)
                project.push(pro)
               }
      
               }
       })
       return project
    }
    

   console.log(`@@@@`,savedProjContent()) 


    


    const handleDelete = (id) => {
        dispatch(deleteProject(+id))
    }

    const removeSaved = (id) => {
        console.log(`$$`,id)
        dispatch(deleteSavedProject(id))
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
                            <h3 className='pfp__username-info'><p className='username__label'>Username: </p>{user.username}</h3> 
                            <h3 className='pfp__username-info'><p className='username__label'>Email: </p>{user.email}</h3>
                            </div>


                        </div>

                       
                    </div>
                </div>

            
            <div className='table__containers'>
                <div className='container__labels'>
                    <div className='usersPd__table-label'>
                        <thead className='tableTitle'>
                            <tr>
                                <th>My Projects</th>
                            </tr>
                        </thead>
                    </div>
                    
                    <div className='labels__containers'>
                        <thead className='table_columnLabel'>
                            
                            <tr>
                                <div className='center__labels'>
                                    <div className='label-1'>
                                        <th>Listing</th>
                                    </div>

                                    <div className='label-2'>
                                        <th>Title</th>
                                    </div>

                                    <div className='label-3'>
                                        <th>Type</th>
                                    </div>

                                    <div className='label-4'>
                                        <th>Created At</th>
                                    </div>
                                </div>
                            </tr>
                            
                        </thead>
                    </div>
                    <tbody>
                        {usersProjects?.map((project) => (
                            <>
                            <div className='data_row'>
                                <tr >
                                    <div className='table__data-container'>
                                        <div className='link'>
                                            <td className='table__data link-data'><a className='a__link' href={`/projects/${project.id}`}><li>Active</li></a></td>
                                        </div>
                                        <div className='title'>
                                            <td className='table__data title-data'>{project.title}</td>
                                        </div>

                                        <div className='tags'>
                                            <td className='table__data tags-data'>{project.action}, {project.type}</td>
                                        </div>
                                        
                                        


                                        <td className='table__data'>{project.created_at}</td>

                                        <div className='editControls'>
                                            <td className='table__data editCont'><a className='edit__usrproject-link' href={`/update/${project.id}`}>Edit </a> <button className='delete__usrproject-link' onClick={(() => handleDelete(project.id))}> Delete </button> </td>
                                        </div>
                                    </div>
                                </tr>
                            </div>    
                            
                            </>
                        )).reverse()}
                        
                    </tbody>
                </div>

                <div className='savedProjects'>
                    <div className='saved__table-label'>
                        <thead>
                            
                                <tr className='saved__table'>
                                    <th> My Saved Projects</th>
                                </tr>
                            
                        </thead>
                    </div>
                    <tbody>
                        {savedProjContent().map((project) => (

                        
                            <div className='data__container-saved'>

                                <div className="image__container">
                                    <td>
                                        <img alt='project image' className='tile-image-account savedImg' src={project.image_url}></img>
                                    </td>
                                </div>

                                <div className='saved__project-container'>
                                    <a href={`/projects/${project.id}`}><td>{project.title}</td></a>
                                </div>

                                <div className='remove_saved'>
                                    <button className='project__delete-btn' onClick={() => removeSaved(project.saved_id)}>Remove</button>
                                </div>
                            </div>
                        )).reverse()}

                    </tbody>
                </div>
           </div>
        </div>
        
    )
}


export default Account 
