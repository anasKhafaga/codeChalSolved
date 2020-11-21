import React, { Component } from 'react'
import firebase from 'firebase';

type hpProps = {

}
interface movieSchema {
  genres: string[]
}

export default class HomePage extends Component<hpProps> {

  state: {
    movies: object[];
    genres: object[];
    genreGroups: object[];
  }
  
  constructor(props: hpProps) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      genreGroups: []
    }
  };

  groupMoviesByGenre = (genres: string[], movies: any): object[] => {
    
    let genreGroups: object[] =[];

    genres.forEach(genre => {
      function filterFun(movie: movieSchema) { 
          if (movie.genres.indexOf(genre) > -1) {
          return true;
        } else {
          return false;
        }
      };
      const movieGroup = movies.filter(filterFun);
      genreGroups.push({
        [genre]: movieGroup
      })
    });

    return genreGroups;
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
        const genreGrouping = this.groupMoviesByGenre(genres, movies);
        this.setState({
          movies: [...movies],
          genres: [...genres],
          genreGroups: [...genreGrouping]
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
