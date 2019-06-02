import React from 'react';
import Login from './components/login/login';
import Search from './components/search/search';
import setAuthorizationToken from './components/utils/setAuthToken';
import './App.css';
import Registration from "./components/registration/registration";


global.JWT = null;

function App() {

    setAuthorizationToken(localStorage.jwtToken);

    return (
        <div className="App">
            <Login/>

            <Registration/>
            {(localStorage.jwtToken) ? <Search/> : ''}
        </div>
    );
}


export default App;
