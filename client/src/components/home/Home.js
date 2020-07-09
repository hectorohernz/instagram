import React, {Component} from "react";
import './Home.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import AOS from 'aos'; 
import 'aos/dist/aos.css';
export default  class Home extends Component{
    componentDidMount(){
        AOS.init({
          duration : 1000
        })
      }
    render() {
        return (
            <div className="home" >
            <div className="main__logo" >
                <img src="/images/logo.png"  alt=""/>
            </div>
            <div className="whitebox" >
                <div className="whitebox-btn"  data-aos="zoom-in" >
                    <a href="/login"  className="whitebox-btn">LOGIN</a>
                    <a href="/signup" className="whitebox__signup">SIGN UP</a>
                </div>
            </div>
        </div>
        )
    }
}