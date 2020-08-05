import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import axios from 'axios'

import styled from 'styled-components';



import Post from '../components/Post';
import { ListItemText } from '@material-ui/core';
import CreatePost from '../components/CreatePost';

const Container = styled.div`
    height: fit-content;
    padding: 1vh;
    display: flex;
    flex-direction: column;
    align-Items: center;
    justify-content: center;
    background-color: #DAE0E6;
`;

const LogOut = styled.button`
    align-self: flex-end;

`




   const url = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts';

export default props =>{
    const [post, setPost] = useState([]);
    const [token , setToken] = useState('');
    const [like , setLike] = useState('');
    const history = useHistory();


    const doLogOut = () =>{
        localStorage.removeItem('token');
        history.push('/')
    }

    const getAllPost = (token) =>{
        const auth  = {
           headers :{
                Authorization: token
           }
        }

        axios
        .get(url, auth)
        .then( response => {
            setPost(response.data.posts)
        })
        .catch(err => console.log(err.menssage) )
        
    }

    const vote = (postId, actualDirection, like) =>{
        let direction = actualDirection;
        
        if( direction === 1) like ? direction = 0 : direction = -1;
        else if( direction === -1) like ? direction = +1 : direction = 0;                
        else  like ? direction = +1 : direction = -1;
        
        const auth  = {
           headers :{
                Authorization: token
           }
        }

        const body = {
            'direction': direction,
        }

        axios
        .put(`${url}/${postId}/vote`, body, auth)
        .then( response => {
            setLike(response.data)
        })
        .catch(err => console.log(err.menssage) )
    }


    useEffect( () => {
        localStorage.getItem('token') && setToken(localStorage.getItem('token'));
        token && getAllPost(token);
     
    },[token,like])

    return <Container>
            <LogOut onClick={doLogOut}>LogOut</LogOut>
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