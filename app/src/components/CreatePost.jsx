import React, { useState } from 'react';
import Axios from 'axios';
import {
    Container,
    Form,
    ButtonCreate,
    InputTitle,
    InputText,

    } from './CreatePostStyle'



const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'

export default props =>{
    const {token, getAllPost} = props;
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    
    const onChange = event =>{
        const {name, value} = event.target;
            switch(name){
                case 'titulo':
                    setTitle(value);
                    break;
                case 'text':
                    setText(value);
                    break;
            }
    }

    const criarPost = event =>{
        event.preventDefault();
        const auth  = {
            headers :{
                 Authorization: token
            }
         }

         const body = {title, text, }

        Axios.post(baseUrl, body ,auth)
        .then( response => {  
            setTitle('');
            setText('');
            getAllPost(token);
        })
        .catch( err => console.log(err.menssage))
    }


    return (
        <Container>
            <Form onSubmit={criarPost} >
                <InputTitle 
                    placeholder={'Titulo do Post'} 
                    value={title}
                    onChange={onChange}
                    name={'titulo'}
                    required={true}
                />
                <InputText 
                    placeholder={'Post'}
                    onChange={onChange}
                    value={text}
                    name={'text'}
                    cols="40" 
                    rows="5"
                    required={true}
                />
                <ButtonCreate variant="contained" color="primary">Criar Post</ButtonCreate>
            </Form>
        </Container>
    );
}