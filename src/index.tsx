import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./Context/UserContext";
import { SnackbarProvider } from "./Context/SnackbarContext";
import { DevicesProvider } from "./Context/phonesContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <DevicesProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </DevicesProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
