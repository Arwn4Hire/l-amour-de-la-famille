import React, { Component } from 'react'
import {follow, unfollow} from '../../apis/apiUser'
//import {isAuthenticated } from "../..auth";

class FollowButtons extends Component {
    followClick = () => {
        this.props.onButtonClick(follow)
    }

    unfollowClick = () => {
        this.props.onButtonClick(unfollow)
    }

    render() {
      const {userName} = this.props
        return (
            <div className="d-inline-block">
        {!this.props.following ? (
          <button onClick={this.followClick} className="btn btn-success btn-lg btn-raised mr-5">Follow</button>
        ) : (
          <button onClick={this.unfollowClick} className="btn btn-warning btn-lg btn-raised ">UnFollow</button>
        )}
        <h2 className="profile-user-name">{userName}</h2>
      </div>
        )
    }
}


export default FollowButtons