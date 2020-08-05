import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';

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
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");
    const history = useHistory();

    const signUp = (event) =>{
        event.preventDefault();

        const body = {
            username,
            email,
            password,
        }
        axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup", body)
        .then( response => {
            setEmail('');
            SetPassword('');
            alert("Cadastro Efetuado com sucesso")
            history.push('/');
        }).catch(error => {
            console.log(error.message);
        })
    }

    const onChange = event =>{
        const {name, value} = event.target;
        switch(name){
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                SetPassword(value);
                break;
        }
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
                        value={username} 
                        name={'username'}
                        onChange={onChange}
                    />
                    <Input 
                        required
                        placeholder={'Email'} 
                        value={email} 
                        name={'email'}
                        onChange={onChange}
                    />
                    <Input 
                        required
                        placeholder={'Senha'} 
                        name={'password'}
                        value={password}
                        type='password'
                        onChange={onChange}
                    />
                    <button>Cadastre-se</button>
                    <Text>Já possuí conta? Faça o login <button onClick={() => history.push('/')} >Login</button></Text>
                    </ContainerForm>
                </Card>
            </ContainerSignUp> :
            history.push('/')
            }
        </>
        );
}