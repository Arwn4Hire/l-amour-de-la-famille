import React, { Component } from "react";
//import api from "../services/api";
import { isAuthenticated } from "../auth";
import { create } from "../apis/apiPost";
import { Redirect } from "react-router-dom";
//import Camera from 'react-html5-camera-photo';
//import 'react-html5-camera-photo/build/css/index.css';
import loadingGif from "../assets/images/loading.gif";
import hashTagsImg from "../assets/images/hashtag-solid.svg";
import locationImg from "../assets/images/search-location-solid.svg";
import editdesImg from "../assets/images/edit-regular.svg";

import "./New.css";

class New extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      place: "",
      hashtags: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      redirectToProfile: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ user: isAuthenticated().user });
    this.postData = new FormData();
    
  }

  isValid = () => {
    const { description, hashtags, fileSize } = this.state;
    if (fileSize > 51200) {
      this.setState({ error: "File should be less than 5120kb or 5mb" });
      return false;
    }
    if (description.length === 0 || hashtags.length === 0) {
      this.setState({
        error: "Description and hashtags are required",
        loading: false
      });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.postData.set(name, value);
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.setState({ [name]: value, fileSize });
  };

  handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  clickSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
        console.log(data)
        if (data.error) this.setState({ error: data.error  });
        else {
          this.setState({
            loading: false,
            photo: "",
            description: "",
            place: "",
            hashtags: "",
            redirectToProfile: true
          });
        }
        //
      });
    }
  };

  newPostForm = (description, hashtags, place) => (
    <form className="mt-5">
      <div className="form-group">
        <input
          type="file"
          accept="image/*"
          onChange={this.handleChange("photo")}
          className="form-control text-dark bold"
        />
      </div>

      <div className="form-group">
     
    </div>
      
      <div className="form-group">
      <img src={editdesImg} alt="geo-loc" />
        <label className=" bold">Description</label>
        <input
          className="form-control text-dark bold"
          type="text"
          name="description"
          placeholder="Post's Description"
          onChange={this.handleChange("description")}
          value={description}
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <div className="form-group">
        <img src={locationImg} alt="geo-loc" />
        <label className=" bold">Location</label>
        <input
          className="form-control text-dark bold"
          type="text"
          name="place"
          placeholder="Post's place"
          onChange={this.handleChange("place")}
          value={place}
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <div className="form-group">
        <img src={hashTagsImg} alt="hashTags" />
        <label className=" bold">Hashtags</label>
        <input
          className="form-control text-dark bold"
          type="text"
          name="hashtags"
          placeholder="Post's Hashtags"
          onChange={this.handleChange("hashtags")}
          value={hashtags}
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-info btn-lg waves-effect waves-light btn-block"
      >
        Post
      </button>
    </form>
  );

  render() {
    const {
      description,
      hashtags,
      user,
      redirectToProfile,
      error,
      loading,
      place
    } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${user._id}`} />;
    }
    return (
      <div className="container">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className=" text-center">
            {" "}
            <h2>
              <img
                className="img-fluid"
                width="200"
                src={loadingGif}
                alt="loading"
              />
            </h2>
          </div>
        ) : (
          ""
        )}
        {this.newPostForm(description, hashtags, place)}
      </div>
    );
  }
}

export default New;
