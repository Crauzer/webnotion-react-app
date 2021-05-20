import {
    Card,
    createStyles,
    Divider,
    IconButton,
    makeStyles,
} from "@material-ui/core";
import { ViewHeadline } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post, User } from "../API/Interfaces";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            margin: 15,
            padding: 10,
            width: 500,
        },
        header: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        detailsIcon: {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
    })
);

export interface PostCardProps {
    post: Post;
}

export default function PostCard(props: PostCardProps) {
    const classes = useStyles();

    const [user, setUser] = useState<User>();

    // Fetch user data
    useEffect(() => {
        axios
            .get<User>(
                `https://jsonplaceholder.typicode.com/users/${props.post.userId}`
            )
            .then((res) => setUser(res.data))
            .catch((reason) => console.error(reason));
    }, []);

    return (
        <Card variant="elevation" className={classes.root}>
            <div className={classes.header}>
                <h3>{props.post.title}</h3>
                <IconButton
                    className={classes.detailsIcon}
                    component={Link}
                    to={`/post/${props.post.id}`}>
                    <ViewHeadline />
                </IconButton>
            </div>
            <Divider variant="middle" />
            <p>by {user?.username}</p>
        </Card>
    );
}
