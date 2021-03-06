/**
 * @module HomePage
 * @class
 * @description this class contains methods for retrieving all movies from collection, group them by genres and rener them in rows - it expects in props > auth which indicates user login state
 */

import React, { Component } from 'react'
import firebase from 'firebase';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import GenreContainer from './GenreContainer';
import NavBar from './NavBar';

interface hpProps {
  watchlist: Function;
  auth: boolean;
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

  /**
   * @method groupMoviesByGenre
   * @param genres - array of all genres stored in database
   * @param movies - array of all retrieved movies
   * @returns array of key-value pairs where key is genre and value is array of its movies
   */
  
  groupMoviesByGenre = (genres: string[], movies: any): object[] => {
    
    let genreGroups: object[] =[];

    genres.forEach(genre => {
      /**
       * @callback filterFun
       * @param movie
       * @description this callback will be passed as an argument for movies array filter method
       */
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
  
  /**
   * @method componentDidMount
   * @description in this method of component lifecycle we connect to database, retrieve all movies, add movie id to its data object, create genres array with no repetition and update component state
   */
  componentDidMount() { 
    const db = firebase.firestore();
    let movies: object[];
    let genres: string[];
    movies = [];
    genres = [];

    db.collection('movies').get()
      .then(cursors => { 
        cursors.forEach(cursor => {
          const data = cursor.data();
          const movie = {...data}
          Object.defineProperty(movie, 'id', {
            value: cursor.id
          })
          movies.push(movie);
          movie.genres.forEach((ele: string) => {

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
  
  /**
   * @method render
   * @description we check user login status and redirect user to login page if not before rendering anything
   */
  render() {
    if (!this.props.auth) {
      window.location.replace(`${process.env.REACT_APP_DOMAIN}/login`);
    } else {

      if (!this.state.movies) {
      return (
        <div>
          Loading
        </div>     
          )
      } else {
        let genres = this.state.genreGroups.map((genreGroup:any) => {
          let title:string = '';
          let movies: object[] = [];
          for (const genreTitle in genreGroup) {
            title = genreTitle;
            movies = genreGroup[genreTitle];
          }
          return (
            <GenreContainer title={title} movies={movies} key={uuidv4()} watchlist={ this.props.watchlist}/>
          )
        })
        return (
          <div>
            <NavBar sort={null} search={null} auth={this.props.auth} content={localStorage.getItem('userId')? true : false} id={localStorage.getItem('userId')} showDropdown={false} />
            <Container className="m-5" fluid >
              {genres}
            </Container>
          </div>
        ) 
      }
    }
      
    }
}
