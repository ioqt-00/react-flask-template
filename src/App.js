import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import ApiContextProvider from "./context/ApiContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import "./App.css"

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  render() {
    return (
      <ApiContextProvider>
        <HashRouter basename="/">
          <div className="container">
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/home" />}
              />

              <Route path="/home" render={() => <Home />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/signup" render={() => <Signup />} />
              <Route component={NotFound} />
            </Switch>
            <Route
              render={props => (
                <Footer/>
              )}
            />
          </div>
        </HashRouter>
      </ApiContextProvider>
    );
  }
}

export default App;
