import classes from "*.module.css";
import { Card, Divider, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Post, User, Comment } from "../API/Interfaces";
import PostComment from "../Components/PostComment";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        margin: 50,
    },
    postHeader: {},
    postBody: {
        marginTop: 20,
        padding: 10,
    },
    postCommentsCard: {
        marginTop: 20,
        padding: 10,
        textAlign: "left",
        maxWidth: 750,
        alignSelf: "center",
        "& h3": {
            marginLeft: 15,
        },
    },
    postCommentsContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    comment: {
        margin: 10,
        padding: 10,
        maxWidth: 600,
    },
});

interface PostPageParams {
    id: string;
}

export default function PostPage() {
    const classes = useStyles();

    const params = useParams<PostPageParams>();

    const [post, setPost] = useState<Post>();
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    // Fetch data from API
    useEffect(() => {
        // Fetch post data
        axios
            .get<Post>(
                `https://jsonplaceholder.typicode.com/posts/${params.id}`
            )
            .then((res) => {
                const post = res.data;

                setPost(post);

                // Fetch user data
                axios
                    .get<User>(
                        `https://jsonplaceholder.typicode.com/users/${post.userId}`
                    )
                    .then((res) => setUser(res.data))
                    .catch((reason) => console.error(reason));

                // Fetch comment data
                axios
                    .get<Comment[]>(
                        `https://jsonplaceholder.typicode.com/posts/${post.userId}/comments`
                    )
                    .then((res) => setComments(res.data))
                    .catch((reason) => console.error(reason));
            })
            .catch((reason) => console.error(reason));
    }, []);

    // Fetch all user

    return (
        <div className={classes.root}>
            <Card variant="elevation" className={classes.postHeader}>
                <div>
                    <h1>{post?.title}</h1>
                    <Divider variant="middle" />
                    <p>by {user?.username}</p>
                </div>
            </Card>
            <Card variant="elevation" className={classes.postBody}>
                <p>{post?.body}</p>
            </Card>
            <Card className={classes.postCommentsCard}>
                <h3>Comments:</h3>
                <Divider variant="middle" />
                <div className={classes.postCommentsContainer}>
                    {comments.map((comment) => (
                        <Card
                            variant="elevation"
                            elevation={10}
                            className={classes.comment}>
                            <PostComment comment={comment} />
                        </Card>
                    ))}
                </div>
            </Card>
        </div>
    );
}
