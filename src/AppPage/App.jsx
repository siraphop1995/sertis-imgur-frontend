/* eslint-disable */
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import { LoginPage } from '../LoginPage';
import { CreateAccPage } from '../CreateAccPage';
import { AuthHomePage } from '../HomePage';
import { AuthUserPage } from '../UsersPage';
import { AuthCounters } from '../CountersPage';
import { AuthTicTacToe } from '../GamePage';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';

class App extends React.Component {
  Auth = new AuthHelperMethods();
  constructor(props) {
    super(props);
    this.state = {
      isLogin: this.Auth.loggedIn()
    };
    console.log('App - constructor');
  }

  componentDidMount() {
    console.log('App - Mounted');
  }

  render() {
    const DefaultContainer = () => (
      <div>
        <NavBar />
        <Route exact path="/" component={AuthHomePage} />
        <Route path="/tictactoe" component={AuthTicTacToe} />
        <Route path="/counters" component={AuthCounters} />
        <Route path="/users/:userId" component={AuthUserPage} />
        <Route
          path="/logout"
          render={() => {
            this.Auth.logout();
            return <Redirect to="/login" />;
          }}
        />
      </div>
    );
    console.log('App - Rendered');
    // console.log(this.Auth.getConfirm())
    return (
      <div>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={CreateAccPage} />
          <Route path="/*" component={DefaultContainer} />
        </Switch>
      </div>
    );
  }
}

export { App };
