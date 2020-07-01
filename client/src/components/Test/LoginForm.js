import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import './test.css'
 class LoginTest extends Component{
    constructor(props){
        super(props);
        this.state = {
                password:"",
                username:""
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler =  this.submitHandler.bind(this);
    }
    changeHandler(e){
        this.setState({   [e.target.name]: e.target.value    });
    }

    async submitHandler(e){
        e.preventDefault();
        const {username,password} = this.state; 
        this.props.login(username,password);
    };
   

    render() {
        const { password, username} = this.state;
        // Redirect if logged in 

        if(this.props.isAuth){
            return <Redirect to="/feed"/>
        }

        return (
            <div className="test" onSubmit={this.submitHandler}>
                <form>
                   <input type="text" id="username" value={username}  name="username" placeholder="Enter Username"  onChange={this.changeHandler} required/>
                   <input type="password" id="password" value={password} name="password" placeholder="Enter Password"  onChange={this.changeHandler} required/>
                   <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
LoginTest.propTypes = {
    login : PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuth : state.auth.isAuth
});

export default connect(mapStateToProps,{ login })(LoginTest);