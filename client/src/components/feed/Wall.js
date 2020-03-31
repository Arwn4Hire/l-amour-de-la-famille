import React, { Component } from "react";
import {list} from '../../apis/apiPost'
import defaultProfile from '../../assets/images/useravatar.png'
import appPostDefaultImg from '../../assets/images/wormhole.jpg'
import { Link } from "react-router-dom";

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
           console.log(data)
        }
    });
};


   async componentDidMount() {
    this.loadPosts();
  }

  renderPosts = posts => {
    
    return (
      <div>
      <section id="post-list">
      {posts.map((post,i) => {
       // const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
    const posterName = post.postedBy ? post.postedBy.name : "Unknown"

        return(
          <article key={i}>
          
            
            <header>
            
              <div className="user-info">
              <div className="Post-user-avatar">
              
              <img
                    className=" mt-3 img-fluid"
                    width="23px" height="23px"
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}?${new Date().getTime()}`}
                    alt={post.name}
                    onError={i => (i.target.src = `${defaultProfile}`)}
                  />
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