import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


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
    const [ action, setAction ] = useState('');
    const [ type, setType ] = useState('');
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


    const handleSubmit = () => {

    }


    return (
        <>
            <h1>Create a New Project</h1>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input value={title} onChange={updateTitle} placeholder='Title'></input>

                <label>Instructions</label>
                <textarea value={instructions} onChange={updateInstructions} placeholder='Instructions'></textarea>

                <label>Supplies</label>
                <textarea value={supplies} onChange={updateSupplies} placeholder='Supplies'></textarea>

                <label>Cost</label>
                <input type='number' placeholder='Cost, must be numerical value'></input>

                <label>Duration</label>
                <input placeholder='ex: 30 min or 1 hour'></input>

                <label>Action</label>
                <select placeholder='What are we getting into?' onChange={updateAction}>
                    <option value='DIY' >DIY</option>
                    <option value='Tidy up' >Tidy Up</option>
                    <option value='Deep Clean' >Deep Clean</option>
                    <option value='Complete Overhaul' >Complete Overhaul</option>
                    <option value='Decorate' >Decorate</option>
                </select>

                <label>Type</label>
                <select>
                    <option value='Cleaning'> Cleaning </option>
                    <option value='Orginization'> Orginization </option>
                    <option value='Decor'> Decor </option>
                </select>

                <label>Image Url</label>
                <input type='url' ></input>

                <label>Live Links</label>
                <input></input>
            </form>

        </>

    )
}

export default CreateProjectForm
