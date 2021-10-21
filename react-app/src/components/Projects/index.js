import './Project.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getProjects } from '../../store/project'

import { addProject } from '../../store/saved_project' 

import Header from '../Header'
import Footer from '../Footer'
import Comments from '../Comments'
import SlideMenu from '../SlideMenu'


function Project(){
    const { id } = useParams()
    const dispatch = useDispatch();

    const projects = useSelector((state) => Object.values(state.project)) 
    const user = useSelector((state) => state.session.user)




    const project = projects.filter((singleProject) => singleProject.id === +id)

  

    useEffect(() => {
        dispatch(getProjects())
    }, [dispatch, id])

    const splitSupplies = (str) => {
        let items = str.split(',')
        return items

    }


    const savedSet = new Set()

    const saveProject = async (project) => {
   
        const payload = {
            user_id: +user.id, 
            project_id: id,
         
        }



        // await dispatch(addProject(payload))
        save(project.id)
    }

    const save = (id) => {
        const button = document.getElementById('save-button') 
        if (button.innerHTML === 'Project Saved!'){
            return
        } else {
           button.innerHTML = 'Project Saved!' 
           button.classList.add('saved')
        }
        
    }





    return (
        <>
            {/* <Header />  */}
            <SlideMenu />
            {project.map((pro) => (
                <>

                    <div className='project__title-container'>
                        <h1>{pro.title}</h1>
                    </div>
                    
                    <div className='project__image-outterContainer' id='project-background-div'>
                        
                        <div className='project__image-innerContainer'>
                            <img className ='product__image' src={pro.image_url}></img>
                        </div>  

                        {/* <div className='save-project-tile'>
                            <button id='save-button'  onClick={() => saveProject(pro)} className='save__button' >Save This Project! <img src="https://img.icons8.com/ios-glyphs/30/000000/like--v2.png"/></button>
                            
                        </div>  */}

                        <div className='duration'>
                           <h2>Estimated Time to Complete: </h2>
                            {pro.duration} Minutes
                        </div>

                    </div>
                    
                    <h1 className='project__inst-label'>Instructions</h1>

                    
                    <div className='project__instructions-container'>
                        <p>{pro.instruction}</p>
                    </div>

                

                    <div className='project__supplies-container'>
                        <div className='supply-list'>
                            <h1>Supply list</h1>
                            <ul>
                            {splitSupplies(pro.supplies).map((itm) => (
                                <li>{itm}</li> 
                            ))} 
                            </ul>
                        </div>
                        
                        <div className='cost-container'>
                          <h1>Estimated Cost: </h1>
                        <h3>$ {pro.cost}</h3>  
                        </div>
                        
                        
                    </div>

                    <div className='project__externalLinks-container'>
                        <h2>External Resources: </h2>
                        <a href={pro.live_links}>{pro.live_links}</a>
                    </div>
                </>
            ))}

            <div className='review__outter-container'>
                <Comments />
            </div>

            <Footer />
            
        </>
    )
}

export default Project
