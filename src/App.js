import { Switch, Route } from 'react-router-dom';
import Modals from './components/Common/Modals';
import { Patients } from './containers';

import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Patients} />
      </Switch>
      <Modals />
    </div>
  );
}

export default App;
