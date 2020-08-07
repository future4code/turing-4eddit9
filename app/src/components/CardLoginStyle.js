import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const ButtonLogin = styled(Button)`
    width: 70px;
    height: 30px;
`;

export const ButtonSingUp = styled(Button)`
    height: 25px;
`;

export const Card = styled.div`
    width: 24vw;
    height: 24vh;
    border: solid 1px #CCCCCC;
    box-shadow: 0px 1px 1px 0px black;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.input`
    margin: 1vh 0;
    padding: 0 0.5vw;
`;

export const Text = styled.p`
    font-size: 1.5ch;
`