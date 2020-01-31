import React, { Component } from 'react'
import axios from 'axios'; 
import { getUser } from '../../ducks/reducer'
import { connect } from 'react-redux'; 

export class Auth extends Component {
    constructor(){
        super(); 

        this.state = {
            username: '', 
            password: '', 
            profile_pic: 'https://robohash.org/people',
            loggedUser: {}
            
        }
        this.login = this.login.bind(this); 
        this.register = this.register.bind(this); 
    }

    //Handling input buttons 
    inputAuthPage = e => this.setState({[e.target.name]: e.target.value })

    async login () {
        console.log(this.props.history)
        const { username, password } = this.state;
        await axios.post('/api/auth/login', {username, password})
        .then(res=>{
            this.setState({loggedUser: res.data, username: '', password: ''})
            this.props.getUser(this.state.loggedUser); 
            console.log(this.state.loggedUser)
            this.props.history.push('/dashboard');
        })
       
    }
    async register () {
        const {username, password, profile_pic } = this.state
        axios.post('/api/auth/register', {username, password, profile_pic})
        .then(res => {
            this.setState({loggedUser: res.data, username: '', password: ""})
            this.props.history.push('/dashboard');
        })
        .catch(err=>console.log(err)); 
    }


    render() {
        const { username, password} = this.state 
        return (
            <div className='auth' >
                <div className='auth-box'>
                    <h1>Helo</h1>
                    <span><label>Username </label><input 
                                          name='username'
                                          value={username}
                                          onChange={e=>this.inputAuthPage(e)} /></span>
                    <span> <label>Password</label><input
                                         name='password'
                                         value={password}
                                         onChange={e=>this.inputAuthPage(e)} /> </span> 
                    <span><button onClick={this.login} >Login</button>
                    <button onClick={this.register} >Register</button></span>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => state; 

export default connect(mapStateToProps, { getUser })(Auth); 