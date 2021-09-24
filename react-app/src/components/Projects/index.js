import './Project.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getProjects } from '../../store/project'

import Header from '../Header'


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

    

    return (
        <>
            <Header /> 
            {project.map((pro) => (
                <>
                    <h1>{pro.title}</h1>
                    <div className='project__image-container'><img className ='product__image' src={pro.image_url}></img></div>

                    <div className='project__instructions-container'><p>{pro.instruction}</p></div>

                    <div className='project__durationCost-container'>
                    <h2>Estimated Time to Complete</h2>
                        {pro.duration}
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

                    <div className='project__externalLinks-container'></div>
                </>
            ))}
            
        </>
    )
}

export default Project
