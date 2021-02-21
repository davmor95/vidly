import {Form} from "react-bootstrap";
import React from "react";

const SelectedInput = ({name, label, error, type, options, ...rest}) => {
    return (
        <Form.Group>
            <Form.Label htmlFor={name}>{label}</Form.Label>
            <Form.Control autoFocus
                          {...rest}
                          as={type}
                          name={name}
                          id={name}
                          placeholder={`Enter ${name}`}
            >
                {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
            </Form.Control>
            {error && <div className="alert alert-danger">{error}</div>}
        </Form.Group>
    );
};
export default SelectedInput;
