import React, { Component } from "react";
import { list } from "../../apis/apiPost";
import defaultProfile from "../../assets/images/useravatar.png";
import appPostDefaultImg from "../../assets/images/wormhole.jpg";
import loadingImg from "../../assets/images/loading.gif";
import { Link } from "react-router-dom";

import commentImg from "../../assets/images/comment.svg";
import likeImg from "../../assets/images/like.svg";
import heartImg from "../../assets/images/heart-solid.svg";
import sendImg from "../../assets/images/send.svg";
import moreImg from "../../assets/images/more.svg";

class Wall extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      likes: 0,
      comments: [],
      place: "",
      text: "",
      loading: false,
    };
  }

  loadPosts() {
    this.setState({ loading: true });
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data, loading: false });
        // console.log(data)
      }
    });
  }

  async componentDidMount() {
    this.loadPosts();
  }

  renderPosts = (posts) => {
    return (
      <div>
        <section id="post-list">
          {posts.map((post, i) => {
            // const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
            const posterName = post.postedBy ? post.postedBy.name : "Unknown";

            return (
              <article key={i}>
                <header>
                  <div className="user-info">
                    <div className="Post-user-avatar">
                      <img
                        className=" mt-3 img-fluid"
                        width="50px"
                        height="50px"
                        style={{
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                          post.postedBy._id
                        }?${new Date().getTime()}`}
                        alt={post.name}
                        onError={(i) => (i.target.src = `${defaultProfile}`)}
                      />
                    </div>

                    <span>{posterName}</span>
                    <Link
                      style={{ color: "rgb(36, 33, 179" }}
                      to={`/post-location/${post._id}`}
                    >
                      {" "}
                      <span className="place">{post.place}</span>
                    </Link>
                  </div>
                  <img src={moreImg} alt="More" />
                </header>
                <Link to={`/post/${post._id}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.title}
                    onError={(i) => (i.target.src = `${appPostDefaultImg}`)}
                    className="img-fluid"
                    height="200px"
                    width="100%"
                    loading="lazy"
                    style={{ borderRadius: "12%" }}
                  />
                </Link>

                <footer>
                  <div className="actions">
                    {post.likes.length ? (
                      <Link to={`/post/${post._id}`}>
                        <button>
                          <img src={heartImg} alt="Like" />
                        </button>
                      </Link>
                    ) : (
                      <Link to={`/post/${post._id}`}>
                        <button>
                          <img src={likeImg} alt="Like" />
                        </button>
                      </Link>
                    )}
                    <Link to={`/post/${post._id}`}>
                      <button type="button">
                        <img src={commentImg} alt="Comment" />
                      </button>
                    </Link>
                    <button type="button">
                      <img src={sendImg} alt="Send" />
                    </button>
                  </div>
                  <strong>{post.likes.length} likes</strong>
                  <strong className="ml-3">
                    {post.comments.length} Comments
                  </strong>
                  <br />

                  <p>{post.description}</p>
                </footer>
              </article>
            );
          })}
        </section>
      </div>
    );
  };

  render() {
    const { posts, loading } = this.state;
    return (
      <section>
        {loading ? (
          <img className="img-fluid" src={loadingImg} alt="loading" />
        ) : (
          this.renderPosts(posts)
        )}
      </section>
    );
  }
}

export default Wall;
