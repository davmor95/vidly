import {Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";

const NavBar = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <NavLink to="/">Cinema</NavLink>
            <Nav className="mr-auto">
                <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
            </Nav>
        </Navbar>
    );
}

export default NavBar;
