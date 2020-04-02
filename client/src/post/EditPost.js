import React, { Component } from "react";
import { singlePost, update } from "../apis/apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import DefaultPostImg from "../assets/images/wormhole.jpg";
import LoadingLoveGif from "../assets/images/smile-loading.gif";
import locationImg from "../assets/images/search-location-solid.svg";
import editdesImg from "../assets/images/edit-regular.svg";

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      postImgId: "",
      description: "",
      place: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false
    };
  }

  init = postId => {
    this.setState({ loading: true });
    singlePost(postId).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data.postedBy._id,
          postImgId: data._id,
          description: data.description,
          place: data.place,
          error: "",
          loading: false
        });
        //console.log(data)
      }
    });
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
  }

  isValid = () => {
    const { description, fileSize } = this.state;
    if (fileSize > 51200) {
      this.setState({
        error: "File size should be less than 51200kb or 5mb",
        loading: false
      });
      return false;
    }
    if (description.length === 0) {
      this.setState({ error: "Caption is required", loading: false });
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
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);

    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const postId = this.props.match.params.postId;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            description: "",

            place: "",
            redirectToProfile: true
          });
        }
      });
    }
  };

  editPostForm = (description, place) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
      <img src={editdesImg} alt="caption" />
        <label className="lead">Caption</label>
        <input
          onChange={this.handleChange("description")}
          type="text"
          className="form-control italic form-text text-dark"
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
                  src={LoadingLoveGif}
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
        className="btn btn-raised lead btn-info btn-lg"
      >
        Update Post
      </button>
    </form>
  );

  render() {
    const {
      id,
      postImgId,
      description,
      place,

      redirectToProfile,
      error,
      loading
    } = this.state;

    const photoURL = postImgId
      ? `${
          process.env.REACT_APP_API_URL
        }/post/photo/${postImgId}?${new Date().getTime()}`
      : DefaultPostImg;

    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{description}</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <img
            className="img-fluid"
            width="auto"
            src={LoadingLoveGif}
            alt="loading"
          />
        ) : (
          ""
        )}

        <img
          style={{ height: "200px", width: "auto" }}
          className="img-thumbnail"
          src={photoURL}
          onError={i => (i.target.src = `${DefaultPostImg}`)}
          alt={description}
        />
        {isAuthenticated().user.role === "admin" &&
          this.editPostForm(description, place)}

        {isAuthenticated().user._id === id &&
          this.editPostForm(description, place)}
      </div>
    );
  }
}

export default EditPost;
