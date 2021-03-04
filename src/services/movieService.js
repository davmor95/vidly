import axios from "axios";
import config from "../config.json";
import httpService from "./httpService";
import authService from "./authService";
const moviesURL = "/movies";
const movieUrlWithId = (id) => {
    return `${moviesURL}/${id}`;
}
export const getMovies = () => {
    return httpService.get(moviesURL);
}

export const getMovie = (movieId) => {
    return httpService.get(movieUrlWithId(movieId), {
        headers: {
            'Authorization': `Bearer ${authService.getJwt()}`
        }
    });
}

export const saveMovie = (movie) => {
    if(movie.id) {
        let body = {...movie};
        delete body.id;
        return httpService.put(movieUrlWithId(movie.id), body);
    }


    return httpService.post(moviesURL, movie);
}

export const deleteMovie = (movieId) => {
    return httpService.delete(movieUrlWithId(movieId), {
        headers: {
            'Authorization': `Bearer ${authService.getJwt()}`
        }
    });
}

