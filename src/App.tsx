import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import firebase from 'firebase';

import {firebaseConfig} from './constants/firebase';
import {Genre, HomePage, Login, Movie, WatchList, Signup} from './Components';


import "./styles.css";

firebase.initializeApp(firebaseConfig);

export default class App extends Component { 
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/movies/genre/:name" exact component={Genre} />
        <Route path="/movies/:id" exact component={Movie} />
        <Route path="/watchlist/:id" component={WatchList} />
      </Router>
    )
  }
};
