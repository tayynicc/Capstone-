import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


import { createOneProject } from '../../store/project'

import Header from '../Header'
import SlideMenu from '../SlideMenu'
import './CreateProject.css'


function CreateProjectForm(){

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

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


    const updateAction = (e) => setAction(e.target.value);
    const updateType = (e) => setType(e.target.value);
    // const updateImage = (e) => setImage(e.target.value);
    const updateLinks = (e) => setLinks(e.target.value);

    
    const updateTitle = (e) => {
        setTitle(e.target.value); 
        let tempErrors = {...errors}

        // console.log(`title`,e.target.value.length)
        if(!e.target.value.length || title === ''){
          tempErrors.title = 'Title must be longer than 5 characters.'
          setErrors(tempErrors)
        } else if(e.target.value.length >= 5) {
            delete tempErrors.title
            setErrors(tempErrors)
        }
    }

    const updateInstructions = (e) => {
        console.log(`inst`,instructions.length)
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

    const updateSupplies = (e) => {
        setSupplies(e.target.value); 

        const splitSupplies = e.target.value.split('')
        let tempErrors = {...errors}

        if(e.target.value.length < 5){
          tempErrors.suppliesLength = 'Supply list must contain one item.'
          setErrors(tempErrors)
        }else if(e.target.value.length >= 5){
            delete tempErrors.suppliesLength
            setErrors(tempErrors)
        }
        if(!splitSupplies.includes(',')){
            tempErrors.suppliesFormat = 'Items must be seperated by a comma. If only one item place comma after item: item,'
            setErrors(tempErrors)
        }else if(splitSupplies.includes(',')){
            delete tempErrors.suppliesFormat
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

    const updateDuration = (e) => {
        setDuration(e.target.value); 
         let tempErrors = {...errors}
         console.log(`dur`,e.target.value.length)
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
    
    // const updateImage = (e) => {
    //     setImage(e.target.value); 
    //     let tempErrors = {...errors}

    //     const validChar = []

    //     const url = 'http://www.google.com';
    //     const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(image);

    //     console.log(image)
    //     console.log(`url chck`, valid)
    //     // if(!title.length ){
    //     //   tempErrors.title = 'Title must be longer than 5 characters.'
    //     //   setErrors(tempErrors)
    //     // } else if(title.length > 5) {
    //     //     // console.log(`hitting`)
    //     //     delete tempErrors.title
    //     //     setErrors(tempErrors)
    //     // }
    // }




    console.log(`errors`, errors)

    const currentErrors = Object.values(errors)
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: +user.id,
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

        console.log(`load`,payload)
        console.log(`err`, errors)
     
        if(title === '' || instructions === '' || supplies === '' || cost === 0 || duration === 0 || action === '' || image === '' || links === ''){
            // let tempErrors = {...errors}
            // tempErrors.validData = 'Empty field detected. Please fill out all fields before submission'
            // setErrors(tempErrors)
            // if (title !== '' && duration !== 0 ){
            //     delete tempErrors.validData
            //     setErrors(tempErrors)
            //     if(!Object.keys(errors).length){
            //     const project = await dispatch(createOneProject(payload))
            //         if (project) {
            //             history.push(`/projects/${project.id}`)
            //         } 
            // }
            // }

            window.alert('Empty field detected. Please fill out all fields before submission')
            
            // console.log('here',title, instructions, supplies, cost, supplies, cost, duration, action, image, links )
        } else if (title !== '' && duration !== 0){
            // let tempErrors = {...errors}
            if(!Object.keys(errors).length){
                const project = await dispatch(createOneProject(payload))
                    if (project) {
                        history.push(`/projects/${project.id}`)
                    } 
            }
        
        }
        
        
    };

    // console.log(`new item title`,title)


    return (
        <>
            {/* <h1>Create a New Project</h1> */}
            <SlideMenu />
            <Header />

            <div className='page__container'>
            <div className='create__errors'>
                <ul> 
                    {currentErrors.map((err) => (
                        <li>{err}</li>
                    ))}
                
                </ul> 
            </div> 
            <div className='form__container'>
           
            <form >
                <div className ='form__left'>
                    <div className='form__label-input'>
                        <label className='create__form-label'>Title</label>
                        <input className='create__input' value={title} onChange={updateTitle} placeholder='Title' type='text'required={true} ></input>
                    </div>

                    <div className='form__label-input'>
                        <label className='create__form-label'>Instructions</label>
                        <textarea className='create__input' value={instructions} onChange={updateInstructions} placeholder='Instructions' type='text' required></textarea>
                    </div>

                    <div className='form__label-input'>
                        <label className='create__form-label'>Supplies</label>
                        <textarea className='create__input' value={supplies} onChange={updateSupplies} placeholder='Supplies' required></textarea>
                    </div>

                    <div className='form__label-input'>
                        <label className='create__form-label'> Cost</label>
                        <input className='create__input' value={cost} onChange={updateCost}  min='0' max='1000' type='number' placeholder='Cost, must be numerical value' required></input>
                    </div>
                </div>

                <div className='form__right'>
                    <div className='form__label-input'>
                        <label className='create__form-label' >Duration</label>
                        <input className='create__input' placeholder='ex: 30 min or 1 hour' min='0' max='59' type='number' value={duration} onChange={updateDuration} required={true}></input>
                    </div>

                    <div className='form__label-input'>
                        <label className='create__form-label'>Action</label>
                        <select className='create__input' placeholder='What are we getting into?' onChange={updateAction} required={true}>
                            <option value='DIY' >DIY</option>
                            <option value='Tidy up' >Tidy Up</option>
                            <option value='Deep Clean' >Deep Clean</option>
                            <option value='Complete Overhaul' >Complete Overhaul</option>
                            <option value='Decorate' >Decorate</option>
                        </select>
                    </div>

                    <div className='form__label-input'>
                    <label className='create__form-label'>Type</label>
                        <select className='create__input' onChange={updateType} required={true}>
                            <option value='Cleaning'> Cleaning </option>
                            <option value='Orginization'> Orginization </option>
                            <option value='Decor'> Decor </option>
                        </select>
                    </div>

                    <div className='form__label-input'>
                        <label className='create__form-label' >Image Url</label>
                        <input className='login__input' type='url' placeholder='Image Url' value={image} onChange={updateImage} required={true}></input>
                    </div>

                    <div >
                        <label className='create__form-label' >Live Links</label>
                        <input className='login__input' value={links} onChange={updateLinks} required={true}></input>
                    </div>
                </div>
                <button className='create__project-btn' type='submit' onClick={handleSubmit} >Submit</button>
            </form>

            
            </div>
            
            <div className='image__preview'>
                <img alt='Insert url' className='create__image' src={image}></img>
            </div>
            </div>
        </>

    )
}

export default CreateProjectForm
