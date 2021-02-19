import {ListGroup} from "react-bootstrap";
import {useState} from "react";
import {getGenres} from "../services/fakeGenreService";

const LiGroup = (props) => {
    const {onHandleListItem, items, textProperty, valueProperty, selectedItem} = props;

    return(
        <ListGroup as="ul">

            {items.map(item => (
                <ListGroup.Item key={item[valueProperty]} onClick={() => onHandleListItem(item)} active={item === selectedItem}>
                    {item[textProperty]}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );

}
LiGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}
export default LiGroup;
