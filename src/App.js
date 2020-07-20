import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Bills from './components/bills';
import Users from './components/users';

import './App.css';

class App extends React.Component {

    render(props){
      return(
      <Router>
          <Switch>
              <Route path="/bills" component={Bills} />
              <Route path="/users" component={Users} />
            </Switch>
        </Router>
      );
    } 
}

export default App;