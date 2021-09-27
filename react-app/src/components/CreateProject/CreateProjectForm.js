import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createOneProject } from '../../store/project'


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


    const updateTitle = (e) => setTitle(e.target.value);
    const updateInstructions = (e) => setInstructions(e.target.value);
    const updateSupplies = (e) => setSupplies(e.target.value);
    const updateCost = (e) => setCost(e.target.value);
    const updateDuration = (e) => setDuration(e.target.value);
    const updateAction = (e) => setAction(e.target.value);
    const updateType = (e) => setType(e.target.value);
    const updateImage = (e) => setImage(e.target.value);
    const updateLinks = (e) => setLinks(e.target.value);


    console.log(typeof user.id)
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

        const project = await dispatch(createOneProject(payload))

        console.log(project)
            if (project) {
                history.push(`/projects/${project.id}`)
            }
    };


    return (
        <>
           
            <form className='create__form'>
                <div className='create__form-label-container'>
                    <label className='create__form-label'>Title</label>
                </div>

                <input className='create__form-input' value={title} onChange={updateTitle} placeholder='Title'></input>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Instructions</label>
                </div>

                <textarea className='create__form-input' value={instructions} onChange={updateInstructions} placeholder='Instructions'></textarea>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Supplies</label>
                </div>
                <textarea className='create__form-input' value={supplies} onChange={updateSupplies} placeholder='Supplies'></textarea>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Cost</label>
                </div>
                <input  className='create__form-input' value={cost} onChange={updateCost}  type='number' placeholder='Cost, must be numerical value'></input>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Duration</label>
                </div>
                <input placeholder='ex: 30 min or 1 hour' className='create__form-input' value={duration} onChange={updateDuration}></input>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Action</label>
                </div>

                <select className='create__form-input' placeholder='What are we getting into?' onChange={updateAction}>
                    <option value='DIY' >DIY</option>
                    <option value='Tidy up' >Tidy Up</option>
                    <option value='Deep Clean' >Deep Clean</option>
                    <option value='Complete Overhaul' >Complete Overhaul</option>
                    <option value='Decorate' >Decorate</option>
                </select>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Type</label>
                </div>

                <select className='create__form-input' onChange={updateType}>
                    <option value='Cleaning'> Cleaning </option>
                    <option value='Orginization'> Orginization </option>
                    <option value='Decor'> Decor </option>
                </select>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Image Url</label>
                </div>
                <input className='create__form-input' type='url' placeholder='Image Url' value={image} onChange={updateImage}></input>

                <div className='create__form-label-container'>
                    <label className='create__form-label'>Live Links</label>
                </div>
                <input className='create__form-input' value={links} onChange={updateLinks}></input>

                <button type='submit' onClick={handleSubmit} >Submit</button>
            </form>

            <div className='image__preview'>
                <img alt='Insert Image' className='create__image'src={image}></img>
            </div>

        </>

    )
}

export default CreateProjectForm
