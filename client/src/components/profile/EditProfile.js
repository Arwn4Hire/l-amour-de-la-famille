import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { read, update, updateUser } from "../../apis/apiUser";
import { Redirect } from "react-router-dom";
import DefaultProfile from '../../assets/images/useravatar.png'
import LoadingGif from "../../assets/images/loading.gif";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      about: "",
      password: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
      this.userData = new FormData()
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 100000) {
        this.setState({ error: "File should be less than 100kb or 1mb" });
        return false;
      }
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading:false });
      return false;
    }
    if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: "A valid email is required", loading:false });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({ error: "Password must be 6 characters long", loading:false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
      this.setState({error: ""})
      const value = name === 'photo' ? event.target.files[0] : event.target.value
      this.userData.set(name, value)
      const fileSize = name === 'photo' ? event.target.files[0].size : 0
    this.setState({ [name]: value, fileSize });
  };

  clickSubmit = e => {
    e.preventDefault();
    this.setState({loading: true})
    if (this.isValid()) {
      
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else
        updateUser(data, () =>{
          this.setState({
            redirectToProfile: true
          });
        })
      });
    }
  };

  signupForm = (name, email, password, about) => (
    <form>

    <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          type="file"
          accept='image/*'
          onChange={this.handleChange("photo")}
          className="form-control"
          
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={this.handleChange("name")}
          className="form-control"
          value={name}
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Bio</label>
        <textarea
          type="text"
          onChange={this.handleChange("about")}
          className="form-control text-dark"
          value={about}
          placeholder="bio"
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-info">
        Update
      </button>
    </form>
  );

  render() {
    const { id, name, email, password, redirectToProfile, error, loading, about } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    const photoUrl = id ? `${process.env.REACT_APP_API_URL}/user/photo/${id}?${new Date().getTime()}` : DefaultProfile
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? <img className="img-fluid" src={LoadingGif} alt="loading" /> : ""}

        <img src={photoUrl} onError={i => (i.target.src=`${DefaultProfile}`)} alt={name} height='150' width='150' style={{borderRadius: '50%'}}/>

        {this.signupForm(name, email, password, about)}
      </div>
    );
  }
}

export default EditProfile;
