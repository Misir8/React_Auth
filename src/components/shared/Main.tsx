import React from 'react';
import {Route} from "react-router-dom";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Login from "../../pages/Login";
import ProtectedRoute from "../../hoc/ProtectedRoute";

const Main: React.FC = () => {
    return (
        <main >
            <Route exact path='/'  component={Home}/>
            <Route path='/login' component={Login}/>
            <ProtectedRoute path='/about' component={About}/>
        </main>
    );
};

export default Main;
