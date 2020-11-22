import React, { Component } from 'react'
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface movieCaProps {
  movie: any;
  watchlist: Function;
  title: string;
}

export default class MovieCard extends Component<movieCaProps> {

  constructor(props: movieCaProps) {
    super(props);
  }

  
  render() {
    let show;
    if (this.props.title === 'My watchlist') {
      show = null;
    } else {
      show = (
        <Button variant="primary" onClick={this.props.watchlist.bind(this.props.movie)}>Add to my Watchlist</Button>
      )
    }
    return (
      <Col style={{marginRight: '10'}} >
        <Card style={{ width: '250px', height: '400px', marginRight: '200px' }} >
          <Link to={ `/movies/${this.props.movie.id}`}>
          <Card.Img height="250px" width="250px" variant="top" src={this.props.movie.posterurl} />
          <Card.Body>
            <Card.Title>{ this.props.movie.title}</Card.Title>
            <Card.Text>
              { this.props.movie.year}
            </Card.Text>
          </Card.Body>
          </Link>
          {show}
        </Card>
      </Col>
    )
  }
}
