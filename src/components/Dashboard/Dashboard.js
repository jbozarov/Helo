import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

export class Dashboard extends Component {
    constructor() {
        super(); 

        this.state = {posts: []}
    }
    componentDidMount() {
        axios.get('/api/posts').then(res=>this.setState({posts: res.data }))
    }


    render() {
        console.log(this.state.posts)
        return (
            <div>
                <span>
                    <input placeholder='Search' />
                    <button>Search</button>
                    <button>Reset</button>
                </span>
                {this.state.posts.map(post=>(
                  <div key={post.id} className='post' >
                    <img src={post.img} style={{width: '40px', height: '40px'}} /> 
                    <h1> {post.title} </h1>
                    <h1> {post.title} </h1>
                  </div>  
                ))} 
                
            </div>
        )
    }
}

function mapStateToProps(state) {
	return { user: state.reducer.user };
}

export default connect(mapStateToProps)(Dashboard); 
