import React, { Component } from 'react'
import firebase from 'firebase';
import { Form, Button } from 'react-bootstrap';
import NavBar from './NavBar';


type loginProps = {
  auth: boolean;
};

export default class Login extends Component<loginProps> {

  state: {
    email: string;
    password: string;
  }
  
  constructor(props: loginProps) { 
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  };

  emailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({
      email: e.target.value
    })
  }
  passChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    this.setState({
      password: e.target.value
    })
  };
  
  loginFirebaseUser = (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => { 
        if (user) {
          const id = user.user?.uid;
          if (typeof id === 'string') {
            localStorage.setItem('userId', id);
            window.location.replace(`${process.env.REACT_APP_DOMAIN}/`);
          } else {
          } 
        } else {
          window.location.reload();
        }
      })
      .catch(err => { 
        alert(err.message);
      });
  };
  
  render() {
    if (this.props.auth) {
      window.location.replace(`${process.env.REACT_APP_DOMAIN}/`)
    } else {
      
      return (
        <div>
        <NavBar auth={this.props.auth} sort={null} search={null} content={localStorage.getItem('userId')? true : false} id={localStorage.getItem('userId')} showDropdown={false} />
          <div className="row justify-content-md-center mt-5">
          <Form className="col-md-4">
            <Form.Group  controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange ={this.emailChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange = {this.passChange} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick = {this.loginFirebaseUser}>
              Login
            </Button>
          </Form>
        </div>
        </div>
      )
    }
  }
}
