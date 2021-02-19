import {Button} from "react-bootstrap";

const MovieDetails = (props) => {
    const handleSave = () => {
        props.history.replace('/movies');
    };
    return (
        <div>
            <h1>Movie - {props.match.params.id}</h1>
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};
export default MovieDetails;
