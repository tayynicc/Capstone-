import './Comments.css'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getReviews, createOneReview, deleteReview, editReview} from '../../store/review'



function EditComment({review, projectReviews, errors, setErrors, setReview}){

    const { id } = useParams()
    const dispatch = useDispatch()

    const [ newReview, setNewReview ] = useState('');
    const [users, setUsers] = useState([]);
    const reviews = useSelector((state) => Object.values(state.review)) 

    const sessionUser = useSelector((state) => state.session).user



       const updateReview = (e) => {
        setReview(e.target.value)
        if(e.target.value.length <= 0 ){
            setErrors("Input area has no content")
        }
        if (review.length > 0){
            setErrors('')
        }
    }; 

        const updateNewReview = (e) => {
        setNewReview(e.target.value)
        // const input = document.getElementById('review-input')
        // input.innerText = ''
        if(e.target.value.length <= 0 ){
            setErrors("Input area has no content")
        }
        if (e.target.value.length> 0){
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

      const handleUpdate = async (newReview) => {

        

        const payload = {
            id:newReview.id,
            project_id: newReview.project_id,
            user_id: newReview.user_id,
            body: newReview.body,
            created_at: newReview.created_at,
            updated_at: new Date()
            
        }
        // console.log(`~~`,payload)

        if(review.length !== 0){
            await dispatch(editReview(payload))
            // const input = document.getElementById('review-input')
            // input.innerHTML = ''
            // setReview('')
        }

        updated(newReview.id)

    }
    
 useEffect(() => {
 
        dispatch(getReviews())
    }, [dispatch])

    
    const handleDelete = (id) => {
    
        dispatch(deleteReview(Number(id)))
    }

    const updateComment = (id) => {
        
        const pen = document.getElementById(`edit-${id}`)
        const body = document.getElementById(`comment__text-${id}`)
        const done = document.getElementById(`done__btn-${id}`)
        // const input = document.getElementById('review-input')

        if (body.classList.contains('hidden')){
            body.classList.add('read-only')
            body.classList.remove('hidden')
            done.classList.remove('hidden')
            pen.classList.add('hidden')
            // input.innerHTML = ''
        }
        else  {
            body.classList.add('read-only')
            done.classList.add('hidden')
            pen.classList.remove('hidden')
            // input.innerHTML = ''
        }
        
    }

    const updated = (id) => {
        const body = document.getElementById(`comment__text-${id}`)
        const done = document.getElementById(`done__btn-${id}`)
        const pen = document.getElementById(`edit-${id}`)

        body.classList.add('hidden')
        done.classList.add('hidden')
        pen.classList.remove('hidden')

        

    }

        const getUsername = (id) => {
        const user = users?.filter((user) => (
            user.id === id 
        ))

        const [ usr ] = user
       
        return usr?.username
    }



    // const projectReviews = reviews.filter((review) => review.project_id === +id)

    return (
        <>
               {projectReviews?.map((review) => (
                <div className='single__comment'>
                    <div className='singleComment__username'>
                        <h3>{getUsername(review.user_id)}</h3>
                    </div>
                    <div className='singleComment__body'>
                        <p className='postedComment' id='prev__comment'>{review.body}</p>
                        <textarea className='read-only hidden' value={newReview} onChange={updateNewReview}  id={`comment__text-${review.id}`}>{review.body}</textarea>
                        
                    </div>
                    
                    <div className='singleComment__timestamp'>
                        {review.created_at}
                        <div className='singleComment__edit-buttons '>
                            {/* <button id={`done__btn-${review.id}`} className='finish__comment hidden' type='submit' onClick={() => handleUpdate(newReview)}>Done</button>
                            {sessionUser.id === review.user_id && <button className='delete__button' onClick={() => handleDelete(review.id)}>
                                <img className='delete__button' src="https://img.icons8.com/fluency/48/000000/delete-sign.png"/>
                            </button>}
                            {sessionUser.id === review.user_id  && <button id={`edit-${review.id}`}onClick={() => updateComment(review.id)} className='edit__button' >
                                <img className='edit__button' src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png"/>
                            </button>   }   */}
                        </div>
                    </div>

                </div> 
            )).reverse()}
        </> 
    )
}

export default EditComment
