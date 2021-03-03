import Joi from "joi-browser";
import useCustomForm from "./customForm";
import {Form} from "react-bootstrap";
import * as userService from '../services/userService';
import authService from "../services/authService";

const RegisterForm = (props) => {

    const schema = {
        username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        personName: Joi.string().required().label('Name'),

    };
    const doSubmit = async () => {
        console.log(data);
        console.log('register submitted');
        try {
           const response = await userService.register(data);
           console.log(response);
           authService.loginWithJwt(response.headers['x-auth-token']);
           window.location = '/';
        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                console.log(ex.response.status)
                const errors1 = {...errors};
                errors1.username = ex.response.data;
                alert(errors1.username);
            }
        }
    };

    const {data, errors, handleSubmit, renderButton, renderInput} = useCustomForm({schema, doSubmit});

    return (
        <div>
            <h1>Register</h1>

            <Form onSubmit={handleSubmit}>
                {renderInput('username', 'Username')}
                {renderInput('password', 'Password', 'password')}
                {renderInput('personName', 'Name')}
                {renderButton('Register')}
            </Form>
        </div>
    );
};
export default RegisterForm;
