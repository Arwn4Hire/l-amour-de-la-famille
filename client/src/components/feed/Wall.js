import React, { Component } from "react";
import {list} from '../../apis/apiPost'
import {isAuthenticated} from '../../auth'
import defaultProfile from '../../assets/images/useravatar.png'
import appPostDefaultImg from '../../assets/images/wormhole.jpg'
import { Link } from "react-router-dom";

//import io from "socket.io-client"; 

//import api from "../services/api";

import commentImg from '../../assets/images/comment.svg';
import likeImg from "../../assets/images/like.svg";
import sendImg from "../../assets/images/send.svg";
import moreImg from "../../assets/images/more.svg";

class Wall extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      postIdFor: "",
      like: false,
      likes: 0,
      comments: [],
      hashtags:[],
      place:''
    };
   
  }

  loadPosts () {
    list().then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            this.setState({ posts: data });
           //console.log(data)
        }
    });
};
//   state = {
//     feed: []
//   };

   async componentDidMount() {
    this.loadPosts();
  }

  renderPosts = posts => {
    
    return (
      <div>
      <section id="post-list">
      {posts.map((post,i) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
    const posterName = post.postedBy ? post.postedBy.name : "Unknown"
        return(
          <article key={i}>
          
            
            <header>
            
              <div className="user-info">
              <div className="Post-user-avatar">
              {isAuthenticated() && (
                <>
                <img src={isAuthenticated().user._id
                  ? `${process.env.REACT_APP_API_URL}/user/photo/${
                    isAuthenticated().user._id
                    }?${new Date().getTime()}`
                  : defaultProfile} alt={isAuthenticated().user.name}
                  onError={i => (i.target.src = `${defaultProfile}`)}
                  width="23px" height="23px" />
              </>
              )}
            </div>



                <span>{posterName}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={moreImg} alt="More" />
            </header>
            <Link to={`/post/${post._id}`}>
            <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.title} onError={i => i.target.src=`${appPostDefaultImg}`} className='img-fluid' height='200px' width='100%' style={{borderRadius: '12%'}}/>
            </Link>

            <footer>
              <div className="actions">
                <button >
                  <img src={likeImg} alt="Like" />
                </button>
                <button type="button">
                  <img src={commentImg} alt="Comment" />
                </button>
                <button type="button">
                  <img src={sendImg} alt="Send" />
                </button>
              </div>
              <strong >{post.likes.length} likes</strong>
              <strong className='ml-3'>Comments</strong>
              <p>
                {post.description}<br/>
                <span>{post.hashtags}</span>
              </p>
            </footer>
          
          
          </article>
        )
        })}
      </section>
      </div>
    )
  }

//   registerToSocket = () => {
//     const socket = io("http://localhost:3333");

//     socket.on("post", newPost => {
//       this.setState({ feed: [newPost, ...this.state.feed] });
//     });

//     socket.on("like", likePost => {
//       this.setState({
//         feed: this.state.feed.map(post =>
//           post._id === likePost._id ? likePost : post
//         )
//       });
//     });
//   };

//   handleLike = id => {
//     api.post(`/posts/${id}/like`);
//   };

  render() {
    const { posts } = this.state;
    return (

      <section>
        
      {this.renderPosts(posts)}
        
      </section>
      
    );
  }
}

export default Wall