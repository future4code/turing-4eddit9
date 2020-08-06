import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

import FaceIcon from '@material-ui/icons/Face';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentIcon from '@material-ui/icons/Comment';

import {
useStyles,
ContainerDetailPage,
UserContainer,
UserName,
TitleName,
TextPost,
VoteButtons,
Vote,
AllComments,
ContainerComments,
DataComment,
UserComment,
CreateComment,
InputComment,
SendComment,
LikeNumber,
Post,
Author
} from './PostDetailPageStyle';

export default props => {
    const [postDetail, setPostDetail] = useState({});
    const [textComment, setTextComment] = useState("");
    const [like , setLike] = useState('');
    const classes = useStyles(postDetail);

    const history = useHistory();

    useEffect(() => {
        getPostDetail()
    }, [like])

    const pathParams = useParams();
    const token = localStorage.getItem('token')
    
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
          }).catch(erro => {
            console.log(erro.message)
          })
    }

    const vote = (actualDirection, like) =>{
        let direction = actualDirection;
        
        if( direction === 1) like ? direction = 0 : direction = -1;
        else if( direction === -1) like ? direction = +1 : direction = 0;                
        else  like ? direction = +1 : direction = -1;
        
        const auth  = {
           headers :{
                Authorization: token
           }
        }

        const body = {
            'direction': direction,
        }

        axios
        .put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}/vote`, body, auth)
        .then( response => {
            setLike(response.data)
        })
        .catch(err => console.log(err.menssage) )
    }

    const backToList = () => {
        history.push("/TimeLine");
    }

    return (
        <ContainerDetailPage>
            <button onClick={backToList}>Voltar</button>
            <UserContainer>
                <VoteButtons>
                    <ArrowUpwardIcon color={postDetail.userVoteDirection === 1 ? 'primary' : 'black'}
                    onClick={ () => vote(postDetail.userVoteDirection, true) } className={classes.arrowLikeIcon} />
                        <LikeNumber>
                            {postDetail.votesCount}
                        </LikeNumber>
                    <ArrowDownwardIcon color={postDetail.userVoteDirection === -1 ? 'secondary' : 'black'}
                    onClick={ () => vote(postDetail.userVoteDirection, false) }  className={classes.arrowDislikeIcon}/>
                </VoteButtons>
                <Post>
                    <TitleName>{postDetail.title}</TitleName>
                    <Author>
                        <FaceIcon/>
                        <UserName>Autor: {postDetail.username}</UserName>
                    </Author>
                    <hr/>
                    <TextPost>{postDetail.text}</TextPost>
                    <hr/>
                    <AllComments> <CommentIcon />  {postDetail.commentsCount} comentários</AllComments>
                </Post>
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
                            <VoteButtons>
                                <ArrowUpwardIcon color={comment.userVoteDirection === 1 ? 'primary' : 'black'}
                                onClick={() => handleVoteCount(comment.id, comment.userVoteDirection, true)} className={classes.arrowLikeIconComment} />
                                <Vote>{comment.votesCount}</Vote>
                                <ArrowDownwardIcon color={comment.userVoteDirection === -1 ? 'secondary' : 'black'}
                                onClick={() => handleVoteCount(comment.id, comment.userVoteDirection, false)} className={classes.arrowDislikeIconComment} />
                            </VoteButtons>
                            <DataComment>
                                <h4>{comment.username}</h4>
                                <hr/>
                                <p>{comment.text}</p>
                            </DataComment>

                        </UserComment>
                    )
                })}
            </ContainerComments>
        </ContainerDetailPage>
    );
}