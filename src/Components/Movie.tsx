import React, { Component } from 'react'
import firebase from 'firebase';
import { Card, Button } from 'react-bootstrap';
import NavBar from './NavBar';

interface movieProps {
  match: {
    params: {
      id: string;
    }
  };
  watchlist: Function;
  auth: boolean;
}

export default class Movie extends Component<movieProps> {

  state: {
    movie: any;
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
    if (!this.props.auth) {
      window.location.replace(`${process.env.REACT_APP_DOMAIN}/login`);
    } else {
      let headers: string[] = [];
      for (const key in this.state.movie) {
        headers.push(key);
      }
      const data = headers.map((header: string) => { 
        const value = this.state.movie[header];
        return (
          <Card.Text key={header}>
            {header}: {value}
          </Card.Text>
        )
      });
      return (
        <div>
          <NavBar auth={this.props.auth} sort={null} search={null} content={localStorage.getItem('userId')? true : false} id={localStorage.getItem('userId')} showDropdown={false} />
          <Card style={{ width: '50%', height: '100%', margin: 'auto' }} >
              <Card.Img variant="top" src={this.state.movie.posterurl} />
              <Card.Body>
                <Card.Title><h1>{ this.state.movie.title}</h1></Card.Title>
              {data}
                <Button variant="primary" onClick={this.props.watchlist.bind(this.state.movie)}>Add to my Watchlist</Button>
              </Card.Body>
            </Card>
        </div>
      )
      
    }
  }
}
