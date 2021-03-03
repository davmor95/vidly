import React, {useEffect, useState} from "react";
import {getMovies, deleteMovie} from "../services/movieService";
import {Button, Table} from "react-bootstrap";
import LikeHeart from "./LikeHeart";
import Pag from "./Pag";
import {paginate} from "../utils/paginate";
import LiGroup from "./LiGroup";

import MoviesTable from "./moviesTable";
import _ from 'lodash';
import {Link} from "react-router-dom";
import SearchBar from "./searchBar";
import config from '../config.json';
import {toast} from "react-toastify";
import {getGenres} from "../services/genreService";
import axios from "axios";


const Movies = (props) => {
    const [movies, setMovies] = useState([]);
    const [movieCount, setMovieCount] = useState(movies.length);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortColumn, setSortColumn] = useState({path: 'title', order: 'asc'});
    const [keyword, setKeyword] = useState("");
    useEffect(async () => {
        const abortCtrl = new AbortController();
        const opt = {signal: abortCtrl.signal};
        const {data} = await getGenres();
        const genres1 = [{id: "", name:"All Genres"}, ...data];
        setGenres(genres1);
        // axios.get(`/genres`).then(res => {
        //     const genres1 = res.data;
        //     setGenres([{id:"", name: "All Genres"}, ...genres1]);
        // });

        const {data: movies1} = await getMovies();
        setMovies(movies1);
        // axios.get(`/movies`).then(res => {
        //     const movies1 = res.data;
        //     setMovies(movies1);
        //
        // });


        // const {data} = await getGenres()
        // setGenres([{_id:"", name: "All Genres"}, ...data]);
        return () => {
            console.log("clean up");
            abortCtrl.abort();
        }
    }, [movies]);

    // console.log(movies);
    const handleDelete = async movie => {
        // console.log(movie);

        // const movies2 = movies.filter(m => m._id !== movie._id);
        // setMovies(movies2);
        // setMovieCount(movies2.length);
        console.log(movie);
        const originalMovies = movies;
        const movies1 = originalMovies.filter(m => m.id !== movie.id);
        try {
            await deleteMovie(movie.id);

        } catch (ex) {
            if(ex.response && ex.response.status === 404) {
                toast.error('This movie has already deleted.');
            }

            setMovies(originalMovies);
        }

    }

    const handleLike = (movie) => {
        console.log(movie, "clicked");
        const movies2 = [...movies];
        const index = movies2.indexOf(movie);
        movies2[index] = {...movies2[index] };
        movies2[index].liked = !movies2[index].liked;
        setMovies(movies2);
    }

    const handlePagItem = (number) => {
        console.log(number, "click");
        setCurrentPage(number);

    }

    const handleListItem = (genre) => {
        console.log("click list item", genre);
        setSelectedGenre(genre);
        console.log(selectedGenre);
        setCurrentPage(1);
        setKeyword("");

    }

    const handleSort = (sortColumn2) => {
        setSortColumn(sortColumn2);
    }

    const getPageData = () => {
        let filtered = movies;

        if(keyword) {
            filtered = movies.filter(m =>
                m.title.toLowerCase().startsWith(keyword.toLowerCase())
            );
        } else if(selectedGenre && selectedGenre.id) {
            console.log(selectedGenre, selectedGenre.id, "here in getpage data selected genre")
            filtered= movies.filter(m => m.genre.name === selectedGenre.name);

        }
        // filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre.name === selectedGenre.name) : movies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies2 = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies2};
    }

    const handleSearch = (keyword) => {
            setKeyword(keyword);
            setSelectedGenre(null);
            setCurrentPage(1);
    };


    const {totalCount, data} = getPageData();

    return (
        <div className="row">
            <div className="col-3">
                <LiGroup onHandleListItem={handleListItem} items={genres} selectedItem={selectedGenre}/>
            </div>
            <div className="col">
                <Link to="/movies/new" className="btn btn-primary" style={{marginBottom:20}}>New Movie</Link>

                {totalCount === 0 ? <h1>There are no movies</h1> : <h1>There are {totalCount} movies available</h1>}
                <SearchBar keyword={keyword} onChange={handleSearch}/>
                <MoviesTable movies={data} onLiked={handleLike} onDelete={handleDelete} onSort={handleSort} sortColumn={sortColumn}/>
                <Pag itemsCount={totalCount} pageSize={pageSize} onClick={handlePagItem} currentPage={currentPage}/>
            </div>

        </div>
    );
}

export default Movies;
