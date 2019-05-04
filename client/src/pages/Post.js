import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import API from "../util/API";
//create a function that called "userRegistration" which return the registration logics
//export "User" regisration to the Post.js




export default class Post extends Component {


    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            location: "",
            description: "",
            image: ""
        };
    }

    //Function to allow data in the form fields
    // validateForm() {
    //     return this.state.description.length;;
    // }
    componentDidMount() {
        this.loadAllPost();
      }

      loadAllPost = () => {
        API.getAllPosts()
          .then(res =>{
            console.log(res)
            this.setState({ posts: res.data,                 
            location: "",
            description: "",
            image: "" })}
          )
          .catch(err => console.log(err));
      };
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    

    //Prevent login from clearing out
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.location) {
          API.savePost({
            location: this.state.location,
            description: this.state.description,
            image: this.state.image
          })
            .then(
                res => {
                this.loadAllPost()
                console.log(res)

            })
            .catch(err => console.log(err));
        }
      };


    render() {
        return (
            <div className="Register">
                <div className="header">
                    <div className="headerWaves"></div>
                    <h1 className="headerFont">SWERVE</h1>
                </div>
                <form onSubmit={this.handleFormSubmit}>
                    <Form.Group controlId="location">
                        <Form.Label className="normal-font"> Please enter the street name </Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleInputChange}
                            
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label className="normal-font"> Please enter the description of the issue </Form.Label>

                        <Form.Control
                            autoFocus
                            as="textarea"
                            rows="5"
                            type="textarea"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label className="normal-font">Image (optional)</Form.Label>
                        <Form.Control
                            value={this.state.image}
                            onChange={this.handleInputChange}
                            type="image"
                        />
                    </Form.Group>

                    <Button block className="custom-btn" onClick={this.handleFormSubmit}>
                    <Link to={"/dashboard"} className="link">
                        Submit
                    </Link>
                    </Button>
                </form>
            </div>

        );
    }
}