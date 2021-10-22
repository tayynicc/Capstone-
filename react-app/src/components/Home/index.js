import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProjects } from '../../store/project';

import Footer from '../Footer'
// import Header from '../Header';
import SlideMenu from '../SlideMenu';


import './Home.css'



function Home(){
    const dispatch = useDispatch();

   const projects = useSelector((state) => Object.values(state.project))

   const cleaningProjects = projects.filter((project) => (
       project.type === "Cleaning"
   ))

   const orgProjects = projects.filter((project) => (
       project.type === "Orginization"
   ))

   const decorProjects = projects.filter((project) => (
       project.type === "Decor"
   ))


    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch])

    return(
        <div className='home__background'>
           <SlideMenu />

           <div className='top__logo-div'>
                <h1 className='logo'>ReNew Me</h1>
           </div>






           <div className='container-labels'>
                <h1>Cleaning</h1>
           </div>

           <div className='first__outter-container'>
                    {cleaningProjects.map((project) => (
                    <a className='anchor' href={`/projects/${project.id}`}>
                        <div className='tile__containers'>
                            <div>
                                <img className='tile-image' src={project.image_url}></img>
                            </div>
                            <div className='tile-title'>
                                <p>{project.title}</p>
                            </div>
                        </div></a>
                    )).reverse()}
           </div>


           <div className='container-labels'>
                <h1>Orginization</h1>
            </div>

           <div className='second__outter-container'>
                {orgProjects.map((project) => (
                    <a className='anchor' href={`/projects/${project.id}`}>
                        <div className='tile__containers'>
                            <div>
                                <img className='tile-image' src={project.image_url}></img>
                            </div>
                            <div className='tile-title'>
                                <p>{project.title}</p>
                            </div>
                        </div></a>

                    )).reverse()}
           </div>
            
           <div className='container-labels'>
                <h1>Decor</h1>
           </div>

           <div className='third__outter-container'>
                {decorProjects.map((project) => (
                    <a className='anchor' href={`/projects/${project.id}`}>
                        <div className='tile__containers'>
                            <div>
                                <img className='tile-image' src={project.image_url}></img>
                            </div>
                            <div className='tile-title'>
                                <p>{project.title}</p>
                            </div>
                        </div></a>

                    )).reverse()}

           </div>

            <Footer />
        </div>
        
    )
}


export default Home; 
