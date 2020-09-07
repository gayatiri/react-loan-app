import React from 'react';
import './App.css';
import { Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/search" component={Search}></Route>
    </Router>
  );
}

export default App;
