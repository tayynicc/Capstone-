import './Comments.css'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getReviews, createOneReview, deleteReview, editReview} from '../../store/review'


function Comments(){

    const { id } = useParams()
    const dispatch = useDispatch()

    
    const [users, setUsers] = useState([]);
    const [ review, setReview ] = useState('');
    const [ errors, setErrors ] = useState('')

    

    const updateReview = (e) => {
        setReview(e.target.value)
        if(e.target.value.length <= 0 ){
            setErrors("Input area has no content")
        }
        if (review.length > 0){
            setErrors('')
        }
    }; 

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  

    const reviews = useSelector((state) => Object.values(state.review)) 

    const sessionUser = useSelector((state) => state.session).user
    

    const projectReviews = reviews.filter((review) => review.project_id === +id)

    const getUsername = (id) => {
        const user = users?.filter((user) => (
            user.id === id 
        ))

        const [ usr ] = user
       
        return usr?.username
    }


    
    
    const handleSubmit = async (e) => {
        console.log(`posting comment`, sessionUser.id)
        e.preventDefault();

        if(review.length <= 0 ){
            setErrors("Input area has no content")
        }
        
        
        
        const payload = {
           
            project_id: +id,
            user_id: sessionUser.id,
            body: review,
            created_at: new Date(),
            updated_at : new Date ()
        }

        
        if(review.length !== 0){
            await dispatch(createOneReview(payload))
            setReview('')
        }
    }

    const handleDelete = (id) => {
        console.log(`deleting`)
        dispatch(deleteReview(Number(id)))
    }

    const updateComment = (id) => {
        
        console.log(`button click`)

        const p = document.getElementById('prev__comment')
        const body = document.getElementById(`comment__text-${id}`)
        const done = document.getElementById(`done__btn-${id}`)

        if (body.classList.contains('read-only')){
            body.classList.add('read-only')
            body.classList.remove('hidden')
            done.classList.remove('hidden')
            p.classList.add('hidden')
        }
        else  {
            body.classList.add('read-only')
            done.classList.add('hidden')
            p.classList.remove('hidden')
        }
        
    }

    const updated = (id) => {
        console.log(`comment update`,id)
        const p = document.getElementById('prev__comment')
        const body = document.getElementById(`comment__text-${id}`)
        const done = document.getElementById(`done__btn-${id}`)

        body.classList.add('hidden')
        done.classList.add('hidden')
        p.classList.remove('hidden')

        

    }

    const handleUpdate = async (newReview) => {

        

        const payload = {
            id:newReview.id,
            project_id: newReview.project_id,
            user_id: newReview.user_id,
            body: review,
            created_at: newReview.created_at,
            updated_at: new Date()
            
        }
        console.log(`review`, newReview)
        

        if(review.length !== 0){
            await dispatch(editReview(payload))
            setReview('')
        }

        updated(newReview.id)

    }

    
    useEffect(() => {
 
        dispatch(getReviews())
    }, [dispatch])
    return (
       <>
        <div className='comments__header'>
            <h1>Leave A Comment</h1>
        </div>
        <div className='comments__input-field'>
            
            <li className='comment__error-msg'>{errors}</li>
            
            <div className='comment__input-innerContainer'>
              <textarea value={review} onChange={updateReview} placeholder='Share Your Thoughts!' className='comment-field'></textarea>  
            </div>
            
            <div className='comment__input-submitButton'>
              <button type='submit' className='comment__submitButton' onClick={handleSubmit}>Submit</button>  
            </div>

           
            

        </div>

        <div className='comments__container'>
            {projectReviews?.map((review) => (
                <div className='single__comment'>
                    <div className='singleComment__username'>
                        <h3>{getUsername(review.user_id)}</h3>
                    </div>
                    <div className='singleComment__body'>
                        <p className='postedComment' id='prev__comment'>{review.body}</p>
                        <textarea className='read-only hidden' onChange={updateReview}  id={`comment__text-${review.id}`}>{review.body}</textarea>
                        
                    </div>
                    <div className='singleComment__timestamp'>
                        {review.created_at}
                        <div className='singleComment__edit-buttons'>
                            <button id={`done__btn-${review.id}`} className='finish__comment hidden' type='submit' onClick={() => handleUpdate(review)}>Done</button>
                            <button className='delete__button' onClick={() => handleDelete(review.id)}>
                                <img className='delete__button' src="https://img.icons8.com/fluency/48/000000/delete-sign.png"/>
                            </button>
                            <button onClick={() => updateComment(review.id)} className='edit__button' >
                                <img className='edit__button' src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png"/>
                            </button>     
                        </div>
                    </div>

                </div> 
            )).reverse()}
            

        </div>
       </>
    )
}

export default Comments
