import React, { Component } from 'react';
import {connect} from 'react-redux';
import './test.css'
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import Alert from './layout/Alert';

class TestForm extends Component{
    constructor(props){
        super(props);
        this.state = {
                name:"",
                email:"",
                password:"",
                phone:"",
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
        if(this.state.phone.includes('-')){
           this.props.setAlert('Please Only Include Numbers In Phone Number','danger')
        } else{
            const {name, email, password, phone, username} = this.state;
            this.props.register({ name, email, password, phone, username });
        };
    };
   

    render() {
        const {name, email, password, phone, username} = this.state;

        if(this.props.isAuth){
            return <Redirect to="/feed"/>
        }

        return (
            <div className="test" onSubmit={this.submitHandler}>
                <Alert/>
                <form>
                   <input type="text"  id='name' name="name" value={name} placeholder="Enter Full Name" onChange={this.changeHandler} />
                   <input type="tel" id="phone" name="phone" value={phone}  placeholder="123-451-6781"  onChange={this.changeHandler}/>
                   <input type="email" id='email' name="email" value={email} placeholder="Enter Email"  onChange={this.changeHandler}/>
                   <input type="text" id="username" value={username}  name="username" placeholder="Enter Username"  onChange={this.changeHandler} />
                   <input type="password" id="password" value={password} name="password" placeholder="Enter Password"  onChange={this.changeHandler} />
                   <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
};

TestForm.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register : PropTypes.func.isRequired,
    isAuth: PropTypes.bool
};
const mapStateToProps = state => ({
    isAuth : state.auth.isAuth
});


export default connect(mapStateToProps, { setAlert, register })( TestForm ); 
