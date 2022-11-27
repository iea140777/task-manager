import React, { ReactNode, useState } from "react";

import { useAppSelector } from "../../app/hooks";
import { ProjectItem } from "../../components/ProjectItem/ProjectItem";
import { EMPTY_PROJECT } from "../../types/constants";
import { Project } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";

import styles from "./index.module.scss";

function Projects(): React.ReactElement {
  const [newProjectAdded, setNewProjectAdded] = useState(false);

  const projectsList = useAppSelector((state) => state.projects);

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
