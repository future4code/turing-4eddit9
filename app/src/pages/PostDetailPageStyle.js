import styled from 'styled-components';
import {makeStyles} from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';

export const LogOut = styled(Button)`
    align-self: flex-end;
    margin-right: 15px;
    margin-top: 15px;
    color: red;
`

export const BackToList = styled(Button)`
    height: 25px;
    width: 30px;
`;

export const Line = styled.hr`
    width: 340px;
`;

export const useStyles = makeStyles({
    arrowLikeIcon: {
            cursor: 'pointer'
     
    },
    arrowDislikeIcon: {
            cursor: 'pointer'
        
    },
    arrowLikeIconComment: {
            cursor: 'pointer'
    },
    arrowDislikeIconComment: {
            cursor: 'pointer'
    }
})

export const ContainerDetailPage = styled.main `
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #DAE0E6;
`;

export const UserContainer = styled(Paper) `
    width: 450px;
    border: solid 1px #CCCCCC;
    padding: 10px 0;
    display: flex;
    background-color: #fff;
    margin-top: 10px;
`;

export const UserName = styled.p `
    font-size: 16px;
    margin: 0;
    padding: 0;
`;

export const TitleName = styled.p `
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
`;

export const TextPost = styled.p `
    min-height: 200px;
    text-align: left;
`;

export const VoteButtons = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
`;

export const Vote = styled.p `

`;

export const AllComments = styled.p `
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
`;

export const ContainerComments = styled.div `
    display: flex;
    flex-direction: column;
    padding: 15px 0;
`;

export const DataComment = styled.div `
    width: 100%;
`;

export const UserComment = styled.div `
    width: 400px;
    min-height: 150px;
    display: flex;
    border: solid 1px #CCCCCC;
    padding: 8px 15px;
    margin-bottom: 5px;
    background-color: #fff;
`;

export const CreateComment = styled.form `
    width: 400px;
    text-align: center;
    border: solid 1px #CCCCCC;
    padding: 8px 15px;
    margin: 15px 0 5px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
`;

export const InputComment = styled.textarea `
    height: 60px;
    resize: none;
    margin-bottom: 5px;
`;

export const SendComment = styled.button `

`;

export const LikeNumber = styled.p `

`;

export const Post = styled.div `

`;

export const Author = styled.div `
    display: flex;
    margin: 10px 0;
`;
