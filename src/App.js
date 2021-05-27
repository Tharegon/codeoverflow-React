import React, { useState, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login"
import { AuthProvider } from "./components/contexts/AuthContext";


function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;