
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Summy from './components/Summy';
import {Switch, Route, BrowserRouter as Router, Link} from 'react-router-dom';
import Timesheet from './components/Timesheet';
import Profile from './components/Profile';
import {Nav} from 'react-bootstrap';



function App(){

  return(
    <Router>
      <div>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link href="/summy">summy</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link href="/timesheet">timesheet</Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link href="/profile">profile</Nav.Link>
          </Nav.Item>
        </Nav>

        <Switch>
          <Route path="/summy/:userId">
            <Summy />
          </Route>
          <Route path="/timesheet">
            <Timesheet />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
