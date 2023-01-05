import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ThemeProvider from "./theme";
import ScrollToTop from "./cmp/ScrollToTop";
import Router from "../routes";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider> {/* Material UI */}
        <ScrollToTop />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;

