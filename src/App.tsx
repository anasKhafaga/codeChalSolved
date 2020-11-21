import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import "./styles.css";

export default class App extends Component { 
  render() {
    return (
      <Router>
        <Route path="/" exact component={} />
        <Route path="/login" component={} />
        <Route path="/signup" component={} />
        <Route path="/movies/:genre" component={} />
        <Route path="/movies/:id" component={} />
        <Route path="/watchlist/:id" component={} />
      </Router>
    )
  }
};
