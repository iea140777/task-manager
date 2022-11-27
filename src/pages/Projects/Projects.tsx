import React, { ReactNode, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setProjects } from "../../app/projectsSlice";
import { ProjectItem } from "../../components/ProjectItem/ProjectItem";
import { Project } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";

import styles from "./index.module.scss";

const EMPTY_PROJECT: Project = {
  id: 0,
  title: "New Project",
  description: "New Project Description",
  tasks: [],
};

function Projects(): React.ReactElement {
  const [newProjectAdded, setNewProjectAdded] = useState(false);

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

  const renderProjectsList = (data: Project[]): ReactNode =>
    data.map((project) => (
      <ProjectItem
        project={project}
        setNewProjectAdded={setNewProjectAdded}
        key={`${project.id}+${project.title}`}
      />
    ));

  const newProjectButtonHandler = (): void => {
    setNewProjectAdded(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Projects list</h2>
      {projectsList.length > 0 ? (
        renderProjectsList(projectsList)
      ) : (
        <h3 className={styles.subHeader}>No projects started</h3>
      )}
      {newProjectAdded ? (
        <ProjectItem
          project={EMPTY_PROJECT}
          key={EMPTY_PROJECT.id}
          setNewProjectAdded={setNewProjectAdded}
          editMode
        />
      ) : null}
      <Button
        onClickHandler={newProjectButtonHandler}
        label="+ Create new Project"
      />
    </div>
  );
}

export { Projects };
