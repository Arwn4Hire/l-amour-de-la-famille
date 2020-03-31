import React, { Component } from 'react';
import { read } from '../../apis/apiUser'
import LoadingSkeleton from '../../assets/images/skeleton-loading.gif'
import { isAuthenticated } from "../../auth";
import {Link, Redirect} from 'react-router-dom'
import DefaultProfile from '../../assets/images/useravatar.png'

class Followers extends Component {
  constructor() {
    super()
    this.state = {
      user: [],
      loading: false,
      redirectToSignIn: false
    }
  }

  init = userId => {
    this.setState({loading: true})
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignIn: true });
      } else {
        console.log(data.followers)
        this.setState({ user: data.followers, loading: false });
        
      }
    });
  };

  componentDidMount() {
    const userId = isAuthenticated().user._id;    
    this.init(userId);
  }

  UNSAFE_componentWillReceiveProps() {
    const userId = isAuthenticated().user._id;
    this.init(userId);
  }

  renderFollowers = (user) => (
    
    <div className="col-md-4">
      <h2 className='mt-5'>Followers</h2>
      <hr/>
      {user.map((person, i) => (
        <div key={i}>
          <div>
            <Link to={`/user/${person._id}`}>
              <img
                className=" mt-3 img-fluid"
                height="80px"
                width="80px"
                style={{ borderRadius: "50%", border: "1px solid black" }}
                src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                alt={person.name}
                onError={i => (i.target.src = `${DefaultProfile}`)}
              />
              <div>
                <small className="font-italic ml-5 text-dark">
                  {person.name}
                </small>
              </div>
            </Link>
          </div>
        </div>
      ))}
      </div>
  )

  render() {
    const {user, redirectToSignIn, loading} = this.state

    if (redirectToSignIn) return <Redirect to="/sign-in" />;
    return (
      <div className="container">
      <div className="row">
      {loading ? (
        <img className='img-fluid' width='auto'  src={LoadingSkeleton} alt='loading'/>
    ) : (
      ''
    )}
    {this.renderFollowers(user)}
      </div>
      </div>
    );
  }
}

export default Followers