import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import usePosts from './../components/usePosts';
import useForm from './../components/useForm';

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
Author,
LogOut,
BackToList,
Line
} from './PostDetailPageStyle';

export default props => {
    const [like , setLike] = useState('');
    

    const history = useHistory();

    const pathParams = useParams();
    const token = localStorage.getItem('token')
    
    const [postDetail, getPost] = usePosts(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}`,
        {},
        "post"
    );

    console.log(postDetail);
    
    const classes = useStyles(postDetail);

    const { form, onChange, resetForm } = useForm({comment: ""})

    const handleSendComment = (event) => {
        event.preventDefault();
        const body = {
        text: form.comment
    }

    axios.post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}/comment`,
      body, {
        headers: {
            Authorization: token
        }
      })
      .then(response => {
        getPost();
        resetForm();
      }).catch(erro => {
        console.log(erro.message)
      })

    }

    const handleOnChangeComment = (e) => {
        const { name, value } = e.target;
        onChange(name, value)
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
            getPost()
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

    const doLogOut = () =>{
        localStorage.removeItem('token');
        history.push('/')
    }

    return (
        <ContainerDetailPage>
            <LogOut variant="outlined" color="secondary" onClick={doLogOut}>LogOut</LogOut>
            <BackToList variant="contained" color="secondary"  onClick={backToList}>Voltar</BackToList>
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
                    <Line/>
                    <TextPost>{postDetail.text}</TextPost>
                    <Line/>
                    <AllComments> <CommentIcon />  {postDetail.commentsCount} comentários</AllComments>
                </Post>
            </UserContainer>
            <CreateComment onSubmit={handleSendComment}>
                <InputComment name="comment" onChange={handleOnChangeComment} value={form.comment} placeholder="Escreva um comentário" />
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