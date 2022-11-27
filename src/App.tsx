import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { store } from "./app/store";
import { Project } from "./pages/Project/Project";
import { Projects } from "./pages/Projects/Projects";

import styles from "./App.module.scss";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={styles.app}>
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/:projectTitle" element={<Project />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
