import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
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


function App() {
  return (
    <Router>
      <div>
      {/* <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
              <Nav.Link href="/summary">Summary</Nav.Link>
              <Nav.Link href="/timesheet">Timesheet</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
      </Navbar> */}

        <Container>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link href="/summary">Summary</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/timesheet">Timesheet</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>

        <Switch>
          <Route exact path="/summary">
            <Summary />
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
