import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Post } from "./API/Interfaces";
import axios from "axios";
import PostsContainer from "./Components/PostsContainer";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostPage from "./Pages/Post";

const theme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div className="App">
                    <Switch>
                        <Route
                            path="/"
                            exact={true}
                            component={PostsContainer}
                        />

                        <Route path="/post/:id" component={PostPage} />
                    </Switch>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
