import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import './App.css';
import Calendar from './Calendar.js';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/:calendar" component={ Calendar } />
                    <Route path="/" component={ Calendar } />
                </Switch>
            </Router>
        );
    }
}

export default App;
