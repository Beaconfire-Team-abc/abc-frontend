import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from 'react-router-dom';
import Summary from './components/Summary';
import Timesheet from './components/Timesheet';
import Profile from './components/Profile';
import Home from './components/Home';
import GuardedRoute from './GuardedRoute';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function App() {
  const[isAutheticated, setisAutheticated] = useState(false);
  const[userId, setUserId] = useState(0);

  const checkAuthetication = () => {
    const token = Cookies.get('TEAMABC-JWT-TOKEN');
    if (typeof token !== 'undefined') {
      setisAutheticated(true);
      getUserId();
    } else {
      setisAutheticated(false);
    }
    console.log("loggedInUser:" + isAutheticated)
  }

  useEffect(checkAuthetication, [])

  function login(){
    window.location.href = 'http://localhost:9999/auth/login';
  }

  function logout(){
    Cookies.remove('TEAMABC-JWT-TOKEN');
    window.location.reload();
  }

  function getUserId() {
    axios.get('/api2/auth/userid')
        .then(response => {
          console.log(response.data);
          setUserId(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
  }
  
  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg">
          <Nav className="mr-auto">
            <Nav.Item>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/summary">
                <Nav.Link>Summary</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/timesheet">
                <Nav.Link>Timesheet</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
          <Form inline>
            <Button variant="outline-success" onClick={login}>Login</Button>
            <Button variant="outline-dark" onClick={logout}>Logout</Button>
          </Form>
        </Navbar>
      </div>

      <Switch>
        <Route exact path='/' render={(props) => <Home {...props} isAuthed={isAutheticated} />} />
        <GuardedRoute path = "/timesheet/:weekending" component = {() => <Timesheet userId ={userId} />} auth ={isAutheticated}></GuardedRoute>
        <GuardedRoute exact path='/summary' component={() => <Summary userId={userId} />} auth ={isAutheticated} />
        <GuardedRoute path='/timesheet' component={() => <Timesheet userId={userId} />} auth ={isAutheticated} />
        <GuardedRoute path='/profile' component={() => <Profile userId={userId} />} auth ={isAutheticated} />
      </Switch>
    </Router>

  );
}

export default App;