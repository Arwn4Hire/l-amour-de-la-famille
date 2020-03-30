import React, { Component } from "react";
import { comment, uncomment } from "../apis/apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultPostImg from "../assets/images/useravatar.png";
import Swal from "sweetalert2";

class Comment extends Component {
  state = {
    text: "",
    error: ''
  };

  isValid = () => {
    const { text } = this.state;
    if (!text.length > 0 || text.length > 300) {
      this.setState({
        error: "Comments should not be empty and greater than 300 characters long"
      });
      return false;
    }
    return true;
  };

  handleChange = event => {
      this.setState({error:''})
    this.setState({ text: event.target.value });
  };

  addComment = e => {
    e.preventDefault();

    if(!isAuthenticated()) {
        this.setState({error: " you must be logged in to comment"})
        return false
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;

      comment(userId, token, postId, { text: this.state.text }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = comment => {
   
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;
  
        
      
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
        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
              console.log(data.error);
            } else {
              
              this.props.updateComments(data.comments);
            }
          });
      }
    });
  };

  render() {
    const { comments } = this.props;
    const {error} = this.state
    return (
      <div className="container-fluid">
        <h2 className="mt-5 mb-5">Leave a comment </h2>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control lead text-white"
              value={this.state.text}
              placeholder="Leave a comment"
            />
            <button className="btn btn-raised btn-info mt-2">Post</button>
          </div>
        </form>

        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
        
        <div className="col-md-12 jumbotron bg-dark">
          <h5 className="lead"> Comments</h5>
          <hr />
          {comments.map((comment, i) => (
            <div key={i}>
              <div>
                <Link to={`/user/${comment.postedBy._id}`}>
                  <img
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    style={{ borderRadius: "50%", border: "1px solid black" }}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                    alt={comment.postedBy.name}
                    onError={i => (i.target.src = `${DefaultPostImg}`)}
                  />
                </Link>
                <div>
                  <h6 className="lead font-italic text-white">
                    {comment.text}
                    
                    <p className=" small">
                      Posted by{" "}
                      <Link to={`/user/${comment.postedBy._id}`}>
                        {comment.postedBy.name}
                      </Link>
                      <br />
                      on {new Date(comment.created).toDateString()}
                      
                      <span>
                      {isAuthenticated().user &&
                        isAuthenticated().user._id === comment.postedBy._id && (
                          <>            
                            <span
                              className="btn btn-raised btn-danger btn-sm mr-1 float-right"
                              style={{ borderRadius: "12px" }}
                              onClick={()=>this.deleteComment(comment)}
                            >
                              <i className="far fa-trash-alt" /> {" "}
                            </span>
                          </>
                        )}
                      </span>
                    </p>
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Comment;
