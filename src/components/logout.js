import * as React from 'react';
import {useEffect} from "react";
import auth from "../services/authService";

const Logout = (props) => {
    useEffect(() => {
        auth.logout();
        window.location = '/';
    })
    return null;
};

export default Logout;
