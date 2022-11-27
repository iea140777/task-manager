import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setProjects } from "./app/projectsSlice";
import { Project as ProjectComponent } from "./pages/Project/Project";
import { Projects } from "./pages/Projects/Projects";
import { Project } from "./types/projectTypes";

import styles from "./App.module.scss";

function App(): React.ReactElement {
  const projectsList = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (projectsList.length === 0) {
      // TODO: refactor code below to make it more readable
      const cookieData = document.cookie.split(";").map((v) => v.split("="))[0];
      if (cookieData.length === 0 || cookieData[0] === "") {
        return;
      }
      const restoredProjectsData = JSON.parse(cookieData[1]) as Project[];
      if (restoredProjectsData.length > 0) {
        dispatch(setProjects(restoredProjectsData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectComponent />} />
      </Routes>
    </div>
  );
}

export default App;
