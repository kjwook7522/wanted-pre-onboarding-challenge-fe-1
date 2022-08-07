import React from "react";
import axios from "axios";
import Router from "@components/Router";
import GlobalStyle from "@common/globalstyle";

function App() {
  axios.defaults.baseURL = "http://localhost:8080";

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
