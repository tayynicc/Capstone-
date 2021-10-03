import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'

import { getProjects, editProject, getOneProject } from '../../store/project'

import './Update.css'




function UpdateProjectForm(){

    const { id } = useParams()
    console.log(`useParams`, id)

    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)
    const project = useSelector(state => Object.values(state.project))

    // const prevProject = projects

    const current = project.filter((pro) => (pro.id === +id))

    const [ pro ] = current

    console.log(`previous`, current[0])


    const [ title, setTitle ] = useState('');
    const [ instructions, setInstructions ] = useState(pro?.instruction);
    const [ supplies, setSupplies ] = useState(pro?.supplies);
    const [ cost, setCost ] = useState(pro?.cost);
    const [ duration, setDuration ] = useState(pro?.duration);
    const [ action, setAction ] = useState(pro?.action);
    const [ type, setType ] = useState(pro?.type);
    const [ image, setImage ] = useState(pro?.image_url);
    const [ links, setLinks ] = useState(pro?.live_links);

    // console.log(`state`, title)


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

        console.log(`loaad`,payload)
        

        const project = await dispatch(editProject(payload))

        // console.log(project)
            if (project) {
                history.push(`/projects/${project.id}`)
            }
    };

    // setTimeout(function(){ 
            
            console.log(`set timeout `); 
        // }, 50000);
        ;
    useEffect(() => {
        dispatch(getProjects()) 
       
        // dispatch(getOneProject(+id))
    }, [dispatch, id])

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

    console.log(`current title`,title)

    const splitSupplies = (str) => {
        let items = str.split(',')
        return items

    }

    console.log('title', title)

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


            {/* <div className='previous__project-container'>
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
            </div> */}
        </div>

    )
}

export default UpdateProjectForm
