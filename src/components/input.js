import {Form} from "react-bootstrap";
import React from "react";

const Input = ({name, label, error, ...rest}) => {
    return (
            <Form.Group>
            <Form.Label htmlFor={name}>{label}</Form.Label>
            <Form.Control autoFocus
                          {...rest}
                          name={name}
                          id={name}
                          placeholder={`Enter ${name}`}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </Form.Group>
    );
};

export default Input;
