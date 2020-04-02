import React, { Component } from "react";
//import api from "../services/api";
import { isAuthenticated } from "../auth";
import { create } from "../apis/apiPost";
import { Redirect } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
//import Camera from 'react-html5-camera-photo';
//import 'react-html5-camera-photo/build/css/index.css';
import loadingGif from "../assets/images/loading.gif";
import locationImg from "../assets/images/search-location-solid.svg";
import editdesImg from "../assets/images/edit-regular.svg";

import "./New.css";

class New extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      place: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      redirectToProfile: false,
      loading: false,
      lat: "",
      lng: ""
    };
  }

  componentDidMount() {
    this.setState({ user: isAuthenticated().user });
    this.postData = new FormData();
  }

  isValid = () => {
    const { description, fileSize } = this.state;
    if (fileSize > 51200) {
      this.setState({ error: "File should be less than 5120kb or 5mb" });
      return false;
    }
    if (description.length === 0) {
      this.setState({
        error: "Caption is required",
        loading: false
      });
      return false;
    }
    return true;
  };

handleSelect = async value => {
  const results = await geocodeByAddress(value)
  const latLng = await getLatLng(results[0])
  
  this.setState({lat: latLng.lat, lng: latLng.lng, place: value})
  const name = 'place'
  this.postData.set(name, value)
}

handleLocation = (place) => this.setState({ place })
  
  handleChange = name => event => {
    this.setState({ error: ""});

    const value = name === "photo" ? event.target.files[0] : event.target.value;

    this.postData.set(name, value);
    
    const fileSize = name === "photo" ? event.target.files[0].size : 0;

    this.setState({ [name]: value, fileSize });

  };

  clickSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      create(userId, token, this.postData ).then(data => {
        console.log(data);
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            photo: "",
            description: "",
            place: "",
            redirectToProfile: true
          });
        }
        //
      });
    }
  };

  newPostForm = (description, place) => (
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
        <img src={editdesImg} alt="caption" />
        <label className=" bold">Caption</label>
        <input
          className="form-control text-dark bold"
          type="text"
          name='description'
          placeholder="Post's Caption"
          onChange={this.handleChange('description')}
          value={description}
          style={{ fontSize: "1.0em" }}
        />
      </div>

      <PlacesAutocomplete  
      onChange={this.handleLocation} 
      onSelect={this.handleSelect}
      value={place}
      name='place'
      >
      {({getInputProps, suggestions, getSuggestionItemProps, loading }) =>(
        <div>
        <img src={locationImg} alt="geo-loc" />
        <label className=" bold">Location</label>
        <input {...getInputProps({className:"form-control text-dark bold",
        type:"text",
        placeholder:"Location"
        })}
          />
          <div>{loading ? (
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
          {suggestions.map((suggestions) =>{
             const style ={
               backgroundColor: suggestions.active ? "rgb(36, 33, 179)" : "#fff"
             }
            return <div {...getSuggestionItemProps(suggestions,{style})}>{suggestions.description}</div>
          })}
          </div>
        </div>)}
      </PlacesAutocomplete>

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
        {this.newPostForm(description, place)}
      </div>
    );
  }
}

export default New;
