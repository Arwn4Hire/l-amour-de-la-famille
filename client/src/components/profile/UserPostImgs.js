import React, { Component } from 'react'
import appPostDefaultImg from '../../assets/images/wormhole.jpg'
import './profile.css'
import {Link} from 'react-router-dom'
 class UserPostImgs extends Component {
    render() {
        const {posts} = this.props
        return (
            <div>
            {posts.map((postImg, i) => (
            <main key={i}>
    
      <div className="container">
    
        <div className="gallery" >
    
          <div className="gallery-item">
          <Link to={`/post/${postImg._id}`}>
          <img className='gallery-image' src={`${process.env.REACT_APP_API_URL}/post/photo/${postImg._id}`} alt={postImg.title} onError={i => i.target.src=`${appPostDefaultImg}`}/>
          </Link>
      
       
          </div>
    
         
         
          
         
    
          
    

        </div>

    
        
    
      </div>
      
    
    </main>
    ))}
            </div>
        )
    }
}
export default UserPostImgs