import styled from 'styled-components';
import { Button, Paper } from '@material-ui/core'

export const Container = styled(Paper)`
    height: fit-content;
    width: fit-content;
    display: flex;
    flex-direction: column;
    padding: 15px;
`;

export const Form = styled.form`
    height: fit-content;
    display: flex;
    width: fit-content;
    flex-direction: column;
    width: fit-content;
`;

export const ButtonCreate = styled(Button)`
    align-self: center;
    width: 120px;
    height: 30px;
`

export const InputTitle = styled.input`
    font-weight: 700;
    height: 20%;
    margin: 0.5vh;
`;


export const InputText = styled.textarea`
    resize: none;
    margin-bottom: 5px;
`;