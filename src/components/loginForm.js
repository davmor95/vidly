import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {func} from "prop-types";
import Input from "./input";
import Joi from 'joi-browser';
import useCustomForm from "./customForm";

const LoginForm = (props) => {

    const schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    };

    const doSubmit = () => {

        console.log('submitted')
    };

    const {data, errors, handleSubmit, handleChange, validate, renderButton, renderInput} = useCustomForm({schema, doSubmit});


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
