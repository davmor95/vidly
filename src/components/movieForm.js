import Joi from "joi-browser";
import useCustomForm from "./customForm";
import {Form} from "react-bootstrap";

export const MovieForm = (props) => {
    const schema = {
        title: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('Title'),
        genre: Joi.string().min(5).required().label('Genre'),
        stocks: Joi.string().required().label('Number in Stock'),
        Rate: Joi.string().required().label('Rate')

    };

    const doSubmit = () => {
        console.log('register submitted');
    };

    const {handleSubmit, renderButton, renderInput} = useCustomForm({schema, doSubmit});

    return (

        <div>
        <h1>Movie Form</h1>
            <Form onSubmit={handleSubmit}>
                {renderInput('title', 'Title')}
                {renderInput('genre', 'Genre')}
                {renderInput('stocks', 'Stocks')}
                {renderInput('rate', 'Rate')}
                {renderButton('Save')}
            </Form>
        </div>
    );
};

export default MovieForm;
