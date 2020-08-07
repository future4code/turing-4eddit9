import axios from 'axios';





export const likeReducer = (state, action) => {
    const {type,actualDirection, postId} = action;
    
    let newDirection = 0;

    switch(type){
        case 'LIKE':
            if ( actualDirection <= 0 ) newDirection = 1;
            return { actualDirection  : newDirection, postId: postId};
        case 'DISLIKE':
            if ( actualDirection >= 0 ) newDirection = -1;
            return { actualDirection  : newDirection, postId: postId};
        default: 
            return state;
    }
}
