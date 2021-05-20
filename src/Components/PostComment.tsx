import { Avatar, createStyles, Divider, makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Comment, User } from "../API/Interfaces";

const useStyles = makeStyles((theme) =>
    createStyles({
        header: {
            marginLeft: 15,
            display: "flex",
            alignItems: "center",
        },
        userAvatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            marginRight: 15,
            backgroundColor: purple[500],
        },
        body: {
            marginLeft: 15,
        },
    })
);

export interface PostCommentsProps {
    comment: Comment;
}

export default function PostComment(props: PostCommentsProps) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.header}>
                <Avatar className={classes.userAvatar}>
                    {props.comment.email.charAt(0)}
                </Avatar>
                <h5>{props.comment.email}</h5>
            </div>
            <Divider variant="middle" />
            <p className={classes.body}>{props.comment.body}</p>
        </div>
    );
}
