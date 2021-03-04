// @flow
import * as React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import MovieForm from "./movieForm";
import authService from "../services/authService";

export const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
    return (
        <Route
               {...rest}
               render={props => {
                   console.log(props);
                   if(!authService.getCurrentUser()) return <Redirect to={{
                       pathname: '/login',
                       state: {from: props.location}
                   }} />;
                   return Component ? <Component {...props}/> : render(props);
               }}></Route>
    );
}
export default ProtectedRoute;
