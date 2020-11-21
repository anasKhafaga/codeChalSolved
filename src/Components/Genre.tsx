import React, { Component } from 'react'
import firebase from 'firebase';

interface genreProps {
  match: {
    params: {
      name: string;
    }
  };
}

export default class Genre extends Component<genreProps> {

  state: {
    movies: object[]
  }
  constructor(props: genreProps) {
    super(props);
    this.state = {
      movies: []
    }
  }
  
  fetchGenreMovies = () => { 
    const db = firebase.firestore()
    db.collection('movies').where('genres', 'array-contains', this.props.match.params.name)
      .get()
      .then(cursors => {
        let movies: object[] = [];
        cursors.forEach(cursor => {
          movies.push(cursor.data());
        });
        this.setState({
          movies
        })
      })
      .catch(err => {
        console.log(err);
      });

  };

  componentDidMount() { 
    this.fetchGenreMovies();
  };

  render() {
    console.log(this.state);
    return (
      <div>
        Welcome to genre X
      </div>
    )
  }
}
