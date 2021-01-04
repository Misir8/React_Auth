import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {toast} from "react-toastify";

// @ts-ignore
const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if(localStorage.getItem('jwt') != null){
                    return <Component {...props}/>
                }else{
                    toast.error('you shall not pass !!!')
                    return <Redirect
                        to={{pathname: '/',
                            state: {from: props.location}}}
                    />
                }
            }}
        />
    );
};

export default ProtectedRoute;
