import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

import { getProjects, editProject } from '../../store/project'

import './Update.css'




function UpdateProjectForm(){

    const { id } = useParams()
    console.log(`useParams`, id)

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)
    const projects = useSelector(state => Object.values(state?.project))

    const prevProject = projects?.filter((pro) => pro.id === +id)

    

    

    console.log(`previous`, prevProject)


    const [ title, setTitle ] = useState(prevProject[0]?.title);
    const [ instructions, setInstructions ] = useState(prevProject[0]?.instruction);
    const [ supplies, setSupplies ] = useState(prevProject[0]?.supplies);
    const [ cost, setCost ] = useState(prevProject[0]?.cost);
    const [ duration, setDuration ] = useState(prevProject[0]?.duration);
    const [ action, setAction ] = useState(prevProject[0]?.action);
    const [ type, setType ] = useState(prevProject[0]?.type);
    const [ image, setImage ] = useState(prevProject[0]?.image_url);
    const [ links, setLinks ] = useState(prevProject[0]?.live_links);


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

        

        const project = await dispatch(editProject(payload))

        console.log(project)
            if (project) {
                history.push(`/projects/${project.id}`)
            }
    };

    
    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch])

    const splitSupplies = (str) => {
        let items = str.split(',')
        return items

    }

    return (
        <div className='update__page-container'>
            <div className='update__project-form'>
                <h1>Update Your Project</h1>
                <form >
                    <label>Title</label>
                    <input value={title} onChange={updateTitle} placeholder='Title'></input>

                    <label>Instructions</label>
                    <textarea value={instructions} onChange={updateInstructions} placeholder='Instructions'></textarea>

                    <label>Supplies</label>
                    <textarea value={supplies} onChange={updateSupplies} placeholder='Supplies'></textarea>

                    <label>Cost</label>
                    <input value={cost} onChange={updateCost}  type='number' placeholder='Cost, must be numerical value'></input>

                    <label>Duration</label>
                    <input placeholder='ex: 30 min or 1 hour' value={duration} onChange={updateDuration}></input>

                    <label>Action</label>
                    <select placeholder='What are we getting into?' onChange={updateAction}>
                        <option value='DIY' >DIY</option>
                        <option value='Tidy up' >Tidy Up</option>
                        <option value='Deep Clean' >Deep Clean</option>
                        <option value='Complete Overhaul' >Complete Overhaul</option>
                        <option value='Decorate' >Decorate</option>
                    </select>

                    <label>Type</label>
                    <select onChange={updateType}>
                        <option value='Cleaning'> Cleaning </option>
                        <option value='Orginization'> Orginization </option>
                        <option value='Decor'> Decor </option>
                    </select>

                    <label>Image Url</label>
                    <input type='url' placeholder='Image Url' value={image} onChange={updateImage}></input>

                    <label>Live Links</label>
                    <input value={links} onChange={updateLinks}></input>

                    <button type='submit' onClick={handleSubmit} >Submit</button>
                </form>

                {/* <div className='image__preview'>
                    <img alt='Insert Image' className='create__image'src={image}></img>
                </div> */}
            </div>


            <div className='previous__project-container'>
                {prevProject.map((pro) => (
                    <>
                         <h1>{title}</h1>
                    <div className='project__image-container'><img className ='product__image' src={image}></img></div>

                    <div className='project__instructions-container'><p>{instructions}</p></div>

                    <div className='project__durationCost-container'>
                    <h2>Estimated Time to Complete</h2>
                        {duration}
                    </div>

                    <div className='project__supplies-container'>
                        <h1>Supply list</h1>
                        <ul>
                        {splitSupplies(pro.supplies).map((itm) => (
                            <li>{itm}</li> 
                        ))} 
                        </ul>
                        <h1>Estimated Cost</h1>
                        <h3>$ {cost}</h3>
                    </div>

                    <div className='project__externalLinks-container'></div>
                    </>
                ))}
            </div>
        </div>

    )
}

export default UpdateProjectForm
