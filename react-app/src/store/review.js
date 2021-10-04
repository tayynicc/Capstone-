const LOAD_REVIEWS = 'reviews/LOAD'
const ADD_REVIEW = 'reviews/ADD'
const EDIT_REVIEW = 'reviews/EDIT'
const REMOVE_REVIEW = 'reviews/REMOVE'


const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

const addOneReview = (reviews) => ({
    type: ADD_REVIEW,
    reviews
})

const remove = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})

const update = (review) => ({
    type: EDIT_REVIEW,
    review
})


// get all reviews
export const getReviews = () => async(dispatch) => {
    const res = await fetch(`/api/reviews`);
    const reviews = await res.json()
    dispatch(loadReviews(reviews))
}



// add new review 
export const createOneReview = (payload) => async dispatch => {
    const {
       project_id,
       user_id,
       body,
       created_at,
       updated_at
    } = payload 

    const res = await fetch(`/api/reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({project_id, user_id, body, created_at, updated_at})
    });

    let newReview;
    if (res.ok){
        newReview = await res.json();
        dispatch(addOneReview(newReview))
    }

    return newReview
}



// edit review 
export const editReview = review => async dispatch => {
    console.log('store', review)
    const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const review = await res.json()
        dispatch(update(review))
    }
}


// delete a review 
export const deleteReview = reviewId => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(remove(reviewId))
    }
}

export default function reviewReducer(state={}, action){
    switch (action.type) {
        case LOAD_REVIEWS:
            const newReviews= {}
            action['reviews'].reviews.forEach(review => {
                newReviews[review.id] = review;
            })
            return {
                ...state,
                ...newReviews
            }
        case ADD_REVIEW:
            if(!state[action.reviews.id]) {
                return {
                    ...state,
                    [action.reviews.id] : action.reviews
                }
            }
            return {
                ...state,
                [action.review.id] : {
                    ...state[action.review.id]
                }
            }
            case REMOVE_REVIEW:
                let newState = { ...state }
                delete newState[action.reviewId]
                return newState

            case EDIT_REVIEW:
                return {
                    ...state,
                    [action.review.id] : action.review
                }
    
        default:
            return state
    }
}
