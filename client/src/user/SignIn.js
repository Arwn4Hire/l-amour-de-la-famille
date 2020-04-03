import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { signin, authenticate } from '../auth'
import './signIn-signUp.css'
import {Link} from 'react-router-dom'


class SignIn extends Component {constructor() {
    super();
    this.state = {
       
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = e => {
    e.preventDefault();
    this.setState({loading: true})

    const {email, password } = this.state;

    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });   
      } else {
          //auth user
        authenticate(data, () => {
            this.setState({redirectToReferer: true})
        })
          //redirect
      }
     
    });
  };

  signinForm = ( email, password) => (
    <form>
      
      <div className="form-group">
      <i className="fa fa-envelope prefix grey-text"></i>
        <label className=" bold">Email</label>
        
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control  text-dark bold"
          value={email}
          style={{'fontSize': '1.0em'}}
        />
        
      </div>
      <div className="form-group">
      <i className="fa fa-lock prefix grey-text"></i>
        <label className=" bold">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control lead display-4 text-dark bold"
          value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-info btn-lg waves-effect waves-light btn-block">
        Sign-In
      </button>
    </form>
  );

  render() {
    const { email, password, error, redirectToReferer, loading  } = this.state;

    if(redirectToReferer) {
        return <Redirect to='/'/>
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>

        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? <div className="jumbotron text-center"><h2>Loading...</h2></div> : ""}

        {this.signinForm( email, password)}

        <p>
        <Link
            to="/forgot-password"
            className="btn btn-raised btn-danger small float-right"
        >
            {" "}
            Forgot Password
        </Link>
    </p>
      
      </div>
    );
  }
}

export default SignIn;