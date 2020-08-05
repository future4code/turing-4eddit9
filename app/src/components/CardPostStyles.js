import styled from 'styled-components';



export const Card = styled.div`
    height: 24vh;
    width: 32vw;
    border: solid 1px #CCCCCC;
    background-color: white;
    margin: 1vh;
    display: flex;
    justify-content: center;
`;

export const CardUserInfo = styled.div`
       width: 100%;
       height: fit-content;
       display: flex;
       justify-content: baseline;
`;

export const LikeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    height: 100%;
    margin-right: 1vw;
`; 

export const CardContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`; 

export const PostContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`; 

export const PostTitle = styled.div`
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: center;
  
`

export const PostText = styled.div`
    width: 100%;
    margin-top: 1vh;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`; 

export const PostComment = styled.div`
    display: flex;
    align-items: flex-end;

`;

export const LikeNumber = styled.div`
    display: flex;
    justify-content: center;
`;


export const Comments = styled.div`
    color: #757575;
`;
