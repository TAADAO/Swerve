import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Post.css";
import API from "../util/API";
import Axios from "axios";
import image from "../component//images/bad-potehole.jpg"


export default class Post extends Component {


    constructor(props) {
        super(props);

        this.state = {
            posts:[],
            location: "",
            description: "",
            title:"",
            image: null

        };
    }

 //On page upload
    componentDidMount() {
        this.loadAllPost();
      }

      loadAllPost = () => {
        API.getAllPosts()
          .then(res =>{
            console.log(res)
            this.setState({ 
            posts: res.data,                 
            location: "",
            description: "",
            title:"",
            image: null })}
          )
          .catch(err => console.log(err));
      };

      //hanld Image File
      fileSelectedHandler = (event)=>{
           
          console.log(event.target.files[0])
          this.setState({
            image: image
          }
        )
      }
      //Handle Change
      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    
    
    //Prevent login from clearing out
    handleFormSubmit = event => {
        event.preventDefault();

        if (this.state.location && this.state.description) {
        
          API.savePost({
            location: this.state.location,
            description: this.state.description,
            image: this.state.image,
            title:this.state.title
          })
            .then(
                res => {
               this.props.history.push('/dashboard');
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
                <form onSubmit={this.handleFormSubmit} enctype="multipart/form-data">

                {/* <Form.Group controlId="title">
                        <Form.Label className="normal-font"> 
                        Headline </Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            placeholder ="Example: Blood Sucking! Pothole"
                            
                        />
                    </Form.Group> */}
                    <Form.Group controlId="location">
                        <Form.Label className="normal-font"> Street Name </Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleInputChange}
                            placeholder = "Example: Ward Parkway"
                            
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
                        <Form.Label className="normal-font">Image (Required)</Form.Label>
                        <Form.Control
                         
                            onChange={this.fileSelectedHandler}
                            type="file"
                            name= "image"
                        />
                    </Form.Group>

                    <Button block className="custom-btn" onClick={this.handleFormSubmit}>
              
                      Submit
                 
                    </Button>
                </form>
            </div>

        );
    }
}