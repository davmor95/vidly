import {Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import React from "react";
const NavBar = ({user}) => {
    let userFlag = false;
    if(JSON.stringify(user) === '{}') {
        userFlag = false;
    } else {
        userFlag = true;
    }
    console.log(userFlag);
    return(
        <Navbar bg="dark" variant="dark">
            <NavLink to="/">Cinema</NavLink>
            <Nav className="mr-auto">
                <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                {userFlag === false &&
                (<React.Fragment>
                    <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                </React.Fragment>)}

                {userFlag === true &&
                (<React.Fragment>
                    <NavLink className="nav-item nav-link" to="/profile">{user.sub}</NavLink>
                    <NavLink className="nav-item nav-link" to="/logout">Logout</NavLink>
                </React.Fragment>)}
            </Nav>
        </Navbar>
    );
}

export default NavBar;
