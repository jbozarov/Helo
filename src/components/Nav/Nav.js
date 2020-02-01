import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import '../../App.css'
import { connect } from 'react-redux';

export class Nav extends Component {
   

    render(){
        console.log(this.props)
        if (this.props.location.pathname === "/") {
            return <></>;
        } else {
            return (
                <div className='nav-bar' >
                    <img src={this.props.user.profile_pic} style={{width: '70px'}} />
                    <h1> {this.props.user.username} </h1>
                    <Link to='/dashboard' > <h3>Home</h3> </Link>
                    <Link to={`/new/${this.props.user.id}`} > <h3>New post</h3> </Link>
                    <Link to='/' > <h3>Log out</h3> </Link>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
	return { user: state.reducer.user };
}

export default connect(mapStateToProps)(withRouter(Nav)); 