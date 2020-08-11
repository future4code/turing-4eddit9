import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import Axios from 'axios';

import {
    Container,
    Card,
    Input,
    Text,
    ButtonLogin,
    ButtonSingUp

    } from './CardLoginStyle'


const baseUrl = `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login`

export default props => {
    const [email, setEmail] = useState();
    const [password, SetPassword] = useState();
    const [user, setUser] = useState();
    const history = useHistory();

    const login = () =>{
        const body = {
            email,
            password,
        }
        Axios.post(baseUrl, body)
        .then( response => {
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            setEmail('');
            SetPassword('');
            history.push('/TimeLine')
        })
    }

    const onChange = event =>{
        const {name, value} = event.target;
        switch(name){
            case 'email':
                setEmail(value);
                break;
            case 'password':
                SetPassword(value);
                break;
        }
    }

    return (<>
        { !localStorage.getItem('token') ? 
        <Card>
            <Input 
                placeholder={'Email'} 
                value={email} 
                name={'email'}
                onChange={onChange}
            />
            <Input 
                placeholder={'Senha'} 
                name={'password'}
                value={password}
                type='password'
                onChange={onChange}
            />
            <ButtonLogin variant="contained" color="primary" onClick={login}>Login</ButtonLogin>
            <Text>Ainda não possui conta ? <ButtonSingUp variant="text" color="primary" onClick={() => history.push('/SignUp')} >Cadastre-se</ButtonSingUp></Text>
        </Card> :
            history.push('/TimeLine')
        }
        </> 
    );
}