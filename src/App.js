import React, { useState, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import clsx from "clsx";
import "./App.css";
import Register from "./pages/Register";
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
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;