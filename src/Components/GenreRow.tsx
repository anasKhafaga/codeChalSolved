import React, { Component } from 'react'
import MovieCard from './MovieCard';
import { Row } from 'react-bootstrap';

interface grProps {
  movieRow: any[]
  watchlist: Function;
  title: string;
}

export default class GenreRow extends Component<grProps> {
  render() {
    let movieCols = this.props.movieRow.map((movie) => {
      return (
        <MovieCard title={this.props.title} movie={movie} key={ movie.id}  watchlist={ this.props.watchlist}/>
      )
     });
    return (
      <Row className='mb-3' >
        {movieCols}
      </Row>
    )
  }
}
