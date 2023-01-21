import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import "./assets/style.scss";
import { initContract } from "./utils";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>,
      document.getElementById("root")
    );
  })
  .catch(console.error);
