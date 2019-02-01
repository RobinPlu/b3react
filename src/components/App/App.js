import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import './App.css';
import Form from '../Form/Form.js';
import firebase from 'firebase';
import firebaseConfig from '../../config';

firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {

     if(firebase.auth().currentUser) {
      this.setState({ user: firebase.auth().currentUser });
     }

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user: user });
    });
  }

  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
        <div className="app">
          <div className="app__header">
            <img src={logo} className="app__logo" alt="logo" />
            <h2>
              REACT ME REND MAAAAAALAAADEUH COMPLETEMENT MAALAAAADEUH
            </h2>
            <p>prout</p>

            {!this.state.user ? (
                <button
                    className="app__button"
                    onClick={this.handleSignIn.bind(this)}
                >
                  Sign In
                </button>
            ) : (
                <button
                    className="app__button"
                    onClick={this.handleLogOut.bind(this)}
                >
                  Log out
                </button>
            )}
          </div>


          {this.state.user ?
              <div className="app__list">
                <Form user={this.state.user} />
              </div>
              :
              'Le petit bouton connexion permet de vous connecter afin d\'accéder aux messages "'}



        </div>
    );
  }
}
export default App;