import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import firebase from 'firebase';

import {firebaseConfig} from './constants/firebase';
import {Genre, HomePage, Login, Movie, WatchList, Signup} from './Components';


import "./styles.css";

firebase.initializeApp(firebaseConfig);

interface routerPropsG {
  match: {
    params: {
      name: string;
    }
  };
}
interface routerPropsM {
  match: {
    params: {
      id: string;
    }
  };
}

export default class App extends Component { 

  addMovieToWatchlist = (movie: object) => { 
    const id = localStorage.getItem('userId');
    if (typeof id === 'string') {
      const db = firebase.firestore().collection("watchlist").doc(id);
      db.get()
        .then(watchList => {
          if (!watchList.exists) {
            db.set({
              list: [movie]
            })
          } else {
            db.set(
              { list: [movie] },
              { merge: true }
            )
          }
        })
        .catch(err => { console.log(err) });
    } else {
      return;
    }
  };
  
  render() {
    return (
      <Router>
        <Route path="/" exact component={(props:object)=> <HomePage {...props} watchlist={this.addMovieToWatchlist}/>} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/movies/genre/:name" exact component={(props:routerPropsG)=> <Genre {...props} watchlist={this.addMovieToWatchlist}/>} />
        <Route path="/movies/:id" exact component={(props:routerPropsM)=> <Movie {...props} watchlist={this.addMovieToWatchlist}/>} />
        <Route path="/watchlist/:id" component={WatchList} />
      </Router>
    )
  }
};
