import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
    return (
      <div className="profile-stats">
        <ul>
          <li>
            <div className="profile-stat-count">
              <Link to={`/followers`}>
                <span className="profile-stat-count">
                  {followers.length} followers
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="profile-stat-count">
              <Link to={`/following`}>
                <span className="profile-stat-count">
                  {following.length} following
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="profile-stat-count">
              <span className="profile-stat-count">{posts.length} Post</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ProfileTabs;
