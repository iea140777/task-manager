import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/hooks";
import { updateProjects } from "../../app/projectsSlice";
import { Project } from "../../types/projectTypes";
import { Button } from "../../ui/Button/Button";
import { TextEditor } from "../TextEditor/TextEditor";

import styles from "./index.module.scss";

interface ProjectItemProps {
  project: Project;
  setNewProjectAdded: (state: boolean) => void;
  editMode?: boolean;
}

function ProjectItem({
  project,
  setNewProjectAdded,
  editMode = false,
}: ProjectItemProps): React.ReactElement {
  const [isEditMode, setEditmode] = useState<boolean>(editMode);

  // TODO: fix typing
  const descriptionRef = useRef<any>(null);
  const titleRef = useRef<any>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editButtonHandler = (): void => {
    setEditmode(true);
  };

  const saveButtonHandler = (): void => {
    const updatedProject: Project = {
      ...project,
      title:
        titleRef.current !== null
          ? titleRef.current.getContent()
          : project.title,
      description:
        descriptionRef.current !== null
          ? descriptionRef.current.getContent()
          : project.description,
    };
    dispatch(updateProjects(updatedProject));

    setNewProjectAdded(false);
    setEditmode(false);
  };
  const cancelButtonHandler = (): void => {
    setEditmode(false);
  };

  const renderEditMode = (): React.ReactNode => (
    <>
      <div className="editable">
        <TextEditor
          initialValue={project.title}
          editorRef={titleRef}
          toolbar=""
        />
      </div>
      <div className="editable">
        <TextEditor
          initialValue={project.description}
          editorRef={descriptionRef}
          toolbar="undo redo | bold italic forecolor |  alignleft aligncenter | bullist numlist outdent inden | removeformat"
        />
      </div>
    </>
  );

  return (
    <li className={styles.container}>
      {isEditMode ? (
        renderEditMode()
      ) : (
        <>
          <h3 dangerouslySetInnerHTML={{ __html: project.title }}></h3>
          <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
        </>
      )}

      <p>{project.tasks.length} tasks</p>
      <Button
        onClickHandler={() => navigate(`/project/${project.id}`)}
        label="Go to Project Page"
      ></Button>
      {isEditMode ? (
        <>
          <Button onClickHandler={saveButtonHandler} label="Save" />
          <Button onClickHandler={cancelButtonHandler} label="Cancel" />
        </>
      ) : (
        <Button onClickHandler={editButtonHandler} label="Edit" />
      )}
    </li>
  );
}

export { ProjectItem };
