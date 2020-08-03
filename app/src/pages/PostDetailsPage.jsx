import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router';


const ContainerDetailPage = styled.main `
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserContainer = styled.div `
    width: 400px;
    text-align: center;
    border: 1px solid #000;
    padding: 8px 15px;
`;

const UserName = styled.p `
    font-size: 16px;
    text-align: left;
    margin: 0;
    padding: 0;
`;

const TitleName = styled.p `
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    padding: 0;
`;

const TextPost = styled.p `
    min-height: 200px;
    text-align: left;
`;

const ActionContainer = styled.div `
    display: flex;
    justify-content: space-between;
`;

const VoteButtons = styled.div `
    display: flex;
    width: 60px;
    justify-content: space-between;
`;

const Vote = styled.p `

`;

const AllComments = styled.p `

`;

const ContainerComments = styled.div `
    display: flex;
    flex-direction: column;
    padding: 15px 0;
`;

const UserComment = styled.div `
    width: 400px;
    text-align: center;
    border: 1px solid #000;
    padding: 8px 15px;
    margin-bottom: 5px;
`;

export default props => {
    const [postDetail, setPostDetail] = useState({});

    const pathParams = useParams();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNHdHZPSEdESzZ6OGZ4ajFXMHFRIiwidXNlcm5hbWUiOiJoeWFnbyIsImVtYWlsIjoiaHlhZ29AZ21haWwuY29tIiwiaWF0IjoxNTk2NDc3MDY5fQ.8rxreOavVUnMMzYSI19FpvzjnqKay8_tHGSjdetr7PE"
    
    const getPostDetail = async () => {
        try {
            const response = await axios.get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}`, {
                    headers: {
                        Authorization: token
                    }
                })
            setPostDetail(response.data.post)
        } catch(error) {
            console.log(error.message)
        }
    };

    console.log(postDetail)


    useEffect(() => {
        getPostDetail()
    }, [])

    return (
        <ContainerDetailPage>
            <UserContainer>
                <TitleName>{postDetail.title}</TitleName>
                <UserName>Autor: {postDetail.username}</UserName>
                <hr/>
                <TextPost>{postDetail.text}</TextPost>
                <hr/>
                <ActionContainer>
                    <VoteButtons>
                        <Vote>^</Vote>
                        <Vote>{postDetail.votesCount}</Vote>
                        <Vote>v</Vote>
                    </VoteButtons>
                    <AllComments>{postDetail.commentsCount} comentários</AllComments>
                </ActionContainer>
            </UserContainer>
            <ContainerComments>
                <h3>Comentários</h3>
                {postDetail.comments && postDetail.comments.map((comment) => {
                    return (
                        <UserComment key={comment.id}>
                            <h4>{comment.username}</h4>
                            <hr/>
                            <p>{comment.text}</p>
                            <hr/>
                            <VoteButtons>
                                <Vote>^</Vote>
                                <Vote>{comment.votesCount}</Vote>
                                <Vote>v</Vote>
                            </VoteButtons>

                        </UserComment>
                    )
                })}
            </ContainerComments>
        </ContainerDetailPage>
    );
}