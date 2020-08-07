import React, { useState, useEffect, useReducer } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

import styled from 'styled-components';



import Post from '../components/Post';
import { Button } from '@material-ui/core';
import CreatePost from '../components/CreatePost';
import {likeReducer } from '../components/Reducer'

const Container = styled.div`
    height: fit-content;
    padding: 1vh;
    display: flex;
    flex-direction: column;
    align-Items: center;
    justify-content: center;
    background-color: #DAE0E6;
`;

const LogOut = styled(Button)`
    align-self: flex-end;

`


const url = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts';

export default props =>{
    const [post, setPost] = useState([]);
    const [token , setToken] = useState('');
    const [like , setLike] = useState('');
    const history = useHistory();
    const [state, dispatch] = useReducer(likeReducer,  {
        actualDirection  : 0,
        postId: ''
    });

    
    const auth  = {
        headers :{
             Authorization: token
        }
    }


    const doLogOut = () =>{
        localStorage.removeItem('token');
        history.push('/')
    }

    const getAllPost = (token) =>{
     
        axios
        .get(url, auth)
        .then( response => {
            setPost(response.data.posts)
        })
        .catch(err => console.log(err.menssage) )
        
    }

    const vote = (postId, actualDirection, like) =>{
        const action = {
            type: like,
            actualDirection,
            postId,
        }
        dispatch(action);
    }

    function setComment() {
        const body = { 'direction': state.actualDirection,}       
        axios
        .put(`${url}/${state.postId}/vote`,body, auth)
        .then( response => {
           getAllPost(token);
        })
        .catch(err => console.log(err.menssage) )
   }
    



    useEffect( () => {
        localStorage.getItem('token') && setToken(localStorage.getItem('token'));
        token && getAllPost(token);
     
    },[token])

    
    useEffect( () => {
        state.postId && setComment();        
    },[state.actualDirection,state.postId])


    return <Container>
            <LogOut variant="outlined" color="secondary" onClick={doLogOut}>LogOut</LogOut>
            <CreatePost token={token} getAllPost={getAllPost} />
            {post && post.map( post => {
                return <Post 
                            key={post.id} 
                            post={post} 
                            vote={vote}
                            />
            })}
    </Container>

}