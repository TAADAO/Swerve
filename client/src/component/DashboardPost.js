import React, { Component } from 'react';
import "../styles/DashboardPost.css"
import API from "../util/API";


export default class DashboardPost extends Component {

    state = {
        posts: [],
        description: [],
        location: []
    }

    componentDidMount() {
        API.getAllPosts().then (
            (res)=> {
                console.log(res.data);
                console.log("Description: " + res.data[0].description);
                console.log("Description: " + res.data.description);
                console.log("Location: " + res.data[0].location);
                this.setState({ posts: res.data});
                this.setState({ description: res.data.description});
                this.setState({ location: res.data[0].location});
            }
        )
    }

    render() {
        return (
            <div className="PostContainer">
                <div className="post-top">
                    <h1>Username</h1>
                    <h1>@{ this.state.location}</h1>
                </div>
                <p className="post-content">This is the post cotent</p>
                <div className="post-bottom">
                    <h2>Notes</h2>
                    <h2>Likes</h2>
                </div>
            </div>
        );
    }
}