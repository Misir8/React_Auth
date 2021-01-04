import React from 'react';
import {Route} from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Login from "../../pages/Login";

const Main: React.FC = () => {
    return (
        <main >
            <Route exact path='/'  component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/about' component={About}/>
        </main>
    );
};

export default Main;
