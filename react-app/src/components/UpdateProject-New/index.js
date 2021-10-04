
// import UpdateProjectForm from '../UpdateProject'
import './UpdateProject-New.css'


import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import { getProjects, editProject, getOneProject } from '../../store/project'

import Header from '../Header'
import Footer from '../Footer'
import Comments from '../Comments'
import SlideMenu from '../SlideMenu'



function UpdateProjectNew (){
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();

    const project = useSelector((state) => Object.values(state.project)) 
    const user = useSelector((state) => state.session.user)

    // const oneProject = useSelector((state) => (state.one_project))

    console.log(`component check`, project)

    const current = project.filter((project => project.id === +id))

    // const [ current ] = project

    console.log(`current`, current)

    // const supplyArr = Object.values(stateProject?.supplies)


    const [ title, setTitle ] = useState('');
    const [ instructions, setInstructions ] = useState("");
    const [ supplies, setSupplies ] = useState('');
    const [ cost, setCost ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ action, setAction ] = useState(current?.action);
    const [ type, setType ] = useState('Cleaning');
    const [ image, setImage ] = useState("");
    const [ links, setLinks ] = useState('');
    const [errors, setErrors] = useState({});

    console.log(`state check`, title)

    const updateLinks = (e) => setLinks(e.target.value);


    const updateImage = (e) => {
        setImage(e.target.value);
        let tempErrors = {...errors}
        if(!e.target.value.length){
            tempErrors.image = 'Please provide Image url'
            setErrors(tempErrors)
        }else if(e.target.value.length >= 5) {
            delete tempErrors.image
            setErrors(tempErrors)
        }if(!e.target.value.includes('/')) {
            tempErrors.imageURL = 'Invalid Image url'
            setErrors(tempErrors)
        }else if (e.target.value.includes('/')){
            delete tempErrors.imageURL 
            setErrors(tempErrors)
        }
    }


    const updateTitle = (e) => {
        console.log(`title`, e.target.value.length)
        setTitle(e.target.value); 
         let tempErrors = {...errors}
        if(e.target.value.length < 1){
          tempErrors.title = 'Title must be longer than 5 characters.'
          setErrors(tempErrors)
        } else if(e.target.value.length >= 5) {
            delete tempErrors.title
            setErrors(tempErrors)
        }
        console.log(`err`, errors)
    }

    const updateDuration = (e) => {
        setDuration(e.target.value); 
         let tempErrors = {...errors}
        if(!e.target.value.length || e.target.value === 0){
          tempErrors.duration = 'Must provide Duration'
          setErrors(tempErrors)
        }else if(e.target.value > 59) {
            tempErrors.durationHours = 'If project excedes 60 minutes please enter an hour value'
            setErrors(tempErrors)
        }if (e.target.value.length){
            delete tempErrors.duration
            setErrors(tempErrors)
        }else if (e.target.value < 59){
            delete tempErrors.durationHours
            setErrors(tempErrors)
        }

    }

    const updateSupplies = (e) => {
        setSupplies(e.target.value); 

        const splitSupplies = supplies.split('')
        let tempErrors = {...errors}

        if(e.target.value.length < 5){
          tempErrors.suppliesLength = 'Supply list must contain one item.'
          setErrors(tempErrors)
        }else if(e.target.value.length >= 5){
            delete tempErrors.suppliesLength
            setErrors(tempErrors)
        }
        if(!e.target.value.includes(',')){
            tempErrors.suppliesFormat = 'Items must be seperated by a comma.'
            setErrors(tempErrors)
        }else if(e.target.value.includes(',')){
            delete tempErrors.suppliesFormat
            setErrors(tempErrors)
        }
        
    }

    const updateInstructions = (e) => {
        setInstructions(e.target.value); 
         let tempErrors = {...errors}
        if(!e.target.value.length){
          tempErrors.instructions = 'Please Provide Instructions'
          setErrors(tempErrors)
        } else if(e.target.value.length) {
            delete tempErrors.instructions
            setErrors(tempErrors)
        }
    }

    const updateCost = (e) => {
        setCost(e.target.value); 

        let tempErrors = {...errors}

        if(e.target.value < 1){
            tempErrors.cost = 'Cost must be more than 0.'
            tempErrors.costNegitive = 'Cost can not be a negitive number.'
            setErrors(tempErrors)
        }else if (e.target.value >= 1 ){
            delete tempErrors.cost
            delete tempErrors.costNegitive
            setErrors(tempErrors)
        }
    }


    const splitSuppliesEdit = (str) => {
        // console.log(`supplies intake`,str)
        // let items = str.split(',')
        // console.log(`returned`, items)
        // // reflectUpdate('supplies')
        // // console.log(`state`, supplies)
        return str

    }


    // const project = projects.filter((singleProject) => singleProject.id === +id)

    

    useEffect(() => {
    //    dispatch(getOneProject(+id));
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

        const editInst = document.getElementById('edit-inst-container')
        const editInstBtn = document.getElementById('edit-inst-btn')
        const editInstToggleBtn = document.getElementById('inst-btns')

        const editLinks = document.getElementById('edit-links-field')
        const editLinksBtn = document.getElementById('edit-links-btn')
        const editLinksToggleBtn = document.getElementById('links-btns')

        const editCostBtn = document.getElementById('edit-cost-btn')
        const editCost = document.getElementById('edit-cost-field')

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
        }if(field === 'inst'){
            editInst.classList.remove('hidden')
            editInstBtn.classList.add('hidden')
            editInstToggleBtn.classList.remove('hidden')
        }if(field === 'links'){
            editLinks.classList.remove('hidden')
            editLinksBtn.classList.add('hidden')
            editLinksToggleBtn.classList.remove('hidden')
        }
        if(field === 'cost'){
            editCost.classList.remove('hidden')
            editCostBtn.classList.add('hidden')
            // editLinksToggleBtn.classList.remove('hidden')
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

        const editInst = document.getElementById('inst-btns')
        const editInstBtn = document.getElementById('edit-inst-btn')
        const editInstDisplay = document.getElementById('edit-inst-container')
        
        const editCostBtn = document.getElementById('edit-cost-btn')
        const editCost = document.getElementById('edit-cost-field')
        
        const editLinks = document.getElementById('edit-links-field')
        const editLinksBtn = document.getElementById('edit-links-btn')
        const editLinksToggleBtn = document.getElementById('links-btns')


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
        }if(field === 'inst'){
            editInst.classList.add('hidden')
            editInstBtn.classList.remove('hidden')
            editInstDisplay.classList.add('hidden')
        }if(field === 'cost'){
            editCost.classList.add('hidden')
            editCostBtn.classList.remove('hidden')
        }
        if(field === 'links'){
            editLinks.classList.add('hidden')
            editLinksBtn.classList.remove('hidden')
            editLinksToggleBtn.classList.add('hidden')
        }
        
    }

    const reflectUpdate = (field) => {

        console.log('reflect', field)

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
        const updatedDisplay = document.getElementById('supply-list-updated')

        const editInst = document.getElementById('inst-btns')
        const editInstBtn = document.getElementById('edit-inst-btn')
        const editInstDisplay = document.getElementById('edit-inst-container')
        const instDisplay = document.getElementById('inst-display')

        const editLinks = document.getElementById('edit-links-field')
        const editLinksBtn = document.getElementById('edit-links-btn')
        const editLinksToggleBtn = document.getElementById('links-btns')
        const linksDisplay = document.getElementById('links-display')

        const editCostBtn = document.getElementById('edit-cost-btn')
        const editCost = document.getElementById('edit-cost-field')
        const costDisplay = document.getElementById('cost-display')

        if(field === 'title'){
            checkTitle(title)
            titleDisplay.innerHTML = title
            editTitle.classList.add('hidden')
            editTitleBtn.classList.remove('hidden')
        }if(field === 'duration'){
            checkDuration(duration)
            durationDisplay.innerHTML = duration
            editDuration.classList.add('hidden')
            editDurationBtn.classList.remove('hidden')
        }if(field === 'image'){
            checkImage(image)
            // imageDisplay.innerHTML = image
            editImage.classList.add('hidden')
            editImageBtn.classList.remove('hidden')
        }if(field === 'supplies'){
            checkSupplies(supplies)
            supplyDisplay.innerHTML = supplies
            editSupplies.classList.add('hidden')
            editSuppliesBtn.classList.remove('hidden')
            updatedDisplay.classList.remove('hidden')
        }if(field === 'inst'){
            checkInstructions(instructions)
            instDisplay.innerHTML = instructions
            editInstBtn.classList.remove('hidden')
            editInstDisplay .classList.add('hidden')
            editInst.classList.add('hidden')
        }if(field === 'links'){
            checkLinks(links)
            linksDisplay.innerHTML = links
            editLinksBtn.classList.remove('hidden')
            editLinksToggleBtn.classList.add('hidden')
            editLinks.classList.add('hidden')
        }if(field === 'cost'){
            checkCost(cost)
            costDisplay.innerHTML = `$ ${cost}`
            editCostBtn.classList.remove('hidden')
            // editLinksToggleBtn.classList.add('hidden')
            editCost.classList.add('hidden')
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: +user.id,
            id: +id,
            title, 
            instruction:instructions,
            supplies,
            cost,
            duration,
            action,
            type,
            image_url: image,
            live_links: links, 
            created_at: new Date(),
            updated_at: new Date()
        };

        
        console.log('11',payload)
        const project = await dispatch(editProject(payload))

        console.log(`project in payload`,payload)
            if (project) {
                history.push(`/projects/${project.id}`)
            }
    };

    useEffect(() => {
        setTitle(current[0]?.title)
        setInstructions(current[0]?.instruction)
        setSupplies(current[0]?.supplies)
        setCost(current[0]?.cost)
        setDuration(current[0]?.duration)
        setAction(current[0]?.action)
        setType(current[0]?.type)
        setImage(current[0]?.image_url)
        setLinks(current[0]?.live_links)
    }, [current[0]])

    // console.log(`current title`,title)

    const currentErrors = Object.values(errors)

    const checkTitle = (e) => {
        
        if(e === title){
            window.alert('Title was not changed.')
        }
    }

    const checkDuration = (e) => {
        if(e === duration){
            window.alert('Duration was not changed.')
        }
    }

    const checkImage = (e) => {
        if(e === image){
            // window.alert('Image was not changed.')
        }
    }

    const checkInstructions = (e) => {
        if(e === instructions){
            window.alert('Instructions were not changed.')
        }
    }

    const checkSupplies = (e) => {
        if(e === supplies){
            window.alert('Supplies not changed.')
        }
    }

    const checkCost = (e) => {
        if(e === cost){
            window.alert('Cost was not changed.')
        }
    }

    const checkLinks = (e) => {
        if(e === links){
            window.alert('Live links were not changed.')
        }
    }





   return (
        <body className='project-body'>
            {/* <Header />  */}
            <SlideMenu />
            
           <div className='update__errors-container'>
             <ul>
                {currentErrors.map((err) => (
                    <li>{err}</li>
                ))}
            </ul>
           </div>


            <button className='update__item' onClick={handleSubmit} >Submit Edits</button>

            {current.map((pro) => (
                <>
                    <div className='project__title-container'>
                        <h1 id='title-display' >{pro.title}</h1>
                        <div className='edit__title-field hidden' id='edit-title'>
                            
                            <form onSubmit={checkTitle}>
                                <input  className='edit__title-input' placeholder='update title here' value={title} onChange={updateTitle} required></input>
                            </form>
                            <div className='edit__button-container'>
                                <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('title'))}>Cancel</button>
                                <button id='done-editing' className='done__edit' onClick={(() => reflectUpdate('title'))} type='submit'>Done</button>
                            </div>
                            
                            
                        
                        </div>

                        <button className='edit__title-btn btns' id='edit-title-btn' onClick={(() => showEdit('title'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        

                    </div>
                    

                    <div className='project__image-outterContainer'>
                        <div className='project__image-innerContainer'>
                            <img className ='product__image' src={pro.image_url}></img>
                            
                        </div>  
                            
                            <img className='update__image-preview' src={image}></img>

                        <div className='edit__image-container hidden' id='edit-image-container'>
                            <form>
                                <input placeholder='Edit Image Url here' type='url'  onChange={updateImage} ></input>
                            </form>
                            <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('image'))}>Cancel</button>
                            <button  id='done-editing' className='done__edit' onClick={(() => reflectUpdate('image'))}>Done</button>
                            
                        </div>
                        <button className='edit__imag-btn btns' id='edit-image-btn' onClick={(() => showEdit('image'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        

{/* 
                        <div className='save-project-tile'>
                            <button id='save-button'  onClick={() => saveProject(pro)} className='save__button' >Save This Project! <img src="https://img.icons8.com/ios-glyphs/30/000000/like--v2.png"/></button>
                        </div> */}


                        <div className='duration-update'>
                           <h2>Estimated Time to Complete: </h2>
                            <h4 id='duration-display'>{pro.duration}</h4> 
                            <div className='edit__duration-field hidden' id='edit-duraiton'>
                            <form >
                                <input className='' placeholder={duration} value={duration} onChange={updateDuration}></input>
                            </form>
                                <div className='edit__button-container time'>
                                   <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('duration'))}>Cancel</button>
                                    <button id='done-editing' className='done__edit' type='submit' onClick={(() => reflectUpdate('duration'))}>Done</button> 
                                </div>
                                
                                
                                
                            </div>
                            <button className='edit__duration-btn btns' id='edit-duration-btn' onClick={(() => showEdit('duration'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                        </div>

                    </div>
                    








                    <div className='inst__label-container'>
                    <h1 className='project__inst-label'>Instructions</h1>
                    <button className='edit__inst-btn btns' id='edit-inst-btn' onClick={(() => showEdit('inst'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                    </div>

                    <div className='instructions__outter-container'>
                        <div className='project__instructions-container-update' id='inst-display'>
                            <p>{pro.instruction}</p>


                            
                            {/* <button><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button> */}
                            {/* <button><img src="https://img.icons8.com/color/48/000000/cancel--v1.png"/></button> */}
                        </div>
                        <div className='instructions__edit-buttons '>

                            <div className='edit__button-container hidden' id='inst-btns'>
                                <button id='done-editing' className='done__edit' onClick={(() => reflectUpdate('inst'))}>Done</button> 
                                <button id='close-inst-edit' className='edit__cancel-btn' onClick={(() => closeEdit('inst'))}>Cancel</button>
                            </div>
                        </div>        

                        <div className='inner__edit-input'>
                            <textarea placeholder={instructions} className='instructions__input-field hidden' id='edit-inst-container' value={instructions} onChange={updateInstructions}></textarea>
                        </div>
                    </div>
                

                <div className='project__supplies-container-update'>
                <div className='supply-list-update'>
                            <h1 className='supply__list-label' >Supply list</h1>
                            <ul className='supply__list-update' id='supply-list'>
                            {splitSupplies(pro.supplies).map((itm) => (
                                <li>{itm}</li> 
                            ))} 
                            </ul>
                            <div id='edit-supplies' className='edit__supplyList-field hidden'>
                              <textarea  className='edit__supplyList-input' value={supplies} onChange={updateSupplies}></textarea>

                                <div className='edit__button-container'>
                                    <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('supplies'))}>Cancel</button>
                                    <button id='done-editing' className='done__edit' onClick={(() => reflectUpdate('supplies'))}>Done</button>
                                </div>  
                            </div>

                            <ul className='supply__list-update-edit hidden' id='supply-list-updated'>
                            {/* {splitSuppliesEdit(supplies).map((itm) => (
                                <li>{itm}</li> 
                            ))} */}
                            </ul> 

                            <button className='edit__supplies-btn btns' id='edit-supplies-btn' onClick={(() => showEdit('supplies'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>
                            
                        </div>
                         
                        <div className='cost-container-update'>
                            <h1>Estimated Cost: </h1>
                            <h3 id='cost-display'>$ {pro.cost}</h3>  

                            <button className='edit__cost-btn btns' id='edit-cost-btn' onClick={(() => showEdit('cost'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button> 

                            <div className='edit__cost-container hidden' id='edit-cost-field'>
                                <input value={cost} onChange={updateCost} placeholder={cost}></input>

                                <div className='updateCost-btns'>
                                    <button id='cancel-edit-btn' className='edit__cancel-btn' onClick={(() => closeEdit('cost'))}>Cancel</button>
                                    <button id='done-editing' className='done__edit' onClick={(() => reflectUpdate('cost'))}>Done</button>
                                </div>
                            </div>

                           
                        </div>
                         
                        
                    </div> 

                    <div className='project__externalLinks-container'>
                        <h2>External Resources: </h2>
                        <a id='links-display' href={links}>{pro.live_links}</a>



                        <button className='edit__links-btn btns' id='edit-links-btn' onClick={(() => showEdit('links'))}><img src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"/></button>


                        <input id='edit-links-field' className='edit-links-input-field hidden' value={links} onChange={updateLinks} placeholder={links} type='url'></input>

                        <div className='edit__button-container links hidden' id='links-btns'>
                                <button id='done-editing' className='done__edit' onClick={(() => reflectUpdate('links'))}>Done</button> 
                                <button id='close-links-edit' className='edit__cancel-btn' onClick={(() => closeEdit('links'))}>Cancel</button>
                        </div>
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
