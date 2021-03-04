import './App.css';
import Movies from "./components/Movies";
import NavBar from "./components/navBar";
import {Route, Switch, Redirect} from 'react-router-dom';
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import {useEffect, useState} from "react";
import {getMovies} from "./services/fakeMovieService";
import {getGenres} from "./services/fakeGenreService";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import authService from "./services/authService";
import ProtectedRoute from "./components/protectedRoute";
const activeToken = authService.getJwt();
function App() {

    const [user, setUser] = useState({});

    useEffect(() => {
        try {
            const jwt = localStorage.getItem("token");
            const user1 = jwtDecode(jwt);
            console.log(user1);
            setUser(user1);
        } catch (ex) {}
    }, []);

    console.log(user);
    return (
        <div>
            <ToastContainer/>
            <NavBar user={user}/>
            <main className="container">
                <Switch>
                    {/*<Route path="/movies/new" component={MovieForm}></Route>*/}
                    <ProtectedRoute path="/movies/:id"
                                    component={MovieForm}
                           ></ProtectedRoute>
                    <Route path="/register" component={RegisterForm}></Route>
                    <Route path="/login" component={LoginForm}></Route>
                    <Route path="/logout" component={Logout}></Route>
                    <Route path="/movies"
                           render={(props) => (<Movies {...props} user={user}/>)}></Route>
                    <Route path="/customers" component={Customers}></Route>
                    <Route path="/rentals" component={Rentals}></Route>
                    <Route path="/not-found" component={NotFound}></Route>
                    <Route path="/" exact component={Movies}></Route>
                    <Redirect to="not-found"/>
                    <Redirect from="/" exact to="/movies"/>
                </Switch>

            </main>
        </div>

    );
}

export default App;
