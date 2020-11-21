import React, { Component } from 'react'
import firebase from 'firebase';

type hpProps = {

}

export default class HomePage extends Component<hpProps> {

  state: {
    movies: object[];
    genres: object[];
  }
  
  constructor(props: hpProps) {
    super(props);
    this.state = {
      movies: [],
      genres: []
    }
  };
  
  componentDidMount() { 
    const db = firebase.firestore();
    let movies: object[];
    let genres: string[];
    movies = [];
    genres = [];
    db.collection('movies').get()
      .then(cursors => { 
        cursors.forEach(cursor => {
          movies.push(cursor.data());
          cursor.data().genres.forEach((ele: string) => {

            if (genres.indexOf(ele) > -1) {
              return;
            }

            genres.push(ele);
            
          });
        });
        console.log(genres);
        this.setState({
          movies: [...movies],
          genres: [...genres]
        })
      })
      .catch(err => { 
        alert('Oops! Something went wrong');
      });
  };
  
  render() {
    console.log(this.state);
    return (
      <div>
        Welcome to homepage
      </div>
    )
  }
}
