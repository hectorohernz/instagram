import React from  "react";
import './signup.css';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import { register } from '../../actions/auth'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from '../Test/layout/Alert';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                name:"",
                email:"",
                password:"",
                phone:"",
                username:"",
                successfulSignUp: false
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
                return <Redirect to="/create"/>
        };

        return (
            <div className="bg-gradient">
            <div className="main__logo">
                <img src="/images/logo.png" alt="" />
            </div>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <a href="/"><i class="fas fa-chevron-left"></i></a>
                <Alert/>
                <form className="fields" onSubmit={this.submitHandler}>
                    <input type="text"   id='name' name="name"   value={name} placeholder=" Name" className="input-fields" onChange={this.changeHandler}/>
                    <input type="tel"  id="phone"  name="phone" value={phone}  placeholder=" Phone Number" className="input-fields" onChange={this.changeHandler}/>
                    <input type="email" id='email' name="email" value={email} placeholder=" Email" className="input-fields" onChange={this.changeHandler}/>
                    <input type="text" id="username" name="username" value={username}  placeholder=" Username" className="input-fields" onChange={this.changeHandler}/>
                    <input type="password" id="password"  name="password" value={password}  placeholder=" Password" className="input-fields" onChange={this.changeHandler}/>
                    <input type="submit" class="signup-button" />
                </form>
            </div>
        </div>
        )
    }
};

SignUp.propTypes = {
    setAlert : PropTypes.func.isRequired,
    register : PropTypes.func.isRequired,
    isAuth: PropTypes.bool
};
const mapStateToProps = state => ({
    isAuth : state.auth.isAuth
});

export default connect(mapStateToProps, { setAlert, register })( SignUp ); 

