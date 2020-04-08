import React, { Component } from "react";
import appPostDefaultImg from "../../assets/images/wormhole.jpg";
import { Link } from "react-router-dom";
//import Loading from "../../components/loading/loading";
import NoPost from '../../components/template/noPostTemplate'

class UserPostImgs extends Component {

  render() {
    const { posts } = this.props;
    if (posts.length !== 0) {
      return (
        <div>
          {posts.map((postImg, i) => (
            <main key={i}>
              <div className="container">
                <div className="gallery">
                  <div className="gallery-item">
                    <Link to={`/post/${postImg._id}`} className='text-info'>
                      <img
                        className="gallery-image"
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${postImg._id}`}
                        alt={postImg.description}
                        onError={(i) => (i.target.src = `${appPostDefaultImg}`)}
                        loading="lazy"
                      />
                    

                    <div className="gallery-item-info">
                      <ul>
                        <li className="gallery-item-likes">
                          <span className="visually-hidden">Likes:</span>
                          <i className="fas fa-heart" aria-hidden="true"></i>
                          {postImg.likes.length}
                        </li>
                        <li className="gallery-item-comments">
                          <span className="visually-hidden">Comments:</span>
                          <i className="fas fa-comment" aria-hidden="true"></i>
                          {postImg.comments.length}
                        </li>
                      </ul>
                    </div>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </main>
          ))}
        </div>
      );
    } else {
      return <NoPost />;
    }
  }
}
export default UserPostImgs;
