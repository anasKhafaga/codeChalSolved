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
interface hpProps {
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
          window.location.replace(`${process.env.REACT_APP_DOMAIN}/watchlist/id`)
        })
        .catch(err => {
          if (err.message = 'FirebaseError: Missing or insufficient permissions.') {
            alert('the app needs a permission to access watchlist collection this Error message is logged into the console > "FirebaseError: Missing or insufficient permissions."');
            console.log(err); 
          } else {
            alert('Oops! something went wrong.');
          }
        });
    } else {
      return;
    }
  };
  
  render() {
    return (
      <Router>
        <Route path="/" exact component={(props: hpProps) => <HomePage {...props} watchlist={this.addMovieToWatchlist} auth={localStorage.getItem('userId') ? true : false} />} />
          <Route path="/login" component={(props: object)=> <Login {...props} auth={localStorage.getItem('userId')? true : false}/>} />
          <Route path="/signup" component={(props: object)=> <Signup {...props} auth={localStorage.getItem('userId')? true : false}/>} />
          <Route path="/movies/genre/:name" exact component={(props:routerPropsG)=> <Genre {...props} watchlist={this.addMovieToWatchlist} auth={localStorage.getItem('userId')? true : false}/>} />
          <Route path="/movies/:id" exact component={(props:routerPropsM)=> <Movie {...props} watchlist={this.addMovieToWatchlist} auth={localStorage.getItem('userId')? true : false}/>} />
          <Route path="/watchlist/:id" component={(props: routerPropsM)=> <WatchList {...props} auth={localStorage.getItem('userId')? true : false}/>} />
      </Router>
    )
  }
};
