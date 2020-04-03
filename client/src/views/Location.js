import React, { Component } from "react";
import { singlePost } from "../apis/apiPost";
import defaultPostImg from "../assets/images/wormhole.jpg";
import defaultProfile from "../assets/images/useravatar.png";
import loadingSkeleton from "../assets/images/skeleton-loading.gif";
import { Link } from "react-router-dom";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Geocode from "react-geocode";


export default class Location extends Component {
  constructor() {
    super();
    this.state = {
      defaultCenter: "",
      lat: "",
      lng: "",
      postById: "",
      photoImgId: "",
      caption: "",
      name: "",
      place:"",
      loading:false
    };
  }

  componentDidMount = () => {
    const postId = this.props.match.params.postId;

    singlePost(postId).then(data => {
        this.setState({loading:true})
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          defaultCenter: data.place,
          photoImgId: data._id,
          postById: data.postedBy._id,
          caption: data.description,
          name: data.postedBy.name,
          place: data.place
        });
       // console.log(data);
        this.getLatLngFromAdd();
      }
    });
  };

  getLatLngFromAdd() {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("en");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    const { defaultCenter } = this.state;
    Geocode.fromAddress(defaultCenter).then(response => {
      const { lat, lng } = response.results[0].geometry.location;
      this.setState({ lat, lng, loading:false });
      // console.log(lat, lng);
    });
  }

  render() {
    const { lat, lng, photoImgId, postById, caption, name, place, loading } = this.state;

    const MapWithAMarker = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: lat, lng: lng }}>
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    ));
    return (
      <div className="container mt-5">
      {loading ? <img className="img-fluid" src={loadingSkeleton} alt="loading" /> :<> <header>
      <div className="user-info">
        <div className="Post-user-avatar">

          <Link to={`/user/${postById}`}>
            <img
              className=" mt-3 img-fluid"
              width="23px"
              height="23px"
              style={{ borderRadius: "50%", border: "1px solid black" }}
              src={`${
                process.env.REACT_APP_API_URL
              }/user/photo/${postById}?${new Date().getTime()}`}
              alt={caption}
              onError={i => (i.target.src = `${defaultProfile}`)}
            />
          </Link>
        </div>
      </div>
      <span>{name}</span><br/>
      <span>{place}</span>
    </header>
    <MapWithAMarker
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
    <br />
    <div className="container mt-1">
      <h1>
        
          {caption}
        
      </h1>
      <div>
        <img
          src={`${process.env.REACT_APP_API_URL}/post/photo/${photoImgId}`}
          alt={caption}
          onError={i => (i.target.src = `${defaultPostImg}`)}
          className="img-fluid"
          height="80"
          width="auto"
        />
      </div>
    </div>
    </>
    }
        
      </div>
    );
  }
}
