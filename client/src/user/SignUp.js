import React, { Component } from "react";
import { signup } from '../auth'
import {Link} from 'react-router-dom'

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;

    const user = { name, email, password };

    signup(user).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          open: true
        });
    });
  };

  signupForm = (name, email, password) => (
    <form>
      <div className="form-group">
      <i className="fa fa-user"></i>
        <label className="lead">Name</label>
        <input
          type="text"
          onChange={this.handleChange("name")}
          className="form-control"
          value={name}
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <div className="form-group">
      <i className="fa fa-envelope prefix grey-text"></i>
        <label className="lead">Email</label>
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control text-dark bold"
          value={email}
          style={{'fontSize': '1.0em'}}
        />
      </div>
      <div className="form-group">
      <i className="fa fa-lock prefix grey-text"/>
        <label className="lead">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control text-dark bold"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-info btn-lg waves-effect waves-light btn-block">
        Sign-Up
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          Account is successfully created. Please <Link to='/sign-in'>Sign-in</Link>
        </div>

        {this.signupForm(name, email, password)}
        
      </div>
    );
  }
}

export default SignUp;
