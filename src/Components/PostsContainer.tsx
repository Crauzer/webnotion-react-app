import {
    Divider,
    GridList,
    GridListTile,
    GridListTileBar,
    IconButton,
    ListSubheader,
    makeStyles,
} from "@material-ui/core";
import { ViewHeadline } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../API/Interfaces";
import PostCard from "./PostCard";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default function PostsContainer() {
    const classes = useStyles();

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios
            .get<Post[]>("http://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((reason) => console.error(reason));
    }, []);

    return (
        <div className={classes.root}>
            {posts.map((post) => (
                <PostCard post={post} />
            ))}
        </div>
    );
}
