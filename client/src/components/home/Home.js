import React from "react";
import './Home.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

export default function Home() {
   
    return (
        <div className="home">
            <div className="main__logo" >
                <img src="/images/logo.png"  alt=""/>
            </div>
            <div className="whitebox">
                <div className="whitebox-btn" >
                    <a href="/login" className="btn">LOGIN</a>
                    <a href="/signup" className="btn sign-up-btn">SIGN UP</a>
                </div>
            </div>
        </div>
    );
}
