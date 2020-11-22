import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import GenreRow from './GenreRow';
import { Link } from 'react-router-dom';

interface gCProps {
  title: string;
  movies: any[];
  watchlist: Function;
}

export default class GenreContainer extends Component<gCProps> {
  constructor(props:gCProps) { 
    super(props);
  };
  render() {
    let genreRows: any[] = [];
    let i: number = 0;
    let editableMovies = [...this.props.movies];
    while ( i < editableMovies.length) {
      genreRows.push(editableMovies.splice(0, 4) );
      i++
    }
    let movieRows = genreRows.map((genreRow) => {
      return (
        <GenreRow movieRow={genreRow} watchlist={ this.props.watchlist} title={this.props.title} />
      )
    });
    return (
      <Row className="mb-5">
        <h2 className="mb-4 mt-4">
          <Link to={`/movies/genre/${this.props.title}`}>
            {this.props.title}
          </Link>
        </h2>
        {movieRows}
      </Row>
    )
  }
}
