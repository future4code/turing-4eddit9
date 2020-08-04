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

const CreateComment = styled.form `
    width: 400px;
    text-align: center;
    border: 1px solid #000;
    padding: 8px 15px;
    margin: 15px 0 5px;
    display: flex;
    flex-direction: column;
`;

const InputComment = styled.textarea `
    height: 60px;
    resize: none;
    margin-bottom: 5px;
`;

const SendComment = styled.button `

`;

export default props => {
    const [postDetail, setPostDetail] = useState({});
    const [textComment, setTextComment] = useState("");
    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        getPostDetail()
    }, [])

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

    const handleSendComment = (event) => {
        event.preventDefault();
        const body = {
        text: textComment
    }

    axios.post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}/comment`,
      body, {
        headers: {
            Authorization: token
        }
      })
      .then(response => {
        getPostDetail()
        setTextComment("");
      }).catch(erro => {
        console.log(erro.message)
      })

    }

    const handleOnChangeComment = (e) => {
        setTextComment(e.target.value)
    }

    
    const handleVoteCount = (id, voteOrUnvote, like) => {
        let vote = voteOrUnvote;

        if( vote === 1) like ? vote = 0 : vote = -1;
        else if( vote === -1) like ? vote = +1 : vote = 0;                
        else  like ? vote = +1 : vote = -1;
        
        const body = {
            direction: vote
        }
    
        axios.put(
            `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}/comment/${id}/vote`,
          body, {
            headers: {
                Authorization: token
            }
          })
          .then(response => {
            getPostDetail()
            console.log("bombou")
          }).catch(erro => {
            console.log(erro.message)
          })
    }

    return (
        <ContainerDetailPage>
            <button>Voltar</button>
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
            <CreateComment onSubmit={handleSendComment}>
                <InputComment onChange={handleOnChangeComment} value={textComment} placeholder="Escreva um comentário" />
                <SendComment>Comentar</SendComment>
            </CreateComment>
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
                                <Vote onClick={() => handleVoteCount(comment.id, comment.userVoteDirection, true)}>^</Vote>
                                <Vote>{comment.votesCount}</Vote>
                                <Vote onClick={() => handleVoteCount(comment.id, comment.userVoteDirection, false)}>v</Vote>
                            </VoteButtons>

                        </UserComment>
                    )
                })}
            </ContainerComments>
        </ContainerDetailPage>
    );
}