import React, {useEffect, useState} from "react";
import {deleteMovie, getMovies} from "../services/fakeMovieService";
import {Button, Table} from "react-bootstrap";
import LikeHeart from "./LikeHeart";
import Pag from "./Pag";
import {paginate} from "../utils/paginate";
import LiGroup from "./LiGroup";
import {getGenres} from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from 'lodash';
import {Link} from "react-router-dom";


const Movies = (props) => {
    const [movies, setMovies] = useState(getMovies());
    const [movieCount, setMovieCount] = useState(movies.length);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [genres, setGenres] = useState([{_id: "", name: "All Genres"}, ...getGenres()]);
    const [selectedGenre, setSelectedGenre] = useState();
    const [sortColumn, setSortColumn] = useState({path: 'title', order: 'asc'});
    useEffect(() => {

        return () => {
            console.log("clean up");
        }
    });

    // console.log(movies);
    const handleDelete = movie => {
        // console.log(movie);
        const movies2 = movies.filter(m => m._id !== movie._id);
        setMovies(movies2);
        setMovieCount(movies2.length);
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
        setCurrentPage(1);

    }

    const handleSort = (sortColumn2) => {
        setSortColumn(sortColumn2);
    }

    const getPageData = () => {
        const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre.name === selectedGenre.name) : movies;
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const movies2 = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies2};
    }


    const {totalCount, data} = getPageData();

    return (
        <div className="row">
            <div className="col-3">
                <LiGroup onHandleListItem={handleListItem} items={genres} selectedItem={selectedGenre}/>
            </div>
            <div className="col">
                <Link to={`/movies/new`}><Button>New Movie</Button></Link>
                {totalCount === 0 ? <h1>There are no movies</h1> : <h1>There are {totalCount} movies available</h1>}

                <MoviesTable movies={data} onLiked={handleLike} onDelete={handleDelete} onSort={handleSort} sortColumn={sortColumn}/>
                <Pag itemsCount={totalCount} pageSize={pageSize} onClick={handlePagItem} currentPage={currentPage}/>
            </div>

        </div>
    );
}

export default Movies;
