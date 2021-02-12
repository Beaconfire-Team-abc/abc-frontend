
import './App.css';
import Summy from './components/Summy';
import {Switch, Route} from 'react-router-dom';
import Timesheet from './components/Timesheet';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path ="/summy" ><Summy /></Route>
        <Route path ="/timesheet" ><Timesheet /></Route>
        <Route path ="/profile" ><Profile /></Route>
      </Switch>
    </div>
  );
}

export default App;
