
import './App.css';
import Movies from "./components/Movies";
import NavBar from "./components/navBar";
import {Route, Switch, Redirect} from 'react-router-dom';
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/movieForm";
import {useState} from "react";
import {getMovies} from "./services/fakeMovieService";
import {getGenres} from "./services/fakeGenreService";
function App() {


  return (
      <div>
          <NavBar/>
          <main className="container">
              <Switch>
                  {/*<Route path="/movies/new" component={MovieForm}></Route>*/}
                  <Route path="/movies/:id" component={MovieForm}></Route>
                  <Route path="/register" component={RegisterForm}></Route>
                  <Route path="/login" component={LoginForm}></Route>
                  <Route path="/movies" component={Movies}></Route>
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
