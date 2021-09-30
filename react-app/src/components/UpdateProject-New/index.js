
// import UpdateProjectForm from '../UpdateProject'
import './UpdateProject-New.css'


import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getProjects } from '../../store/project'

import Header from '../Header'
import Footer from '../Footer'
import Comments from '../Comments'
import SlideMenu from '../SlideMenu'



function UpdateProjectNew (){
    const { id } = useParams()
    const dispatch = useDispatch();

    const projects = useSelector((state) => Object.values(state.project)) 
    const user = useSelector((state) => state.session.user)

    const [ title, setTitle ] = useState('');
    const [ instructions, setInstructions ] = useState('');
    const [ supplies, setSupplies ] = useState('');
    const [ cost, setCost ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ action, setAction ] = useState('DIY');
    const [ type, setType ] = useState('Cleaning');
    const [ image, setImage ] = useState('');
    const [ links, setLinks ] = useState('');
    const [errors, setErrors] = useState({});


    const updateTitle = (e) => {
        console.log()
        setTitle(e.target.value); 
         let tempErrors = {...errors}
        if(!title.length ){
          tempErrors.title = 'Title must be longer than 5 characters.'
          setErrors(tempErrors)
        } else if(title.length > 5) {
            delete tempErrors.title
            setErrors(tempErrors)
        }
    }

    const updateDuration = (e) => {
        setDuration(e.target.value); 
         let tempErrors = {...errors}
        if(!duration.length || duration === 0){
          tempErrors.duration = 'Must provide Duration'
          setErrors(tempErrors)
        }else if(duration > 59) {
            tempErrors.durationHours = 'If project excedes 60 minutes please enter an hour value'
            setErrors(tempErrors)
        }if (duration.length){
            delete tempErrors.duration
            setErrors(tempErrors)
        }else if (duration < 59){
            delete tempErrors.durationHours
            setErrors(tempErrors)
        }

    }

    const updateSupplies = (e) => {
        setSupplies(e.target.value); 

        const splitSupplies = supplies.split('')
        let tempErrors = {...errors}

        if(supplies.length < 5){
          tempErrors.suppliesLength = 'Supply list must contain one item.'
          setErrors(tempErrors)
        }else if(supplies.length >= 5){
            delete tempErrors.suppliesLength
            setErrors(tempErrors)
        }
        if(!splitSupplies.includes(',')){
            tempErrors.suppliesFormat = 'Items must be seperated by a comma.'
            setErrors(tempErrors)
        }else if(splitSupplies.includes(',')){
            delete tempErrors.suppliesFormat
            setErrors(tempErrors)
        }
        
    }

    const project = projects.filter((singleProject) => singleProject.id === +id)



    useEffect(() => {
        // dispatch(getOneProject(id));
        dispatch(getProjects())
    }, [dispatch, id])

    const splitSupplies = (str) => {
        let items = str.split(',')
        return items

    }

    const saveProject = async (project) => {
   
        const payload = {
            user_id: +user.id, 
            project_id: id,
         
        }

        // await dispatch(addProject(payload))
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

    const showEdit = (field) => {
        

        const editTitle = document.getElementById('edit-title')
        const editTitleBtn = document.getElementById('edit-title-btn')

        const editDuration = document.getElementById('edit-duraiton')
        const editDurationBtn = document.getElementById('edit-duration-btn')

        const editImage = document.getElementById('edit-image-container')
        const editImageBtn = document.getElementById('edit-image-btn')

        const editSupplies = document.getElementById('edit-supplies')
        const editSuppliesBtn = document.getElementById('edit-supplies-btn')
        const supplyDisplay= document.getElementById('supply-list')

        if(field === 'title'){
            editTitle.classList.remove('hidden')
            editTitleBtn.classList.add('hidden')
            
        }if(field === 'duration'){
            editDuration.classList.remove('hidden')
            editDurationBtn.classList.add('hidden')
        }if(field === 'image'){
            editImage.classList.remove('hidden')
            editImageBtn.classList.add('hidden')
        }if(field === 'supplies'){
            editSupplies.classList.remove('hidden')
            editSuppliesBtn.classList.add('hidden')
            supplyDisplay.innerHTML = ''
        }
    }

    const closeEdit = (field) => {
        
        const editTitle = document.getElementById('edit-title')
        const editTitleBtn = document.getElementById('edit-title-btn')

        const editDuration = document.getElementById('edit-duraiton')
        const editDurationBtn = document.getElementById('edit-duration-btn')

        const editImage = document.getElementById('edit-image-container')
        const editImageBtn = document.getElementById('edit-image-btn')

        const editSupplies = document.getElementById('edit-supplies')
        const editSuppliesBtn = document.getElementById('edit-supplies-btn')
        const supplyDisplay= document.getElementById('supply-list')


        if(field === 'title'){
            editTitle.classList.add('hidden')
            editTitleBtn.classList.remove('hidden')
        }if(field === 'duration'){
            editDuration.classList.add('hidden')
            editDurationBtn.classList.remove('hidden')
        }if(field === 'image'){
            editImage.classList.add('hidden')
            editImageBtn.classList.remove('hidden')
        }if(field === 'supplies'){
            editSupplies.classList.add('hidden')
            editSuppliesBtn.classList.remove('hidden')
            supplyDisplay.innerHTML = supplies
        }
        
    }

    const reflectUpdate = (field) => {

        const editTitle = document.getElementById('edit-title')
        const editTitleBtn = document.getElementById('edit-title-btn')
        const titleDisplay = document.getElementById('title-display')

        const editDuration = document.getElementById('edit-duraiton')
        const editDurationBtn = document.getElementById('edit-duration-btn')
        const durationDisplay = document.getElementById('duration-display')

        const editImage = document.getElementById('edit-image-container')
        const editImageBtn = document.getElementById('edit-image-btn')

        const editSupplies = document.getElementById('edit-supplies')
        const editSuppliesBtn = document.getElementById('edit-supplies-btn')
        const supplyDisplay= document.getElementById('supply-list')

        if(field === 'title'){
            titleDisplay.innerHTML = title
            editTitle.classList.add('hidden')
            editTitleBtn.classList.remove('hidden')
        }if(field === 'duration'){
            durationDisplay.innerHTML = duration
            editDuration.classList.add('hidden')
            editDurationBtn.classList.remove('hidden')
        }if(field === 'image'){
            // imageDisplay.innerHTML = image
            editImage.classList.add('hidden')
            editImageBtn.classList.remove('hidden')
        }if(field === 'supplies'){
            supplyDisplay.innerHTML = supplies
            editSupplies.classList.add('hidden')
            editSuppliesBtn.classList.remove('hidden')
        }
        
    }

    

    return (
        <body className='project-body'>
            {/* <Header />  */}
            <SlideMenu />
            {project.map((pro) => (
                <>
                    <div className='project__title-container'>
                        <h1 id='title-display' >{pro.title}</h1>
                        <div className='edit__title-field hidden' id='edit-title'>
                            
                            <input  className='edit__title-input' placeholder='Update Title Here!' values={title} onChange={updateTitle}></input>
                            
                            <div className='edit__button-container'>
                                <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('title'))}>Cancel</button>
                                <button id='done-editing' onClick={(() => reflectUpdate('title'))}>Done</button>
                            </div>
                            
                            
                        
                        </div>

                        <button className='edit__title-btn btns' id='edit-title-btn' onClick={(() => showEdit('title'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        

                    </div>
                    

                    <div className='project__image-outterContainer'>
                        <div className='project__image-innerContainer'>
                            <img className ='product__image' src={pro.image_url}></img>
                            
                        </div>  

                        <div className='edit__image-container hidden'     id='edit-image-container'>
                            <input placeholder='Edit Image Url here' ></input>
                            <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('image'))}>Cancel</button>
                            <button  id='done-editing' onClick={(() => reflectUpdate('image'))}>Done</button>
                            
                        </div>
                        <button className='edit__imag-btn btns' id='edit-image-btn' onClick={(() => showEdit('image'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        


                        <div className='save-project-tile'>
                            <button id='save-button'  onClick={() => saveProject(pro)} className='save__button' >Save This Project! <img src="https://img.icons8.com/ios-glyphs/30/000000/like--v2.png"/></button>
                            
                            
                        </div>


                        <div className='duration'>
                           <h2>Estimated Time to Complete: </h2>
                            <h4 id='duration-display'>{pro.duration} Minutes</h4> 
                            <div className='edit__duration-field hidden' id='edit-duraiton'>
                                <input className='' placeholder='Edit Duration Here!' values={duration} onChange={updateDuration}></input>

                                <div className='edit__button-container time'>
                                   <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('duration'))}>Cancel</button>
                                    <button id='done-editing' onClick={(() => reflectUpdate('duration'))}>Done</button> 
                                </div>
                                
                                
                                
                            </div>
                            <button className='edit__duration-btn btns' id='edit-duration-btn' onClick={(() => showEdit('duration'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        </div>

                    </div>
                    









                    <h1 className='project__inst-label'>Instructions</h1>

                    <div className='project__instructions-container'>
                        <p>{pro.instruction}</p>


                        <input placeholder='Update Instructions Here!'></input>
                        <button><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        <button><img src="https://img.icons8.com/color/48/000000/cancel--v1.png"/></button>
                    </div>

                

                    <div className='project__supplies-container'>
                        <div className='supply-list'>
                            <h1>Supply list</h1>
                            <ul id='supply-list'>
                            {splitSupplies(pro.supplies).map((itm) => (
                                <li>{itm}</li> 
                            ))} 
                            </ul>
                            <div id='edit-supplies' className='edit__supplyList-field hidden'>
                              <textarea  className='edit__supplyList-input' placeholder='Edit Supply List Here!' values={supplies} onChange={updateSupplies}></textarea>

                                <div className='edit__button-container'>
                                    <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('supplies'))}>Cancel</button>
                                    <button id='done-editing' onClick={(() => reflectUpdate('supplies'))}>Done</button>
                                </div>  
                            </div>

                            <button className='edit__supplies-btn btns' id='edit-supplies-btn' onClick={(() => showEdit('supplies'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                            
                        </div>
                        
                        <div className='cost-container'>
                            <h1>Estimated Cost: </h1>
                            <h3>$ {pro.cost}</h3>  

                            {/* <input placeholder='Update Cost Here!'></input>
                            <button><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                            <button><img src="https://img.icons8.com/color/48/000000/cancel--v1.png"/></button> */}
                        </div>
                        
                        
                    </div>

                    <div className='project__externalLinks-container'>
                        <h2>External Resources: </h2>
                        <a href={pro.live_links}>{pro.live_links}</a>

                        <input placeholder='Edit Live Links Here!'></input>
                        <button><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        <button><img src="https://img.icons8.com/color/48/000000/cancel--v1.png"/></button>
                    </div>
                </>
            ))}

            <div className='review__outter-container'>
                <Comments />
            </div>

            <Footer />
            
        </body>
    )
}


export default UpdateProjectNew
