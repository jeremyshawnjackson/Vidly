import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import NavBar from "./components/NavBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            ></Route>
            <Route path="/movies/new" component={MovieForm}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
