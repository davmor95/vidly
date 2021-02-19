import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import React from "react";
import {Table} from "react-bootstrap";

const TableCustom = ({columns, sortColumn, onSort, data}) => {

    return (
        <Table striped bordered hover>
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
            <TableBody data={data} columns={columns}/>
        </Table>
    );
}
export default TableCustom;
