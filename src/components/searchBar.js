import {Form} from "react-bootstrap";
const SearchBar = ({keyword, onChange}) => {

    return (
        <div>
            <Form.Control className="m-3" type="text" name="keyword" value={keyword} placeholder="Search..."
                          onChange={(e) => onChange(e.currentTarget.value)}/>
        </div>
    );
};
export default SearchBar;
