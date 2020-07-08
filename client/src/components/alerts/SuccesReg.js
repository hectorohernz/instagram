import React, { Component } from 'react';
import './alert.css';
import axios from 'axios';
import aos from 'aos';
import Spinner from '../../spinner';

export default class SuccessfulLogin extends Component{
    constructor(props){
        super(props);
        this.state ={
            data:null
         }
    }
    async componentDidMount() {
        const res = await axios.get("/api/profile/me");
        this.setState({data: res.data})   ;
    }

    render() {
        let hasDataRender;
       if(this.state.data === null){
           hasDataRender = <Spinner/>
       } else{
        hasDataRender = (
            <div className="Profile-Custom-Login">
                <h1>Welcome To Instagram, {this.state.data.user.username}!</h1>
                <img src="https://media.giphy.com/media/3ohk2o9aEmykecxTK8/giphy.gif" alt="gif" className="image-success"/>
                <a href="/feed">Let's Get Started</a>
            </div>
        )
       }
        return (
            <>
           {hasDataRender}
            </>
        )
    }
}
