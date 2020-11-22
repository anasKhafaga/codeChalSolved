import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import firebase from 'firebase';

import NavBar from './NavBar';
import GenreContainer from './GenreContainer';

interface wlProps {
  match: {
    params: {
      id: string;
    }
  };
  auth: boolean
}

export default class WatchList extends Component<wlProps> {

  state: {
    movies: any[];
  }

  constructor(props: wlProps) {
    super(props);
    this.state = {
      movies: []
    }
  }

  fetchWatchlistMovies = () => { 
    const id = localStorage.getItem('userId');
    if (typeof id === 'string') {
      const db = firebase.firestore().collection("watchlist").doc(id);
      db.get()
        .then(watchList => {
          if (!watchList.exists) {
            return;
          } else {
            const data = watchList.data();
            let movies: any[];
            if (typeof data === 'object') {
              movies = [...data.list]
              this.setState({
                movies
              })
            }
          }
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
  
  componentDidMount() { 
    this.fetchWatchlistMovies();
  };
  
  render() {
    let show;
    if (this.state.movies.length > 0) {
      show = (
        <Container className="m-5" fluid >
            <GenreContainer title={'My watchlist'} movies={this.state.movies} watchlist={() => { }} />
        </Container>
      )
    } else {
      show = (
        <h1 className = "m-5">You don't have a watchlist yet</h1>
      )
    }
    return (
      <div>
        <NavBar auth={this.props.auth} sort={null} search={null} content={localStorage.getItem('userId')? true : false} id={localStorage.getItem('userId')} showDropdown={false} />
        {show}
      </div>
    )
  }
}
