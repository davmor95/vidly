import LikeHeart from "./LikeHeart";
import {Button, Table} from "react-bootstrap";
import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import TableCustom from "./table";
import {Link} from "react-router-dom";

const MoviesTable = ({movies, onDelete, onLiked, onSort, sortColumn}) => {


    const columns = [
        {path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie.id}`}>{movie.title}</Link>},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        { key: 'like', content: movie => (
            <LikeHeart liked={movie.liked} onClick={() => onLiked(movie)}/>
            )},
        { key: 'delete', content: movie => (
            <Button variant="danger" onClick={() => onDelete(movie)}>
                Delete
            </Button>
            )}
    ];

    return(
        <TableCustom columns={columns} data={movies} sortColumn={sortColumn} onSort={onSort}/>
    );
}


export default MoviesTable;
