import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter, Link, Switch} from 'react-router-dom';
import Home from './components/App/App'
import About from './components/About/About'
serviceWorker.unregister();

const Header = () => (
    <nav className="navbar">
        <ul className="navbar-list clearfix">
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
        </ul>
    </nav>
);

const Main = () => (
    <main className="container">
        <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
            <Route path={`${process.env.PUBLIC_URL}/about`} component={About}/>
        </Switch>
    </main>
);

const App = () => (
    <div className="">
        <Header/>
        <Main/>
    </div>
);

ReactDOM.render((
    <BrowserRouter basename={'/'}>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));