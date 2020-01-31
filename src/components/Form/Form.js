import React, { Component } from 'react'
import {connect} from 'react-redux'; 
import { post } from '../../ducks/reducer_post'; 

export class Form extends Component {
    constructor() {
        super(); 

        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleNewPost = e => this.setState({[e.target.name]: e.target.value })

    post = () => {
        const { title, img, content } = this.state; 
        this.props.post(this.props.match.params.userid, {title, img, content})
        this.setState({title: '', img: '', content: ''})
        this.props.history.push('/dashboard')
    }

    render() {
        const { title, img, content } = this.state; 
        return (
            <div className='new-post' >
                <h1>New Post </h1>
                <span>
                    <label>Title</label><input name='title' value={title} onChange={e=>this.handleNewPost(e)} /> 
                    </span>
                <span> 
                     <img src={img} style={{width: '200px'}} />
                </span>
                <span>
                    <p>Image URL: </p>
                    <input name='img' value={img} onChange={e=>this.handleNewPost(e)} /> 
                </span>
                <span>
                    <p>Content</p>
                    <input name='content' value={content} onChange={e=>this.handleNewPost(e)} />
                </span>
                <button onClick={this.post} >Post</button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        post: state.reducer.post,
        user: state.reducer.user
    }
}

export default connect(mapStateToProps, { post })(Form);
