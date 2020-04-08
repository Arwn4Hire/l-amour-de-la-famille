import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "../apis/apiPost";
import DefaultPostImg from "../assets/images/wormhole.jpg";
import { Link, Redirect } from "react-router-dom";
import LoadingGif from "../assets/images/loading.gif";
import { isAuthenticated } from "../auth";
import Swal from "sweetalert2";
import Comment from "./Comment";
import Download from '@axetroy/react-download';
//images
import grinHearts from '../assets/images/grin-hearts.svg'
import frown from '../assets/images/frown-regular.svg'
import backImg from '../assets/images/arrow-circle-left-solid.svg'
import deleteImg from '../assets/images/trash-solid.svg'
import editImg from '../assets/images/edit-regular.svg'
import downloadImg from '../assets/images/download-solid.svg'


class SinglePost extends Component {
  state = {
    post: "",
    photoImgId:"",
    redirectToHome: false,
    redirectToSignIn: false,
    loading: false,
    like: false,
    likes: 0,
    comments: []
  };

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          photoImgId: data._id,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments
        });
       // console.log(data)
      }
    });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        remove(postId, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            this.setState({ redirectToHome: true });
          }
        });
      }
    });
  };

  updateComments = comments => {
    this.setState({ comments });
  };

  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignIn: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        });
      }
    });
  };

  renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : "Unknown";
    const { like, likes, comments, photoImgId } = this.state;

    const photoURL =  photoImgId ? `${process.env.REACT_APP_API_URL}/post/photo/${photoImgId}?${new Date().getTime()}` : DefaultPostImg
    console.log(photoURL)
    return (
      <div className="card-body text-center">

      <div className="row no-gutters">
      <div className="col-md-7">
      <img 
          src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
          alt={post.description}
          onError={i => (i.target.src = `${DefaultPostImg}`)}
          className="img-fluid"
          height="100"
          width="100%"
          loading="lazy"
        />
        

        <p className="lead text-dark">{post.description}</p>
        <hr/>
        <div className="d-inline-block">
          <Link
            to={`/home`}
            className="btn btn-raised btn-info btn-lg mr-5"
            style={{ borderRadius: "12px" }}
          >
          <img src={backImg} alt='back-to-post'/> 
          </Link>
          {isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id && (
              <>
                <Link to={`/post/edit/${post._id}`}>
                  <button
                    className="btn btn-raised btn-warning btn-lg mr-5"
                    style={{ borderRadius: "12px" }}
                  >
                  <img src={editImg} alt='edit-post'/>
                  </button>
                </Link>

                <button
                  className="btn btn-raised btn-danger btn-lg mr-5"
                  style={{ borderRadius: "12px" }}
                  onClick={this.deletePost}
                >
                  <img src={deleteImg} alt='delete-post'/>{" "}
                </button>
              </>
            )}
        </div>
        <Download file={photoURL} onError={i => (i.target.src =`${DefaultPostImg}`)} content={photoURL}>
       <button className="btn btn-raised btn-success btn-lg mr-5" style={{ borderRadius: "12px" }}><img src={downloadImg} alt={post.description}/>
        </button></Download>
        
        <hr/>
      </div>

      <div className="col-md-5">
      <div className="card-body">
      <h5 className="card-title">
      Posted by <Link to={`${posterId}`}>{posterName} </Link>
      
      <br/>
         <small>on {new Date(post.created).toDateString()}</small> 
         </h5>
         
         <br/>
         
          <div className="mt-5 mr-3 float-left">
          {like ? (
            <h4>
              {likes} Likes 
             
            </h4>
          ) : (
            <h4>
            {likes} Likes 
            </h4>
          )}
          
          </div>
          <div className='float-right mt-5'>{comments.length} Comments</div>
          
          <hr/>
          {isAuthenticated().user &&(
           <div className="mt-1 float-left">
          {like ? (
              
            <button className='btn btn-raised btn-info btn-sm waves-effect waves-light btn-block' style={{ borderRadius: "12px" }} onClick={this.likeToggle}><img src={grinHearts}  alt='love'/></button>
            
            ) : (
              <button className='btn btn-raised btn-danger btn-sm waves-effect waves-light btn-block' style={{ borderRadius: "12px" }} onClick={this.likeToggle}><img src={frown}  alt='hate'/></button>
            
            )}
            
          </div> 
          )}
      
      </div>
      </div>
      </div>
      
      </div>
    );
  };

  render() {
    const { post, redirectToHome, redirectToSignIn, comments } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/home`} />;
    } else if (redirectToSignIn) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        
        {!post ? (
          <div className=" text-center">
            {" "}
            <h2>
              <img className="img-fluid" src={LoadingGif} alt="loading" />
            </h2>
          </div>
        ) : (
          this.renderPost(post)
        )}

        <Comment
          postId={post._id}
          comments={comments.reverse()}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}

export default SinglePost;
