import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setProjects } from "./app/projectsSlice";
import { Project as ProjectComponent } from "./pages/Project/Project";
import { Projects } from "./pages/Projects/Projects";
import { Project } from "./types/projectTypes";

function App(): React.ReactElement {
  const projectsList = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (projectsList.length === 0) {
      const data = localStorage.getItem("projects");

      if (data == null || data.length === 0) {
        return;
      }
      const restoredProjectsData = JSON.parse(data) as Project[];
      if (restoredProjectsData.length > 0) {
        dispatch(setProjects(restoredProjectsData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectComponent />} />
      </Routes>
    </div>
  );
}

export default App;
