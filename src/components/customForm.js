// @flow 
import * as React from 'react';
import {useState} from "react";
import Joi from "joi-browser";
import {Button, Form} from "react-bootstrap";
import Input from "./input";

const useCustomForm = ({schema, doSubmit}) => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(data, schema, options);
        if (!error) {
            return null;
        }
        const errors1 = {};
        for (let item of error.details) {
            errors1[item.path[0]] = item.message;
        }
        return errors1;
    };
    const validateProperty = ({name, value}) => {

        const obj = {
            [name]: value
        };

        const schema1 = {
            [name]: schema[name]
        };

        const {error} = Joi.validate(obj, schema1);
        return error ? error.details[0].message : null;

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors1 = validate();
        // console.log(errors1);
        setErrors(errors1 || {});
        if (errors1) return;
        doSubmit();
    };

    const handleChange = ({currentTarget: input}) => {
        const errors1 = {...errors};
        const errors1Message = validateProperty(input);
        if (errors1Message) {
            errors1[input.name] = errors1Message;
        } else {
            delete errors1[input.name];
        }
        setData((a) => ({
            ...a,
            [input.name]: input.value
        }));
        setErrors(errors1);
    };

    const renderButton = (label) => {
        return (
            <Button variant="primary" type="submit" disabled={validate()}>
                {label}
            </Button>);
    };

    const renderInput = (name, label, type = 'text') => {
        return(
            <Input name={name} value={data[name]} type={type} label={label} onChange={handleChange}
               error={errors[name]}/>
        );
    };

    return {data, errors, handleSubmit, handleChange, validate, renderButton, renderInput};

}

export default useCustomForm;
