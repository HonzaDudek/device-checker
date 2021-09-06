import React, {useEffect} from 'react';
import './App.css';
import {LoginPage} from "./Components/Pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {SnackbarProvider} from "./Context/SnackbarContext";
import { UserProvider } from './Context/UserContext';
import {CatalogPage} from "./Components/Pages/Catalog";
import ProtectedRoute from "./Components/Atoms/ProtectedRoute";


function App() {

  return (
    <div className="App">
      <UserProvider>
        <SnackbarProvider>
        <Router>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <ProtectedRoute path="/catalog" >
              <CatalogPage />
            </ProtectedRoute>
          </Switch>
        </Router>
        </SnackbarProvider>
      </UserProvider>
    </div>
  );
}

export default App;
