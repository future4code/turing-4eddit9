import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    Card, 
    CardUserInfo, 
    CardContent, 
    LikeContainer,
    LikeNumber,
    PostContent, 
    PostTitle,
    PostText,
    PostComment,
    Comments,
     } from './CardPostStyles';


import {makeStyles} from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentIcon from '@material-ui/icons/Comment';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    arrowLikeIcon: {
            color: props => { if(props.post.userVoteDirection === 1)  return 'blue' 
                else return 'black' 
        },
            cursor: 'pointer'
     
    },
    arrowDislikeIcon: {
        color: props => { if(props.post.userVoteDirection === -1)  return 'red' 
                else return 'black' 
            },
            cursor: 'pointer'
        
    },
})



export default props =>{
    const {post, vote} = props || {}
    const history = useHistory();
    const classes = useStyles(props);

    return <Card>
       <CardContent>
            <LikeContainer>
                    <ArrowUpwardIcon onClick={ () => vote(post.id, post.userVoteDirection, 'LIKE') } className={classes.arrowLikeIcon} />
                        <LikeNumber>
                            {post.votesCount}
                        </LikeNumber>
                    <ArrowDownwardIcon onClick={ () => vote(post.id, post.userVoteDirection, 'DISLIKE') }  className={classes.arrowDislikeIcon}/>
            </LikeContainer>
            
            <PostContent>
                <PostTitle>
                    <b>{post.title}</b>
                </PostTitle>
                <CardUserInfo>
                        <FaceIcon/>
                        <i>{post.username}</i>
                </CardUserInfo>
                <PostText>
                    {post.text}
                </PostText>
                <PostComment>
                    <IconButton onClick={ () => history.push(`/PostDetails/${post.id}`)}>
                        <CommentIcon/>
                    </IconButton>
                        <Comments>{post.commentsCount}</Comments>
                </PostComment>
            </PostContent>
           </CardContent>
    </Card>
}

