import React, { useEffect } from "react";
import "./App.css";
import { LoginPage } from "./Components/Pages/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CatalogPage } from "./Components/Pages/Catalog/Catalog";
import ProtectedRoute from "./Components/Atoms/ProtectedRoute";
import { AddDevicePage } from "./Components/Pages/AddDevice/AddDevice";
import { useUserContext } from "./Context/UserContext";

function App() {
  const { dispatch } = useUserContext();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser !== null) {
      const parsedLocalUser = JSON.parse(localUser);
      dispatch({ type: "login", payload: parsedLocalUser });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute path="/catalog">
            <CatalogPage />
          </ProtectedRoute>
          <ProtectedRoute path="/addDevice">
            <AddDevicePage />
          </ProtectedRoute>
          <Route path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
