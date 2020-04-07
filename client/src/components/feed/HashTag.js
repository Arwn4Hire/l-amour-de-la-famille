import React, { Component } from 'react'
//import './hash.css'
import {list, findHash} from '../../apis/apiPost'
import loadingImg from '../../assets/images/loading.gif'
import appPostDefaultImg from '../../assets/images/wormhole.jpg'
import { Link } from "react-router-dom";

class HashTag extends Component {
    constructor() {
        super()
        this.state ={
            loading: false,
            posts: [],
            text: ''
        }
    }

    loadPosts () {
        this.setState({loading: true})
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
              this.setState({ posts: data ,loading: false})
              // console.log(data)
            }
        });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        
      };
    
       async componentDidMount() {
        this.loadPosts();
      }

      onSubmit = e => {
        e.preventDefault();
        const {text} = this.state
       
        findHash(text).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                console.log(data)
            }
        })

      }

      renderSearch= posts =>{
          return (
              <div>
              {posts.map((post, i) => {
return(
    <div className="card-group" key={i}>
    <div className="card">
    <Link to={`/post/${post._id}`}>
    <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt={post.title} onError={i => i.target.src=`${appPostDefaultImg}`} className='img-thumbnail' height='180px' width='180px' style={{borderRadius: '12%'}}/>
    </Link>
      <div className="card-body">
        <h3 className="card-title text-center">{post.description}</h3>
        
        
      </div>
    </div>

    
  </div>
)
              })}
              </div>
          )
      }

    render() {
        const {posts, loading, text} = this.state
        return (
            <div>
            <div className="container">

            <h1 className="heading">Search for Users,<span>Places or HashTag images</span><br/>
            <div className="md-form mt-0">
            <input className="form-control lead" onChange={this.handleChange("text")} type="text" value={text} placeholder="Search" aria-label="Search"/>
          </div>
          <button onClick={this.onSubmit} className="btn btn-lg btn-default btn-block">Search</button>
          </h1>
            


            
          {loading ? <img className="img-fluid" src={loadingImg} alt="loading" /> :
          this.renderSearch(posts) }
         
        
        </div>
            </div>
        )
    }
}
export default HashTag;