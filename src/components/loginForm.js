import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {func} from "prop-types";
import Input from "./input";
import Joi from 'joi-browser';
import useCustomForm from "./customForm";
import auth from "../services/authService";
import {Redirect} from "react-router-dom";

const LoginForm = (props) => {

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };

    const doSubmit = async () => {

        console.log('submitted')
        console.log(data);
        try {
            await auth.login(data.username, data.password);
            const {state} = props.location;
            console.log(state);
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            if(ex.response && ex.response.status === 401) {
                const errors1 = {...errors};
                errors1.username = ex.response.data;
                alert(data.username + " does not exist!");
            }
        }
    };

    const {data, errors, handleSubmit, handleChange, validate, renderButton, renderInput} = useCustomForm({schema, doSubmit});
    // console.log(userData);
    if(auth.getCurrentUser()) return <Redirect to="/"/>;
    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>

                {renderInput('username', 'Username')}
                {renderInput('password', 'Password', 'password')}

                {renderButton("Login")}
            </Form>
        </div>
    );
};
export default LoginForm;
