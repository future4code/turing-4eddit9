import React from 'react';
import CardLogin from '../components/CardLogin';
import styled from 'styled-components';



export const Container = styled.div `
    width: 98vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default props =>{

    return (
        <Container>
            <CardLogin />
        </Container>
    );
}