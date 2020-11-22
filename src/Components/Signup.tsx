/**
 * @module signup
 * @class
 * @description it's signup route handler, expects auth status sothat any logged in user will be redirected to homepage route instead
 */

import React, { Component } from 'react'
import firebase from 'firebase';
import { Form, Button } from 'react-bootstrap';
import NavBar from './NavBar';

type signupProps = {
  auth: boolean;
};

export default class Signup extends Component<signupProps>  {
  state: {
    email: string;
    password: string;
  }
  
  constructor(props: signupProps) { 
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  };

  /**
 * @method emailChange
 * @param e - event of email input change
 * @description updates email state with every change
 */
  emailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({
      email: e.target.value
    })
  }
  /**
 * @method passChange
 * @param e - event of password input change
 * @description updates password state with every change
 */
  passChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    this.setState({
      password: e.target.value
    })
  };
  
  /**
   * @method signupFirebaseUser
   * @param e - click event of signup button 
   * @description this method connect to database and signup with credintials using component state email and password then redirect the user to login page, if there's authentication error it shows alert message
   */
  signupFirebaseUser = (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          alert('Welcome to our Website, please Login');
          window.location.replace(`${process.env.REACT_APP_DOMAIN}/login`);
        })
        .catch((error) => {
          var errorMessage = error.message;
          alert(errorMessage);
        });
  };
  
  render() {
    console.log(this.props.auth);
    if (this.props.auth) {
      window.location.replace(`${process.env.REACT_APP_DOMAIN}/`)
    } else {
      return (
        <div>
          <NavBar auth={this.props.auth} sort={null} search={null} content={localStorage.getItem('userId') ? true : false} id={localStorage.getItem('userId')} showDropdown={false} />
          <div className="row justify-content-md-center mt-5">
            <Form className="col-md-4">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.emailChange} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
            </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={this.passChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={this.signupFirebaseUser}>
                Signup
          </Button>
            </Form>
          </div>
        </div>
      )
    }
    }
}
