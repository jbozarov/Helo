import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

export class Dashboard extends Component {
    constructor() {
        super(); 

        this.state = {
            posts: [],
            checked: true,
        }
    }
    componentDidMount() {
        this.update(); 
    }
    
    update = () => axios.get('/api/posts').then(res=>this.setState({posts: res.data }))

    filterTitle = e => this.setState({posts: this.state.posts.filter(val => val.title.includes(e.target.value))})

    postView = id => {
        this.props.history.push(`/post/${id}`)
    }

    checked = () => {
        const { checked } = this.state; 
        this.setState({checked: !checked })
        if (checked) this.setState({posts: this.state.posts.filter( val => val.username === this.props.user.username )})
        else this.update()
        console.log( 'Checked value is: ', checked)
    }

    render() {
        console.log(this.state.posts)
        return (
            <div>
                <span className='search' >
                    <div>
                        <input placeholder='Search' style={{width: '300px'}} onChange={e=>this.filterTitle(e)}  />
                        <button>Search</button>
                        <button onClick={this.update} >Reset</button>
                    </div>
                    <input type='checkbox' onChange={this.checked} /> 
                </span>
                {this.state.posts.map(post=>(
                  <div key={post.id} className='post' onClick={()=>this.postView(post.id)} >
                    <img src={post.img} style={{width: '40px', height: '40px'}} /> 
                    <h3> {post.title} </h3>
                    <p> {post.title} </p>
                    <p> {post.username} </p>
                    <p> {post.user_id} </p>
                  </div>  
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
	return { 
        user: state.reducer.user, 
        loggedIn: state.toggleReducer
     };
}

export default connect(mapStateToProps)(Dashboard); 
