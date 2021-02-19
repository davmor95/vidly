import Joi from "joi-browser";
import useCustomForm from "./customForm";
import {Form} from "react-bootstrap";


const RegisterForm = (props) => {

    const schema = {
        username: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        personName: Joi.string().required().label('Name'),

    };
    const doSubmit = () => {
      console.log('register submitted');
    };

    const {handleSubmit, renderButton, renderInput} = useCustomForm({schema, doSubmit});

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
