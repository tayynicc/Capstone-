import './Project.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getProjects } from '../../store/project'

import Header from '../Header'
import Footer from '../Footer'


function Project(){
    const { id } = useParams()
    const dispatch = useDispatch();

    const projects = useSelector((state) => Object.values(state.project)) 

    const project = projects.filter((singleProject) => singleProject.id === +id)

    console.log(`single`, project)

    useEffect(() => {
        // dispatch(getOneProject(id));
        dispatch(getProjects())
    }, [dispatch, id])

    const splitSupplies = (str) => {
        let items = str.split(',')
        return items

    }

    const save = (id) => {
        const button = document.getElementById('save-button') 
        if (button.innerHTML === 'Project Saved!'){
            button.innerHTML = 'Save This Project'
            button.classList.remove('saved')
        } else {
           button.innerHTML = 'Project Saved!' 
           button.classList.add('saved')
        }
        
        // console.log(`saving`, button.innerHTML)
    }
    

    return (
        <body className='project-body'>
            <Header /> 
            {project.map((pro) => (
                <>
                    <div className='project__title-container'>
                        <h1>{pro.title}</h1>
                    </div>
                    
                    <div className='project__image-container'><img className ='product__image' src={pro.image_url}></img></div>

                    <div className='project__instructions-container'><p>{pro.instruction}</p></div>

                    <div className='project__durationCost-container'>
                        <div className='duration'>
                           <h2>Estimated Time to Complete: </h2>
                            {pro.duration} Minutes
                        </div>
                        
                        <div className='save-project-tile'>
                            <button id='save-button'  onClick={() => save(pro.id)} className='save__button'>Save This Project! <img src="https://img.icons8.com/ios-glyphs/30/000000/like--v2.png"/></button>
                            
                            
                        </div>

                    </div>

                    <div className='project__supplies-container'>
                        <h1>Supply list</h1>
                        <ul>
                        {splitSupplies(pro.supplies).map((itm) => (
                            <li>{itm}</li> 
                        ))} 
                        </ul>
                        <h1>Estimated Cost</h1>
                        <h3>$ {pro.cost}</h3>
                    </div>

                    <div className='project__externalLinks-container'>
                        <h2>External Resources: </h2>
                        <a href={pro.live_links}>{pro.live_links}</a>
                    </div>
                </>
            ))}

            <Footer />
            
        </body>
    )
}

export default Project
