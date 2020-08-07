import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import useForm from './../components/useForm';

import styled from 'styled-components';
import { Button } from '@material-ui/core';

const ButtonSingUp = styled(Button)`
    height: 25px;
`;

const ButtonLogin = styled(Button)`
    width: 30px;
    height: 30px;
`;

const ContainerSignUp = styled.div `
    width: 98vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContainerForm = styled.form `
    display: flex;
    flex-direction: column;
`;

const Card = styled.div`
    width: 24vw;
    height: 30vh;
    border: solid 1px #CCCCCC;
    box-shadow: 0px 1px 1px 0px black;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    margin: 1vh 0;
    padding: 0 0.5vw;
`;

const Text = styled.p`
    font-size: 1.5ch;
`


export default props =>{
    const {form, onChange, resetForm} = useForm({
        username: "",
        email: "",
        password: ""
    });

    const history = useHistory();

    const signUp = (event) =>{
        event.preventDefault();

        const body = {
            username: form.username,
            email: form.email,
            password: form.password,
        }
        axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup", body)
        .then( response => {
            alert("Cadastro Efetuado com sucesso")
            history.push('/');
        }).catch(error => {
            console.log(error.message);
        })
    }

    const handleDataUser = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    return (
        <>
        { !localStorage.getItem('token') ?
            <ContainerSignUp>
                <Card>
                    <ContainerForm onSubmit={signUp}>
                    <h3>Cadastro</h3>
                    <Input
                        required 
                        placeholder={'Nome do usuário'} 
                        value={form.username} 
                        name={'username'}
                        onChange={handleDataUser}
                    />
                    <Input 
                        required
                        placeholder={'Email'} 
                        value={form.email} 
                        name={'email'}
                        onChange={handleDataUser}
                    />
                    <Input 
                        required
                        placeholder={'Senha'} 
                        name={'password'}
                        value={form.password}
                        type='password'
                        onChange={handleDataUser}
                    />
                    <ButtonSingUp variant="contained" color="primary">Cadastre-se</ButtonSingUp>
                    <Text>Já possuí conta? Faça o login <ButtonLogin variant="text" color="primary" onClick={() => history.push('/')} >Login</ButtonLogin></Text>
                    </ContainerForm>
                </Card>
            </ContainerSignUp> :
            history.push('/')
            }
        </>
        );
}