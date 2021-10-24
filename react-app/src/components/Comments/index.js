import './Comments.css'
import EditComment from './editComment'
import EditDropdown from '../EditDropdown'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import reviewReducer, { getReviews, createOneReview, deleteReview, editReview} from '../../store/review'


function Comments(){

    const { id } = useParams()
    const dispatch = useDispatch()

    const [users, setUsers] = useState([]);
    const [ review, setReview ] = useState('');
    const [ newReview, setNewReview ] = useState('')
    const [ errors, setErrors ] = useState('')

    

    const updateReview = (e) => {
        setReview(e.target.value)
        if(e.target.value.length <= 0 ){
            setErrors("Input area has no content")
        }
        if (review.length > 0){
            setErrors('');
            // setReview('');
        }
    }; 

    const updateNewReview = (e) => {
        setNewReview(e.target.value)
        // const input = document.getElementById('review-input')
        // input.innerText = ''
        if(e.target.value.length <= 0 ){
            setErrors("Input area has no content")
        }
        if (e.target.value.length > 0){
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
            setNewReview('');
        }
    }

    const handleDelete = (id) => {
    
        dispatch(deleteReview(Number(id)))
    }

    const updateComment = (review) => {
        const { id, body } = review
        // console.log(`!!!!`, id, body)
        setNewReview(body)
        
        const pen = document.getElementById(`edit-${id}`)
        const contentBody = document.getElementById(`comment__text-${id}`)
        const done = document.getElementById(`done__btn-${id}`)
        const deleteBtn = document.getElementById(`delete-comment-${id}`)
        // const input = document.getElementById('review-input')

        if (contentBody.classList.contains('hidden')){
            contentBody.classList.add('read-only')
            contentBody.classList.remove('hidden')
            done.classList.remove('hidden')
            pen.classList.add('hidden')
            deleteBtn.classList.add('hidden')
            // input.innerHTML = ''
        }
        else  {
            contentBody.classList.add('read-only')
            done.classList.add('hidden')
            pen.classList.remove('hidden')
            // input.innerHTML = ''
        }
        
    }

    const updated = (id) => {
        const body = document.getElementById(`comment__text-${id}`)
        const done = document.getElementById(`done__btn-${id}`)
        const pen = document.getElementById(`edit-${id}`)
        const deleteBtn = document.getElementById(`delete-comment-${id}`)


        body.classList.add('hidden')
        done.classList.add('hidden')
        pen.classList.remove('hidden')
        deleteBtn.classList.remove('hidden')
        body.innerHTML = '';

        // setReview(newReview)

        

    }

    const handleUpdate = async (updatedReview) => {

        

        const payload = {
            id:updatedReview.id,
            project_id: updatedReview.project_id,
            user_id: updatedReview.user_id,
            body: newReview,
            created_at: updatedReview.created_at,
            updated_at: new Date()
            
        }

        console.log(`!!`,payload)

        if(newReview.length !== 0){
       
            await dispatch(editReview(payload))
           
            setReview('')
            setNewReview('')

        }

        updated(updatedReview.id)

    }

    
    useEffect(() => {
 
        dispatch(getReviews())
    }, [dispatch])


    const time = (date) => {
        const items = date.split(' ');

        const [day, number, month, year, time ] = items
        const formattedDate = []

        formattedDate.push(day, month, number + ',', year)
        const res = [formattedDate.join(" "), formatTime(time)]


        return res.join(' ')
        
        
    }

    const formatTime = ( time ) =>  {
        const  splitTime = time.split(':');
        const [ hour, minute ] = splitTime
        
        const t = []
        if(hour <= 12){
            if(hour[0] === '0'){
                let digit = hour.split('');
                t.push(digit[1], minute + ' PM')

            } else {
                t.push(hour, minute)
            }
        }


        return t.join(':')
    }

    console.log(`$$$`, review)


    return (
       <>
        <div className='comments__header'>
            <h1>Leave A Comment</h1>
        </div>
        <div className='comments__input-field'>
            
            <li className='comment__error-msg'>{errors}</li>
            
            <div className='comment__input-innerContainer'>
              <textarea value={review}  onChange={updateReview} placeholder='Share Your Thoughts!' className='comment-field' required></textarea>  
            </div>
            
            <div className='comment__input-submitButton'>
              <button type='submit' className='comment__submitButton' onClick={handleSubmit}>Submit</button>  
            </div>

           
            

        </div>

         <div className='comments__container'>
         {projectReviews?.map((reviews) => (
                <div className='single__comment'>
                    <div className='singleComment__username'>
                        <h3>{getUsername(reviews.user_id)}</h3>
                    </div>
                    <div className='singleComment__body'>
                        <p className='postedComment' id='prev__comment'>{reviews.body}</p>
                        <textarea className='read-only hidden' placeholder='edit your comment!' value={newReview} onChange={updateNewReview} id={`comment__text-${reviews.id}`}></textarea>
                        
                    </div>
                    <div className='singleComment__timestamp'>
                        {time(reviews.created_at)}
                        <div className='singleComment__edit-buttons'>
                            
                        <div className="dropdown">
                            <button className="dropbtn"><img src="https://img.icons8.com/material-outlined/24/000000/more.png"/></button>
                            <div className="dropdown-content">
                            {sessionUser.id === reviews.user_id  && 
                                <button id={`edit-${reviews.id}`}onClick={() => updateComment(reviews)} className='edit__button edt' >
                                    Edit
                                </button>
                             } 
                            {sessionUser.id === reviews.user_id && <button id={`delete-comment-${reviews.id}`}className='delete__button dlt' onClick={() => handleDelete(reviews.id)}>
                                Delete
                            </button>}
                                
                                
                                {/* <a href="#">Link 3</a> */}
                            </div>
                            <div className='finishUpdate-container'>
                                <button id={`done__btn-${reviews.id}`} className='finish__comment hidden' type='submit' onClick={() => handleUpdate(reviews)}>Done</button>
                            </div>
                        </div>
                            {/* <EditDropdown /> */}
                            {/* <button id={`done__btn-${reviews.id}`} className='finish__comment hidden' type='submit' onClick={() => handleUpdate(reviews)}>Done</button>
                            {sessionUser.id === reviews.user_id && <button id={`delete-comment-${reviews.id}`}className='delete__button' onClick={() => handleDelete(reviews.id)}>
                                <img className='delete__button' src="https://img.icons8.com/fluency/48/000000/delete-sign.png"/>
                            </button>}
                            {sessionUser.id === reviews.user_id  && <button id={`edit-${reviews.id}`}onClick={() => updateComment(reviews)} className='edit__button' >
                                <img className='edit__button' src="https://img.icons8.com/ios-filled/50/000000/edit--v1.png"/>
                            </button>   }   */}
                        </div>
                    </div>

                </div> 
            )).reverse()}
            
            {/* < EditComment /> */}
        </div>
       </>
    )
}

export default Comments
