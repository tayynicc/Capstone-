import './Comments.css'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getReviews } from '../../store/review'


function Comments(){

    const { id } = useParams()
    const dispatch = useDispatch()

    
    const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  

    const reviews = useSelector((state) => Object.values(state.review)) 
    

    const projectReviews = reviews.filter((review) => review.project_id === +id)

    const getUsername = (id) => {
        const user = users.filter((user) => (
            user.id === id 
        ))

        const [ usr ] = user
       
        return usr.username
    }

    console.log(`&&`, getUsername(1))
    
    
    const postComment = () => {

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
            <div className='comment__input-innerContainer'>
              <textarea placeholder='Share Your Thoughts!' className='comment-field'></textarea>  
            </div>
            
            <div className='comment__input-submitButton'>
              <button type='submit' className='comment__submitButton' onSubmit={postComment}>Submit</button>  
            </div>

           
            

        </div>

        <div className='comments__container'>
            {projectReviews.map((review) => (
                <div className='single__comment'>
                    <div className='singleComment__username'>
                        <h3>{}</h3>
                    </div>
                    <div className='singleComment__body'>
                        <p>{getUsername(review.user_id)}</p>
                    </div>
                    <div className='singleComment__timestamp'></div>

                </div> 
            ))}
            

        </div>
       </>
    )
}

export default Comments