import React from 'react';
import Login from './components/login/login';
import Search from './components/search/search';
import setAuthorizationToken from './components/utils/setAuthToken';
import './App.css';


global.JWT = null;

function App() {

    setAuthorizationToken(localStorage.jwtToken);

    return (
        <div className="App">
            <h2> Getting Started with Crime (Updated)</h2>

            <h1> Gerard HELLO YOUR TOKEN IS </h1> {global.JWT}
            <Login/>

            {(localStorage.jwtToken) ? <Search/> : ''}


            <h2> Query Responses </h2>

            <div id="app"></div>
        </div>
    );
}


export default App;
