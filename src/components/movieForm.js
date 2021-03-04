import Joi from "joi-browser";
import useCustomForm from "./customForm";
import {Form} from "react-bootstrap";
import {getMovie, getMovies, saveMovie} from "../services/movieService";
import {useEffect, useState} from "react";
import {getGenres} from "../services/genreService";

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


    const doSubmit = async () => {
        console.log('register submitted');
        console.log('before save',data);
        const body = {
            title: data.title,
            numberInStock: data.numberInStock,
            dailyRentalRate: data.dailyRentalRate,
            genre: {
                name: data.genreId
            }
        }
        console.log(body);
        const {data: saved} = await saveMovie(data);
        console.log('im saved', saved);

        props.history.push("/movies");
    };

    const {data, handleSubmit, renderButton, renderInput, renderSelections} = useCustomForm({schema, doSubmit});
    useEffect(async () => {


        const {data: genres1} = await getGenres();
        setGenres(genres1);

        const movieId = props.match.params.id;
        if(movieId === "new") return;

        try {
            const {data:movie} = await getMovie(movieId);
            console.log(movie);
            setMovieData(mapToViewModel(movie));

        } catch (ex) {
            if (ex.response && ex.response.status === 500) {
                props.history.replace("/not-found");
            }
            // if (ex.response && ex.response.status === 401) {
            //     props.history.replace("/login");
            // }

        }




    }, []);

    const mapToViewModel = (movie) => {
        return {
            id: movie.id,
            title: movie.title,
            genreId: movie.genre.id,
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
