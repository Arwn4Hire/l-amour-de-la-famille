import React from "react";
import {Link} from 'react-router-dom'

const NoPostTemplate = () => (
    <div className='container text-center'>
    <i className="fa-10x fas fa-plus-circle"/>
    <h3>Create your first memory, they will appear here</h3>
    <Link to='/create-feed'>Upload images</Link>
    </div>
  );
  
  export default NoPostTemplate;