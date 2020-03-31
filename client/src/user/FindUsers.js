import React, { Component } from "react";
import { findPeople, follow } from "../apis/apiUser";
import {isAuthenticated} from '../auth'
import DefaultProfile from "../assets/images/useravatar.png";
import { Link } from "react-router-dom";
import LoadingLoveGif from '../assets/images/loading.gif'

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({loading: true})
    const userId = isAuthenticated().user._id
      const token = isAuthenticated().token
    findPeople(userId, token).then(data => {
      if(data.error) {
        console.log(data.error)
        this.setState({redirectToNoConnection: true})
      } else {
        this.setState({users: data, loading:false})
      }
    })
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token

    follow(userId, token, user._id).then(data => {
        if(data.error) {
            this.setState({error: data.error})
        } else {
            let toFollow = this.state.users
            toFollow.splice(i, 1)
            this.setState({users: toFollow, open: true, followMessage: `Following ${user.name}`})
        }
    })
  }

  renderUsers = users => (
    <div className="row">
    {users.map((user, i) =>(
      <div key={i} className='text-center col-sm-4' >
      <img src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} onError={i => (i.target.src=`${DefaultProfile}`)} alt={user.name} className='img-thumbnail' height='80' width='80' style={{borderRadius: '50%'}}/>
      <div className="card-body">
      <h5 className="card-title">{user.name}</h5>
      <button className="btn btn-raised btn-info lead btn-lg float-left" style={{borderRadius: '12px'}}><Link to={`/user/${user._id}`} >View Profile
      </Link></button>
      
      <button className="btn btn-raised lead btn-info btn-lg float-right" onClick={() => this.clickFollow(user, i)}  style={{borderRadius: '12px'}}>Follow</button>
      </div>
      
      </div>
    ))}
    </div>
  );

  render() {
    const { users, loading } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {loading ? (
          <img className='img-fluid' width='auto'  src={LoadingLoveGif} alt='loading'/>
      ) : (
          ""
      )}
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
