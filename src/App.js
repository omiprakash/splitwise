import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Bills from './components/bills';
import Users from './components/users';

import './App.css';

class App extends React.Component {

    render(props){
        return(
            <React.Fragment>
                <header className="container">
                    <a href="/">Splitz</a>
                    <ul className="menu">
                        <li><a href="/bills">Bills</a></li>
                        <li><a href="/users">Friends</a></li>
                    </ul>
                </header>
                <Router>
                    <Switch>
                        <Route path="/bills" component={Bills} />
                        <Route path="/users" component={Users} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </React.Fragment>
          );
    } 
}

export default App;