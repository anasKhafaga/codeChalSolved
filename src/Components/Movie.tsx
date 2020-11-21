import React, { Component } from 'react'
import firebase from 'firebase';

interface movieProps {
  match: {
    params: {
      id: string;
    }
  };
  watchlist: Function;
}

export default class Movie extends Component<movieProps> {

  state: {
    movie: object;
  }
  
  constructor(props: movieProps) {
    super(props);
    this.state = {
      movie: {}
    }
  }
  
  fetchMovieById = (id: string) => { 
    const db = firebase.firestore()
    db.collection('movies').doc(id).get()
      .then(cursor => {
        const data = cursor.data();
        const movie = { ...data };
        movie['id'] = cursor.id;
        this.setState({
          movie
        })
      })
      .catch(err => console.log(err));
  };
  
  componentDidMount() { 
    this.fetchMovieById(this.props.match.params.id)
  };

  render() {
    console.log(this.state);
    return (
      <div>
        Welcome to Movie X
      </div>
    )
  }
}
