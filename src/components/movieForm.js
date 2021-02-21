import Joi from "joi-browser";
import useCustomForm from "./customForm";
import {Form} from "react-bootstrap";
import {getMovie, getMovies, saveMovie} from "../services/fakeMovieService";
import {useEffect, useState} from "react";
import {getGenres} from "../services/fakeGenreService";

export const MovieForm = (props) => {

    const [genres, setGenres] = useState([]);
    const [movieData, setMovieData] = useState({
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: ""
    })

    const [errors, setErrors] = useState({});


    const schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
        dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')

    };


    const doSubmit = () => {
        console.log('register submitted');
        console.log(data);
        saveMovie(data);

        props.history.push("/movies");
    };

    const {data, handleSubmit, renderButton, renderInput, renderSelections} = useCustomForm({schema, doSubmit});
    useEffect(() => {
        const genres1 = getGenres();
        setGenres(genres1);

        const movieId = props.match.params.id;
        if(movieId === "new") return;

        const movie = getMovie(movieId);
        console.log(movie);
        if(!movie) return props.history.replace("/not-found");

        setMovieData(mapToViewModel(movie));

    }, []);

    const mapToViewModel = (movie) => {
      return {
          _id: movie._id,
          title: movie.title,
          genreId: movie.genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate
      };
    };
    return (

        <div>
        <h1>Movie Form</h1>
            <Form onSubmit={handleSubmit}>
                {renderInput('title', 'Title')}
                {renderSelections('genreId', 'Genre', 'select', genres)}
                {renderInput('numberInStock', 'Stocks')}
                {renderInput('dailyRentalRate', 'Rate')}
                {renderButton('Save')}
            </Form>
        </div>
    );
};

export default MovieForm;
