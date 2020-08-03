import React from 'react';

import {
    Card, 
    CardUserInfo, 
    CardContent, 
    LikeContainer,
    PostContent, 
    PostTitle,
    PostText,
    PostComment,
    useStyles } from './CardPostStyles';

import FaceIcon from '@material-ui/icons/Face';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CommentIcon from '@material-ui/icons/Comment';



//  [
//     {
//         userVoteDirection: 0,
//         id: "060ArFua9saK6pXR7xfO",
//         createdAt: 1591973880700,
//         title: "novo post",
//         commentsCount: 61,
//         text: "teste",
//         votesCount: 19,
//         username: "Hendrix",
//     }
//    ]




export default props =>{
    const classes = useStyles();
    const {post} = props || [] 
    

    return <Card>
       {post.map( post =>{
           return  <CardContent>
            <LikeContainer>
                <ArrowUpwardIcon className={classes.arrowLikeIcon} />
                        {post.votesCount}
                <ArrowDownwardIcon className={classes.arrowDislikeIcon}/>
            </LikeContainer>
            
            <PostContent>
                <CardUserInfo>
                        <FaceIcon/>
                        <i>{post.username}</i>
                </CardUserInfo>
                <PostTitle>
                    <b>{post.title}</b>
                </PostTitle>
                <PostText>
                    {post.text}
                </PostText>
                <PostComment>
                    <CommentIcon />
                </PostComment>
            </PostContent>

           </CardContent>
       })}
    </Card>
}

