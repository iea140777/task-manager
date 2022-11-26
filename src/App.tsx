import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";

import styles from "./App.module.scss";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={styles.app}></div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
