import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Redux 
import {Provider } from 'react-redux';
import store from './store';
import  { loadUser } from './actions/auth';

import Test from './components/Test/Form';
import HomePage from './components/home/Home';
import MainPage from './components/main/Main';
import ProfilePage from './components/profile/Profile';
import FeedPage from './components/feed/Feed';
import SearchPage from './components/search/Search';
import './App.css';
import NavBar from './components/nav/Nav';
import Footer from './components/footer/Footer'
import LoginTest from './components/Test/LoginForm';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './components/createProfile/createProfile'

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
if(localStorage.token){
  setAuthToken(localStorage.token)
}


export default class BasicExample extends Component {
  componentDidMount(){ //  is invoked immediately after a component is mounted
    store.dispatch(loadUser());
  }

  render() {
    return (
        <React.Fragment>
          <Provider store={store}>
          <Router>
              <Switch>
              <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/main">
                  <MainPage />
                </Route>
                <Route path="/profile">
                  <ProfilePage />
                </Route>
                <Route path="/feed">
                  <FeedPage />
                </Route>
                <Route path="/search">
                  <SearchPage />
              </Route>
                <Route path="/test">
                  <Test />
                </Route>
                <Route path="/test2">
                  <LoginTest />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/create">
                  <CreateProfile />
                </Route>
              </Switch>
          </Router>
        </Provider>
        <Footer />
        </React.Fragment>
        //React.Fragment allows it to compile.
    )
  }
}

// You can think of these components as "pages"
// in your app.


