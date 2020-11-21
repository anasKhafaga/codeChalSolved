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
    movies: any[],
    moviesToView: any[]
  }
  constructor(props: genreProps) {
    super(props);
    this.state = {
      movies: [],
      moviesToView: []
    }
  }
  
  fetchGenreMovies = () => { 
    const db = firebase.firestore()
    db.collection('movies').where('genres', 'array-contains', this.props.match.params.name)
      .get()
      .then(cursors => {
        let movies: object[] = [];
        cursors.forEach(cursor => {
          const data = cursor.data();
          const movie = {...data}
          Object.defineProperty(movie, 'id', {
            value: cursor.id
          })
          movies.push(movie);
        });
        this.setState({
          movies,
          moviesToView: movies
        })
      })
      .catch(err => {
        console.log(err);
      });

  };

  onSearch = (e: React.ChangeEvent<HTMLInputElement>) => { 
    if (!e.target.value) {
      this.setState({
        moviesToView: this.state.movies
      })
    } else {
      const movies = this.state.movies;
      const filteredMovies = movies.filter((movie) => { 
        return movie.title.includes(e.target.value);
      });
      this.setState({
        moviesToView: filteredMovies
      })
    }
  };

  onSorting = (e: React.ChangeEvent<HTMLSelectElement>) => { 
    let type: string = e.target.value;
    const movies = this.state.moviesToView;
    let sortedMovies: object[] = [];
    if (type === 'Ascend') {
       sortedMovies = movies.sort((a, b) => { 
        return a.year - b.year;
      });
      
    } else if(type === 'Descend') {
      sortedMovies = movies.sort((a, b) => { 
        return b.year - a.year;
      });
    } else {
      sortedMovies = this.state.movies;
    }
    this.setState({
      moviesToView: sortedMovies
    })
  };

  componentDidMount() { 
    this.fetchGenreMovies();
  };

  render() {
    console.log(this.state.moviesToView);
    return (
      <div>
        Welcome to genre X 
      </div>
    )
  }
}
